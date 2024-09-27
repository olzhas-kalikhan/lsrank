"use client";

import React from "react";
import { Table } from "~/app/_components/ui/table";
import { Body } from "./body";
import { Headers } from "./headers";
import TableProvider, { type TableProviderProps } from "./table-provider";

export function DataTable<TData extends Record<string, unknown>>(
  props: TableProviderProps<TData>,
) {
  return (
    <TableProvider {...props}>
      <div className="relative w-full overflow-auto">
        {props.slots?.toolbar}
        <Table>
          <Headers />
          <Body />
        </Table>
      </div>
    </TableProvider>
  );
}
export { useEditCellValue } from "./atoms-provider";
export { useTableContext } from "./table-provider";
export * from "./utils";
export { HeaderCell } from "./header-cell";
