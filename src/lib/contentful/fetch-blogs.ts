import "server-only";

import { cache } from "react";

import { contentfulQuery } from "@/lib/contentful/client";
import { getAdditionalSpacesConfig } from "@/lib/contentful/config";
import { BLOG_DETAIL_FIELDS, BLOG_LIST_FIELDS, BLOG_SLUG_FIELDS } from "@/lib/contentful/fragments";
import { getBlogAuthorBySlugMap } from "@/lib/contentful/fetch-authors";
import type { ContentfulBlogDetail, ContentfulBlogSummary } from "@/lib/contentful/types";

const PAGE_SIZE = 100;

type BlogsCollectionResponse = {
  blogsCollection: {
    total: number;
    items: Array<ContentfulBlogSummary | null>;
  } | null;
};

type BlogSlugsResponse = {
  blogsCollection: {
    total: number;
    items: Array<{ slug: string | null } | null>;
  } | null;
};

type BlogBySlugResponse = {
  blogsCollection: {
    items: Array<ContentfulBlogDetail | null>;
  } | null;
};

type BlogListItem = Omit<ContentfulBlogSummary, "author">;

function normalizeSlug(slug: string | null | undefined): string {
  return String(slug ?? "")
    .trim()
    .toLowerCase();
}

function attachAuthors(
  blogs: BlogListItem[],
  authorMap: Map<string, ContentfulBlogSummary["author"]>,
): ContentfulBlogSummary[] {
  return blogs.map((blog) => {
    const slug = normalizeSlug(blog.slug);
    return {
      ...blog,
      author: slug ? authorMap.get(slug) ?? null : null,
    };
  });
}

async function fetchBlogCollectionPage(
  fields: string,
  skip: number,
  config?: { endpoint: string; token: string },
): Promise<{ total: number; items: BlogListItem[] }> {
  const query = `
    query GetBlogs($limit: Int!, $skip: Int!) {
      blogsCollection(
        limit: $limit
        skip: $skip
        order: [publishDate_DESC, sys_firstPublishedAt_DESC]
      ) {
        total
        items { ${fields} }
      }
    }
  `;

  const data = await contentfulQuery<BlogsCollectionResponse>(query, {
    limit: PAGE_SIZE,
    skip,
  }, config);

  const collection = data.blogsCollection;
  const items = (collection?.items ?? []).filter(Boolean) as BlogListItem[];

  return {
    total: collection?.total ?? items.length,
    items,
  };
}

async function fetchBlogListItemsForSpace(config?: { endpoint: string; token: string }): Promise<BlogListItem[]> {
  const all: BlogListItem[] = [];
  let skip = 0;

  while (true) {
    const { total, items } = await fetchBlogCollectionPage(BLOG_LIST_FIELDS, skip, config);
    all.push(...items);

    if (items.length < PAGE_SIZE || all.length >= total) {
      break;
    }

    skip += PAGE_SIZE;
  }

  return all;
}

async function fetchAllBlogListItems(): Promise<BlogListItem[]> {
  const allItems: BlogListItem[] = [];

  // 1. Fetch from primary space
  try {
    const primaryItems = await fetchBlogListItemsForSpace();
    allItems.push(...primaryItems);
  } catch (error) {
    console.error("[contentful] Failed to fetch blogs from primary space:", error);
  }

  // 2. Fetch from additional spaces
  const additionalConfigs = getAdditionalSpacesConfig();
  for (const config of additionalConfigs) {
    try {
      const additionalItems = await fetchBlogListItemsForSpace(config);
      allItems.push(...additionalItems);
    } catch (error) {
      console.error(`[contentful] Failed to fetch blogs from additional space ${config.spaceId}:`, error);
    }
  }

  // 3. De-duplicate by slug and sort by publishDate descending
  const uniqueItemsMap = new Map<string, BlogListItem>();
  for (const item of allItems) {
    const slug = normalizeSlug(item.slug);
    if (!slug) continue;

    const existing = uniqueItemsMap.get(slug);
    if (!existing) {
      uniqueItemsMap.set(slug, item);
    } else {
      const existingDate = existing.publishDate ? new Date(existing.publishDate).getTime() : 0;
      const currentDate = item.publishDate ? new Date(item.publishDate).getTime() : 0;
      if (currentDate > existingDate) {
        uniqueItemsMap.set(slug, item);
      }
    }
  }

  const mergedList = Array.from(uniqueItemsMap.values());

  mergedList.sort((a, b) => {
    const dateA = a.publishDate ? new Date(a.publishDate).getTime() : 0;
    const dateB = b.publishDate ? new Date(b.publishDate).getTime() : 0;
    return dateB - dateA;
  });

  return mergedList;
}

