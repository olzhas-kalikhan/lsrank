import { type NextApiHandler } from "next";
import NextAuth from "next-auth";
import { authOptions } from "~/server/auth";

const handler = NextAuth(authOptions) as NextApiHandler;

export { handler as GET, handler as POST };
