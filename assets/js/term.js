// curriculum-2027 :: progress tracking
// Turns markdown "[ ]" task-list items into live checkboxes and remembers them in localStorage.
// Punch-list items and topic pages share one key (the topic's path), so checking a topic
// in either place shows up in both, plus the progress meters on the home page.
(function () {
  "use strict";

  var NS = "c27:";
  var store = {
    get: function (k) { try { return localStorage.getItem(NS + k); } catch (e) { return null; } },
    set: function (k, v) { try { v ? localStorage.setItem(NS + k, "1") : localStorage.removeItem(NS + k); } catch (e) {} }
  };

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
    if (store.get(key) !== null) box.checked = true;
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
    self.checked = store.get(selfKey) !== null;
    self.addEventListener("change", function () { store.set(selfKey, self.checked); });
  }

  // 3. Progress meters: <div data-progress="/AIF-C01-.../topics/" data-total="14" data-label="aif-c01"></div>
  var meters = document.querySelectorAll("[data-progress]");
  if (meters.length) {
    var doneKeys = [];
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf(NS + "done:") === 0) doneKeys.push(k.slice((NS + "done:").length));
      }
    } catch (e) {}
    meters.forEach(function (el) {
      var prefix = (window.C27 ? window.C27.base : "") + el.getAttribute("data-progress");
      var total = parseInt(el.getAttribute("data-total"), 10) || 1;
      var done = doneKeys.filter(function (p) { return p.indexOf(prefix) === 0; }).length;
      var width = 24, on = Math.round((done / total) * width);
      var pct = Math.round((done / total) * 100);
      el.className = "meter";
      el.innerHTML =
        '<span class="lbl">' + el.getAttribute("data-label") + '</span> ' +
        '<span class="bar">[' + "#".repeat(on) + '<span class="off">' + "-".repeat(width - on) + '</span>]</span> ' +
        '<span class="num">' + done + "/" + total + " " + (pct < 10 ? "  " : pct < 100 ? " " : "") + pct + "%</span>";
    });
  }
})();
