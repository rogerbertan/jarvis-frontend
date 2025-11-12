"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Fresh data for 1 minute
            staleTime: 60 * 1000,
            // Cache for 5 minutes
            gcTime: 5 * 60 * 1000,
            // Retry 1 time on failure
            retry: 1,
            // Without refetch on window focus
            refetchOnWindowFocus: false,
          },
          mutations: {
            // Retry 0 times for mutations
            retry: 0,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
