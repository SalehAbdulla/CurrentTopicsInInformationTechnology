/* ============================================================================
 * tools/validate.js — machine-checks the question bank.
 * Run from the docs folder:   node tools/validate.js
 * ========================================================================== */

const path = require("path");
const fs = require("fs");

// questions.js assigns to `window`, so provide a minimal shim.
global.window = {};
require(path.join(__dirname, "..", "questions.js"));

const BANK = global.window.QUESTION_BANK;
const TOPICS = global.window.TOPICS;
const TYPES = ["mcq", "tf", "multi"];
const DIFFS = ["easy", "medium", "hard"];

const errors = [];
const warnings = [];
const seenIds = new Map();
const seenText = new Map();
const stats = { total: BANK.length, byDeck: {}, byTopic: {}, byType: {}, byDiff: {} };

const bump = (obj, key) => { obj[key] = (obj[key] || 0) + 1; };
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();

BANK.forEach((q, i) => {
  const tag = `#${i + 1} (${q && q.id ? q.id : "NO ID"})`;
  const fail = (m) => errors.push(`${tag}: ${m}`);

  if (!q || typeof q !== "object") return fail("not an object");
  if (!q.id || typeof q.id !== "string") fail("missing/invalid id");
  else if (seenIds.has(q.id)) fail(`duplicate id (also used by #${seenIds.get(q.id)})`);
  else seenIds.set(q.id, i + 1);

  if (!TOPICS[q.deck]) fail(`unknown deck: ${q.deck}`);
  else if (!TOPICS[q.deck].includes(q.topic)) fail(`topic "${q.topic}" not in TOPICS[${q.deck}]`);

  if (!TYPES.includes(q.type)) fail(`invalid type "${q.type}"`);
  if (!DIFFS.includes(q.diff)) fail(`invalid diff "${q.diff}"`);

  if (typeof q.q !== "string" || q.q.trim().length < 12) fail("question text missing/too short");
  else {
    const key = norm(q.q);
    if (seenText.has(key)) fail(`duplicate question text (also #${seenText.get(key)})`);
    else seenText.set(key, i + 1);
  }

  if (!Array.isArray(q.options) || q.options.length < 2) fail("needs >= 2 options");
  else {
    const optNorm = q.options.map(norm);
    optNorm.forEach((o, idx) => {
      if (!o) fail(`empty option at index ${idx}`);
      if (optNorm.indexOf(o) !== idx) fail(`duplicate option text at index ${idx}: "${q.options[idx]}"`);
    });
  }

  if (!Array.isArray(q.answer) || q.answer.length === 0) fail("answer must be a non-empty array");
  else {
    const uniq = new Set(q.answer);
    if (uniq.size !== q.answer.length) fail("answer contains duplicate indices");
    q.answer.forEach((a) => {
      if (!Number.isInteger(a) || a < 0 || a >= q.options.length) fail(`answer index ${a} out of range`);
    });
    if (q.answer.length === q.options.length) fail("every option is correct — question is vacuous");
  }

  // Type-specific rules
  if (q.type === "tf") {
    const o = q.options || [];
    if (o.length !== 2 || o[0] !== "True" || o[1] !== "False")
      fail('tf questions must have options exactly ["True","False"]');
    if (!q.answer || q.answer.length !== 1) fail("tf must have exactly one correct answer");
  }
  if (q.type === "mcq" && q.answer && q.answer.length !== 1)
    fail("mcq must have exactly one correct answer (use type 'multi' for multiple)");
  if (q.type === "multi") {
    if (q.answer && q.answer.length < 2) fail("multi should have >= 2 correct answers");
    if (q.answer && q.options && q.answer.length === q.options.length)
      fail("multi needs at least one wrong option");
    if (typeof q.q === "string" && !/select all that apply/i.test(q.q))
      warnings.push(`${tag}: multi-select question does not say "Select all that apply"`);
  }

  if (typeof q.why !== "string" || q.why.trim().length < 15) fail("explanation 'why' missing/too short");
  if (typeof q.ref !== "string" || !/^(Deck|Decks|Slides)/.test(q.ref)) fail(`invalid 'ref': ${q.ref}`);

  bump(stats.byDeck, q.deck);
  bump(stats.byTopic, q.deck + " · " + q.topic);
  bump(stats.byType, q.type);
  bump(stats.byDiff, q.diff);
});

