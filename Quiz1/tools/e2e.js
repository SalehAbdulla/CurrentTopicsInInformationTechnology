/* Headless end-to-end test for the IT7013 Quiz 1 Trainer (OPTIONAL dev tool).
 *
 * It loads the real index.html + app.js inside jsdom and drives the whole UI:
 * setup filters, practice run to 100%, results/review, exam simulation,
 * navigator + flagging, progress stats, flashcards, weak drill and
 * resume-after-reload.
 *
 * jsdom is NOT a project dependency. To run it:
 *     cd Quiz1
 *     npm install jsdom --no-save        # or: npm i -g jsdom and set NODE_PATH
 *     node tools/e2e.js
 *
 * Expected output: "ALL E2E CHECKS PASSED ✓" (102 checks).
 */
const path = require("path");
const { JSDOM, VirtualConsole } = require("jsdom");

const APP = path.join(__dirname, "..");
const vc = new VirtualConsole();
const errors = [];
vc.on("jsdomError", (e) => errors.push("jsdomError: " + e.message));
vc.on("error", (m) => errors.push("console.error: " + m));

const fails = [];
const oks = [];
function check(label, cond, extra) {
  if (cond) oks.push("  ok  " + label);
  else fails.push("  FAIL " + label + (extra ? " -> " + extra : ""));
}
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async function main() {
  const dom = await JSDOM.fromFile(path.join(APP, "index.html"), {
    runScripts: "dangerously",
    resources: "usable",
    pretendToBeVisual: true,
    virtualConsole: vc,
    beforeParse(win) {
      const map = new Map();
      const shim = {
        getItem: (k) => (map.has(String(k)) ? map.get(String(k)) : null),
        setItem: (k, v) => { map.set(String(k), String(v)); },
        removeItem: (k) => { map.delete(String(k)); },
        clear: () => map.clear(),
        key: (i) => Array.from(map.keys())[i] || null,
        get length() { return map.size; }
      };
      Object.defineProperty(win, "localStorage", { value: shim, configurable: true });
      win.__storeRaw = map;
    }
  });
  const { window } = dom;
  const doc = window.document;
  const $ = (s) => doc.querySelector(s);
  const $$ = (s) => Array.prototype.slice.call(doc.querySelectorAll(s));
  const click = (el) => { if (!el) throw new Error("click on missing element"); el.dispatchEvent(new window.MouseEvent("click", { bubbles: true, cancelable: true })); };

  if (doc.readyState !== "complete") await new Promise((r) => window.addEventListener("load", r));
  await wait(300);

  const BANK = window.QUESTION_BANK || [];
  check("question bank loaded (186 questions)", BANK.length === 186, "got " + BANK.length);
  check("cheat sheet data loaded", Array.isArray(window.CHEAT_SHEET) && window.CHEAT_SHEET.length === 4);

  /* ---------------------------- static build ---------------------------- */
  check("4 deck chips rendered", $$("#deckGroup .chip").length === 4, "got " + $$("#deckGroup .chip").length);
  check("24 topic chips rendered", $$("#topicGroup .chip").length === 24, "got " + $$("#topicGroup .chip").length);
  check("bank summary mentions the bank size", /186 questions/.test($("#bankSummary").textContent),
    $("#bankSummary").textContent);
  check("cheat sheet has 4 deck blocks", $$("#sheetBody details.sheet-deck").length === 4);
  check("cheat sheet has topic sections", $$("#sheetBody details.sheet-topic").length >= 15,
    "got " + $$("#sheetBody details.sheet-topic").length);
  check("flashcard deck selector built", $$("#flashDeck option").length === 5,
    "got " + $$("#flashDeck option").length);
  check("flashcard topic selector built", $$("#flashTopic option").length > 20,
    "got " + $$("#flashTopic option").length);

  const atZero = BANK.filter((q) => q.answer.indexOf(0) !== -1).length;
  check("raw bank stores many answers at index 0 (so the shuffle matters)", atZero > BANK.length * 0.5,
    atZero + "/" + BANK.length);

  /* ---------------------------- tab switching --------------------------- */
  click($$("#tabs .tab")[2]);
  await wait(50);
  check("cheat sheet tab becomes visible", $("#view-sheet").classList.contains("is-visible"));
  click($$("#tabs .tab")[3]);
  await wait(50);
  check("progress tab becomes visible", $("#view-stats").classList.contains("is-visible"));
  check("progress tab starts with empty history", !$("#historyEmpty").hidden);
  click($$("#tabs .tab")[0]);
  await wait(50);

  /* ------------------------- flashcards mode ---------------------------- */
  click($$("#tabs .tab")[1]);
  await wait(50);
  click($("#flashRestart"));
  await wait(50);
  check("flashcard front shows a question", $("#flashFront").textContent.length > 15,
    $("#flashFront").textContent.slice(0, 60));
  check("flashcard back hidden until flip", $("#flashBack").hidden === true);
  click($("#flashCard"));
  await wait(20);
  check("clicking flips the card", $("#flashBack").hidden === false);
  check("flashcard back shows the answer", $("#flashBack").textContent.indexOf("✔") !== -1);
  click($("#flashKnow"));
  await wait(20);
  check("grading advances the deck", /got it 1/.test($("#flashCounter").textContent),
    $("#flashCounter").textContent);
  click($$("#tabs .tab")[0]);
  await wait(50);
  /* --------------------------- practice session -------------------------- */
  function correctIndexes(questionText) {
    const q = BANK.filter((x) => x.q === questionText)[0];
    return q ? q.answer.slice() : null;
  }

  $("#countSelect").value = "10";
  $("#countSelect").dispatchEvent(new window.Event("change", { bubbles: true }));
  click($("#startBtn"));
  await wait(80);
  check("practice session shows the quiz view", $("#view-quiz").classList.contains("is-visible"));
  check("mode pill says Practice", $("#qMode").textContent === "Practice", $("#qMode").textContent);
  check("respects the chosen question count", /\/ 10$/.test($("#qCounter").textContent), $("#qCounter").textContent);
  check("timer visible in practice", $("#qTimer").hidden === false);
  check("score pill visible in practice", $("#qScore").hidden === false);

  const correctPositions = [];
  for (let i = 0; i < 10; i++) {
    const qText = $("#qText").textContent;
    const bankQ = BANK.filter((x) => x.q === qText)[0];
    check("Q" + (i + 1) + " found in bank", !!bankQ, qText.slice(0, 60));
    const opts = $$("#qOptions .opt");
    const optText = (o) => o.children[o.children.length - 1].textContent;
    const correctTexts = bankQ.answer.map((ix) => bankQ.options[ix]);
    const domIdx = opts.map((o, n) => (correctTexts.indexOf(optText(o)) !== -1 ? n : -1)).filter((n) => n !== -1);
    check("Q" + (i + 1) + " renders the same number of correct options",
      domIdx.length === bankQ.answer.length, domIdx.length + " vs " + bankQ.answer.length);
    correctPositions.push(domIdx[0]);
    domIdx.forEach((n) => click(opts[n]));
    click($("#checkBtn"));
    await wait(20);
    const fb = $("#qFeedback");
    check("Q" + (i + 1) + " graded correct", fb.textContent.indexOf("Correct") !== -1, fb.textContent.slice(0, 90));
    check("Q" + (i + 1) + " shows a slide reference", /Deck \d/.test(fb.textContent));
    click($("#nextBtn"));
    await wait(30);
  }
  check("correct answers appear in varied on-screen positions",
    new Set(correctPositions).size > 1, "positions seen: " + correctPositions.join(","));

  await wait(60);
  check("results view shown after finishing", $("#view-results").classList.contains("is-visible"));
  check("perfect score recorded", $("#scorePct").textContent === "100%", $("#scorePct").textContent);
  check("verdict celebrates full-mark readiness", /Full-mark ready/.test($("#verdict").textContent),
    $("#verdict").textContent);
  check("deck breakdown rendered", $$("#deckBreakdown .bd-row").length >= 1);
  check("topic breakdown rendered", $$("#topicBreakdown .bd-row").length >= 1);
  check("review list has 10 entries", $$("#reviewList .rev-item").length === 10,
    "got " + $$("#reviewList .rev-item").length);
  check("attempt saved to history", !!window.localStorage.getItem("it7013.quiz1.history.v1"));
  check("finished session cleared (no bogus resume card)",
    !window.localStorage.getItem("it7013.quiz1.session.v1"));

  click($("#filterWrong"));
  await wait(30);
  check("'wrong only' filter is empty after a perfect run", /Nothing to show/.test($("#reviewList").textContent));
  click($("#filterAll"));
  await wait(30);
  check("'all' filter restores the list", $$("#reviewList .rev-item").length === 10);

  /* ------------------------- exam simulation flow ----------------------- */
  window.confirm = () => true;
  click($("#homeBtn"));
  await wait(50);
  click($("#mockBtn"));
  await wait(80);
  check("mock exam starts", $("#view-quiz").classList.contains("is-visible"));
  check("exam timer is counting", /⏱/.test($("#qTimer").textContent), $("#qTimer").textContent);
  check("exam shows the navigator button", $("#navBtn").hidden === false);
  check("exam shows the flag button", $("#flagBtn").hidden === false);
  check("exam hides Check (no instant feedback)", $("#checkBtn").hidden === true);
  check("exam hides the practice score pill", $("#qScore").hidden === true);
  click($("#navBtn"));
  await wait(20);
  check("navigator renders every question", $$("#navGrid button").length === 40,
    "got " + $$("#navGrid button").length);
  click($$("#qOptions .opt")[0]);
  await wait(20);
  click($("#flagBtn"));
  await wait(20);
  check("answering marks the navigator cell", $$("#navGrid button.answered").length === 1,
    "got " + $$("#navGrid button.answered").length);
  check("flagging marks the navigator cell", $$("#navGrid button.flagged").length === 1);
  click($$("#navGrid button")[6]);
  await wait(30);
  check("navigator jumps to question 7", /^7 \/ 40$/.test($("#qCounter").textContent), $("#qCounter").textContent);
  click($("#endBtn"));
  await wait(80);
  check("ending early shows the results screen", $("#view-results").classList.contains("is-visible"));
  check("skips are reported", /skipped/.test($("#resultMeta").textContent), $("#resultMeta").textContent);

  /* ------------------------------ progress ------------------------------ */
  click($$("#tabs .tab")[3]);
  await wait(50);
  check("progress lists both attempts", $("#historyTable tbody").children.length === 2,
    "got " + $("#historyTable tbody").children.length);
  check("progress shows per-topic accuracy", $$("#statsTopics .bd-row").length >= 5,
    "got " + $$("#statsTopics .bd-row").length);

  /* --------------------------- weak drill mode -------------------------- */
  click($("#drillWeakBtn"));
  await wait(80);
  check("weak-points drill starts", $("#view-quiz").classList.contains("is-visible"));
  check("weak drill is labelled in the UI", $("#qMode").textContent === "Weak points", $("#qMode").textContent);

  /* ------------- regression: multi-select questions in exam mode ---------- */
  // Bug guard: "select all that apply" items used to stay 'untouched' in exam
  // mode, so a fully correct answer was scored as skipped (= 0 marks).
  click($("#homeBtn"));
  await wait(50);
  click($$("#modeGroup .mode-card")[1]);            // Exam simulation
  await wait(30);
  const typeChips = $$("#typeGroup .chip");
  click(typeChips[0]);                              // MCQs off
  await wait(20);
  click(typeChips[1]);                              // True/False off
  await wait(20);
  check("type filter now targets multi-select only",
    !typeChips[0].classList.contains("is-on") && !typeChips[1].classList.contains("is-on") &&
    typeChips[2].classList.contains("is-on"));
  $("#countSelect").value = "10";                   // note: 5 is not an option (0 = all)
  $("#countSelect").dispatchEvent(new window.Event("change", { bubbles: true }));
  click($("#startBtn"));
  await wait(70);
  check("exam mode starts from the type filter", $("#qMode").textContent === "Exam simulation",
    $("#qMode").textContent);
  check("multi-only exam queues the requested count", /\/ 10$/.test($("#qCounter").textContent),
    $("#qCounter").textContent);
  for (let i = 0; i < 10; i++) {
    check("multi-exam Q" + (i + 1) + " is a multi-select item",
      $("#qType").textContent === "Select all that apply", $("#qType").textContent);
    const bankQ = BANK.filter((x) => x.q === $("#qText").textContent)[0];
    const opts = $$("#qOptions .opt");
    const optText = (o) => o.children[o.children.length - 1].textContent;
    const texts = bankQ.answer.map((ix) => bankQ.options[ix]);
    opts.forEach((o, n) => { if (texts.indexOf(optText(o)) !== -1) click(o); });
    await wait(20);
    check("multi-exam Q" + (i + 1) + " is registered as answered",
      $$("#navGrid button.answered").length === i + 1,
      "answered cells: " + $$("#navGrid button.answered").length);
    click($("#nextBtn"));
    await wait(30);
  }
  await wait(60);
  check("multi-select exam submits to the results screen", $("#view-results").classList.contains("is-visible"));
  check("a fully correct multi-select exam scores 100%", $("#scorePct").textContent === "100%",
    $("#scorePct").textContent);
  check("no multi-select answer is counted as skipped", / 0 skipped/.test($("#resultMeta").textContent),
    $("#resultMeta").textContent);
  // restore the type filters for later sections
  click($("#homeBtn"));
  await wait(40);
  click($$("#typeGroup .chip")[0]);
  await wait(20);
  click($$("#typeGroup .chip")[1]);
  await wait(20);
  click($$("#modeGroup .mode-card")[0]);            // back to Practice
  await wait(30);

  /* ---------------------------- resume session -------------------------- */
  click($("#homeBtn"));
  await wait(50);
  $("#countSelect").value = "10";
  $("#countSelect").dispatchEvent(new window.Event("change", { bubbles: true }));
  click($("#startBtn"));
  await wait(60);
  // answer just the first question, then read what was written to storage
  await (async function () {
    const bankQ = BANK.filter((x) => x.q === $("#qText").textContent)[0];
    const opts = $$("#qOptions .opt");
    const optText = (o) => o.children[o.children.length - 1].textContent;
    const texts = bankQ.answer.map((ix) => bankQ.options[ix]);
    opts.forEach((o, n) => { if (texts.indexOf(optText(o)) !== -1) click(o); });
    click($("#checkBtn"));
    await wait(30);
    click($("#nextBtn"));   // practice mode advances only via Next
    await wait(30);
  })();
  await wait(40);
  const savedSession = window.__storeRaw.get("it7013.quiz1.session.v1");
  check("an in-progress session is persisted", !!savedSession, String(savedSession).slice(0, 60));

  const dom2 = await JSDOM.fromFile(path.join(APP, "index.html"), {
    runScripts: "dangerously",
    resources: "usable",
    pretendToBeVisual: true,
    virtualConsole: vc,
    beforeParse(win) {
      const map = new Map();
      map.set("it7013.quiz1.session.v1", savedSession);
      const shim = {
        getItem: (k) => (map.has(String(k)) ? map.get(String(k)) : null),
        setItem: (k, v) => { map.set(String(k), String(v)); },
        removeItem: (k) => { map.delete(String(k)); },
        clear: () => map.clear(),
        key: (i) => Array.from(map.keys())[i] || null,
        get length() { return map.size; }
      };
      Object.defineProperty(win, "localStorage", { value: shim, configurable: true });
      win.__storeRaw = map;
    }
  });
  const d2 = dom2.window.document;
  await wait(300);
  const q2 = (s) => d2.querySelector(s);
  check("reload offers to resume the unfinished session", q2("#resumeCard").hidden === false);
  check("resume card names the position", /question 2 of 10/.test(q2("#resumeMeta").textContent),
    q2("#resumeMeta").textContent);
  q2("#resumeBtn").dispatchEvent(new dom2.window.MouseEvent("click", { bubbles: true }));
  await wait(60);
  check("resuming reopens the quiz view", q2("#view-quiz").classList.contains("is-visible"));
  check("resume restores the exact position", /^2 \/ 10$/.test(q2("#qCounter").textContent),
    q2("#qCounter").textContent);
  check("resume lands on an untouched question (no stale feedback)",
    q2("#qFeedback").hidden === true);
  check("resume keeps the running score", /Score 1 \/ 1/.test(q2("#qScore").textContent),
    q2("#qScore").textContent);
  // going back must restore the previously graded question exactly
  check("back button is offered after the first question", q2("#prevBtn").hidden === false);
  q2("#prevBtn").dispatchEvent(new dom2.window.MouseEvent("click", { bubbles: true }));
  await wait(40);
  check("back returns to question 1", /^1 \/ 10$/.test(q2("#qCounter").textContent),
    q2("#qCounter").textContent);
  check("previously graded question still shows its verdict",
    q2("#qFeedback").hidden === false && /Correct/.test(q2("#qFeedback").textContent),
    q2("#qFeedback").textContent.slice(0, 60));
  check("previously correct option is still highlighted",
    Array.prototype.slice.call(d2.querySelectorAll("#qOptions .opt.is-correct")).length >= 1);
  check("first question offers no back button", q2("#prevBtn").hidden === true);

  /* -------------------------------- report ------------------------------ */
  const realErrors = errors.filter((e) => !/scrollTo/.test(e));
  console.log("\n=== E2E RESULTS ===");
  console.log(oks.length + " checks passed");
  if (realErrors.length) {
    console.log("\n--- unexpected runtime errors (" + realErrors.length + ") ---");
    realErrors.slice(0, 12).forEach((e) => console.log("  ! " + e));
  }
  if (fails.length) {
    console.log("\n--- FAILURES (" + fails.length + ") ---");
    fails.forEach((f) => console.log(f));
    process.exit(1);
  }
  console.log("\nALL E2E CHECKS PASSED ✓");
  process.exit(0);

})().catch((e) => {
  console.error("harness crashed:", e && e.stack ? e.stack : e);
  try {
    if (typeof oks !== "undefined" && oks.length) {
      console.error("\n--- checks that passed before the crash (" + oks.length + ") ---");
      oks.forEach((o) => console.error(o));
    }
    if (typeof fails !== "undefined" && fails.length) {
      console.error("\n--- recorded failures ---");
      fails.forEach((f) => console.error(f));
    }
    if (typeof errors !== "undefined" && errors.length) {
      console.error("\n--- runtime errors (" + errors.length + ") ---");
      errors.slice(0, 15).forEach((x) => console.error("  ! " + x));
    }
  } catch (x) { /* ignore */ }
  process.exit(1);
});
