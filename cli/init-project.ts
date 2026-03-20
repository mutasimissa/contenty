import { readText, writeText, readYaml, writeYaml } from "./_shared/files.ts";
import { askText, printSuccess, printNext } from "./_shared/prompts.ts";

const businessName = Deno.args[0] || await askText("Business name");

const project = readText("PROJECT.md");
const updated = project.replace(
  /^- Business name:.*$/m,
  `- Business name: ${businessName}`
);
await writeText("PROJECT.md", updated);
printSuccess("Updated PROJECT.md");

const input = readYaml<Record<string, unknown>>("business/01-business-input.yaml");
input.business_name = businessName;
await writeYaml("business/01-business-input.yaml", input);
printSuccess("Updated business/01-business-input.yaml");

printNext("Run `deno task intake` to fill in the rest of the business details.");
