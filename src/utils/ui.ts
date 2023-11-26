import { type ClassValue, clsx } from "clsx";
import { memo } from "react";
import { twMerge } from "tailwind-merge";
import { fastObjectShallowCompare } from "./fast-object-shallow-compare";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const fastMemo = <T>(component: T) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  memo(component as any, fastObjectShallowCompare) as unknown as T;
