import "~/styles/globals.css";
import type { Metadata } from "next";
import SessionProvider from "~/components/providers/session-provider";
import { ThemeProvider } from "~/components/providers/theme-provider";
import Navigation from "~/components/navigation";
import { getServerAuthSession } from "~/server/auth";
import ErrorBoundary from "~/components/error-boundary";
import { TrpcProvider } from "~/components/providers/trpc-provider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen">
        {/* <ErrorBoundary fallback={<p>oops error</p>}> */}
        <TrpcProvider>
          <SessionProvider session={session}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <div className="grid h-full grid-cols-12">
                <Navigation className="col-span-3 pl-10" />
                <main className="col-span-9">{children}</main>
              </div>
            </ThemeProvider>
          </SessionProvider>
        </TrpcProvider>
        {/* </ErrorBoundary> */}
      </body>
    </html>
  );
}
