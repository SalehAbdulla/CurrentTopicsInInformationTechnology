/* One-off structural checker: index.html vs app.js (run from the docs folder). */
const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(dir, "index.html"), "utf8");
const js = fs.readFileSync(path.join(dir, "app.js"), "utf8");
const css = fs.readFileSync(path.join(dir, "styles.css"), "utf8");

let bad = 0;
const ok = (m) => console.log("  ok   " + m);
const fail = (m) => { bad++; console.log("  FAIL " + m); };

// 1 · no leftover build markers anywhere
["<<<APPEND>>>", "<<<CSS-APPEND>>>", "<<<SHEET-APPEND>>>", "<<<APP-APPEND>>>", "APPEND-POINT", "<<<E2E-APPEND>>>"]
  .forEach((marker) => {
    [["index.html", html], ["app.js", js], ["styles.css", css]].forEach(([name, txt]) => {
      if (txt.indexOf(marker) !== -1) fail(name + " still contains marker " + marker);
    });
  });
ok("no leftover build markers");

// 2 · markup balance
const count = (re) => (html.match(re) || []).length;
count(/<main\b/g) === 1 ? ok("exactly one <main>") : fail("<main> count = " + count(/<main\b/g));
count(/<\/main>/g) === 1 ? ok("exactly one </main>") : fail("</main> count = " + count(/<\/main>/g));
count(/<section\b/g) === count(/<\/section>/g)
  ? ok("<section> tags balanced (" + count(/<section\b/g) + ")")
  : fail("<section> unbalanced: " + count(/<section\b/g) + " vs " + count(/<\/section>/g));
count(/\bdata-view="(home|flash|sheet|stats)"/g) === 4
  ? ok("4 top-level navigation tabs")
  : fail("data-view tab count = " + count(/\bdata-view="/g));
["home", "quiz", "results", "stats", "flash", "sheet"].forEach((v) => {
  if (html.indexOf('id="view-' + v + '"') === -1) fail("missing view-" + v + " section");
});
ok("all six view sections present");

// 3 · duplicate ids
const ids = (html.match(/\sid="([^"]+)"/g) || []).map((s) => s.slice(5, -1));
const dupes = ids.filter((v, i) => ids.indexOf(v) !== i);
dupes.length === 0 ? ok("no duplicate element ids (" + ids.length + " ids)") : fail("duplicate ids: " + dupes.join(", "));

// 4 · every $("#id") in app.js exists in the HTML
const referenced = Array.from(new Set((js.match(/\$\("#([A-Za-z0-9_-]+)"\)/g) || [])
  .map((s) => s.slice(4, -2))));
const missing = referenced.filter((id) => !ids.includes(id));
missing.length === 0
  ? ok("all " + referenced.length + " ids referenced by app.js exist in index.html")
  : fail("app.js references missing ids: " + missing.join(", "));

// 5 · CSS classes used by app.js are at least defined somewhere
["opt", "is-correct", "is-wrong", "is-selected", "rev-item", "bd-row", "sheet-deck", "sheet-topic", "is-low", "stat-box"]
  .forEach((cls) => {
    if (css.indexOf("." + cls) === -1) fail("css is missing ." + cls);
  });
ok("key CSS classes are defined");

// 6 · script order
const qIdx = html.indexOf('src="questions.js"');
const aIdx = html.indexOf('src="app.js"');
qIdx !== -1 && aIdx !== -1 && qIdx < aIdx
  ? ok("questions.js loads before app.js")
  : fail("script order is wrong");

console.log(bad ? "\nSTRUCTURE CHECK FAILED (" + bad + ")" : "\nSTRUCTURE CHECK PASSED ✓");
process.exit(bad ? 1 : 0);
