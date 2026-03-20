import { Select } from "@cliffy/prompt";
import { getProjectState, STAGE_LABELS } from "./_shared/state.ts";
import { printInfo, printSection } from "./_shared/prompts.ts";

const state = getProjectState();

console.log(`
╔══════════════════════════════════════════════════════════╗
║                 CONTENTY — Hub                           ║
╚══════════════════════════════════════════════════════════╝
`);

const name = state.businessName || "(no business set)";
const stageLabel = STAGE_LABELS[state.stage];
const fileCount = state.completedFiles.length;
const totalFiles = state.completedFiles.length + state.missingFiles.length;

console.log(`  Project:  ${name}`);
console.log(`  Stage:    ${stageLabel}`);
console.log(`  Files:    ${fileCount}/${totalFiles} business files populated`);
if (state.hasWebsite) console.log(`  Website:  bootstrapped`);
if (state.locales.length > 1) console.log(`  Locales:  ${state.locales.join(", ")}`);
if (state.brandAssets.present.length > 0) console.log(`  Brand:    ${state.brandAssets.present.length}/${state.brandAssets.present.length + state.brandAssets.missing.length} assets`);
console.log("");

const category = await Select.prompt({
  message: "What do you need?",
  options: [
    { name: "🚀  First Launch — build everything from scratch", value: "launch" },
    { name: "📄  Add Content — new page, blog post, or landing page", value: "content" },
    { name: "✏️   Update Existing — revise strategy, copy, SEO, or offers", value: "update" },
    { name: "🔍  Audit & QA — validate files, run QA, prelaunch check", value: "audit" },
    { name: "📊  Analytics & Tracking — GTM, conversion, reporting setup", value: "analytics" },
    { name: "🎨  Brand Assets — check logos and naming conventions", value: "brand" },
    { name: "🌐  Localization — add a locale, check i18n status", value: "i18n" },
    { name: "⚙️   Project Setup — init website, rename project, validate", value: "setup" },
  ],
});

const run = (script: string) => {
  const cmd = new Deno.Command("deno", {
    args: ["task", script],
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit",
  });
  const child = cmd.spawn();
  return child.status;
};

const showSkillHint = (skill: string, description: string) => {
  printInfo(`${description}\n`);
  console.log(`  Tell your AI tool:`);
  console.log(`  "Follow the skill in skills/${skill}/SKILL.md"\n`);
};

// ── First Launch ─────────────────────────────────────────

if (category === "launch") {
  printSection("First Launch", "Follow the 8-phase delivery workflow from intake to implementation.");

  if (state.stage === "empty") {
    console.log("  Your project is empty. Let's start with the business intake.\n");
    await run("intake");
  } else {
    const nextSteps: Record<string, { label: string; action: () => void | Promise<void> }> = {
      "intake-done": {
        label: "Brand strategy is next",
        action: () => showSkillHint("brand-strategy", "Build your brand positioning and messaging."),
      },
      "strategy-done": {
        label: "Content development is next",
        action: () => showSkillHint("page-copy", "Write structured copy for each page."),
      },
      "content-done": {
        label: "Launch QA, then init-website",
        action: () => showSkillHint("launch-qa", "Review all files for launch readiness."),
      },
      "launched": {
        label: "Website is bootstrapped — build with the website-init skill",
        action: () => showSkillHint("website-init", "Implement the website from business files."),
      },
      "live": {
        label: "Site is live — use 'Update Existing' or 'Add Content' instead",
        action: () => {},
      },
    };
    const step = nextSteps[state.stage];
    if (step) {
      printInfo(step.label);
      step.action();
    }

    console.log("  Completed files:");
    for (const f of state.completedFiles) console.log(`    ✓ ${f}`);
    if (state.missingFiles.length > 0) {
      console.log("\n  Still needed:");
      for (const f of state.missingFiles) console.log(`    ○ ${f}`);
    }
    console.log("");
  }
}

// ── Add Content ──────────────────────────────────────────

if (category === "content") {
  printSection("Add Content", "Extend the site with new pages, blog posts, or landing pages.");

  const task = await Select.prompt({
    message: "What would you like to add?",
    options: [
      { name: "📄  New page (content, service, industry, legal, etc.)", value: "new-page" },
      { name: "📝  New blog post", value: "new-blog" },
      { name: "🎯  New landing page (conversion-focused)", value: "new-landing" },
      { name: "📋  Clone a page brief from template", value: "clone-brief" },
    ],
  });
  await run(task);
}

// ── Update Existing ──────────────────────────────────────

if (category === "update") {
  printSection("Update Existing", "Revise strategy, copy, SEO, or business model.");

  const task = await Select.prompt({
    message: "What do you want to update?",
    options: [
      { name: "🎯  Brand strategy & positioning", value: "brand-strategy" },
      { name: "💼  Business model & offers", value: "offer-design" },
      { name: "👥  Buyer personas", value: "offer-design" },
      { name: "🗺️   Sitemap & page structure", value: "sitemap-ia" },
      { name: "🔍  SEO brief & keywords", value: "seo-brief" },
      { name: "✏️   Page copy (pick a page)", value: "page-copy" },
      { name: "📥  Re-run business intake", value: "intake" },
    ],
  });

  if (task === "intake") {
    await run("intake");
  } else {
    showSkillHint(task, `Update your ${task.replace("-", " ")} by re-running the skill.`);
    printInfo("The AI will read your current files and propose updates.\n");
  }
}

// ── Audit & QA ───────────────────────────────────────────

if (category === "audit") {
  printSection("Audit & QA", "Check file health, content coverage, and launch readiness.");

  const task = await Select.prompt({
    message: "What kind of check?",
    options: [
      { name: "✓  Validate business files (exist + YAML keys)", value: "validate" },
      { name: "📊  Content audit (coverage, brief ↔ copy, SEO)", value: "audit" },
      { name: "🚀  Prelaunch check (unchecked items)", value: "prelaunch" },
      { name: "🔍  Full launch QA (AI-driven review)", value: "launch-qa" },
    ],
  });

  if (task === "launch-qa") {
    showSkillHint("launch-qa", "Run a comprehensive prelaunch audit across all business files.");
  } else {
    await run(task);
  }
}

// ── Analytics & Tracking ─────────────────────────────────

if (category === "analytics") {
  await run("analytics");
}

// ── Brand Assets ─────────────────────────────────────────

if (category === "brand") {
  await run("brand-check");
}

// ── Localization ─────────────────────────────────────────

if (category === "i18n") {
  printSection("Localization", "Manage site languages and locale structure.");

  if (state.locales.length > 1) {
    printInfo(`Current locales: ${state.locales.join(", ")} (default: ${state.defaultLocale})`);
  } else {
    printInfo(`Single-language site (${state.defaultLocale}). You can add more locales.`);
  }

  const task = await Select.prompt({
    message: "What do you need?",
    options: [
      { name: "🌐  Add a new locale", value: "add-locale" },
      { name: "📝  Write a blog post in a specific locale", value: "new-blog" },
    ],
  });
  await run(task);
}

// ── Project Setup ────────────────────────────────────────

if (category === "setup") {
  printSection("Project Setup", "Infrastructure and project configuration.");

  const task = await Select.prompt({
    message: "What do you need?",
    options: [
      { name: "🏗️   Bootstrap website (Fresh 2.2 + Tailwind 4)", value: "init-website" },
      { name: "✏️   Rename project / set business name", value: "init-project" },
      { name: "✓  Validate business files", value: "validate" },
    ],
  });
  await run(task);
}
