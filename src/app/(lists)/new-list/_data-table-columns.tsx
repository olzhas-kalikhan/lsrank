"use client";

import { type CellContext, type ColumnDef } from "@tanstack/react-table";
import React from "react";
import { type UseFieldArrayReturn } from "react-hook-form";
import { useEditCellValue } from "~/app/_components/data-table";
import { DataTableActions } from "~/app/_components/data-table/actions";
import NumberInput from "~/app/_components/number-input";
import { Input } from "~/app/_components/ui/input";
import { isNumber } from "~/lib/utils";

export type ListItem = {
  _id: string;
  name: string;
  score: number;
};

export type FormDefaultValues = {
  listName: string;
  listItems: ListItem[];
};

const DataTableCellInput = ({ row }: CellContext<ListItem, unknown>) => {
  const [value, setValue] = useEditCellValue(row.id, "name");
  return (
    <Input
      value={(value as string) ?? ""}
      onChange={(e) => {
        setValue(e.target.value ?? "");
      }}
    />
  );
};

const DataTableCellNumberInput = (cell: CellContext<ListItem, unknown>) => {
  const [value, setValue] = useEditCellValue(cell.row.id, "score");
  return (
    <NumberInput
      value={(value as number) ?? null}
      onValueChange={(values) => {
        setValue(values.floatValue);
      }}
      defaultValue={cell.getValue() as string}
      isAllowed={(values) => {
        if (values.value === "") return true;
        if (
          values.floatValue === null ||
          values.floatValue === undefined ||
          !isNumber(values.floatValue)
        )
          return false;

        return values.floatValue >= 0 && values.floatValue <= 10;
      }}
    />
  );
};

const ListItemActions = ({
  row,
  editMode,
  table,
  remove,
  update,
}: CellContext<ListItem, unknown> &
  Pick<
    UseFieldArrayReturn<FormDefaultValues, "listItems">,
    "remove" | "update"
  >) => {
  return (
    <DataTableActions
      editMode={editMode}
      onEdit={() => {
        table.options.meta?.setRowEditMode(row.id, "edit");
      }}
      onDelete={() => {
        remove(row.index);
      }}
      onSave={() => {
        update(
          row.index,
          table.options.meta?.getRowEditValue(row.id) as ListItem,
        );
        table.options.meta?.setRowEditMode(row.id, "view");
      }}
      onCancel={() => {
        table.options.meta?.setRowEditMode(row.id, "view");
      }}
    />
  );
};

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
      const { editMode, cell } = cellContext;
      if (editMode === "edit") return <DataTableCellInput {...cellContext} />;
      return cell.getValue();
    },
  },
  {
    header: "Score",
    accessorKey: "score",
    cell: (cellContext) => {
      if (cellContext.editMode === "edit")
        return <DataTableCellNumberInput {...cellContext} />;
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
