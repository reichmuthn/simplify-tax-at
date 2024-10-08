import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

export const pollRateLimitProvider = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(1, "1 m"),
});
