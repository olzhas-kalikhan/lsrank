import ListItemsDataTable from "./_list-items-data-table";
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

  return <ListItemsDataTable list={list} />;
}