// Topics declared but never used?
Object.keys(TOPICS).forEach((deck) => {
  TOPICS[deck].forEach((t) => {
    if (!stats.byTopic[deck + " · " + t]) warnings.push(`TOPICS declares unused topic: deck ${deck} · "${t}"`);
  });
});

/* ------------------- answer-distribution lint ("tells") ------------------- */
/* If the correct option is consistently the longest, or a true/false item almost
 * always answers "True", or every multi-select is "all but one is correct", the
 * bank can be beaten by exam technique instead of knowledge — and practice
 * scores stop predicting the real quiz. These thresholds keep it honest. */
const LIMITS = {
  zeroRatio2: true,             // never: correct option >= 2x the longest distractor
  medianRatioMax: 1.15,         // typical correct:distractor word ratio
  shareRatio15Max: 0.20,        // share of MCQs whose ratio is >= 1.5
  uniqueLongestShareMax: 0.55,  // share where the correct option is strictly the longest
  tfTrueMin: 0.40,
  tfTrueMax: 0.60,
  multiAllButOneMax: 0.50
};

const wc = (s) => String(s).trim().split(/\s+/).length;
const mcqAll = BANK.filter((q) => q.type === "mcq");
const ratios = [];
let uniqueLongest = 0;
mcqAll.forEach((q) => {
  const cl = wc(q.options[q.answer[0]]);
  const dl = q.options.filter((_, i) => i !== q.answer[0]).map(wc);
  const maxD = Math.max.apply(null, dl);
  ratios.push(cl / maxD);
  if (cl > maxD) uniqueLongest++;
});
const ratioSorted = ratios.slice().sort((a, b) => a - b);
const medianRatio = ratioSorted.length
  ? (ratioSorted.length % 2
    ? ratioSorted[(ratioSorted.length - 1) / 2]
    : (ratioSorted[ratioSorted.length / 2 - 1] + ratioSorted[ratioSorted.length / 2]) / 2)
  : 0;
const shareOf = (n, d) => (d ? n / d : 0);
const shareRatio15 = shareOf(ratios.filter((r) => r >= 1.5).length, ratios.length);
const shareRatio2 = shareOf(ratios.filter((r) => r >= 2).length, ratios.length);
const uniqueLongestShare = shareOf(uniqueLongest, mcqAll.length);

const tfAll = BANK.filter((q) => q.type === "tf");
const tfTrueShare = shareOf(tfAll.filter((q) => q.answer[0] === 0).length, tfAll.length);

const multiAll = BANK.filter((q) => q.type === "multi");
const allButOneShare = shareOf(multiAll.filter((q) => q.answer.length === q.options.length - 1).length, multiAll.length);

const bannedPhrase = /all of the above|none of the above|both a and b/i;
const bannedHits = BANK.filter((q) => q.options.some((o) => bannedPhrase.test(o)));
const absoluteHits = BANK.filter((q) => q.options.some((o) => /(never|always|guarantee)/i.test(o)));

