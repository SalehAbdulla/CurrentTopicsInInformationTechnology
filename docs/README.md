# IT7013 · Quiz 1 Trainer — Ethical AI 1, 2 & 3

> **Live version (share this link):** <https://salehabdulla.github.io/CurrentTopicsInInformationTechnology/>
> — nothing to install, works on a phone, and your results stay in your own browser.

An offline, zero-dependency study app for **IT7013 Current Topics in IT — Quiz 1** (on campus, week starting **Sunday 4 October 2026**), covering the three slide decks:

| Deck | File | Topics covered |
|---|---|---|
| 1 | `IT7013 Ethical AI -1.pdf` | AI ethics, bias sources, the CV-screening case study, EU AI Act risk levels, mitigation & bias tools |
| 2 | `IT7013 Ethical AI -2.pdf` | Fairness criteria & worked examples, Principles A–H, transparency, Explainable AI (LIME/SHAP/PDP/counterfactuals) |
| 3 | `IT7013 Ethical AI -3 (1).pdf` | Privacy risks & best practices, AI governance, ISO/IEC 42001 |

---

## Quick start

**Option A — open it locally**

Double-click `docs/index.html` (or right-click → Open With → your browser). Everything runs locally, nothing is uploaded, and no internet connection is needed.

**Option B — serve it locally** (recommended if your browser restricts storage on `file://`)

```bash
cd docs
python3 -m http.server 8000
# then open http://localhost:8000
```

Progress (attempts, per-topic accuracy, preferences, unfinished session) is kept in the browser's `localStorage` under the `it7013.quiz1.*` keys.

---

## Files

```
docs/                      ← this folder is the GitHub Pages site
├─ index.html      # app shell — Start / Quiz / Results / Flashcards / Cheat sheet / Progress
├─ styles.css      # dark + light theme, responsive layout, print styles
├─ questions.js    # the question bank (186 questions) + cheat-sheet content  ← the data
├─ app.js          # the engine: modes, grading, shuffling, timer, storage
├─ README.md       # this file
├─ .nojekyll       # serve assets as-is on GitHub Pages
└─ tools/
   ├─ validate.js        # machine-checks the bank (no dependencies)
   ├─ structure-check.js # verifies index.html ↔ app.js wiring (no dependencies)
   └─ e2e.js             # optional headless UI test (needs jsdom, see bottom)
```

The lecture PDFs sit next to this folder in the repository working copy. They are listed in `.gitignore`, so they are never committed and never published — only the trainer is.


---

## The four study modes

| Mode | Behaviour | When to use it |
|---|---|---|
| **Practice** | Instant grading after each question, full explanation + slide reference, running score. | First pass over a deck. |
| **Exam simulation** | Timed, answers hidden until you submit, question navigator, flag-for-review. | Rehearse campus conditions. |
| **Weak points** | Orders questions so your lowest-accuracy topics come first (unseen topics count as weakest). | After 2–3 practice runs. |
| **Lightning** | 10 random questions in 5 minutes. | Daily warm-up in quiz week. |

Extras: filter by **deck**, **topic** and **question type**; choose how many questions; shuffle questions/options; light & dark theme; **Cheat sheet** tab (printable); **Flashcards** tab; **Progress** tab with per-topic accuracy and attempt history.

### Keyboard shortcuts

| Key | Action |
|---|---|
| `1`–`6` or `A`–`F` | Select an option |
| `Enter` | Check the answer (practice) / move on |
| `←` `→` | Previous / next question |
| `F` | Flag the current question (exam mode) |
| `Space` | Flip a flashcard |
| `1` / `2` | Flashcard: again / got it |

---

## Question bank

**186 questions** — 123 multiple choice, 27 true/false, 36 "select all that apply" — distributed as:

| Deck | Questions |
|---|---|
| 1 · Ethical AI -1 | 52 |
| 2 · Ethical AI -2 | 61 |
| 3 · Ethical AI -3 | 57 |
| 0 · Cross-deck synthesis & trap pairs | 16 |

Every question carries an explanation (`why`) and a slide reference (`ref`, e.g. *Deck 2 · slide 5*) so any claim can be checked against the original PDFs. Re-run the validator after any edit:

```bash
cd docs
node tools/validate.js         # question bank integrity  → "ALL CHECKS PASSED ✓"
node tools/structure-check.js  # index.html ↔ app.js wiring → "STRUCTURE CHECK PASSED ✓"
```

It checks: unique ids, valid deck/topic/type/difficulty, answer indices in range, `tf` options exactly `True/False`, exactly one answer for `mcq`, at least two (but not all) for `multi`, non-empty explanations and references, no duplicated question text or options — and it prints the full distribution.

