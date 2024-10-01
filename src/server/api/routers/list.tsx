import { z } from "zod";
import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { lists, listItems, users } from "~/server/db/schema";

export const listRouter = createTRPCRouter({
  createList: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        listItems: z.array(
          z.object({
            name: z.string(),
            score: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        try {
          const createdLists = await tx
            .insert(lists)
            .values({
              name: input.name,
              type: "video-game",
              userId: ctx.session.user.id,
            })
            .returning({ listId: lists.id });
          const listId = createdLists[0]?.listId;
          if (!listId) {
            throw new Error("No List ID");
          }
          const mappedListItems = input.listItems.map((listItem) => ({
            name: listItem.name,
            score: listItem.score,
            listId,
          }));
          await tx.insert(listItems).values(mappedListItems);
        } catch (err) {
          console.log(err);
          tx.rollback();
        }
      });
    }),
  getListsByUser: protectedProcedure
    .input(z.object({ userName: z.string() }))
    .query(async ({ ctx, input }) => {
      const res = await ctx.db.query.users.findFirst({
        where: (users, { eq }) => eq(users.name, input.userName),
        columns: {
          name: true,
        },
        with: {
          lists: {
            columns: {
              id: true,
              name: true,
              type: true,
            },
            with: {
              listItems: {
                columns: { id: true },
              },
            },
          },
        },
      });

      return res;
    }),
  getList: protectedProcedure
    .input(z.object({ userName: z.string(), listName: z.string() }))
    .query(async ({ ctx, input }) => {
      const res = await ctx.db.query.users.findFirst({
        where: (users, { eq }) => eq(users.name, input.userName),
        with: {
          lists: {
            where: (lists, { eq }) => eq(lists.name, input.listName),
            with: { listItems: true },
          },
        },
        columns: {
          id: true,
          name: true,
        },
      });
      return res;
    }),
  deleteList: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.db.delete(lists).where(eq(lists.id, input.id));
      return res;
    }),
});
