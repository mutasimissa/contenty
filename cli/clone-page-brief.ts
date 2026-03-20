import { readText, writeText, fileExists } from "./_shared/files.ts";
import { printSuccess, printError } from "./_shared/prompts.ts";

const slug = Deno.args[0]?.trim().toLowerCase().replace(/\s+/g, "-");

if (!slug) {
  printError("Usage: deno task clone-brief <page-slug>");
  Deno.exit(1);
}

const templatePath = "agency/templates/page-brief.template.md";
const targetPath = `business/07-page-briefs/${slug}.md`;

if (!fileExists(templatePath)) {
  printError(`Template not found: ${templatePath}`);
  Deno.exit(1);
}

if (fileExists(targetPath)) {
  printError(`File already exists: ${targetPath}`);
  Deno.exit(1);
}

const template = readText(templatePath);
await writeText(targetPath, template);
printSuccess(`Created ${targetPath}`);
