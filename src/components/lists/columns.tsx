"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type inferProcedureOutput } from "@trpc/server";
import Link from "next/link";
import { type AppRouter } from "~/server/api/root";
import { Button } from "~/components/ui/button";
import { Trash, XCircle } from "lucide-react";
import { trpcReact } from "~/utils/trpc";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ListRow = inferProcedureOutput<
  AppRouter["list"]["getMany"]
>[number];
export const columns: ColumnDef<ListRow>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue, row: { id } }) => {
      const value = getValue() as string;
      return (
        <Link
          href={`/${id}`}
          className="font-medium transition-colors hover:text-primary hover:underline"
        >
          {value}
        </Link>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "_count",
    header: "List Items",
    cell: ({ getValue }) => getValue<ListRow["_count"]>().ListItem,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row: { original }, table }) => (
      <DeleteListButton listId={original.id} />
    ),

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
      <Trash />
    </Button>
  );
};
