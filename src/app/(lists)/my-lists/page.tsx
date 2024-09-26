import { type ColumnDef } from "@tanstack/react-table";
import { type inferProcedureOutput } from "@trpc/server";
import { DataTable } from "~/app/_components/data-table";
import { type AppRouter } from "~/server/api/root";
import { api } from "~/trpc/server";

type List = inferProcedureOutput<AppRouter["list"]["getLists"]>[number];

const defaultColumns: ColumnDef<List>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  { accessorKey: "type", header: "Type" },
];

export default async function Page() {
  const lists = await api.list.getLists();
  return <DataTable columns={defaultColumns} data={lists} />;
}
