import { askText, askList, printSuccess, printError, printInfo, printNext } from "./_shared/prompts.ts";
import { writeText, fileExists, getLocales, isMultilingual } from "./_shared/files.ts";
import { Select } from "@cliffy/prompt";

console.log("\n📝 New Blog Post\n");
console.log("This will scaffold a new blog post with structured frontmatter.");
console.log("The post file will be created in website/content/blog/.\n");

const title = await askText("Post title");
const slug = title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
printInfo(`Slug: ${slug}`);

const author = await askText("Author name");
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

if (isMultilingual()) {
  const otherLocales = locales.filter((l) => l !== locale);
  if (otherLocales.length > 0) {
    printInfo(`To create translations, run \`deno task new-blog\` again for: ${otherLocales.join(", ")}`);
  }
}

printNext(
  'Tell your AI tool:\n  "Write the blog post in ' + targetPath + ' based on the business strategy and SEO brief."'
);
