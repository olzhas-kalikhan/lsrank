import ListForm from "~/components/list-form";
import { ListItemsDataTable } from "~/components/list-items/data-table";
import { trpcServer } from "~/server/api/root";

export default async function ListView({
  params: { listName },
}: {
  params: { listName: string };
}) {
  const trpc = await trpcServer();
  const lists = await trpc.list.get({ name: decodeURIComponent(listName) });
  return (
    <div>
      <ListItemsDataTable
        name={decodeURIComponent(listName)}
        initialLists={lists}
      />
    </div>
  );
}
