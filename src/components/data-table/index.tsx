"use client";

import {
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  type Row as RowType,
  type TableOptions,
  type EditModesModel,
  type EditRowsModel,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { type MarkOptional } from "ts-essentials";
import { Table } from "~/components/ui/table";
import { Body } from "./body";
import { Headers } from "./headers";
import { TableContext } from "./utils";

interface DataTableProps<TData>
  extends MarkOptional<TableOptions<TData>, "getCoreRowModel"> {
  editable?: boolean;
  getRowProps?: (
    row: RowType<TData>,
    i: number,
  ) => React.HTMLAttributes<HTMLTableRowElement>;
}

export function DataTable<TData extends Record<string, unknown>>({
  columns,
  data,
  editable,
  getRowProps,
  ...props
}: DataTableProps<TData>) {
  const [editModesModel, setEditModesModel] = useState<EditModesModel>({});
  const [editRowsModel, setEditRowsModel] = useState<EditRowsModel<TData>>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    ...props,
  });
  const [state, setState] = useState(table.initialState);

  // Override the state managers for the table to your own
  table.setOptions((prev) => ({
    ...prev,
    state,
    onStateChange: setState,
    getRowId: (originalRow, i) =>
      typeof originalRow?.id === "string" ? originalRow?.id : i.toString(),
    meta: {
      ...prev.meta,
      editable,
      editModesModel,
      setRowEditMode: (id: string, mode: boolean) => {
        setEditModesModel((prev) => {
          if (mode) return { ...prev, [id]: mode };
          if (!prev[id]) return prev;
          const newModel = { ...prev };
          delete newModel[id];
          return newModel;
        });
      },
      getRowEditMode: (id) => editModesModel[id] ?? false,
    },
  }));

  return (
    <TableContext.Provider value={table}>
      <Table>
        <Headers getHeaderGroups={table.getHeaderGroups} />
        <Body getRowModel={table.getRowModel} getRowProps={getRowProps} />
      </Table>
    </TableContext.Provider>
  );
}
export { HeaderCell } from "./header-cell";
