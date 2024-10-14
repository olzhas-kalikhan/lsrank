import { z } from "zod";
import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { lists, listItems } from "~/server/db/schema";

export const listRouter = createTRPCRouter({
  createList: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        listItems: z.array(
          z.object({
            name: z.string(),
            score: z.number(),
            meta_id: z.string().nullable(),
            meta_pic_url: z.string().nullable(),
            genre_ids: z.array(z.string()).default([]),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
        try {
          const createdLists = await tx
            .insert(lists)
            .values({
              name: input.name,
              type: "video-game",
              userId: ctx.session.user.id,
            })
            .returning({ id: lists.id, name: lists.name });
          const listId = createdLists[0]?.id;
          if (!listId) {
            throw new Error("No List ID");
          }
          const mappedListItems = input.listItems.map((listItem) => ({
            name: listItem.name,
            score: listItem.score,
            meta_pic_url: listItem.meta_pic_url,
            meta_id: listItem.meta_id,
            genre_ids: listItem.genre_ids,
            listId,
          }));
          await tx.insert(listItems).values(mappedListItems);
          return createdLists;
        } catch (err) {
          console.log(err);
          tx.rollback();
        }
      });
    }),
  getLists: protectedProcedure
    .input(z.object({ userName: z.string() }))
    .query(async ({ ctx, input }) => {
      const res = await ctx.db.query.users.findFirst({
        where: (users, { eq }) => eq(users.name, input.userName),
        columns: {
          name: true,
          image: true,
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
  updateList: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.db
        .update(lists)
        .set({ name: input.name })
        .where(eq(lists.id, input.id));
      return res;
    }),
});
