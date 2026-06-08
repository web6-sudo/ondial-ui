"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type LoaderContextValue = {
  isLoaderComplete: boolean;
  markLoaderStarted: () => void;
  markLoaderComplete: () => void;
};

const LoaderContext = createContext<LoaderContextValue | null>(null);

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [isLoaderComplete, setIsLoaderComplete] = useState(false);

  const markLoaderStarted = useCallback(() => {
    setIsLoaderComplete(false);
  }, []);

  const markLoaderComplete = useCallback(() => {
    setIsLoaderComplete(true);
  }, []);

  const value = useMemo(
    () => ({ isLoaderComplete, markLoaderStarted, markLoaderComplete }),
    [isLoaderComplete, markLoaderStarted, markLoaderComplete],
  );

  return <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>;
}

export function useLoaderComplete() {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoaderComplete must be used within LoaderProvider");
  }
  return context.isLoaderComplete;
}

export function useLoaderActions() {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoaderActions must be used within LoaderProvider");
  }
  return {
    markLoaderStarted: context.markLoaderStarted,
    markLoaderComplete: context.markLoaderComplete,
  };
}
