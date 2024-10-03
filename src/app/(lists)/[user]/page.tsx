import ListsDataTable from "./_lists-data-table";
import { api } from "~/trpc/server";

export default async function Page({ params }: { params: { user: string } }) {
  const inputParams = { userName: params.user };
  const data = await api.list.getLists(inputParams);

  void api.list.getLists.prefetch(inputParams);

  if (!data) return null;
  return <ListsDataTable userWithList={data} userName={params.user} />;
}
