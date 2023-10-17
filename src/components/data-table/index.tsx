"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type SortingState,
  getSortedRowModel,
  type Row,
  type TableOptions,
  type Table as TableType,
} from "@tanstack/react-table";
import React, { createContext, useContext, useState } from "react";
import { type MarkOptional } from "ts-essentials";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

interface DataTableProps<TData>
  extends MarkOptional<TableOptions<TData>, "getCoreRowModel"> {
  getRowProps?: (
    row: Row<TData>,
    i: number,
  ) => React.HTMLAttributes<HTMLTableRowElement>;
}

type EditModel<TData> = Record<string, TData>;
type TableContextProps<TData> = {
  editRowsModel: EditModel<TData>;
  setEditRowsModel: React.Dispatch<React.SetStateAction<EditModel<TData>>>;
  editModesModel: EditModel<boolean>;
  setEditModesModel: React.Dispatch<React.SetStateAction<EditModel<boolean>>>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TableContext = createContext<TableContextProps<any>>({
  editRowsModel: {},
  setEditRowsModel: () => ({}),
  editModesModel: {},
  setEditModesModel: () => ({}),
});
export const useTableContext = <TData,>() =>
  useContext<TableContextProps<TData>>(TableContext);

const Headers = <TData,>({
  getHeaderGroups,
}: Pick<TableType<TData>, "getHeaderGroups">) => {
  return (
    <TableHeader>
      {getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} className="hover:bg-transparent">
          {headerGroup.headers.map((header) => {
            return (
              <TableHead
                key={header.id}
                style={{
                  width: header.column.getSize(),
                }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};

const Body = <TData,>({
  getRowModel,
  getRowProps,
}: Pick<TableType<TData>, "getRowModel"> &
  Pick<DataTableProps<TData>, "getRowProps">) => {
  const rowModel = getRowModel();
  return (
    <TableBody>
      {rowModel.rows?.length ? (
        rowModel.rows.map((row, i) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
            {...getRowProps?.(row, i)}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                style={{
                  width: cell.column.getSize(),
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell className="h-24 text-center">No results.</TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export function DataTable<TData>({
  columns,
  data,
  getRowProps,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [editRowsModel, setEditRowsModel] = useState<EditModel<TData>>({});
  const [editModesModel, setEditModesModel] = useState<EditModel<boolean>>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
  });

  return (
    <TableContext.Provider
      value={{
        editRowsModel,
        setEditRowsModel,
        editModesModel,
        setEditModesModel,
      }}
    >
      <Table>
        <Headers getHeaderGroups={table.getHeaderGroups} />
        <Body getRowModel={table.getRowModel} getRowProps={getRowProps} />
      </Table>
    </TableContext.Provider>
  );
}

export { HeaderCell } from "./header-cell";
