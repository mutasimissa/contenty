---
description: Write and publish a new blog post end-to-end
---

# Add Blog Post

Complete workflow for creating a blog post from topic to live page.

## Prerequisites
- Business files populated (brand strategy, SEO brief, personas)
- Website bootstrapped with blog routes

## Steps

// turbo
1. Run `deno task new-blog` to scaffold the post with frontmatter, create blog routes if needed.

2. Read the following files for context:
   - `business/02-brand-strategy.md` — tone of voice
   - `business/08-seo-brief.md` — keyword alignment
   - `business/05-personas-jobs.md` — target audience
   - `agency/blueprints/blog-post.md` — post structure

3. Write the full blog post content in the markdown file created by the CLI:
   - **H1**: Include the primary keyword naturally
   - **Introduction**: Hook the reader, state the problem, preview the value
   - **Body sections**: Use H2/H3 for structure, include data or examples
   - **Key takeaways**: Summarize actionable points
   - **CTA**: Link to a relevant service page or contact
   - **FAQ** (optional): 2-3 questions for FAQ schema
   - Match tone to `business/02-brand-strategy.md`

4. Add internal links within the post body:
   - Link to relevant service pages (2-3 links)
   - Link to related blog posts if they exist
   - Link to the contact page in the CTA section

5. Update the blog post route at `website/routes/blog/[slug].tsx` if needed to handle the new post's specific metadata.

6. Update `website/routes/blog/index.tsx` to include the new post in the listing.

7. Update the post's frontmatter `draft: false` when content is finalized.

8. Verify:
   - Post renders with full content
   - Meta tags and OG tags are correct
   - Internal links work
   - Post appears in the blog index

// turbo
9. Run `deno task snapshot` to save the updated state.
