import { createContext, useContext } from "react";
import { type RowData, type Table as TableType } from "@tanstack/react-table";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TableContext = createContext<TableType<any> | null>(null);

export const useTableContext = <TData extends RowData>() => {
  const context = useContext(TableContext);
  if (!context) throw new Error("Table Context is undefined");
  return context as TableType<TData>;
};
