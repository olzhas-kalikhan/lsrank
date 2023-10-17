"use client";

import { trpcReact } from "~/utils/trpc";
import { DataTable } from "~/components/data-table";
import { columns } from "./columns";
import { type inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "~/server/api/root";

type ListItem = inferProcedureOutput<AppRouter["list"]["get"]>;

export const ListItemsDataTable = ({
  name,
  initialLists,
}: {
  name: string;
  initialLists: ListItem;
}) => {
  const { data } = trpcReact.list.get.useQuery(
    { name },
    { initialData: initialLists },
  );

  return <DataTable data={data?.[0]?.ListItem ?? []} columns={columns} />;
};
