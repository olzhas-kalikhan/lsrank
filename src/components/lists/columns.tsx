"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type inferProcedureOutput } from "@trpc/server";
import Link from "next/link";
import { type AppRouter } from "~/server/api/root";
import { Button } from "~/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ListRow = inferProcedureOutput<AppRouter["list"]["get"]>[number];
export const columns: ColumnDef<ListRow>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant="link"
          className="px-0"
          onClick={() => {
            if (isSorted === "desc") column.clearSorting();
            else column.toggleSorting(isSorted === "asc");
          }}
        >
          Name
          {isSorted === false && (
            <ArrowDown className="invisible ml-2 h-4 w-4" />
          )}
          {isSorted === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
          {isSorted === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
        </Button>
      );
    },
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

    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          className="px-0"
          variant="link"
          onClick={() => {
            if (isSorted === "desc") column.clearSorting();
            else column.toggleSorting(isSorted === "asc");
          }}
        >
          Type
          {isSorted === false && (
            <ArrowDown className="invisible ml-2 h-4 w-4" />
          )}
          {isSorted === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
          {isSorted === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
        </Button>
      );
    },
  },
  {
    accessorKey: "_count",
    header: "List Items",
    cell: ({ getValue }) => getValue<ListRow["_count"]>().ListItem,
  },
];
