import ListItemsDataTable from "./_list-items-data-table";
import { api } from "~/trpc/server";

export default async function Page({
  params,
}: {
  params: { user: string; listName: string };
}) {
  const inputParams = {
    userName: params.user,
    listName: params.listName,
  };
  const list = await api.list.getList(inputParams);

  void api.list.getList.prefetch(inputParams);

  return <ListItemsDataTable list={list} />;
}
