import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { getTwitchAuthHeaders } from "~/server/twitch";
import axios from "~/lib/axios";

const GAME_FIELDS = ["name", "cover.url", "slug", "url"] as const;

type GameData = {
  name: string;
  slug: string;
  cover?: { url?: string };
  url?: string;
};

export const videoGameRouter = createTRPCRouter({
  getGames: protectedProcedure
    .input(
      z.object({
        search: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const authHeaders = await getTwitchAuthHeaders();
      const search = input?.search ? ` search "${input?.search}";` : "";

      const response = await axios.post<GameData[]>(
        "https://api.igdb.com/v4/games",
        `fields ${GAME_FIELDS.join(",")};${search}`,
        { headers: authHeaders },
      );
      return response.data.map(({ name, slug, ...game }) => ({
        ...game,
        value: slug,
        label: name,
      }));
    }),
});
