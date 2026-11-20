// curriculum-2027 :: progress tracking
// Turns markdown "[ ]" task-list items into live checkboxes. State comes from two places:
//   1. the repo: [x] in the markdown, plus _data/progress.json (written by scripts/sync_progress.py)
//   2. this browser: localStorage overrides, "1" = checked, "0" = explicitly unchecked
// Local wins. Punch-list items and topic pages share one key (the topic's path), so checking a
// topic in either place shows up in both, plus the progress meters on the home page.
(function () {
  "use strict";

  var NS = "c27:";
  var C27 = window.C27 || {};
  var repo = C27.repo || {};

  var store = {
    get: function (k) { try { return localStorage.getItem(NS + k); } catch (e) { return null; } },
    set: function (k, on) { try { localStorage.setItem(NS + k, on ? "1" : "0"); } catch (e) {} },
    all: function () {
      var out = {};
      try {
        for (var i = 0; i < localStorage.length; i++) {
          var k = localStorage.key(i);
          if (k && k.indexOf(NS) === 0) out[k.slice(NS.length)] = localStorage.getItem(k);
        }
      } catch (e) {}
      return out;
    },
    clear: function () {
      Object.keys(store.all()).forEach(function (k) { try { localStorage.removeItem(NS + k); } catch (e) {} });
    }
  };

  // Effective state: local override, else repo baseline, else the markdown default.
  function isOn(key, fallback) {
    var v = store.get(key);
    if (v !== null) return v === "1";
    if (repo[key] !== undefined) return repo[key] === "1" || repo[key] === 1 || repo[key] === true;
    return !!fallback;
  }

  function norm(path) {
    return path.replace(/\/index\.html$/, "/").replace(/\.html$/, "").replace(/\.md$/, "");
  }
  function sameSite(a) {
    return a && a.hostname === location.hostname;
  }

  // 1. Task-list items. kramdown (GFM) renders "- [ ]" as a disabled checkbox; switch it on.
  var onPunchList = /PUNCH-LIST/.test(location.pathname);
  var n = 0;
  document.querySelectorAll(".doc li.task-list-item > input.task-list-item-checkbox").forEach(function (box) {
    var li = box.parentNode;
    n++;
    var link = li.querySelector("a[href]");
    var key = (onPunchList && link && sameSite(link) && /\/topics\//.test(link.pathname))
      ? "done:" + norm(link.pathname)
      : "task:" + norm(location.pathname) + "#" + n;
    box.disabled = false;
    box.removeAttribute("disabled");
    box.setAttribute("aria-label", (li.textContent || "").trim().slice(0, 80));
    box.checked = isOn(key, box.checked);
    li.classList.add("task");
    li.classList.toggle("is-done", box.checked);
    box.addEventListener("change", function () {
      store.set(key, box.checked);
      li.classList.toggle("is-done", box.checked);
    });
  });

  // 2. "mark this topic done" toggle at the bottom of each topic page
  var self = document.querySelector("[data-done-self]");
  if (self) {
    var selfKey = "done:" + norm(location.pathname);
    self.checked = isOn(selfKey, false);
    self.addEventListener("change", function () { store.set(selfKey, self.checked); });
  }

  // 3. Progress meters: <div data-progress="/AIF-C01-.../topics/" data-total="14" data-label="aif-c01"></div>
  var meters = document.querySelectorAll("[data-progress]");
  if (meters.length) {
    var keys = {};
    Object.keys(repo).concat(Object.keys(store.all())).forEach(function (k) {
      if (k.indexOf("done:") === 0) keys[k] = true;
    });
    var done = Object.keys(keys).filter(function (k) { return isOn(k, false); })
      .map(function (k) { return k.slice("done:".length); });
    meters.forEach(function (el) {
      var prefix = (C27.base || "") + el.getAttribute("data-progress");
      var total = parseInt(el.getAttribute("data-total"), 10) || 1;
      var count = done.filter(function (p) { return p.indexOf(prefix) === 0; }).length;
      var width = 24, on = Math.round((count / total) * width);
      var pct = Math.round((count / total) * 100);
      el.className = "meter";
      el.innerHTML =
        '<span class="lbl">' + el.getAttribute("data-label") + '</span> ' +
        '<span class="bar">[' + "#".repeat(on) + '<span class="off">' + "-".repeat(width - on) + '</span>]</span> ' +
        '<span class="num">' + count + "/" + total + " " + (pct < 10 ? "  " : pct < 100 ? " " : "") + pct + "%</span>";
    });
  }

  // 4. Progress tools (progress.md): export, import, reset.
  var tools = document.querySelector("[data-progress-tools]");
  if (tools) {
    var out = tools.querySelector("[data-out]");
    var say = function (msg) { if (out) out.textContent = msg; };
    var snapshot = function () {
      return JSON.stringify({ version: 1, exported: new Date().toISOString(), base: C27.base || "", items: store.all() }, null, 2);
    };
    var localCount = function () { return Object.keys(store.all()).length; };
    say("$ " + localCount() + " local entries, " + Object.keys(repo).length + " from the repo");

    tools.querySelector("[data-export]").addEventListener("click", function () {
      var blob = new Blob([snapshot()], { type: "application/json" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "progress.json";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
      say("$ wrote progress.json (" + localCount() + " entries)");
    });
    tools.querySelector("[data-copy]").addEventListener("click", function () {
      var text = snapshot();
      (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject())
        .then(function () { say("$ copied " + localCount() + " entries to the clipboard"); },
              function () { say("$ clipboard blocked; use export instead"); });
    });
    tools.querySelector("[data-import]").addEventListener("change", function (ev) {
      var file = ev.target.files && ev.target.files[0];
      if (!file) return;
      file.text().then(function (txt) {
        var data = JSON.parse(txt);
        var items = data.items || {};
        Object.keys(items).forEach(function (k) {
          try { localStorage.setItem(NS + k, items[k] === "1" || items[k] === 1 || items[k] === true ? "1" : "0"); } catch (e) {}
        });
        say("$ imported " + Object.keys(items).length + " entries. reload any open pages.");
      }).catch(function () { say("$ that file isn't a progress export"); });
    });
    tools.querySelector("[data-reset]").addEventListener("click", function (ev) {
      var btn = ev.currentTarget;
      if (btn.getAttribute("data-armed") !== "1") {
        btn.setAttribute("data-armed", "1");
        btn.textContent = "really reset? click again";
        return;
      }
      store.clear();
      btn.setAttribute("data-armed", "0");
      btn.textContent = "reset local progress";
      say("$ local progress cleared. the repo baseline still applies.");
    });
  }
})();
