"use client";

import { trpcReact } from "~/utils/trpc";
import { DataTable } from "~/components/data-table";
import { columns } from "./columns";
import { type inferProcedureOutput } from "@trpc/server";
import { type AppRouter } from "~/server/api/root";

type ListItem = inferProcedureOutput<AppRouter["list"]["get"]>;

export const ListItemsDataTable = ({
  listId,
  initialLists,
}: {
  listId: string;
  initialLists: ListItem;
}) => {
  const { data } = trpcReact.list.get.useQuery(
    { id: listId },
    { initialData: initialLists },
  );

  return (
    <DataTable data={data?.ListItem ?? []} columns={columns} editable />
  );
};
