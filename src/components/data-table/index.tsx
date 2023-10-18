"use client";

import {
  getCoreRowModel,
  useReactTable,
  type SortingState,
  getSortedRowModel,
  type Row as RowType,
  type TableOptions,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { type MarkOptional } from "ts-essentials";
import { Table } from "~/components/ui/table";
import { TableProvider } from "./table-provider";
import { Body } from "./body";
import { Headers } from "./headers";

interface DataTableProps<TData>
  extends MarkOptional<TableOptions<TData>, "getCoreRowModel"> {
  getRowProps?: (
    row: RowType<TData>,
    i: number,
  ) => React.HTMLAttributes<HTMLTableRowElement>;
}

export function DataTable<TData>({
  columns,
  data,
  getRowProps,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
  });

  return (
    <TableProvider>
      <Table>
        <Headers getHeaderGroups={table.getHeaderGroups} />
        <Body getRowModel={table.getRowModel} getRowProps={getRowProps} />
      </Table>
    </TableProvider>
  );
}
export { useTableContext } from "./table-provider";
export { HeaderCell } from "./header-cell";
