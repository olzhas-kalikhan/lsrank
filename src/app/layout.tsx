import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import NavMenu from "./_components/nav-menu";
import { TRPCReactProvider } from "~/trpc/react";
import { getServerAuthSession } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import SessionProvider from "~/app/_providers/session-provider";
import { Toaster } from "@components/ui/toaster";

export const metadata: Metadata = {
  title: "LS Rank",
  description: "List of your favorite things",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();

  return (
    <html lang="en" className={`${GeistSans.variable} dark h-full`}>
      <body className="grid h-full grid-cols-12">
        <SessionProvider session={session}>
          <TRPCReactProvider>
            <HydrateClient>
              {session && <NavMenu className="col-span-2" />}
              <main className="col-span-8 px-4 pt-12">{children}</main>
              <Toaster />
            </HydrateClient>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
