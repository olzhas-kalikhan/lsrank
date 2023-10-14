import { ListType } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const listRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        type: z.nativeEnum(ListType),
        listItems: z
          .object({
            name: z.string(),
            score: z.number(),
          })
          .array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.list.create({
        data: {
          name: input.name,
          type: input.type,
          userId: ctx.session.user.id,
          ListItem: { createMany: { data: input.listItems } },
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        listId: z.string().cuid(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.list.update({
        where: { id: input.listId },
        data: {
          name: input.name,
          userId: ctx.session.user.id,
        },
      });
    }),
  get: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.list.findMany({
      include: {
        _count: {
          select: { ListItem: true },
        },
      },
    });
  }),
  delete: protectedProcedure
    .input(
      z.object({
        listId: z.string().cuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.list.delete({
        where: { id: input.listId },
      });
    }),
});