### Keeping the bank honest (the "tell" lint)

A bank whose correct option is conspicuously longer than its distractors, or where "True" is almost always the answer, or where every multi-select item is "all but one correct", can be beaten by exam technique instead of knowledge — and then a practice score stops predicting the real quiz. `validate.js` now **fails** if any of these drift out of range:

| Check | Limit | Current |
|---|---|---|
| questions where the correct option is ≥2× the longest distractor | 0 | **0** |
| median correct : distractor word ratio | ≤ 1.15 | **1.00** |
| questions with a length ratio ≥ 1.5 | ≤ 20% | **9.8%** |
| questions where the correct option is strictly the longest | ≤ 55% | **42.3%** |
| true/false items answering "True" | 40–60% | **48.1%** |
| multi-select items shaped "all but one correct" | ≤ 50% | **0%** |
| "all / none of the above" options | 0 | **0** |

When you add or edit a question, write each distractor so it is **comparable in length and specificity** to the correct answer — aim to straddle it (one slightly longer, one about equal, one slightly shorter) so length carries no signal in either direction. Keep true/false answers unpredictable, and give multi-select items at least two genuinely tempting wrong options.

### Adding or editing questions

Append to the relevant `addQuestions([...])` block in `questions.js`:

```js
{
  id: "d1-xyz-01",              // unique
  deck: 1,                      // 0 = cross-deck, 1..3 = the slide decks
  topic: "Sources of bias",     // must exist in window.TOPICS[deck]
  type: "mcq",                  // "mcq" | "tf" | "multi"
  diff: "medium",               // "easy" | "medium" | "hard"
  q: "The question text?",
  options: ["Correct option", "Distractor", "Distractor", "Distractor"],
  answer: [0],                  // indices of the correct option(s)
  why: "Why that is correct, in the course's own terms.",
  ref: "Deck 1 · slide 14"
}
```

New topics must be registered in `window.TOPICS` (top of `questions.js`) — the deck and topic filters are generated from it automatically.

> The bank stores many answers at index 0 for readability. The app **permutes each question's options once per page load** and remaps the answer indices, so position never leaks in the UI.

---

## Suggested study plan (quiz week)

Today is Wed 30 Sep 2026; the quiz falls in the week beginning Sun 4 Oct 2026.

| Day | What to do | Target |
|---|---|---|
| **Wed 30 Sep** | Read the **Cheat sheet** tab end to end (~20 min). Then **Practice**, Deck 1 only, 20 questions. | Read every explanation you got wrong. |
| **Thu 1 Oct** | Practice, Deck 2 only, 25 questions. Revisit *Fairness strategies*, *XAI methods*, *Principles A–H*. | State the five fairness criteria; separate LIME / SHAP / PDP / counterfactuals. |
| **Fri 2 Oct** | Practice, Deck 3 only, 25 questions, starring **ISO/IEC 42001** (AIMS, published 2023, Annexes A–D, six requirements, Provider/Producer/User, pitfalls). | Recite the ISO section without notes. |
| **Sat 3 Oct** | **Full mock exam** button (40 Q, all decks, timed). Review every miss, then run **Weak points**. | ≥ 90% on the mock. |
| **Sun 4 Oct** | **Lightning** round + the cross-deck **trap list** in the cheat sheet. | ≥ 90% lightning, no trap items missed. |
| **Each day of quiz week** | One Lightning round (10 Q / 5 min). | Hold ≥ 90%. |

The app calls you **"Full-mark ready"** at **≥ 90%**; treat any topic in red on the *Progress* tab as unfinished business.

---

## Sources and scope

Everything is derived from the three lecture decks only — no outside material — so nothing here contradicts what will be examined. Where a slide made a claim that is easy to mix up (risk-tier obligations, the 62.5%/25% vs 50%/50% loan results, exfiltration vs leakage, Provider vs Producer), the explanation restates the slide's own wording.

The quiz format is assumed to be MCQ / true-false (per your note), so "select all that apply" items are included for depth but can be switched off with the **Question types** filter.

---

## Optional: automated UI test

`tools/e2e.js` loads the real app in jsdom and drives it — setup filters, a practice run to 100%, results & review, exam simulation with navigator/flagging, stats, flashcards, weak drill, and resume-after-reload. jsdom is **not** a project dependency:

```bash
cd docs
npm install jsdom --no-save
node tools/e2e.js      # expect: "ALL E2E CHECKS PASSED ✓ (128 checks)"
```
