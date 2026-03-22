import { askText, askList, printSuccess, printError, printInfo } from "./_shared/prompts.ts";
import { writeText, readText, fileExists, getLocales, isMultilingual } from "./_shared/files.ts";
import { Select } from "@cliffy/prompt";

console.log("\n📝 New Blog Post\n");
console.log("This will scaffold a new blog post with structured frontmatter,");
console.log("create a route, and update the blog index.\n");

const title = await askText("Post title");
const slug = title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
printInfo(`Slug: ${slug}`);

const author = await askText("Author name");

// ── Category selection ──────────────────────────────────

let category = "general";
const blogStrategyPath = "business/11-blog-strategy.md";
if (fileExists(blogStrategyPath)) {
  const strategyContent = readText(blogStrategyPath);
  const categoryMatches = strategyContent.match(/^- (.+)$/gm);
  if (categoryMatches && categoryMatches.length > 0) {
    const categories = categoryMatches.map((m) => m.replace(/^- /, "").trim()).filter(Boolean).slice(0, 10);
    if (categories.length > 0) {
      category = await Select.prompt({
        message: "Category",
        options: [...categories.map((c) => ({ name: c, value: c.toLowerCase().replace(/[^a-z0-9]+/g, "-") })), { name: "Other", value: "general" }],
      });
    }
  }
} else {
  category = await askText("Category (e.g. insights, guides, news)", "general");
}

const primaryKeyword = await askText("Primary keyword (for SEO targeting)");
const tags = await askList("Tags");
const metaDescription = await askText("Meta description (150-160 chars for SEO)");

let locale: string;
const { defaultLocale, locales } = getLocales();

if (isMultilingual()) {
  printInfo(`Multilingual site detected. Locales: ${locales.join(", ")}`);
  locale = await Select.prompt({
    message: "Which locale is this post for?",
    options: locales.map((l) => ({ name: l, value: l })),
  });
} else {
  locale = defaultLocale;
}

const date = new Date().toISOString().split("T")[0];

const frontmatter = `---
title: "${title}"
slug: "${slug}"
date: "${date}"
author: "${author}"
locale: "${locale}"
category: "${category}"
primary_keyword: "${primaryKeyword}"
tags: [${tags.map((t) => `"${t}"`).join(", ")}]
description: "${metaDescription}"
draft: true
---

# ${title}

<!-- Write your blog post content below -->

`;

const dir = isMultilingual()
  ? `website/content/blog/${locale}`
  : "website/content/blog";
const targetPath = `${dir}/${slug}.md`;

if (fileExists(targetPath)) {
  printError(`File already exists: ${targetPath}`);
  Deno.exit(1);
}

await writeText(targetPath, frontmatter);
printSuccess(`Created ${targetPath}`);

// ── Scaffold blog route if first post ───────────────────

const blogIndexRoute = "website/routes/blog/index.tsx";
const blogSlugRoute = "website/routes/blog/[slug].tsx";

if (fileExists("website/deno.json") || fileExists("website/fresh.config.ts")) {
  if (!fileExists(blogSlugRoute)) {
    const blogRoute = `import { define } from "../../utils.ts";
import { Head } from "fresh/runtime";
import Header from "../../components/Header.tsx";
import Footer from "../../components/Footer.tsx";
import OGMeta from "../../components/OGMeta.tsx";

export default define.page(function BlogPost({ params }) {
  const _slug = params.slug;
  return (
    <>
      <Head>
        <title>Blog Post</title>
        <OGMeta title="Blog Post" description="" path={\`/blog/\${_slug}\`} />
      </Head>
      <Header />
      <main id="main-content">
        <article class="max-w-3xl mx-auto px-4 py-16">
          {/* Populate from website/content/blog/ markdown files */}
        </article>
      </main>
      <Footer />
    </>
  );
});
`;
    await writeText(blogSlugRoute, blogRoute);
    printSuccess(`Created ${blogSlugRoute}`);
  }

  if (!fileExists(blogIndexRoute)) {
    const indexRoute = `import { define } from "../../utils.ts";
import { Head } from "fresh/runtime";
import Header from "../../components/Header.tsx";
import Footer from "../../components/Footer.tsx";
import OGMeta from "../../components/OGMeta.tsx";

export default define.page(function BlogIndex() {
  return (
    <>
      <Head>
        <title>Blog</title>
        <OGMeta title="Blog" description="Latest articles and insights" path="/blog" />
      </Head>
      <Header />
      <main id="main-content">
        <section class="max-w-7xl mx-auto px-4 py-16">
          <h1 class="text-4xl font-bold text-neutral-900">Blog</h1>
          {/* Populate blog listing from website/content/blog/ */}
        </section>
      </main>
      <Footer />
    </>
  );
});
`;
    await writeText(blogIndexRoute, indexRoute);
    printSuccess(`Created ${blogIndexRoute}`);
  }
}

if (isMultilingual()) {
  const otherLocales = locales.filter((l) => l !== locale);
  if (otherLocales.length > 0) {
    printInfo(`To create translations, run \`deno task new-blog\` again for: ${otherLocales.join(", ")}`);
  }
}

console.log(`
${"─".repeat(60)}
  Next: run the /add-blog-post workflow in your AI tool to
  write the full blog post content.

  /add-blog-post

  The workflow will:
  1. Write the full blog post based on strategy and SEO brief
  2. Add internal links to service pages
  3. Update the blog index page
  4. Add OG meta and structured data
${"─".repeat(60)}
`);
