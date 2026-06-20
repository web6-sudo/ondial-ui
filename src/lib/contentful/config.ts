import "server-only";

import { CONTENTFUL_REVALIDATE_SECONDS } from "@/config/contentful";

export { CONTENTFUL_REVALIDATE_SECONDS };

export function getContentfulConfig() {
  const spaceId =
    process.env.CONTENTFUL_SPACE_ID ?? process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const token =
    process.env.CONTENTFUL_GRAPHQL_TOKEN ?? process.env.NEXT_PUBLIC_CONTENTFUL_GRAPHQL_TOKEN;
  const environment =
    process.env.CONTENTFUL_ENVIRONMENT ??
    process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT ??
    "master";

  if (!spaceId || !token) {
    throw new Error(
      "Missing Contentful credentials. Set CONTENTFUL_SPACE_ID and CONTENTFUL_GRAPHQL_TOKEN in your env file.",
    );
  }

  return {
    spaceId,
    token,
    environment,
    endpoint: `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/${environment}`,
  };
}

export function isContentfulConfigured(): boolean {
  const spaceId =
    process.env.CONTENTFUL_SPACE_ID ?? process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const token =
    process.env.CONTENTFUL_GRAPHQL_TOKEN ?? process.env.NEXT_PUBLIC_CONTENTFUL_GRAPHQL_TOKEN;
  return Boolean(spaceId && token);
}

export function getAdditionalSpacesConfig(): Array<{ spaceId: string; token: string; environment: string; endpoint: string }> {
  const envVal = process.env.NEXT_PUBLIC_CONTENTFUL_ADDITIONAL_SPACES;
  if (!envVal) return [];
  try {
    const list = JSON.parse(envVal);
    if (Array.isArray(list)) {
      return list.map((item: any) => ({
        spaceId: item.spaceId,
        token: item.accessToken,
        environment: item.environment || "master",
        endpoint: `https://graphql.contentful.com/content/v1/spaces/${item.spaceId}/environments/${item.environment || "master"}`,
      }));
    }
  } catch (e) {
    console.error("Failed to parse NEXT_PUBLIC_CONTENTFUL_ADDITIONAL_SPACES:", e);
  }
  return [];
}
