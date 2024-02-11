import { getTwitchAccessToken } from "~/server/lib/twitch";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { env } from "~/env.mjs";

export type GameData = {
  id: number;
  cover: {
    id: number;
    url: string;
  };
  name: string;
};

const GAME_FIELDS = ["name", "cover.url"] as const;

export const gameRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object({ search: z.string() }).optional())
    .query(async ({ input }) => {
      const access_token = await getTwitchAccessToken();
      const search = input?.search ? ` search "${input?.search}";` : "";
      return (
        await fetch("https://api.igdb.com/v4/games", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Client-ID": env.TWITCH_CLIENT_ID,
            Authorization: `Bearer ${access_token}`,
          },
          body: `fields ${GAME_FIELDS.join(",")};${search}`,
        })
      ).json() as Promise<GameData[]>;
    }),
});
