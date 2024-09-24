import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type RowData,
  type TableOptions,
  type Table,
} from "@tanstack/react-table";
import { useAtom } from "jotai";
import { createContext, useContext } from "react";
import { type MarkOptional } from "ts-essentials";
import {
  AtomsProvider,
  type EditMode,
  rowsEditModeAtom,
  sortingAtom,
} from "./atoms-provider";

declare module "@tanstack/table-core" {
  interface TableMeta<TData extends RowData> {
    getRowEditMode: (rowId: string) => EditMode;
    setRowEditMode: (rowId: string, mode: EditMode) => void;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TableContext = createContext<Table<any> | null>(null);

export type TableProviderProps<TData extends RowData> = MarkOptional<
  TableOptions<TData>,
  "getCoreRowModel"
>;

export function useTableContext() {
  const context = useContext(TableContext);
  if (!context) throw new Error("TableContext is not defined");
  return context;
}

export default function TableProvider<TData>({
  children,
  ...props
}: TableProviderProps<TData> & {
  children: React.ReactNode;
}) {
  const [sorting, setSorting] = useAtom(sortingAtom);
  const [rowsEditMode, setRowsEditMode] = useAtom(rowsEditModeAtom);

  const table = useReactTable<TData>({
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
    ...props,
    meta: {
      getRowEditMode: (rowId) => rowsEditMode?.[rowId] ?? "view",
      setRowEditMode: (rowId, mode) => {
        setRowsEditMode({ ...rowsEditMode, [rowId]: mode });
      },
    },
  });

  return (
    <AtomsProvider>
      <TableContext.Provider value={table}>{children}</TableContext.Provider>
    </AtomsProvider>
  );
}
