"use client";

import { type ColumnDef } from "@tanstack/react-table";
import React from "react";
import { type UseFieldArrayReturn } from "react-hook-form";
import ListItemActions from "./_data-table-actions";
import { type FormDefaultValues, type ListItem } from "./_types";
import { CellNumberInput, CellTextInput } from "~/app/_components/data-table";

export const getDefaultColumns = (
  arrayMethods: Pick<
    UseFieldArrayReturn<FormDefaultValues, "listItems">,
    "remove" | "update"
  >,
): ColumnDef<ListItem>[] => [
  {
    header: "Name",
    accessorKey: "name",
    cell: (cellContext) => {
      if (cellContext.editMode === "edit")
        return <CellTextInput {...cellContext} />;
      return cellContext.cell.getValue();
    },
  },
  {
    header: "Score",
    accessorKey: "score",
    cell: (cellContext) => {
      if (cellContext.editMode === "edit")
        return <CellNumberInput {...cellContext} />;
      return cellContext.cell.getValue();
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: (cell) => <ListItemActions {...cell} {...arrayMethods} />,
    size: 20,
    minSize: 20,
  },
];
