import { ListItemsDataTable } from "~/components/list-items/data-table";
import NewListItem from "~/components/new-list-item";
import { trpcServer } from "~/server/api/root";

export default async function ListView({
  params: { listId },
}: {
  params: { listId: string };
}) {
  const trpc = await trpcServer();
  const list = await trpc.list.get({ id: listId });
  return (
    <div>
      <h1 className="text-3xl mb-3">{list?.name}</h1>
      <NewListItem listId={listId} />
      <ListItemsDataTable listId={listId} initialLists={list} />
    </div>
  );
}
