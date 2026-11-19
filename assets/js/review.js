// curriculum-2027 :: spaced repetition
// Leitner boxes over _data/cards/*.yml. Review history lives in localStorage under "c27srs:",
// separate from checkbox progress ("c27:"), so progress exports never carry review state.
(function () {
  "use strict";

  var root = document.querySelector("[data-srs]");
  if (!root || !window.C27_CARDS) return;

  var NS = "c27srs:";
  var BASE = (window.C27 && window.C27.base) || "";
  var DECKS = window.C27_DECKS || {};
  var INTERVALS = [0, 1, 3, 7, 14, 30, 60];   // days, indexed by box
  var KEEP_WARM_MIN = 30;
  var KEEP_WARM_CAP = 15;
  var CODES = { aif: "aif-c01", mla: "mla-c02", aip: "aip-c01" };

  var ls = {
    get: function (k, d) { try { var v = localStorage.getItem(NS + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(NS + k, JSON.stringify(v)); } catch (e) {} },
    clearCards: function () {
      try {
        Object.keys(localStorage).forEach(function (k) {
          if (k.indexOf(NS + "card:") === 0 || k.indexOf(NS + "day:") === 0) localStorage.removeItem(k);
        });
      } catch (e) {}
    }
  };

  function today() {
    var d = new Date();
    return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000);
  }

  // Topic "done" state, shared with the punch lists (term.js). Honors the repo baseline if present.
  function topicDone(deck, topic) {
    var key = "done:" + BASE + DECKS[deck] + "/topics/" + topic;
    var v = null;
    try { v = localStorage.getItem("c27:" + key); } catch (e) {}
    if (v !== null) return v !== "0";
    var repo = (window.C27 && window.C27.repo) || {};
    return repo[key] === "1" || repo[key] === 1 || repo[key] === true;
  }

  var settings = ls.get("settings", { decks: { aif: true, mla: true, aip: true }, src: "done", newCap: 15, passed: {} });
  settings.passed = settings.passed || {};

  // Flatten the decks.
  var all = [];
  Object.keys(window.C27_CARDS).forEach(function (deck) {
    (window.C27_CARDS[deck] || []).forEach(function (c) { all.push({ deck: deck, id: c.id, topic: c.topic, q: c.q, a: c.a }); });
  });

  var day = today();
  var log = ls.get("day:" + day, { reviewed: 0, introduced: 0, warm: {} });
  var queue = [];
  var current = null;

  function state(id) { return ls.get("card:" + id, null); }

  function build() {
    var due = [], fresh = [];
    var warmLeft = {};
    all.forEach(function (c) {
      if (!settings.decks[c.deck]) return;
      var s = state(c.id);
      var passed = !!settings.passed[c.deck];
      if (s) {
        if (s.due <= day) {
          if (passed) {
            warmLeft[c.deck] = warmLeft[c.deck] === undefined ? KEEP_WARM_CAP - (log.warm[c.deck] || 0) : warmLeft[c.deck];
            if (warmLeft[c.deck] <= 0) return;
            warmLeft[c.deck]--;
          }
          due.push(c);
        }
      } else if (!passed && (settings.src === "all" || topicDone(c.deck, c.topic))) {
        fresh.push(c);
      }
    });
    due.sort(function (x, y) { return state(x.id).due - state(y.id).due; });
    var room = Math.max(0, settings.newCap - log.introduced);
    queue = due.concat(fresh.slice(0, room));
    waiting = Math.max(0, fresh.length - room);
  }

  var waiting = 0;
  function stats() {
    var pending = queue.concat(current ? [current] : []);
    var dueN = pending.filter(function (c) { return state(c.id); }).length;
    var newN = pending.length - dueN;
    var el = root.querySelector("[data-srs-stats]");
    var seen = all.filter(function (c) { return state(c.id); }).length;
    el.innerHTML = "";
    var line = function (label, val) {
      var d = document.createElement("div"); d.className = "meter";
      d.innerHTML = '<span class="lbl"></span> <span class="num"></span>';
      d.firstChild.textContent = label; d.lastChild.textContent = val;
      el.appendChild(d);
    };
    line("due", String(dueN));
    line("new", newN + (waiting ? " (" + waiting + " more waiting)" : ""));
    line("today", log.reviewed + " reviewed");
    line("deck", seen + "/" + all.length + " cards started");
  }

  var cardEl = root.querySelector("[data-srs-card]");
  var emptyEl = root.querySelector("[data-srs-empty]");
  var qEl = root.querySelector("[data-srs-q]");
  var aEl = root.querySelector("[data-srs-a]");
  var tagEl = root.querySelector("[data-srs-tag]");
  var topicEl = root.querySelector("[data-srs-topic]");
  var revealRow = root.querySelector("[data-srs-reveal-row]");
  var gradeRow = root.querySelector("[data-srs-grade-row]");

  function show() {
    current = queue.shift() || null;
    stats();
    if (!current) {
      cardEl.hidden = true;
      emptyEl.hidden = false;
      var anyDone = all.some(function (c) { return topicDone(c.deck, c.topic); });
      emptyEl.textContent = log.reviewed
        ? "$ queue empty. " + log.reviewed + " reviewed today. Come back tomorrow."
        : (settings.src === "done" && !anyDone
          ? "$ nothing due. New cards come from topics marked done: check some off on a punch list, or switch \"new cards from\" to everything."
          : "$ nothing due today.");
      return;
    }
    emptyEl.hidden = true;
    cardEl.hidden = false;
    tagEl.textContent = "[" + CODES[current.deck] + " · " + current.topic.slice(0, 2) + (state(current.id) ? " · box " + state(current.id).box : " · new") + "]";
    topicEl.href = BASE + DECKS[current.deck] + "/topics/" + current.topic + ".html";
    qEl.textContent = current.q;
    aEl.textContent = current.a;
    aEl.hidden = true;
    revealRow.hidden = false;
    gradeRow.hidden = true;
  }

  function reveal() {
    if (!current || !aEl.hidden) return;
    aEl.hidden = false;
    revealRow.hidden = true;
    gradeRow.hidden = false;
    gradeRow.querySelector('[data-grade="good"]').focus();
  }

  function grade(g) {
    if (!current || aEl.hidden) return;
    var s = state(current.id);
    var isNew = !s;
    s = s || { box: 0, due: day, reviews: 0, lapses: 0 };
    var passed = !!settings.passed[current.deck];
    var interval;
    if (g === "again") {
      s.box = 1; s.lapses++; interval = 1;
      queue.push(current);                                  // see it again this session
    } else if (g === "hard") {
      s.box = Math.max(1, s.box); interval = Math.max(1, Math.round(INTERVALS[s.box] / 2));
    } else {
      s.box = Math.min(INTERVALS.length - 1, s.box + (g === "easy" ? 2 : 1));
      interval = INTERVALS[s.box];
    }
    if (passed) interval = Math.max(interval, KEEP_WARM_MIN);
    s.due = day + interval;
    s.reviews++;
    ls.set("card:" + current.id, s);
    log.reviewed++;
    if (isNew) log.introduced++;
    if (passed) log.warm[current.deck] = (log.warm[current.deck] || 0) + 1;
    ls.set("day:" + day, log);
    show();
  }

  root.querySelector("[data-srs-reveal]").addEventListener("click", reveal);
  gradeRow.querySelectorAll("[data-grade]").forEach(function (b) {
    b.addEventListener("click", function () { grade(b.getAttribute("data-grade")); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    if (e.key === " " && current && aEl.hidden) { e.preventDefault(); reveal(); }
    var map = { "1": "again", "2": "hard", "3": "good", "4": "easy" };
    if (map[e.key]) grade(map[e.key]);
  });

  // Settings
  function save() { ls.set("settings", settings); build(); show(); }
  root.querySelectorAll("[data-deck]").forEach(function (cb) {
    var d = cb.getAttribute("data-deck");
    cb.checked = settings.decks[d] !== false;
    cb.addEventListener("change", function () { settings.decks[d] = cb.checked; save(); });
  });
  root.querySelectorAll('input[name="srs-src"]').forEach(function (r) {
    r.checked = r.value === settings.src;
    r.addEventListener("change", function () { if (r.checked) { settings.src = r.value; save(); } });
  });
  var cap = root.querySelector("[data-srs-newcap]");
  cap.value = settings.newCap;
  cap.addEventListener("change", function () { settings.newCap = Math.max(0, Math.min(100, parseInt(cap.value, 10) || 0)); save(); });
  root.querySelectorAll("[data-passed]").forEach(function (cb) {
    var d = cb.getAttribute("data-passed");
    cb.checked = !!settings.passed[d];
    cb.addEventListener("change", function () { settings.passed[d] = cb.checked; save(); });
  });
  var reset = root.querySelector("[data-srs-reset]");
  reset.addEventListener("click", function () {
    if (reset.getAttribute("data-armed") !== "1") { reset.setAttribute("data-armed", "1"); reset.textContent = "really reset? click again"; return; }
    ls.clearCards();
    log = { reviewed: 0, introduced: 0, warm: {} };
    reset.setAttribute("data-armed", "0"); reset.textContent = "reset review history";
    build(); show();
  });

  build();
  show();
})();
