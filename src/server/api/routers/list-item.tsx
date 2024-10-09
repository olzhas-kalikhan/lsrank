import { z } from "zod";
import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { listItems } from "~/server/db/schema";
import { getDefinedPropsObj } from "~/lib/utils";

export const listItemRouter = createTRPCRouter({
  updateListItem: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional().nullable(),
        score: z.number().optional(),
        meta_id: z.string().nullable(),
        meta_pic_url: z.string().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...rest } = input;

      const res = await ctx.db
        .update(listItems)
        .set(getDefinedPropsObj(rest))
        .where(eq(listItems.id, id));
      return res;
    }),
  deleteListItem: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.db
        .delete(listItems)
        .where(eq(listItems.id, input.id));
      return res;
    }),
});
