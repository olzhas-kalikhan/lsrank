"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type inferProcedureOutput } from "@trpc/server";
import { useRouter } from "next/navigation";
import { DataTable } from "~/app/_components/data-table";
import { type AppRouter } from "~/server/api/root";

type List = NonNullable<
  inferProcedureOutput<AppRouter["list"]["getListsByUser"]>
>["lists"][number];

const defaultColumns: ColumnDef<List>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Type",
    accessorKey: "type",
  },
];

export default function ListsDataTable({ data, userName }: { data: List[], userName:string }) {
  const router = useRouter();

  return (
    <DataTable
      data={data}
      columns={defaultColumns}
      getRowId={(row) => row.id}
      slotProps={{
        row: {
          onClick: (e) => {
            const { rowIndex } = e.currentTarget.dataset;
            if (!rowIndex) return;

            router.push(`/${userName}/${data[parseInt(rowIndex)]?.name}`);
          },
        },
      }}
    />
  );
}
