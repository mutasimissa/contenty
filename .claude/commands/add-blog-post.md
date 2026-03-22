---
description: Write and publish a new blog post end-to-end
---

Complete workflow for creating a blog post from topic to live page.

1. Run `deno task new-blog` to scaffold the post with frontmatter and create blog routes if needed.
2. Read `business/02-brand-strategy.md` (tone), `business/08-seo-brief.md` (keywords), `business/05-personas-jobs.md` (audience), and `agency/blueprints/blog-post.md` (structure).
3. Write the full blog post content: H1 with primary keyword, introduction, body sections with H2/H3, key takeaways, CTA linking to service pages, optional FAQ section.
4. Add internal links to relevant service pages (2-3 links) and related blog posts.
5. Update `website/routes/blog/index.tsx` to include the new post.
6. Set frontmatter `draft: false` when content is finalized.
7. Run `deno task snapshot` to save the updated state.
