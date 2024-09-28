"use client";

import { type Row, type ColumnDef } from "@tanstack/react-table";
import { type inferProcedureOutput } from "@trpc/server";
import { ArrowUpRight, Trash } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { DataTable } from "~/app/_components/data-table";
import IconButton from "~/app/_components/icon-button";
import { type AppRouter } from "~/server/api/root";
import { api } from "~/trpc/react";

type UserWithList = NonNullable<
  inferProcedureOutput<AppRouter["list"]["getListsByUser"]>
>;

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
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-x-2">
          <RedirectActionButton row={row} />
          <DeleteListButton row={row} />;
        </div>
      );
    },
  },
];

export default function ListsDataTable({
  userWithList,
  userName,
}: {
  userWithList: UserWithList;
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
    />
  );
}
