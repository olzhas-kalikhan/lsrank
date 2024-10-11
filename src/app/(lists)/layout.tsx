import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function ListsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session) redirect("/");

  return <section className="container mx-auto">{children}</section>;
}
