import axios, { AxiosResponse } from "axios";
import { addSeconds, formatISO, isAfter, isBefore } from "date-fns";
import { env } from "~/env.mjs";
import { redis } from "./redis";

const searchParams = new URLSearchParams({
  client_id: env.TWITCH_CLIENT_ID,
  client_secret: env.TWITCH_CLIENT_SECRET,
  grant_type: "client_credentials",
});

const tokenURL = `https://id.twitch.tv/oauth2/token?${searchParams.toString()}`;

type TwitchAccessTokenData = {
  access_token: string;
  expires_in: number;
  token_type: "bearer";
  expires_on: Date | null;
};
const TWITCH_ACCESS_TOKEN_KEY = "lsrank:twitchAccessToken";

export const getTwitchAccessToken = async () => {
  const existingTokenData = await redis.hgetall<TwitchAccessTokenData>(
    TWITCH_ACCESS_TOKEN_KEY,
  );
  if (
    !existingTokenData?.expires_on ||
    isAfter(new Date(), existingTokenData.expires_on)
  ) {
    const response = await axios.post<TwitchAccessTokenData>(tokenURL);

    await redis.hset(TWITCH_ACCESS_TOKEN_KEY, {
      ...response.data,
      expires_on: formatISO(addSeconds(new Date(), response.data.expires_in)),
    });
    return response.data.access_token;
  }
  return existingTokenData.access_token;
};
