"use client";

import { useParams } from "next/navigation";
import { type inferProcedureOutput } from "@trpc/server";
import { getDefaultColumns } from "./_data-table-columns";
import { DataTable } from "@components/data-table";
import { api } from "~/trpc/react";
import { type AppRouter } from "~/server/api/root";

export default function ListItemsDataTable({
  list,
}: {
  list: inferProcedureOutput<AppRouter["list"]["getList"]>;
}) {
  const params = useParams<{ user: string; listName: string }>();
  const { data } = api.list.getList.useQuery(
    {
      userName: params.user,
      listName: params.listName,
    },
    { initialData: list },
  );
  const listItems = data?.lists[0]?.listItems ?? [];

  return (
    <DataTable
      columns={getDefaultColumns()}
      data={listItems}
      getRowId={(row) => row.id}
    />
  );
}
