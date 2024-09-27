import { api } from "~/trpc/server";
import ListsDataTable from "./_ListsDataTable";

export default async function Page({ params }: { params: { user: string } }) {
  const inputParams = { userName: params.user };
  const data = await api.list.getListsByUser(inputParams);

  void api.list.getListsByUser.prefetch(inputParams);

  if (!data?.lists) return null;
  return <ListsDataTable data={data.lists} userName={params.user} />;
}
