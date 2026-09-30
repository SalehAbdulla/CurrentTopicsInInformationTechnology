/* ============================================================================
 * tools/validate.js — machine-checks the question bank.
 * Run from the Quiz1 folder:   node tools/validate.js
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
