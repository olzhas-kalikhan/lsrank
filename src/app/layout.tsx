import "~/styles/globals.css";
import type { Metadata } from "next";
import SessionProvider from "~/components/providers/session-provider";
import { ThemeProvider } from "~/components/providers/theme-provider";
import Navigation from "~/components/navigation";
import { getServerAuthSession } from "~/server/auth";
import { TrpcProvider } from "~/components/providers/trpc-provider";
import { Toaster } from "sonner";
import AppBar from "~/components/app-bar";

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
              <Toaster richColors />

              <AppBar className="w-full"></AppBar>
              <div className="flex h-full pt-8">
                <Navigation className="w-1/6" />
                <main className="w-4/6">{children}</main>
                <div className=" w-1/6"></div>
              </div>
            </ThemeProvider>
          </SessionProvider>
        </TrpcProvider>
        {/* </ErrorBoundary> */}
      </body>
    </html>
  );
}
