import ListDataTable from "./_list-data-table";
import { api } from "~/trpc/server";

export default async function Page({
  params,
}: {
  params: { user: string; listName: string };
}) {
  const list = await api.list.getList({
    userName: params.user,
    listName: params.listName,
  });

  const listItems = list?.lists[0]?.listItems ?? [];

  return (
    <div>
      <ListDataTable data={listItems ?? []} />
    </div>
  );
}
