import { TRPCError } from "@trpc/server";
import redis from "../redis";
import { env } from "~/env";
import axios from "~/lib/axios";

export type TwitchAuthToken = {
  access_token: string;
  expires_in: number;
  token_type: "bearer";
};

const REDIS_TWITCH_KEY = "lsrank:twitch-token";

export async function getTwitchAuthToken() {
  try {
    let token = await redis.get<TwitchAuthToken>(REDIS_TWITCH_KEY);

    if (!token) {
      const response = await axios.post<TwitchAuthToken>(
        `https://id.twitch.tv/oauth2/token?client_id=${env.TWITCH_CLIENT_ID}&client_secret=${env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
      );
      token = response.data;
      await redis.set(REDIS_TWITCH_KEY, token);
    }
    return token;
  } catch (err) {
    if (env.NODE_ENV !== "production") {
      console.log("Failed to get token", err);
    }
    throw new TRPCError({ code: "SERVICE_UNAVAILABLE" });
  }
}

export async function getTwitchAuthHeaders() {
  const token = await getTwitchAuthToken();

  return {
    Accept: "application/json",
    "Client-ID": env.TWITCH_CLIENT_ID,
    Authorization: `Bearer ${token.access_token}`,
  };
}
