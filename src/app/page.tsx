import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <>
      getServerSession Result
      {session?.user?.name ? (
        <div>{session?.user?.name}</div>
      ) : (
        <div>Not logged in</div>
      )}
    </>
  );
}
