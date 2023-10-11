import { listRouter } from "~/server/api/routers/list";
import { createTRPCContext, createTRPCRouter } from "~/server/api/trpc";
import { listItemRouter } from "./routers/list-item";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  list: listRouter,
  listItem: listItemRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
export const trpcServer = async () => {
  return appRouter.createCaller(await createTRPCContext());
};