const pctStr = (v) => (v * 100).toFixed(1) + "%";
console.log("\n=== Answer-distribution lint (exam-technique tells) ===");
console.log(`  mcq length ratio (correct : longest distractor)`);
console.log(`      median ............ ${medianRatio.toFixed(2)}   (limit <= ${LIMITS.medianRatioMax})`);
console.log(`      share >= 1.5 ...... ${pctStr(shareRatio15)}   (limit <= ${pctStr(LIMITS.shareRatio15Max)})`);
console.log(`      share >= 2.0 ...... ${pctStr(shareRatio2)}   (limit = 0%)`);
console.log(`  correct option strictly the longest: ${uniqueLongest}/${mcqAll.length} = ${pctStr(uniqueLongestShare)}   (limit <= ${pctStr(LIMITS.uniqueLongestShareMax)})`);
console.log(`  true/false answering "True": ${tfAll.filter((q) => q.answer[0] === 0).length}/${tfAll.length} = ${pctStr(tfTrueShare)}   (limit ${pctStr(LIMITS.tfTrueMin)}-${pctStr(LIMITS.tfTrueMax)})`);
console.log(`  multi-select shaped "all but one correct": ${pctStr(allButOneShare)}   (limit <= ${pctStr(LIMITS.multiAllButOneMax)})`);
console.log(`  "all/none of the above" options: ${bannedHits.length}   (limit = 0)`);
console.log(`  absolute-language options (never/always/guarantee): ${absoluteHits.length}   (informational)`);

if (shareRatio2 > 0) {
  errors.push(`tell-lint: ${Math.round(shareRatio2 * mcqAll.length)} mcq(s) have a correct option at least twice as long as every distractor — rewrite those distractors (limit 0)`);
}
if (medianRatio > LIMITS.medianRatioMax) {
  errors.push(`tell-lint: median correct:distractor length ratio is ${medianRatio.toFixed(2)} (limit ${LIMITS.medianRatioMax})`);
}
if (shareRatio15 > LIMITS.shareRatio15Max) {
  errors.push(`tell-lint: ${pctStr(shareRatio15)} of mcqs have a length ratio >= 1.5 (limit ${pctStr(LIMITS.shareRatio15Max)})`);
}
if (uniqueLongestShare > LIMITS.uniqueLongestShareMax) {
  errors.push(`tell-lint: the correct option is strictly the longest in ${pctStr(uniqueLongestShare)} of mcqs (limit ${pctStr(LIMITS.uniqueLongestShareMax)})`);
}
if (tfTrueShare < LIMITS.tfTrueMin || tfTrueShare > LIMITS.tfTrueMax) {
  errors.push(`tell-lint: true/false answers are ${pctStr(tfTrueShare)} "True" — rebalance to ${pctStr(LIMITS.tfTrueMin)}-${pctStr(LIMITS.tfTrueMax)}`);
}
if (allButOneShare > LIMITS.multiAllButOneMax) {
  errors.push(`tell-lint: ${pctStr(allButOneShare)} of multi-select items are shaped "all but one correct" (limit ${pctStr(LIMITS.multiAllButOneMax)})`);
}
if (bannedHits.length) {
  errors.push(`tell-lint: "all/none of the above" options are not allowed: ${bannedHits.map((q) => q.id).join(", ")}`);
}
if (absoluteHits.length > BANK.length * 0.12) {
  warnings.push(`${absoluteHits.length} items contain absolute-language options (never/always/guarantee) — review they are not signalling the answer`);
}

/* --------------------------------- report --------------------------------- */
console.log("=== IT7013 Quiz 1 Trainer — question bank validation ===");
console.log(`Total questions: ${stats.total}`);
console.log("\nPer deck:");
Object.keys(stats.byDeck).sort().forEach((d) => console.log(`  Deck ${d}: ${stats.byDeck[d]}`));
console.log("\nPer type:");
Object.keys(stats.byType).forEach((t) => console.log(`  ${t}: ${stats.byType[t]}`));
console.log("\nPer difficulty:");
Object.keys(stats.byDiff).forEach((d) => console.log(`  ${d}: ${stats.byDiff[d]}`));
console.log("\nPer topic:");
Object.keys(stats.byTopic)
  .sort()
  .forEach((t) => console.log(`  ${t}: ${stats.byTopic[t]}`));

if (warnings.length) {
  console.log(`\n--- WARNINGS (${warnings.length}) ---`);
  warnings.forEach((w) => console.log("  ! " + w));
}
if (errors.length) {
  console.log(`\n--- ERRORS (${errors.length}) ---`);
  errors.forEach((e) => console.log("  x " + e));
  console.log("\nVALIDATION FAILED");
  process.exit(1);
}
console.log("\nALL CHECKS PASSED ✓");
