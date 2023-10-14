"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type inferProcedureOutput } from "@trpc/server";
import Link from "next/link";
import { type AppRouter } from "~/server/api/root";
import { Button } from "~/components/ui/button";
import { HeaderCell } from "~/components/data-table";
import { XCircle } from "lucide-react";
import { trpcReact } from "~/utils/trpc";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ListRow = inferProcedureOutput<AppRouter["list"]["getMany"]>[number];
export const columns: ColumnDef<ListRow>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <HeaderCell {...{ column, label: "Name" }} />,
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return (
        <Link
          href={`/${value}`}
          className="font-medium transition-colors hover:text-primary hover:underline"
        >
          {value}
        </Link>
      );
    },
  },
  {
    accessorKey: "type",

    header: ({ column }) => <HeaderCell {...{ column, label: "Type" }} />,
  },
  {
    accessorKey: "_count",
    header: ({ column }) => <HeaderCell {...{ column, label: "List Items" }} />,
    cell: ({ getValue }) => getValue<ListRow["_count"]>().ListItem,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row: { original } }) => <DeleteListButton listId={original.id} />,

    size: 20,
    minSize: 20,
  },
];

const DeleteListButton = ({ listId }: { listId: string }) => {
  const utils = trpcReact.useContext();
  const { mutate } = trpcReact.list.delete.useMutation({
    onSuccess: () => {
      void utils.list.get.invalidate();
    },
  });
  return (
    <Button
      variant="secondary"
      tabIndex={-1}
      className="rounded-full px-2"
      onClick={(e) => {
        e.stopPropagation();
        mutate({ listId });
      }}
    >
      <XCircle />
    </Button>
  );
};
