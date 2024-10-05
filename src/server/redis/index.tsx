import { Redis } from "@upstash/redis";
import { env } from "~/env";

const redis = new Redis({
  url: env.REDIS_ENDPOINT,
  token: env.REDIS_PASSWORD,
});

export default redis;
