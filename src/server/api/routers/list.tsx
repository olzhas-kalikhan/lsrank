import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { lists } from "~/server/db/schema";
import { listItems } from "../../db/schema";

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
  getLists: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.lists.findMany({
      where: (lists, { eq }) => eq(lists.userId, ctx.session.user.id),
    });
    
    return res;
  }),
});
