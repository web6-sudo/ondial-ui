"use client";

import NextLink from "next/link";
import { forwardRef, type ComponentProps } from "react";

import { useAppRouterReady } from "@/hooks/use-app-router-ready";

type AppLinkProps = ComponentProps<typeof NextLink>;

export const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>(function AppLink(
  { prefetch, ...props },
  ref,
) {
  const routerReady = useAppRouterReady();

  const resolvedPrefetch = !routerReady
    ? false
    : prefetch === undefined
      ? undefined
      : prefetch;

  return <NextLink ref={ref} prefetch={resolvedPrefetch} {...props} />;
});
