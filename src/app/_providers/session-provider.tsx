"use client";

import { type Session } from "next-auth";
import { SessionProvider as NextSessionProvider } from "next-auth/react";

export default function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null | undefined;
}) {
  return (
    <NextSessionProvider session={session}>{children}</NextSessionProvider>
  );
}
