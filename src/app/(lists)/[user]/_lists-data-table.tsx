"use client";

import { type Row, type ColumnDef } from "@tanstack/react-table";
import { type inferProcedureOutput } from "@trpc/server";
import { ArrowUpRight, Trash } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { DataTable } from "~/app/_components/data-table";
import IconButton from "~/app/_components/icon-button";
import { Button } from "~/app/_components/ui/button";
import { type AppRouter } from "~/server/api/root";
import { api } from "~/trpc/react";

type List = NonNullable<
  inferProcedureOutput<AppRouter["list"]["getListsByUser"]>
>["lists"][number];

const RedirectActionButton = ({ row }: { row: Row<List> }) => {
  const { user } = useParams<{ user: string }>();

  return (
    <Link href={`/${user}/${row.original.name}`}>
      <IconButton icon={<ArrowUpRight />} />
    </Link>
  );
};

const DeleteListButton = ({ row }: { row: Row<List> }) => {
  const utils = api.useUtils();
  const { user } = useParams<{ user: string }>();
  const { mutate: deleteList } = api.list.deleteList.useMutation({
    onSuccess: async () => {
      await utils.list.getListsByUser.invalidate({ userName: user });
    },
  });

  return (
    <IconButton
      icon={<Trash />}
      onClick={() => {
        deleteList({ id: row.id });
      }}
    />
  );
};

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
  {
    header: "Number of items",
    accessorFn: ({ listItems }) => listItems.length,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-x-2">
          <RedirectActionButton row={row} />
          <DeleteListButton row={row} />
        </div>
      );
    },
  },
];

export default function ListsDataTable({
  userWithList,
  userName,
}: {
  userWithList: NonNullable<
    inferProcedureOutput<AppRouter["list"]["getListsByUser"]>
  >;
  userName: string;
}) {
  const { data } = api.list.getListsByUser.useQuery(
    { userName: userName },
    { initialData: userWithList },
  );

  return (
    <DataTable
      data={data?.lists ?? []}
      columns={defaultColumns}
      getRowId={(row) => row.id}
      slots={{
        toolbar: (
          <div className="mb-2 flex justify-between p-1">
            <div></div>
            <div className="flex gap-2">
              <Button asChild>
                <Link href="/new-list">Create List</Link>
              </Button>
            </div>
          </div>
        ),
      }}
    />
  );
}
