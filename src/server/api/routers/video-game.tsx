import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { getTwitchAuthHeaders } from "~/server/twitch";
import axios from "~/lib/axios";
import redis from "~/server/redis";

const GAME_FIELDS = [
  "name",
  "cover.url",
  "slug",
  "url",
  "summary",
  "genres.id",
  "genres.name",
  "genres.slug",
] as const;

const GAME_GENRE_FIELDS = ["name", "slug"];

const REDIS_GAME_GENRES_KEY = "lsrank:game-genres";

type GameGenre = {
  id: number;
  name: string;
  slug: string;
};

type GameData = {
  name: string;
  slug: string;
  cover?: { url?: string };
  url?: string;
  genres?: Pick<GameGenre, "id">[];
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
  getGenres: protectedProcedure.query(async () => {
    const authHeaders = await getTwitchAuthHeaders();
    let gameGenresMap = await redis.json.get<Record<string, GameGenre>>(
      REDIS_GAME_GENRES_KEY,
    );

    if (!gameGenresMap) {
      const response = await axios.post<GameGenre[]>(
        "https://api.igdb.com/v4/genres",
        `fields ${GAME_GENRE_FIELDS.join(",")};limit 50;`,
        { headers: authHeaders },
      );

      gameGenresMap = response.data.reduce(
        (output, gameGenre) => {
          output[gameGenre.id.toString()] = gameGenre;
          return output;
        },
        {} as Record<string, GameGenre>,
      );

      await redis.json.set(REDIS_GAME_GENRES_KEY, "$", gameGenresMap);
    }

    return gameGenresMap;
  }),
});
