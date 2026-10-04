import { groq } from "next-sanity";

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
