import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import { HydrateClient } from "~/trpc/server";
import SessionProvider from "~/app/_providers/session-provider";
import NavMenu from "./_components/nav-menu";

export const metadata: Metadata = {
  title: "LS Rank",
  description: "List of your favorite things",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  return (
    <html lang="en" className={`${GeistSans.variable} dark h-full`}>
      <body className="grid grid-cols-12 h-full">
        <SessionProvider session={session}>
          <TRPCReactProvider>
            <HydrateClient>
              {session && <NavMenu className="col-span-2" />}
              <main className="col-span-8 pt-12">{children}</main>
            </HydrateClient>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
