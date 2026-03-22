import { askText, askConfirm, printSuccess, printError, printInfo } from "./_shared/prompts.ts";
import { writeText, readYaml, writeYaml, fileExists } from "./_shared/files.ts";
import { Select } from "@cliffy/prompt";

console.log("\n📄 New Page\n");
console.log("This will extend the site with a new page:");
console.log("  1. Creates a page brief in business/07-page-briefs/");
console.log("  2. Adds the page to business/06-sitemap.yaml");
console.log("  3. Optionally scaffolds a Fresh route in website/routes/\n");

const name = await askText("Page name (e.g. 'Careers', 'Partners', 'Resources')");
const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
printInfo(`Slug: ${slug}`);

const pageType = await Select.prompt({
  message: "Page type",
  options: [
    { name: "Content page (general purpose)", value: "content" },
    { name: "Service / solution page", value: "service" },
    { name: "Industry page", value: "industry" },
    { name: "Landing page (conversion-focused)", value: "landing" },
    { name: "Blog / resource listing", value: "blog" },
    { name: "Legal page (privacy, terms)", value: "legal" },
  ],
});

const navPlacement = await Select.prompt({
  message: "Navigation placement",
  options: [
    { name: "Primary navigation (main menu)", value: "primary" },
    { name: "Secondary page (footer / sitemap only)", value: "secondary" },
  ],
});

const objective = await askText("Page objective (what should this page accomplish?)");

const briefPath = `business/07-page-briefs/${slug}.md`;
if (fileExists(briefPath)) {
  printError(`Brief already exists: ${briefPath}`);
  Deno.exit(1);
}

const blueprintMap: Record<string, string> = {
  content: "agency/blueprints/about-page.md",
  service: "agency/blueprints/service-page.md",
  industry: "agency/blueprints/industry-page.md",
  landing: "agency/blueprints/local-landing-page.md",
  blog: "agency/blueprints/homepage.md",
  legal: "agency/blueprints/contact-page.md",
};

const brief = `# ${name}

## Page name
${name}

## Page type
${pageType}

## Blueprint reference
${blueprintMap[pageType] || "-"}

## Audience
-

## Objective
${objective}

## Primary CTA
-

## SEO target
-

## Required sections
-

## Proof elements
-

## Internal links
-

## Accessibility notes
-
`;

await writeText(briefPath, brief);
printSuccess(`Created ${briefPath}`);

try {
  const sitemap = readYaml<Record<string, unknown>>("business/06-sitemap.yaml");

  if (navPlacement === "primary") {
    const primary = (sitemap.primary_navigation as string[]) || [];
    if (!primary.includes(name)) {
      primary.push(name);
      sitemap.primary_navigation = primary;
    }
  } else {
    const secondary = (sitemap.secondary_pages as string[]) || [];
    if (!secondary.includes(name)) {
      secondary.push(name);
      sitemap.secondary_pages = secondary;
    }
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

const scaffoldRoute = await askConfirm("Scaffold a Fresh route in website/routes/?", true);
if (scaffoldRoute) {
  const routePath = `website/routes/${slug}.tsx`;
  if (fileExists(routePath)) {
    printInfo(`Route already exists: ${routePath}`);
  } else {
    const componentName = name.replace(/[^a-zA-Z0-9]/g, "");
    const routeStub = `export default function ${componentName}Page() {
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
}

console.log(`
${"─".repeat(60)}
  Next: run the /add-page workflow in your AI tool to
  complete this page end-to-end.

  /add-page

  The workflow will:
  1. Fill in the page brief using the ${pageType} blueprint
  2. Add SEO keywords for this page
  3. Write page copy
  4. Implement the route with OG, canonical, JSON-LD
  5. Update navigation
${"─".repeat(60)}
`);
