"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type inferProcedureOutput } from "@trpc/server";
import { type AppRouter } from "~/server/api/root";
import { Button } from "~/components/ui/button";
import { CircleDashed, Trash } from "lucide-react";
import { trpcReact } from "~/utils/trpc";
import { toast } from "sonner";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ListRow = inferProcedureOutput<
  AppRouter["list"]["getMany"]
>[number];
export const columns: ColumnDef<ListRow>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "_count",
    header: "List Items",
    cell: ({ getValue }) => getValue<ListRow["_count"]>().ListItem,
    sortingFn: (rowA, rowB, columnId) =>
      rowA.getValue<ListRow["_count"]>(columnId).ListItem -
      rowB.getValue<ListRow["_count"]>(columnId).ListItem,
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
  const { mutate: deleteList, isLoading: isDeleting } =
    trpcReact.list.delete.useMutation({
      onSuccess: async ({ name }) => {
        await utils.list.getMany.invalidate();
        toast.success(`List "${name}" was deleted`);
      },
    });
  return (
    <Button
      variant="secondary"
      tabIndex={-1}
      className="rounded-full px-2"
      onClick={(e) => {
        e.stopPropagation();
        deleteList({ listId });
      }}
    >
      {isDeleting ? <CircleDashed className="animate-spin" /> : <Trash />}
    </Button>
  );
};
