/* ============================================================================
 * IT7013 Quiz 1 Trainer — application logic
 * No dependencies. Works from file:// or any static server.
 * ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------ constants ------------------------------ */
  var STORE_KEY = "it7013.quiz1.history.v1";
  var SESSION_KEY = "it7013.quiz1.session.v1";
  var PREFS_KEY = "it7013.quiz1.prefs.v1";
  var THEME_KEY = "it7013.quiz1.theme";
  var READY_THRESHOLD = 90;      // the "full-mark ready" bar
  var MAX_HISTORY = 60;

  var MODES = {
    practice:  { label: "Practice",        feedback: true,  timed: false },
    exam:      { label: "Exam simulation", feedback: false, timed: true, navigator: true, flags: true },
    weak:      { label: "Weak points",     feedback: true,  timed: false },
    lightning: { label: "Lightning",       feedback: false, timed: true, count: 10, minutes: 5 }
  };

  var DECKS = [
    { id: 0, name: "Cross-deck",    hint: "synthesis across decks 1-3" },
    { id: 1, name: "Ethical AI -1", hint: "bias, risk tiers, remedies" },
    { id: 2, name: "Ethical AI -2", hint: "fairness, transparency, XAI" },
    { id: 3, name: "Ethical AI -3", hint: "privacy & ISO/IEC 42001" }
  ];

  var LETTERS = ["A", "B", "C", "D", "E", "F"];

  /* -------------------------------- state -------------------------------- */
  var TOPICS = window.TOPICS || {};
  var RAW = window.QUESTION_BANK || [];
  var SHEET = window.CHEAT_SHEET || [];
  var BANK = [];            // prepared: options permuted once per page load
  var byId = {};
  var session = null;       // live quiz session
  var lastResult = null;    // last finished session (results screen)
  var timerId = null;
  var flash = { list: [], idx: 0, flipped: false, ok: 0, again: 0 };
  var reviewFilter = "all";

  /* -------------------------------- utils -------------------------------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function shuffle(a) {
    var arr = a.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }
  function zeroPad(n) { return (n < 10 ? "0" : "") + n; }
  function fmtClock(sec) {
    sec = Math.max(0, Math.round(sec));
    return zeroPad(Math.floor(sec / 60)) + ":" + zeroPad(sec % 60);
  }
  function fmtDur(sec) {
    sec = Math.max(0, Math.round(sec || 0));
    var m = Math.floor(sec / 60);
    if (m < 60) return m + "m " + zeroPad(sec % 60) + "s";
    return Math.floor(m / 60) + "h " + zeroPad(m % 60) + "m";
  }
  function pct(n, d) { return d ? Math.round((n / d) * 100) : 0; }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function sameSet(a, b) {
    if (!a || !b || a.length !== b.length) return false;
    return a.slice().sort().join(",") === b.slice().sort().join(",");
  }
  function topicKey(deck, topic) { return deck + " · " + topic; }
  function deckLabel(id) {
    var d = DECKS.filter(function (x) { return x.id === Number(id); })[0];
    return d ? ("Deck " + d.id + " · " + d.name) : ("Deck " + id);
  }
  function typeLabel(t) {
    return t === "tf" ? "True / False" : (t === "multi" ? "Select all that apply" : "Multiple choice");
  }
  function store(key, val) {
    try {
      if (val === undefined) {
        var raw = window.localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
      }
      window.localStorage.setItem(key, JSON.stringify(val));
      return true;
    } catch (e) { return undefined; }
  }
  function drop(key) { try { window.localStorage.removeItem(key); } catch (e) {} }
  function toggleInArray(arr, v) {
    var i = arr.indexOf(v);
    if (i === -1) arr.push(v); else arr.splice(i, 1);
  }

  /* ---------------------------- bank preparation -------------------------- */
  /* Most questions in the bank store the correct answer first. Each question's
     options are therefore permuted once per page load and the answer indices
     remapped, so the stored order can never leak through the UI. */
  function prepareBank() {
    BANK = RAW.map(function (q) {
      var order = shuffle(q.options.map(function (_, i) { return i; }));
      var copy = {
        id: q.id, deck: Number(q.deck), topic: q.topic, type: q.type, diff: q.diff,
        q: q.q,
        options: order.map(function (orig) { return q.options[orig]; }),
        answer: q.answer.map(function (a) { return order.indexOf(a); })
          .sort(function (a, b) { return a - b; }),
        why: q.why, ref: q.ref
      };
      byId[copy.id] = copy;
      return copy;
    });
  }
  /* ------------------------------- preferences ---------------------------- */
  var prefs = {
    mode: "practice",
    decks: DECKS.map(function (d) { return d.id; }),
    topics: [],
    types: ["mcq", "tf", "multi"],
    count: 20,
    timePerQ: 1,
    shuffleQ: true,
    shuffleO: true,
    instantExpl: true
  };

  function allTopicKeys() {
    var out = [];
    Object.keys(TOPICS).forEach(function (d) {
      TOPICS[d].forEach(function (t) { out.push(topicKey(d, t)); });
    });
    return out;
  }
  function loadPrefs() {
    var saved = store(PREFS_KEY);
    if (saved && typeof saved === "object") {
      Object.keys(prefs).forEach(function (k) { if (saved[k] !== undefined) prefs[k] = saved[k]; });
    }
    if (!prefs.topics || !prefs.topics.length) prefs.topics = allTopicKeys();
  }
  function savePrefs() { store(PREFS_KEY, prefs); }

  /* ---------------------------- theme handling ---------------------------- */
  function initTheme() {
    var saved = store(THEME_KEY);
    var theme = (saved === "light" || saved === "dark") ? saved : "dark";
    document.documentElement.setAttribute("data-theme", theme);
    var btn = $("#themeBtn");
    if (!btn) return;
    btn.textContent = theme === "dark" ? "\uD83C\uDF19" : "\u2600\uFE0F";
    btn.addEventListener("click", function () {
      theme = theme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", theme);
      btn.textContent = theme === "dark" ? "\uD83C\uDF19" : "\u2600\uFE0F";
      store(THEME_KEY, theme);
    });
  }

  /* ------------------------------ navigation ------------------------------ */
  function showView(name) {
    $$(".view").forEach(function (v) { v.classList.remove("is-visible"); });
    var target = $("#view-" + name);
    if (target) target.classList.add("is-visible");
    $$("#tabs .tab").forEach(function (t) {
      var v = t.getAttribute("data-view");
      var active = (v === name) || (name === "quiz" && v === "home") || (name === "results" && v === "home");
      t.classList.toggle("is-active", active);
    });
    window.scrollTo(0, 0);
  }

  /* ========================== HOME: filters =============================== */
  function buildDeckChips() {
    var host = $("#deckGroup");
    if (!host) return;
    host.innerHTML = "";
    DECKS.forEach(function (d) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.setAttribute("data-deck", String(d.id));
      b.textContent = "Deck " + d.id + " · " + d.name;
      b.title = d.hint;
      b.addEventListener("click", function () {
        toggleInArray(prefs.decks, d.id);
        syncChips(); savePrefs(); updateSummary();
      });
      host.appendChild(b);
    });
  }

  function buildTopicChips() {
    var host = $("#topicGroup");
    if (!host) return;
    host.innerHTML = "";
    DECKS.forEach(function (d) {
      var list = TOPICS[d.id] || [];
      if (!list.length) return;
      var block = document.createElement("div");
      block.className = "deck-block";
      var h = document.createElement("h4");
      h.textContent = "Deck " + d.id + " · " + d.name;
      block.appendChild(h);
      var chips = document.createElement("div");
      chips.className = "chips";
      list.forEach(function (t) {
        var key = topicKey(d.id, t);
        var b = document.createElement("button");
        b.type = "button";
        b.className = "chip";
        b.setAttribute("data-topic", key);
        b.textContent = t;
        b.addEventListener("click", function () {
          toggleInArray(prefs.topics, key);
          syncChips(); savePrefs(); updateSummary();
        });
        chips.appendChild(b);
      });
      block.appendChild(chips);
      host.appendChild(block);
    });
  }

  function syncChips() {
    $$("#deckGroup .chip").forEach(function (b) {
      b.classList.toggle("is-on", prefs.decks.indexOf(Number(b.getAttribute("data-deck"))) !== -1);
    });
    $$("#topicGroup .chip").forEach(function (b) {
      b.classList.toggle("is-on", prefs.topics.indexOf(b.getAttribute("data-topic")) !== -1);
    });
    $$("#typeGroup .chip").forEach(function (b) {
      b.classList.toggle("is-on", prefs.types.indexOf(b.getAttribute("data-type")) !== -1);
    });
    $$("#modeGroup .mode-card").forEach(function (b) {
      var on = b.getAttribute("data-mode") === prefs.mode;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-checked", on ? "true" : "false");
    });
    var c = $("#countSelect"); if (c) c.value = String(prefs.count);
    var t = $("#timeInput"); if (t) t.value = String(prefs.timePerQ);
    setToggle("#shuffleQ", prefs.shuffleQ);
    setToggle("#shuffleO", prefs.shuffleO);
    setToggle("#instantExpl", prefs.instantExpl);
  }

  function setToggle(sel, on) {
    var el = $(sel);
    if (!el) return;
    el.classList.toggle("is-on", !!on);
    el.setAttribute("aria-pressed", String(!!on));
  }
  function getToggle(sel) {
    var el = $(sel);
    return el ? el.classList.contains("is-on") : false;
  }

  function filteredPool() {
    return BANK.filter(function (q) {
      return prefs.decks.indexOf(q.deck) !== -1 &&
        prefs.topics.indexOf(topicKey(q.deck, q.topic)) !== -1 &&
        prefs.types.indexOf(q.type) !== -1;
    });
  }

  function updateSummary() {
    var pool = filteredPool();
    var el = $("#bankSummary");
    if (!el) return;
    var msg = "Bank: " + BANK.length + " questions · " + pool.length + " match your current filters.";
    if (!pool.length) msg += "  ⚠ Nothing matches — switch a deck or topic back on.";
    el.textContent = msg;
  }
  /* ========================= SESSION BUILDING ============================= */
  function topicAccuracyMap() {
    var hist = store(STORE_KEY) || { attempts: [] };
    var map = {};
    (hist.attempts || []).forEach(function (a) {
      (a.items || []).forEach(function (it) {
        var k = topicKey(it.deck, it.topic);
        if (!map[k]) map[k] = { correct: 0, total: 0 };
        map[k].total++;
        if (it.correct) map[k].correct++;
      });
    });
    return map;
  }

  function weakOrderedPool(pool) {
    var acc = topicAccuracyMap();
    return shuffle(pool).sort(function (a, b) {
      var aa = acc[topicKey(a.deck, a.topic)], ab = acc[topicKey(b.deck, b.topic)];
      var va = aa ? aa.correct / aa.total : -1;   // unseen topics count as weakest
      var vb = ab ? ab.correct / ab.total : -1;
      return va - vb;
    });
  }

  function newItem(q) {
    return { q: q, chosen: [], status: "untouched", correct: null, revealed: false, flagged: false };
  }

  function buildSession(mode, opts) {
    opts = opts || {};
    var pool = opts.pool || filteredPool();
    if (!pool.length) return null;

    var defaultCount = MODES[mode].count != null ? MODES[mode].count : Number(prefs.count);
    var count = (opts.count !== undefined) ? opts.count : defaultCount;
    var ordered = (mode === "weak") ? weakOrderedPool(pool) : (prefs.shuffleQ ? shuffle(pool) : pool.slice());
    if (count > 0) ordered = ordered.slice(0, count);

    var perQ = MODES[mode].minutes != null ? (MODES[mode].minutes / ordered.length) : (Number(prefs.timePerQ) || 1);
    var totalSec = MODES[mode].timed ? Math.max(30, Math.round(perQ * ordered.length * 60)) : 0;

    return {
      mode: mode,
      cfg: {
        decks: prefs.decks.slice(), topics: prefs.topics.slice(), types: prefs.types.slice(),
        count: count, shuffleQ: prefs.shuffleQ, instantExpl: prefs.instantExpl
      },
      items: ordered.map(newItem),
      idx: 0,
      startedAt: Date.now(),
      endsAt: totalSec ? Date.now() + totalSec * 1000 : 0,
      totalSec: totalSec,
      finished: false,
      secondsUsed: 0
    };
  }

  function answeredCount(s) { return s.items.filter(function (i) { return i.status === "answered"; }).length; }
  function correctCount(s) { return s.items.filter(function (i) { return i.correct === true; }).length; }
  function checkedCount(s) { return s.items.filter(function (i) { return i.revealed; }).length; }
  function currentItem() { return session ? session.items[session.idx] : null; }

  /* ============================== QUIZ FLOW =============================== */
  function startQuiz(mode, opts) {
    opts = opts || {};
    var s = opts.session || buildSession(mode, opts);
    if (!s) { updateSummary(); alert("Nothing matches your filters. Turn a deck or topic back on and try again."); return; }
    session = s;
    showView("quiz");
    renderQuestion();
    startTimer();
    saveSession();
  }

  function renderQuestion() {
    if (!session) return;
    var s = session, it = currentItem(), q = it.q, m = MODES[s.mode];

    $("#qMode").textContent = m.label;
    $("#qDeck").textContent = deckLabel(q.deck);
    $("#qTopic").textContent = q.topic;
    $("#qDiff").textContent = q.diff;
    $("#qType").textContent = typeLabel(q.type);
    $("#qText").textContent = q.q;
    $("#qHintMulti").hidden = q.type !== "multi";

    var host = $("#qOptions");
    host.innerHTML = "";
    q.options.forEach(function (text, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "opt";
      b.setAttribute("data-i", String(i));
      var k = document.createElement("span");
      k.className = "key"; k.textContent = LETTERS[i] || String(i + 1);
      var t = document.createElement("span");
      t.textContent = text;
      b.appendChild(k); b.appendChild(t);
      b.addEventListener("click", function () { chooseOption(i); });
      host.appendChild(b);
    });

    paintOptions();
    updateCounters();

    var locked = it.revealed || it.status === "skipped";
    $("#checkBtn").hidden = locked || !m.feedback;
    $("#skipBtn").hidden = locked;
    $("#prevBtn").hidden = s.idx === 0;
    var nextBtn = $("#nextBtn");
    nextBtn.hidden = !locked && m.feedback;
    if (!m.feedback) nextBtn.hidden = false;
    nextBtn.textContent = (s.idx === s.items.length - 1)
      ? (m.feedback ? "Finish" : "Review & submit")
      : "Next →";

    $("#navBtn").hidden = !m.navigator;
    $("#flagBtn").hidden = !m.flags;
    $("#flagBtn").textContent = it.flagged ? "Unflag (F)" : "Flag (F)";

    renderNavigator();
    renderFeedback();
    autoSave();
  }

  function paintOptions() {
    var it = currentItem();
    if (!it) return;
    $$("#qOptions .opt").forEach(function (b, i) {
      var selected = it.chosen.indexOf(i) !== -1;
      b.classList.remove("is-correct", "is-wrong");
      b.classList.toggle("is-selected", selected);
      if (it.revealed) {
        b.disabled = true;
        if (it.q.answer.indexOf(i) !== -1) b.classList.add("is-correct");
        else if (selected) b.classList.add("is-wrong");
      } else {
        b.disabled = false;
      }
      b.setAttribute("aria-checked", selected ? "true" : "false");
    });
  }

  function chooseOption(i) {
    if (!session) return;
    var it = currentItem();
    if (it.revealed) return;
    if (it.q.type === "multi") {
      toggleInArray(it.chosen, i);
      // Multi-select: the item counts as answered as soon as something is picked
      // (deselecting everything returns it to "untouched").
      it.status = it.chosen.length ? "answered" : "untouched";
      it.correct = null;
      paintOptions();
      updateCounters();
      renderNavigator();
      autoSave();
      return;
    }
    it.chosen = [i];
    it.status = "answered";
    it.correct = null;
    paintOptions();
    updateCounters();
    renderNavigator();
    autoSave();
  }

  function updateCounters() {
    var s = session; if (!s) return;
    var it = currentItem(), m = MODES[s.mode];
    $("#qCounter").textContent = (s.idx + 1) + " / " + s.items.length;
    var scoreEl = $("#qScore");
    scoreEl.hidden = !m.feedback;
    if (m.feedback) {
      // In practice the score reflects questions that have actually been
      // checked (or skipped), not ones merely selected.
      scoreEl.textContent = "Score " + correctCount(s) + " / " + checkedCount(s);
    }
    $("#progressFill").style.width = pct(s.idx + (it.status === "untouched" ? 0 : 1), s.items.length) + "%";
  }
  function checkAnswer() {
    if (!session) return;
    var it = currentItem();
    if (it.revealed) { nextQuestion(); return; }
    if (!it.chosen.length) { flashFeedback("Pick an answer first — keys 1-6 or A-F."); return; }
    it.revealed = true;
    it.correct = sameSet(it.chosen, it.q.answer);
    it.status = "answered";
    paintOptions();
    renderFeedback();
    renderNavigator();
    updateCounters();
    $("#checkBtn").hidden = true;
    $("#skipBtn").hidden = true;
    var n = $("#nextBtn");
    n.hidden = false;
    n.textContent = (session.idx === session.items.length - 1) ? "Finish" : "Next →";
    autoSave();
  }

  function renderFeedback() {
    var it = currentItem(), box = $("#qFeedback");
    if (!it || !it.revealed) { box.hidden = true; box.innerHTML = ""; box.className = "feedback"; return; }
    var correctText = it.q.answer.map(function (i) { return it.q.options[i]; }).join("   |   ");
    var skipped = it.status === "skipped";
    box.className = "feedback " + (skipped ? "is-skipped" : (it.correct ? "is-correct" : "is-wrong"));
    box.hidden = false;
    box.innerHTML =
      "<h4>" + (skipped ? "↷ Skipped" : (it.correct ? "✔ Correct" : "✘ Not quite")) + "</h4>" +
      "<div><strong>Correct answer:</strong> " + esc(correctText) + "</div>" +
      "<div style='margin-top:.45rem'>" + esc(it.q.why) + "</div>" +
      "<div class='ref'>" + esc(it.q.ref) + " · " + esc(typeLabel(it.q.type)) + " · " + esc(it.q.id) + "</div>";
  }

  function flashFeedback(msg) {
    var box = $("#qFeedback");
    box.className = "feedback is-skipped";
    box.hidden = false;
    box.innerHTML = "<h4>" + esc(msg) + "</h4>";
  }

  function skipQuestion() {
    if (!session) return;
    var it = currentItem(), m = MODES[session.mode];
    if (it.status !== "untouched") { nextQuestion(); return; }
    it.status = "skipped";
    it.chosen = [];
    if (m.feedback) {
      it.revealed = true;
      it.correct = false;
      paintOptions(); renderFeedback(); renderNavigator(); updateCounters();
      $("#checkBtn").hidden = true; $("#skipBtn").hidden = true;
      var n = $("#nextBtn");
      n.hidden = false;
      n.textContent = (session.idx === session.items.length - 1) ? "Finish" : "Next →";
    } else {
      renderNavigator(); updateCounters();
      nextQuestion();
    }
    autoSave();
  }

  function toggleFlag() {
    if (!session) return;
    var it = currentItem();
    it.flagged = !it.flagged;
    $("#flagBtn").textContent = it.flagged ? "Unflag (F)" : "Flag (F)";
    renderNavigator();
    autoSave();
  }

  function nextQuestion() {
    if (!session) return;
    if (session.idx >= session.items.length - 1) { endSession("submitted"); return; }
    session.idx++;
    renderQuestion();
    autoSave();
  }
  function prevQuestion() {
    if (!session || session.idx === 0) return;
    session.idx--;
    renderQuestion();
    autoSave();
  }
  function gotoQuestion(i) {
    if (!session) return;
    session.idx = Math.max(0, Math.min(session.items.length - 1, i));
    renderQuestion();
    autoSave();
  }

  function renderNavigator() {
    var host = $("#navGrid");
    if (!host || !session) return;
    host.innerHTML = "";
    session.items.forEach(function (it, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = String(i + 1);
      b.className = (it.status !== "untouched" ? "answered " : "") +
        (it.flagged ? "flagged " : "") + (i === session.idx ? "current" : "");
      b.title = deckLabel(it.q.deck).replace(" · ", " ") + " — " + it.q.topic + (it.flagged ? " (flagged)" : "");
      b.addEventListener("click", function () { gotoQuestion(i); });
      host.appendChild(b);
    });
  }
  /* ================================ TIMER ================================= */
  function startTimer() {
    stopTimer();
    if (!session) return;
    var el = $("#qTimer");
    el.hidden = false;
    el.classList.remove("is-low");
    tickClock();
    timerId = window.setInterval(tickClock, MODES[session.mode].timed ? 250 : 1000);
  }
  function stopTimer() { if (timerId) { window.clearInterval(timerId); timerId = null; } }

  function tickClock() {
    if (!session) return;
    var el = $("#qTimer");
    if (MODES[session.mode].timed) {
      var left = (session.endsAt - Date.now()) / 1000;
      el.textContent = "⏱ " + fmtClock(left);
      el.classList.toggle("is-low", left <= 30);
      if (left <= 0) endSession("time up");
    } else {
      el.textContent = "⏱ " + fmtClock((Date.now() - session.startedAt) / 1000);
    }
  }

  /* --------------------------- persistence ------------------------------- */
  function saveSession() { if (session && !session.finished) store(SESSION_KEY, session); }
  function autoSave() { saveSession(); }
  function clearSession() { drop(SESSION_KEY); }

  function offerResume() {
    var s = store(SESSION_KEY);
    var card = $("#resumeCard");
    if (!s || !s.items || !s.items.length || s.finished) { if (card) card.hidden = true; return; }
    if (s.items.some(function (i) { return !i.q || !i.q.options; })) { drop(SESSION_KEY); if (card) card.hidden = true; return; }
    s.endsAt = s.endsAt || 0;
    if (!card) return;
    card.hidden = false;
    $("#resumeMeta").textContent = (MODES[s.mode] ? MODES[s.mode].label : s.mode) +
      " · question " + (s.idx + 1) + " of " + s.items.length +
      " · started " + new Date(s.startedAt).toLocaleString();
    $("#resumeBtn").onclick = function () {
      session = s;
      card.hidden = true;
      showView("quiz");
      renderQuestion();
      startTimer();
    };
    $("#discardBtn").onclick = function () { drop(SESSION_KEY); card.hidden = true; };
  }

  /* ============================== GRADING ================================= */
  /* A question is graded on whatever was selected at the end. Multi-select
     answers count even if the candidate never pressed Check (exam mode has no
     Check button), and anything with no selection at all is a skip. */
  function grade(s) {
    s.items.forEach(function (it) {
      var hasChoice = it.chosen && it.chosen.length > 0;
      it.status = hasChoice ? "answered" : "skipped";
      it.correct = hasChoice ? sameSet(it.chosen, it.q.answer) : false;
    });
  }

  function saveAttempt(attempt) {
    var hist = store(STORE_KEY) || { attempts: [] };
    hist.attempts = (hist.attempts || []).concat([attempt]).slice(-MAX_HISTORY);
    store(STORE_KEY, hist);
  }

  function endSession(reason) {
    if (!session || session.finished) return;
    stopTimer();
    session.finished = true;
    session.secondsUsed = Math.round((Date.now() - session.startedAt) / 1000);
    grade(session);
    lastResult = session;

    var attempt = {
      ts: Date.now(),
      mode: session.mode,
      reason: reason || "submitted",
      total: session.items.length,
      correct: correctCount(session),
      wrong: session.items.filter(function (i) { return !i.correct && i.status === "answered"; }).length,
      skipped: session.items.filter(function (i) { return i.status !== "answered"; }).length,
      seconds: session.secondsUsed,
      items: session.items.map(function (i) {
        return {
          id: i.q.id, deck: i.q.deck, topic: i.q.topic, type: i.q.type, diff: i.q.diff,
          correct: !!i.correct, chosen: i.chosen.slice(),
          chosenText: i.chosen.map(function (ix) { return i.q.options[ix]; }),
          status: i.status
        };
      })
    };
    saveAttempt(attempt);
    clearSession();
    renderResults(attempt);
    showView("results");
  }
  /* ============================== RESULTS ================================= */
  function deckName(id) {
    var d = DECKS.filter(function (x) { return x.id === Number(id); })[0];
    return d ? d.name : String(id);
  }
  function verdictFor(p) {
    if (p >= READY_THRESHOLD) return "🏆 Full-mark ready — keep it warm with a lightning round daily.";
    if (p >= 80) return "👍 Close. Tighten the topics in red below, then re-run this set.";
    if (p >= 65) return "📈 Solid base. Another practice pass plus the cheat sheet will close the gap.";
    return "📚 Start with the cheat sheet tab, then practise the deck you missed most.";
  }
  function groupStats(items, keyFn) {
    var map = {};
    items.forEach(function (i) {
      var k = keyFn(i);
      if (!map[k]) map[k] = { correct: 0, total: 0 };
      map[k].total++;
      if (i.correct) map[k].correct++;
    });
    return Object.keys(map).map(function (k) {
      return { key: k, correct: map[k].correct, total: map[k].total, pct: pct(map[k].correct, map[k].total) };
    }).sort(function (a, b) { return a.pct - b.pct || a.key.localeCompare(b.key); });
  }
  function renderBreakdown(host, rows) {
    if (!host) return;
    host.innerHTML = "";
    if (!rows.length) { host.innerHTML = "<p class='muted small'>No data.</p>"; return; }
    rows.forEach(function (r) {
      var cls = r.pct >= READY_THRESHOLD ? "" : (r.pct >= 70 ? "mid" : "low");
      var div = document.createElement("div");
      div.className = "bd-row";
      var name = document.createElement("span");
      name.textContent = r.key;
      var bar = document.createElement("span");
      bar.className = "bd-bar";
      var fill = document.createElement("i");
      fill.className = cls;
      fill.style.width = r.pct + "%";
      bar.appendChild(fill);
      var val = document.createElement("span");
      val.className = "bd-val";
      val.textContent = r.pct + "% (" + r.correct + "/" + r.total + ")";
      div.appendChild(name); div.appendChild(bar); div.appendChild(val);
      host.appendChild(div);
    });
  }

  function renderResults(attempt) {
    var p = pct(attempt.correct, attempt.total);
    $("#scorePct").textContent = p + "%";
    var colour = p >= READY_THRESHOLD ? "var(--good)" : (p >= 80 ? "var(--warn)" : "var(--bad)");
    $("#scoreRing").style.background =
      "conic-gradient(" + colour + " " + (p * 3.6) + "deg, var(--card-2) " + (p * 3.6) + "deg)";
    $("#verdict").textContent = verdictFor(p);
    $("#resultMeta").textContent =
      attempt.correct + " correct · " + attempt.wrong + " wrong · " + attempt.skipped + " skipped · " +
      fmtDur(attempt.seconds) + " · " + (MODES[attempt.mode] ? MODES[attempt.mode].label : attempt.mode) +
      " (" + attempt.reason + ")";

    renderBreakdown($("#deckBreakdown"), groupStats(attempt.items, function (i) {
      return "Deck " + i.deck + " · " + deckName(i.deck);
    }));
    renderBreakdown($("#topicBreakdown"), groupStats(attempt.items, function (i) {
      return topicKey(i.deck, i.topic);
    }));

    $("#retryMissedBtn").disabled = attempt.items.every(function (i) { return i.correct; });
    renderReview();
    renderStats();
  }

  function renderReview() {
    var host = $("#reviewList");
    if (!host || !lastResult) return;
    host.innerHTML = "";
    var rows = lastResult.items.slice();
    if (reviewFilter === "wrong") rows = rows.filter(function (i) { return !i.correct; });
    if (reviewFilter === "skipped") rows = rows.filter(function (i) { return i.status !== "answered"; });
    if (!rows.length) { host.innerHTML = "<p class='muted small'>Nothing to show for this filter. 🎉</p>"; return; }

    rows.forEach(function (it, n) {
      var q = it.q;
      var div = document.createElement("div");
      div.className = "rev-item " + (it.status !== "answered" ? "skipped" : (it.correct ? "" : "wrong"));
      var head = document.createElement("h4");
      head.textContent = (n + 1) + ". " + q.q;
      div.appendChild(head);

      var meta = document.createElement("div");
      meta.className = "rev-line";
      var k = document.createElement("span");
      k.className = "k";
      k.textContent = deckLabel(q.deck) + " · " + q.topic + " · " + typeLabel(q.type) + " ";
      meta.appendChild(k);
      meta.appendChild(document.createTextNode("— " + (it.status !== "answered" ? "skipped" : (it.correct ? "correct" : "incorrect"))));
      div.appendChild(meta);

      if (it.chosen.length) {
        var mine = document.createElement("div");
        mine.className = "rev-line";
        var mk = document.createElement("span");
        mk.className = "k";
        mk.textContent = "Your answer: ";
        mine.appendChild(mk);
        mine.appendChild(document.createTextNode(it.chosen.map(function (i) { return q.options[i]; }).join("   |   ") || "(none)"));
        div.appendChild(mine);
      }
      var right = document.createElement("div");
      right.className = "rev-line";
      var rk = document.createElement("span");
      rk.className = "k";
      rk.textContent = "Correct: ";
      right.appendChild(rk);
      right.appendChild(document.createTextNode(q.answer.map(function (i) { return q.options[i]; }).join("   |   ")));
      div.appendChild(right);

      q.options.forEach(function (text, i) {
        var o = document.createElement("div");
        o.className = "rev-opt" + (q.answer.indexOf(i) !== -1 ? " correct" : "") +
          (it.chosen.indexOf(i) !== -1 && q.answer.indexOf(i) === -1 ? " chosen-wrong" : "");
        o.textContent = (q.answer.indexOf(i) !== -1 ? "✔ " : "• ") + (LETTERS[i] || (i + 1)) + ") " + text;
        div.appendChild(o);
      });

      var why = document.createElement("div");
      why.className = "rev-why";
      why.textContent = q.why + "  (" + q.ref + ")";
      div.appendChild(why);
      host.appendChild(div);
    });
  }
  /* =============================== STATS ================================== */
  function renderStats() {
    var hist = store(STORE_KEY) || { attempts: [] };
    var attempts = hist.attempts || [];

    var box = $("#statsSummary");
    if (box) {
      box.innerHTML = "";
      var totalQ = 0, totalC = 0, best = 0;
      attempts.forEach(function (a) {
        totalQ += a.total; totalC += a.correct;
        best = Math.max(best, pct(a.correct, a.total));
      });
      var cards = [
        { n: String(attempts.length), l: "attempts recorded" },
        { n: attempts.length ? best + "%" : "—", l: "best score" },
        { n: totalQ ? pct(totalC, totalQ) + "%" : "—", l: "overall accuracy" },
        { n: String(totalQ), l: "questions answered" }
      ];
      cards.forEach(function (c) {
        var d = document.createElement("div");
        d.className = "stat-box";
        var n = document.createElement("div");
        n.className = "n"; n.textContent = c.n;
        var l = document.createElement("div");
        l.className = "l"; l.textContent = c.l;
        d.appendChild(n); d.appendChild(l);
        box.appendChild(d);
      });
    }

    var acc = topicAccuracyMap();
    var rows = Object.keys(acc).map(function (k) {
      return { key: k, correct: acc[k].correct, total: acc[k].total, pct: pct(acc[k].correct, acc[k].total) };
    }).sort(function (a, b) { return a.pct - b.pct || a.key.localeCompare(b.key); });
    renderBreakdown($("#statsTopics"), rows);

    var html = "";
    attempts.slice(-12).reverse().forEach(function (a) {
      html += "<tr><td>" + esc(new Date(a.ts).toLocaleString()) + "</td><td>" +
        esc(MODES[a.mode] ? MODES[a.mode].label : a.mode) + "</td><td>" +
        pct(a.correct, a.total) + "% (" + a.correct + "/" + a.total + ")</td><td>" +
        a.total + "</td><td>" + esc(fmtDur(a.seconds)) + "</td></tr>";
    });
    var tbody = $("#historyTable tbody");
    if (tbody) tbody.innerHTML = html;
    var empty = $("#historyEmpty");
    if (empty) empty.hidden = attempts.length > 0;
  }

  /* ============================= FLASHCARDS ================================ */
  function buildFlashSelectors() {
    var dSel = $("#flashDeck"), tSel = $("#flashTopic");
    if (dSel) {
      dSel.innerHTML = "<option value='all'>All decks</option>";
      DECKS.forEach(function (d) {
        if (!BANK.some(function (q) { return q.deck === d.id; })) return;
        var o = document.createElement("option");
        o.value = String(d.id);
        o.textContent = "Deck " + d.id + " · " + d.name;
        dSel.appendChild(o);
      });
      dSel.addEventListener("change", function () { buildFlashTopicOptions(); restartFlash(); });
    }
    if (tSel) tSel.addEventListener("change", restartFlash);
    buildFlashTopicOptions();
  }

  function buildFlashTopicOptions() {
    var dSel = $("#flashDeck"), tSel = $("#flashTopic");
    if (!tSel) return;
    var deckVal = dSel ? dSel.value : "all";
    tSel.innerHTML = "<option value='all'>All topics</option>";
    Object.keys(TOPICS).forEach(function (d) {
      if (deckVal !== "all" && String(d) !== String(deckVal)) return;
      TOPICS[d].forEach(function (t) {
        var o = document.createElement("option");
        o.value = topicKey(d, t);
        o.textContent = topicKey(d, t);
        tSel.appendChild(o);
      });
    });
  }

  function restartFlash() {
    var dSel = $("#flashDeck"), tSel = $("#flashTopic");
    var deckVal = dSel ? dSel.value : "all";
    var topicVal = tSel ? tSel.value : "all";
    flash.list = shuffle(BANK.filter(function (q) {
      return (deckVal === "all" || String(q.deck) === String(deckVal)) &&
        (topicVal === "all" || topicKey(q.deck, q.topic) === topicVal);
    }));
    flash.idx = 0; flash.ok = 0; flash.again = 0; flash.flipped = false;
    paintFlash();
    var card = $("#flashCard");
    if (card) card.focus();
  }

  function paintFlash() {
    var front = $("#flashFront"), back = $("#flashBack"), counter = $("#flashCounter");
    if (!front) return;
    if (!flash.list.length) {
      front.textContent = "No cards match that filter. Pick another deck or topic.";
      back.hidden = true;
      if (counter) counter.textContent = "0 / 0";
      return;
    }
    var it = flash.list[flash.idx];
    front.textContent = it.q;
    var answers = it.answer.map(function (i) { return it.options[i]; }).join("   |   ");
    back.innerHTML = "" +
      "<div class='ans'>✔ " + esc(answers) + "</div>" +
      "<div class='muted small' style='margin-bottom:.4rem'>" + esc(deckLabel(it.deck)) + " · " +
      esc(it.topic) + " · " + esc(it.ref) + "</div>" +
      "<div>" + esc(it.why) + "</div>";
    back.hidden = !flash.flipped;
    if (counter) counter.textContent = (flash.idx + 1) + " / " + flash.list.length +
      "  ·  got it " + flash.ok + " ·  again " + flash.again;
  }

  function flipFlash() {
    if (!flash.list.length) return;
    flash.flipped = !flash.flipped;
    paintFlash();
  }
  function gradeFlash(known) {
    if (!flash.list.length) return;
    if (known) flash.ok++; else flash.again++;
    flash.flipped = false;
    flash.idx = (flash.idx + 1) % flash.list.length;
    paintFlash();
  }
  /* ============================= CHEAT SHEET ============================== */
  function renderSheet() {
    var host = $("#sheetBody");
    if (!host) return;
    host.innerHTML = "";
    SHEET.forEach(function (deckBlock, di) {
      var det = document.createElement("details");
      det.className = "sheet-deck";
      if (di === 0) det.open = true;
      var sum = document.createElement("summary");
      sum.textContent = deckBlock.title;
      det.appendChild(sum);
      var body = document.createElement("div");
      body.className = "sheet-body";
      (deckBlock.topics || []).forEach(function (t) {
        var tDet = document.createElement("details");
        tDet.className = "sheet-topic";
        tDet.open = true;
        var tSum = document.createElement("summary");
        tSum.textContent = t.name;
        tDet.appendChild(tSum);
        var ul = document.createElement("ul");
        (t.points || []).forEach(function (pt) {
          var li = document.createElement("li");
          li.textContent = pt;
          ul.appendChild(li);
        });
        tDet.appendChild(ul);
        if (t.trap) {
          var tr = document.createElement("div");
          tr.className = "trap";
          tr.textContent = t.trap;
          tDet.appendChild(tr);
        }
        body.appendChild(tDet);
      });
      det.appendChild(body);
      host.appendChild(det);
    });
  }

  /* ============================== KEYBOARD ================================ */
  function onKeyDown(e) {
    var tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;

    if ($("#view-flash").classList.contains("is-visible")) {
      if (e.code === "Space") { e.preventDefault(); flipFlash(); return; }
      if (e.key === "1") { gradeFlash(false); return; }
      if (e.key === "2") { gradeFlash(true); return; }
      return;
    }
    if (!$("#view-quiz").classList.contains("is-visible")) return;

    var it = session ? currentItem() : null;
    if (!it) return;

    if (/^[1-6]$/.test(e.key)) { e.preventDefault(); chooseOption(Number(e.key) - 1); return; }
    var li = "abcdef".indexOf(String(e.key).toLowerCase());
    if (li !== -1) { e.preventDefault(); chooseOption(li); return; }
    if (e.key === "Enter") {
      e.preventDefault();
      if (it.revealed) nextQuestion();
      else if (MODES[session.mode].feedback) checkAnswer();
      else nextQuestion();
      return;
    }
    if (e.key === "ArrowRight" && MODES[session.mode].navigator) { e.preventDefault(); nextQuestion(); return; }
    if (e.key === "ArrowLeft") { e.preventDefault(); prevQuestion(); return; }
    if (e.key.toLowerCase() === "f" && MODES[session.mode].flags) { e.preventDefault(); toggleFlag(); }
  }

  function bind(sel, fn) {
    var el = $(sel);
    if (el) el.addEventListener("click", fn);
  }
  /* =============================== WIRING ================================= */
  function wire() {
    $$("#tabs .tab").forEach(function (t) {
      t.addEventListener("click", function () {
        var v = t.getAttribute("data-view");
        if (v === "stats") renderStats();
        if (v === "flash" && !flash.list.length) restartFlash();
        showView(v);
      });
    });

    $$("#modeGroup .mode-card").forEach(function (b) {
      b.addEventListener("click", function () {
        prefs.mode = b.getAttribute("data-mode");
        syncChips(); savePrefs();
      });
    });

    $$("[data-all]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (b.getAttribute("data-all") === "deck") prefs.decks = DECKS.map(function (d) { return d.id; });
        else prefs.topics = allTopicKeys();
        syncChips(); savePrefs(); updateSummary();
      });
    });
    $$("[data-none]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (b.getAttribute("data-none") === "deck") prefs.decks = [];
        else prefs.topics = [];
        syncChips(); savePrefs(); updateSummary();
      });
    });

    $$("#typeGroup .chip").forEach(function (b) {
      b.addEventListener("click", function () {
        toggleInArray(prefs.types, b.getAttribute("data-type"));
        syncChips(); savePrefs(); updateSummary();
      });
    });

    var cs = $("#countSelect");
    if (cs) cs.addEventListener("change", function () { prefs.count = Number(cs.value); savePrefs(); });
    var ti = $("#timeInput");
    if (ti) ti.addEventListener("change", function () {
      prefs.timePerQ = Math.max(0.25, Number(ti.value) || 1);
      ti.value = String(prefs.timePerQ);
      savePrefs();
    });
    [["#shuffleQ", "shuffleQ"], ["#shuffleO", "shuffleO"], ["#instantExpl", "instantExpl"]].forEach(function (pair) {
      var el = $(pair[0]);
      if (el) el.addEventListener("click", function () {
        prefs[pair[1]] = !prefs[pair[1]];
        setToggle(pair[0], prefs[pair[1]]);
        savePrefs();
      });
    });

    bind("#startBtn", function () { startQuiz(prefs.mode); });
    bind("#mockBtn", function () { startQuiz("exam", { pool: BANK, count: Math.min(40, BANK.length) }); });

    bind("#checkBtn", checkAnswer);
    bind("#nextBtn", nextQuestion);
    bind("#prevBtn", prevQuestion);
    bind("#skipBtn", skipQuestion);
    bind("#flagBtn", toggleFlag);
    bind("#navBtn", function () { var n = $("#navigator"); n.hidden = !n.hidden; });
    bind("#endBtn", function () {
      if (!session) { showView("home"); return; }
      var left = session.items.filter(function (i) { return i.status === "untouched"; }).length;
      var msg = "End this session now?" + (left ? " " + left + " question(s) are still unanswered and will count as skipped." : "");
      if (window.confirm(msg)) endSession("ended early");
    });

    bind("#retryMissedBtn", function () {
      if (!lastResult) return;
      var missed = lastResult.items.filter(function (i) { return !i.correct; })
        .map(function (i) { return byId[i.q.id] || i.q; });
      if (!missed.length) return;
      startQuiz("practice", { pool: missed, count: 0 });
    });
    bind("#retakeBtn", function () { startQuiz(lastResult ? lastResult.mode : prefs.mode); });
    bind("#homeBtn", function () { showView("home"); });
    [["#filterAll", "all"], ["#filterWrong", "wrong"], ["#filterSkipped", "skipped"]].forEach(function (p) {
      var el = $(p[0]);
      if (el) el.addEventListener("click", function () {
        reviewFilter = p[1];
        ["#filterAll", "#filterWrong", "#filterSkipped"].forEach(function (s) {
          var b = $(s);
          if (b) b.classList.add("ghost");
        });
        el.classList.remove("ghost");
        renderReview();
      });
    });

    bind("#drillWeakBtn", function () { startQuiz("weak"); });
    bind("#resetStatsBtn", function () {
      if (window.confirm("Delete all saved attempts and per-topic accuracy? This cannot be undone.")) {
        drop(STORE_KEY);
        renderStats();
      }
    });

    bind("#flashRestart", restartFlash);
    bind("#flashKnow", function () { gradeFlash(true); });
    bind("#flashAgain", function () { gradeFlash(false); });
    var fc = $("#flashCard");
    if (fc) fc.addEventListener("click", flipFlash);

    bind("#printSheet", function () { window.print(); });
    bind("#expandAll", function () { $$("#sheetBody details").forEach(function (d) { d.open = true; }); });
    bind("#collapseAll", function () { $$("#sheetBody details").forEach(function (d) { d.open = false; }); });

    document.addEventListener("keydown", onKeyDown);
  }

  /* ================================= INIT ================================= */
  function init() {
    prepareBank();
    loadPrefs();
    initTheme();
    buildDeckChips();
    buildTopicChips();
    syncChips();
    updateSummary();
    buildFlashSelectors();
    renderSheet();
    renderStats();
    wire();
    offerResume();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();


