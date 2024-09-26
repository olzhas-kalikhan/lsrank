"use client";

import React from "react";
import { Table } from "~/app/_components/ui/table";
import { Body } from "./body";
import { Headers } from "./headers";
import TableProvider, { type TableProviderProps } from "./table-provider";

export function DataTable<TData extends Record<string, unknown>>({
  slots,
  ...props
}: TableProviderProps<TData> & {
  slots?: { toolbar?: React.ReactNode };
}) {
  return (
    <TableProvider {...props}>
      <div className="relative w-full overflow-auto">
        {slots?.toolbar}
        <Table>
          <Headers />
          <Body />
        </Table>
      </div>
    </TableProvider>
  );
}
export * from "./utils";
export { HeaderCell } from "./header-cell";
