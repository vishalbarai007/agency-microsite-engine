# Sanity CMS Integration & On-Demand ISR

## 1. Executive Summary
While most agency microsites thrive on pure static data files, certain enterprise or corporate clients require an editorial content management system (CMS) to publish ongoing blog articles, case studies, or press announcements.

This module provides a headless **Sanity CMS** integration featuring:
- **GROQ Queries**: High-speed, typed query language fetching only required fields.
- **On-Demand ISR (Incremental Static Regeneration)**: Webhook-driven instant cache revalidation (`/api/revalidate`), allowing clients to publish content in Sanity Studio and see live updates globally in under 2 seconds without waiting for full site rebuilds.
- **Fail-Safe Fallback**: If Sanity credentials are omitted in development, the site gracefully falls back to local static data (`src/data/`) without crashing.

---

## 2. Tech Stack & Dependencies

| Tool | Purpose | Advantage |
| :--- | :--- | :--- |
| **`next-sanity`** | Sanity client for Next.js App Router | Optimized fetch caching, live previews, and zero bundle bloat |
| **`@portabletext/react`** | Rich text rendering | Renders structured block content safely with custom Tailwind UI components |
| **`@sanity/image-url`** | Image CDN optimization | Automatically generates WebP/AVIF URLs with cropping & focal points |
| **Next.js Route Handlers** | Cache Revalidation Webhook | Instant cache purging using `revalidatePath()` |

---

## 3. Client & Query Architecture

### 3.1 Sanity Client Configuration (`src/lib/sanity/client.ts`)
```typescript
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const isSanityConfigured = Boolean(projectId && projectId.trim().length > 0);

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === "production"
    })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

export function urlFor(source: any) {
  return builder ? builder.image(source) : null;
}
```

### 3.2 GROQ Queries (`src/lib/sanity/queries.ts`)
```typescript
import { groq } from "next-sanity";

// Query for blog index list
export const getArticlesQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    "mainImage": mainImage.asset->url,
    "author": author->{ name, "avatar": image.asset->url }
  }
`;

// Query for individual article page
export const getArticleBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    "mainImage": mainImage.asset->url,
    "author": author->{ name, "avatar": image.asset->url, bio },
    body
  }
`;
```

---

## 4. On-Demand ISR Webhook (`app/api/revalidate/route.ts`)

When an editor clicks "Publish" inside Sanity Studio, Sanity sends an authenticated webhook to this route. Next.js purges the cached HTML page for that slug and regenerates it instantaneously:

```typescript
import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get("x-sanity-secret");
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid revalidation secret" }, { status: 401 });
    }

    const body = await req.json();
    const slug = body?.slug?.current;

    if (!slug) {
      // Revalidate main blog directory if no slug provided
      revalidatePath("/blogs");
      return NextResponse.json({ revalidated: true, path: "/blogs" });
    }

    // Revalidate the specific article and index
    revalidatePath("/blogs");
    revalidatePath(`/blogs/${slug}`);

    return NextResponse.json({
      revalidated: true,
      slug,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.error("[Revalidation Error]:", err);
    return NextResponse.json({ message: "Error revalidating", error: err.message }, { status: 500 });
  }
}
```

---

## 5. Fail-Safe Fallback Mechanism

If a developer clones this repo or runs tests without configuring Sanity API keys, the data loader automatically serves mock data from `src/data/blogFallback.ts`:

```typescript
import { client, isSanityConfigured } from "@/lib/sanity/client";
import { getArticlesQuery } from "@/lib/sanity/queries";
import { fallbackArticles } from "@/data/blogFallback";

export async function getArticles() {
  if (!isSanityConfigured || !client) {
    console.info("[Sanity]: Running in mock fallback mode. Serving static articles.");
    return fallbackArticles;
  }

  try {
    return await client.fetch(getArticlesQuery);
  } catch (error) {
    console.error("[Sanity Fetch Failure, using fallback]:", error);
    return fallbackArticles;
  }
}
```

---

## 6. Environment Configuration

```env
# Public Sanity credentials (safe to expose in client)
NEXT_PUBLIC_SANITY_PROJECT_ID="abc123xyz"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"

# Secret webhook token shared between Sanity Webhook & Next.js
SANITY_REVALIDATE_SECRET="super-secret-random-hex-token-987654"
```
