"use client";

import { type CellContext, type ColumnDef } from "@tanstack/react-table";
import React from "react";
import { type UseFieldArrayReturn } from "react-hook-form";
import {
  CellNumberInput,
  CellTextInput,
  useEditCellValue,
} from "~/app/_components/data-table";
import {
  ACTION_ICONS,
  ActionsWrapper,
  DataTableActions,
} from "~/app/_components/data-table/actions";
import IconButton from "~/app/_components/icon-button";
import NumberInput from "~/app/_components/number-input";
import { Input } from "~/app/_components/ui/input";
import { isNumber } from "~/lib/utils";
import { FormDefaultValues, ListItem } from "./_types";
import ListItemActions from "./_data-table-actions";

export const getDefaultColumns = (
  arrayMethods: Pick<
    UseFieldArrayReturn<FormDefaultValues, "listItems">,
    "remove" | "update"
  >,
): ColumnDef<ListItem>[] => [
  { header: "ID", accessorKey: "_id" },
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
