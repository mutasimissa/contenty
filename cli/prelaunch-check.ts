import { readText, fileExists } from "./_shared/files.ts";
import { printSuccess, printError, printInfo } from "./_shared/prompts.ts";

const CHECKLIST_PATH = "business/10-launch-checklist.md";

if (!fileExists(CHECKLIST_PATH)) {
  printError("Missing launch checklist. Run the launch-qa skill first.");
  Deno.exit(1);
}

const text = readText(CHECKLIST_PATH);
const lines = text.split("\n");

const unchecked = lines.filter((l) => l.trim().startsWith("- [ ]"));
const checked = lines.filter((l) => l.trim().startsWith("- [x]") || l.trim().startsWith("- [X]"));

printInfo(`Launch checklist status:`);
console.log(`  ✓ Completed: ${checked.length}`);
console.log(`  ○ Remaining: ${unchecked.length}`);

if (unchecked.length > 0) {
  console.log("\nUnchecked items:");
  for (const item of unchecked) {
    console.log(`  ${item.trim()}`);
  }
  console.log("");
  printError(`${unchecked.length} item(s) still unchecked.`);
} else {
  printSuccess("All checklist items are complete. Ready to launch!");
}
