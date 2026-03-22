import { detectChanges, saveState } from "./_shared/dep-graph.ts";
import { printSection, printInfo, printSuccess, printHint } from "./_shared/prompts.ts";

const isSnapshot = Deno.args.includes("--snapshot");

if (isSnapshot) {
  await saveState();
  printSuccess("Snapshot saved to .contenty-state.json");
  Deno.exit(0);
}

console.log(`
╔══════════════════════════════════════════════════════════╗
║              CONTENTY — Sync Check                       ║
╚══════════════════════════════════════════════════════════╝
`);

const report = detectChanges();

if (report.isFirstRun) {
  printInfo("No previous state found. Taking initial snapshot.\n");
  await saveState();
  printSuccess("Initial snapshot saved. Run `deno task sync` again after making changes.");
  Deno.exit(0);
}

if (report.changed.length === 0) {
  printSuccess("No changes detected since last sync. Everything is up to date.");
  Deno.exit(0);
}

// ── Report changes ──────────────────────────────────────

printSection("Changes Detected", `${report.changed.length} file(s) changed since last sync.`);

for (const file of report.changed) {
  console.log(`  ✎  ${file}`);
}

if (report.stale.length > 0) {
  printSection("Stale Downstream Files", "These files may need updating based on the dependency graph.");

  for (const file of report.stale) {
    console.log(`  →  ${file}`);
  }
}

// ── Workflow suggestions ────────────────────────────────

console.log("");
printSection("Recommended Action", "Run the edit-sync workflow in your AI tool.");

console.log("  /edit-sync");
console.log("");

printHint(
  "The AI will read the changed files and propagate updates\n" +
  "     to all stale downstream files and website routes.",
);

// ── Specific guidance based on what changed ─────────────

const hasStrategyChange = report.changed.some((f) => f.includes("02-brand-strategy"));
const hasIdentityChange = report.changed.some((f) => f.includes("02b-brand-identity"));
const hasSitemapChange = report.changed.some((f) => f.includes("06-sitemap"));
const hasSeoChange = report.changed.some((f) => f.includes("08-seo-brief"));
const hasCopyChange = report.changed.some((f) => f.includes("09-content-deck"));
const hasBriefChange = report.changed.some((f) => f.includes("07-page-briefs"));

if (hasIdentityChange) {
  printInfo("Brand identity changed — website styles will be regenerated.");
}
if (hasStrategyChange) {
  printInfo("Brand strategy changed — tone across content deck and website may need review.");
}
if (hasSitemapChange) {
  printInfo("Sitemap changed — check for new/removed pages, routes need updating.");
}
if (hasSeoChange) {
  printInfo("SEO brief changed — meta tags across all routes need updating.");
}
if (hasCopyChange) {
  printInfo("Content deck changed — route content needs updating to match.");
}
if (hasBriefChange) {
  printInfo("Page brief(s) changed — affected page copy and routes need updating.");
}

console.log("");
