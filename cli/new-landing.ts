import { askText, printSuccess, printError, printInfo, printNext } from "./_shared/prompts.ts";
import { writeText, readText, readYaml, writeYaml, fileExists } from "./_shared/files.ts";

console.log("\n🎯 New Landing Page\n");
console.log("This will scaffold a conversion-focused landing page with:");
console.log("  1. A page brief in business/07-page-briefs/");
console.log("  2. A route stub in website/routes/");
console.log("  3. An entry added to business/06-sitemap.yaml\n");

const name = await askText("Landing page name (e.g. 'Free Assessment', 'Demo Request')");
const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
printInfo(`Slug: ${slug}`);

const audience = await askText("Target audience for this landing page");
const cta = await askText("Primary CTA (e.g. 'Get your free assessment')");
const objective = await askText("Page objective (what should this page accomplish?)");

const briefPath = `business/07-page-briefs/${slug}.md`;
if (fileExists(briefPath)) {
  printError(`Brief already exists: ${briefPath}`);
  Deno.exit(1);
}

const brief = `# ${name}

## Page name
${name}

## Audience
${audience}

## Objective
${objective}

## Primary CTA
${cta}

## SEO target
-

## Required sections
- Hero with clear value proposition and CTA
- Problem / pain point statement
- Solution summary
- Trust signals / proof
- Objection handling
- Final CTA with urgency

## Proof elements
-

## Internal links
- Link to main solutions page for detailed offer info
- Link to contact page as fallback conversion path

## Accessibility notes
- CTA buttons have descriptive text
- Form inputs have labels
`;

await writeText(briefPath, brief);
printSuccess(`Created ${briefPath}`);

const routePath = `website/routes/${slug}.tsx`;
if (!fileExists(routePath)) {
  const routeStub = `export default function ${name.replace(/[^a-zA-Z0-9]/g, "")}Page() {
  return (
    <main>
      <h1>${name}</h1>
      {/* TODO: Implement based on business/07-page-briefs/${slug}.md */}
    </main>
  );
}
`;
  await writeText(routePath, routeStub);
  printSuccess(`Created ${routePath}`);
}

try {
  const sitemap = readYaml<Record<string, unknown>>("business/06-sitemap.yaml");
  const secondary = (sitemap.secondary_pages as string[]) || [];
  if (!secondary.includes(name)) {
    secondary.push(name);
    sitemap.secondary_pages = secondary;
  }
  const goals = (sitemap.page_goals as Record<string, string>) || {};
  if (!goals[name]) {
    goals[name] = objective;
    sitemap.page_goals = goals;
  }
  await writeYaml("business/06-sitemap.yaml", sitemap);
  printSuccess("Updated business/06-sitemap.yaml");
} catch {
  printInfo("Could not update sitemap — you may need to add the page manually.");
}

printNext(
  'Tell your AI tool:\n  "Write landing page copy for ' + briefPath + ' following skills/page-copy/SKILL.md and agency/methodology/cro-framework.md"'
);
