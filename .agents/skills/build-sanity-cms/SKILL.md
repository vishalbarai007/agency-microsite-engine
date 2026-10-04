---
name: build-sanity-cms
description: Generates a multi-page business website with Sanity CMS for blog posts, leadership team, and service listings.
---

# Objective
Scaffold a corporate microsite or editorial blog backed by Sanity CMS, featuring GROQ queries, PortableText rendering, on-demand ISR revalidation, and static data fallback.

# Workflow Instructions

1. **Client Setup**:
   - Verify `src/lib/sanity/client.ts` reads `NEXT_PUBLIC_SANITY_PROJECT_ID`.
   - Implement `src/lib/sanity/queries.ts` for post index and article detail queries.

2. **Route Generation**:
   - Create `app/(site)/blogs/page.tsx` for article grid.
   - Create `app/(site)/blogs/[slug]/page.tsx` for individual articles with PortableText formatting.
   - Implement `app/api/revalidate/route.ts` for on-demand webhook cache purging.

3. **Fallback Guard**:
   - Ensure the app serves `src/data/blogFallback.ts` gracefully if Sanity credentials are unconfigured.
