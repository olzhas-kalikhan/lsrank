import { appRouter } from "~/server/api/root";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createTRPCContext } from "~/server/api/trpc";
import { env } from "~/env.mjs";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: createTRPCContext,
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : undefined,
  });

export { handler as GET, handler as POST };