export async function fetchAllBlogSummaries(): Promise<ContentfulBlogSummary[]> {
  const [blogs, authorMap] = await Promise.all([
    fetchAllBlogListItems(),
    getBlogAuthorBySlugMap(),
  ]);

  return attachAuthors(blogs, authorMap);
}

export const fetchAllBlogSummariesCached = cache(fetchAllBlogSummaries);

export async function fetchBlogSlugs(): Promise<string[]> {
  const blogs = await fetchAllBlogListItems();
  return blogs.map((item) => normalizeSlug(item.slug)).filter(Boolean);
}

export async function fetchBlogBySlug(slug: string): Promise<ContentfulBlogDetail | null> {
  const normalizedSlug = normalizeSlug(slug);

  const query = `
    query GetBlog($slug: String!) {
      blogsCollection(where: { slug: $slug }, limit: 1) {
        items { ${BLOG_DETAIL_FIELDS} }
      }
    }
  `;

  // 1. Try primary space
  let blog: ContentfulBlogDetail | null = null;
  try {
    const data = await contentfulQuery<BlogBySlugResponse>(query, { slug: normalizedSlug });
    blog = data.blogsCollection?.items?.[0] ?? null;
  } catch (error) {
    console.error("[contentful] Failed to query blog from primary space:", error);
  }

  // 2. Try additional spaces if not found
  if (!blog) {
    const additionalConfigs = getAdditionalSpacesConfig();
    for (const config of additionalConfigs) {
      try {
        const data = await contentfulQuery<BlogBySlugResponse>(query, { slug: normalizedSlug }, config);
        const found = data.blogsCollection?.items?.[0] ?? null;
        if (found) {
          blog = found;
          break;
        }
      } catch (error) {
        console.error(`[contentful] Failed to query blog from additional space ${config.spaceId}:`, error);
      }
    }
  }

  if (!blog) return null;

  const authorMap = await getBlogAuthorBySlugMap();

  return {
    ...blog,
    author: authorMap.get(normalizedSlug) ?? null,
  };
}

export const fetchBlogBySlugCached = cache(fetchBlogBySlug);

export async function fetchBlogsByAuthor(authorSlug: string): Promise<ContentfulBlogSummary[]> {
  const normalizedAuthorSlug = normalizeSlug(authorSlug);

  const query = `
    query GetAuthorBlogs($authorSlug: String!) {
      blogsCollection(
        where: { author: { slug: $authorSlug } }
        order: [publishDate_DESC]
        limit: 100
      ) {
        items { ${BLOG_LIST_FIELDS} }
      }
    }
  `;

  const allBlogs: BlogListItem[] = [];

  // 1. Fetch from primary space
  try {
    const data = await contentfulQuery<BlogsCollectionResponse>(query, {
      authorSlug: normalizedAuthorSlug,
    });
    allBlogs.push(...((data.blogsCollection?.items ?? []).filter(Boolean) as BlogListItem[]));
  } catch (error) {
    console.error("[contentful] Failed to query author blogs from primary space:", error);
  }

  // 2. Fetch from additional spaces
  const additionalConfigs = getAdditionalSpacesConfig();
  for (const config of additionalConfigs) {
    try {
      const data = await contentfulQuery<BlogsCollectionResponse>(query, {
        authorSlug: normalizedAuthorSlug,
      }, config);
      allBlogs.push(...((data.blogsCollection?.items ?? []).filter(Boolean) as BlogListItem[]));
    } catch (error) {
      console.error(`[contentful] Failed to query author blogs from space ${config.spaceId}:`, error);
    }
  }

  // De-duplicate and sort
  const uniqueItemsMap = new Map<string, BlogListItem>();
  for (const item of allBlogs) {
    const slug = normalizeSlug(item.slug);
    if (!slug) continue;
    const existing = uniqueItemsMap.get(slug);
    if (!existing) {
      uniqueItemsMap.set(slug, item);
    } else {
      const existingDate = existing.publishDate ? new Date(existing.publishDate).getTime() : 0;
      const currentDate = item.publishDate ? new Date(item.publishDate).getTime() : 0;
      if (currentDate > existingDate) {
        uniqueItemsMap.set(slug, item);
      }
    }
  }

  const mergedList = Array.from(uniqueItemsMap.values());
  mergedList.sort((a, b) => {
    const dateA = a.publishDate ? new Date(a.publishDate).getTime() : 0;
    const dateB = b.publishDate ? new Date(b.publishDate).getTime() : 0;
    return dateB - dateA;
  });

  const authorMap = await getBlogAuthorBySlugMap();

  return attachAuthors(mergedList, authorMap).filter(
    (blog) => normalizeSlug(blog.author?.slug) === normalizedAuthorSlug,
  );
}

export const fetchBlogsByAuthorCached = cache(fetchBlogsByAuthor);
