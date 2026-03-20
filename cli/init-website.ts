import { writeText, resolve } from "./_shared/files.ts";
import { printSuccess, printError, printInfo, printNext, askConfirm } from "./_shared/prompts.ts";

const WEBSITE_DIR = "website";

const hasFiles = (() => {
  try {
    for (const entry of Deno.readDirSync(resolve(WEBSITE_DIR))) {
      if (entry.name !== ".gitkeep") return true;
    }
  } catch {
    // directory doesn't exist
  }
  return false;
})();

if (hasFiles) {
  const proceed = await askConfirm("website/ already has files. Overwrite?", false);
  if (!proceed) {
    printInfo("Aborted.");
    Deno.exit(0);
  }
}

printInfo("Bootstrapping Fresh 2.2+ project in website/...\n");

const command = new Deno.Command("deno", {
  args: ["run", "-Ar", "jsr:@fresh/init", resolve(WEBSITE_DIR)],
  stdin: "inherit",
  stdout: "inherit",
  stderr: "inherit",
});

const { code } = await command.output();

if (code !== 0) {
  printError("Fresh init failed. Check the output above.");
  Deno.exit(1);
}

printSuccess("Fresh project created in website/");

const techStackDoc = `# Tech Stack Decision

## Date
${new Date().toISOString().split("T")[0]}

## Stack
- **Framework:** Fresh 2.2+ (Deno)
- **Bundler:** Vite
- **Styling:** Tailwind CSS 4 (via @tailwindcss/vite)
- **Runtime:** Deno 2.x
- **Rendering:** Server-side with island architecture

## Rationale
Fresh provides server-rendered HTML with minimal JavaScript, island-based hydration,
and native Deno support. Tailwind CSS 4 via Vite integrates cleanly without a
separate plugin. This stack prioritizes performance, simplicity, and modern standards.
`;

await writeText("docs/decisions/tech-stack.md", techStackDoc);
printSuccess("Wrote docs/decisions/tech-stack.md");

printNext(
  'Tell your AI tool:\n  "Follow the skill in skills/website-init/SKILL.md and build the website based on the business files."'
);
