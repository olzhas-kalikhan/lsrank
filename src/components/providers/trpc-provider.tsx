"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import SuperJSON from "superjson";
import { trpcReact } from "~/utils/trpc";
import { getBaseUrl } from "~/utils/ui";

export function TrpcProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() =>
    trpcReact.createClient({
      links: [httpBatchLink({ url: `${getBaseUrl()}/api/trpc` })],
      transformer: SuperJSON,
    }),
  );

  return (
    <trpcReact.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpcReact.Provider>
  );
}
