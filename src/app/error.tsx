"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isDeploymentError, setIsDeploymentError] = useState(false);

  useEffect(() => {
    console.error(error);

    const deploymentError =
      error.name === "ChunkLoadError" ||
      /failed to load chunk/i.test(error.message) ||
      /loading chunk/i.test(error.message) ||
      /loading css chunk/i.test(error.message) ||
      /failed to find server action/i.test(error.message) ||
      /client reference manifest/i.test(error.message) ||
      /failed to load static file/i.test(error.message);

    if (deploymentError) {
      setIsDeploymentError(true);
      
      const now = Date.now();
      const lastReload = sessionStorage.getItem("last-deployment-error-reload");
      
      // If we haven't reloaded in the last 10 seconds, perform a hard reload automatically
      if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
        sessionStorage.setItem("last-deployment-error-reload", now.toString());
        window.location.reload();
      }
    }
  }, [error]);

  const handleAction = () => {
    if (isDeploymentError) {
      window.location.reload();
    } else {
      reset();
    }
  };

  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-4 px-6 py-24">
      <h2 className="text-xl font-semibold tracking-tight">
        {isDeploymentError ? "Page update available" : "Something went wrong"}
      </h2>
      <p className="max-w-md text-center text-sm text-muted-foreground">
        {isDeploymentError 
          ? "We've updated the site. Please refresh to get the latest version."
          : error.message}
      </p>
      <Button type="button" onClick={handleAction}>
        {isDeploymentError ? "Refresh page" : "Try again"}
      </Button>
    </div>
  );
}


