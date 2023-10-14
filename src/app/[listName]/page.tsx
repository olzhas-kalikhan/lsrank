import ListForm from "~/components/list-form";
import { trpcServer } from "~/server/api/root";

export default async function ListView({
  params: { listName },
}: {
  params: { listName: string };
}) {
  console.log("test", listName);
  const trpc = await trpcServer();
  const lists = await trpc.list.get({ name: decodeURIComponent(listName) });
  return (
    <div>
      My Post:<pre> {JSON.stringify(lists, null, 2)}</pre>
      <ListForm list={lists[0]} />
    </div>
  );
}
