import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const listItemRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        listId: z.string().cuid(),
        score: z.number().min(0).max(100),
        tags: z.string().optional().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.listItem.create({
        data: {
          name: input.name,
          listId: input.listId,
          score: input.score,
          tags: input.tags,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        name: z.string(),
        score: z.number().min(0).max(100),
        tags: z.string().optional().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.listItem.update({
        where: { id: input.id },
        data: {
          name: input.name,
          score: input.score,
          tags: input.tags,
        },
      });
    }),
  get: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.listItem.findMany();
  }),
  delete: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.listItem.delete({
        where: { id: input.id },
      });
    }),
});
