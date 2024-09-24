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
      <Table>
        <Headers />
        <Body />
      </Table>
    </TableProvider>
  );
}
export { HeaderCell } from "./header-cell";
