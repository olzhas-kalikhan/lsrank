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
  rowsEditModelAtom,
  rowsModeModelAtom,
  sortingAtom,
} from "./atoms-provider";
import { type TableRowProps } from "@components/ui/table";

declare module "@tanstack/table-core" {
  interface CellContext<TData extends RowData, TValue> {
    editMode?: EditMode;
  }
  interface TableMeta<TData extends RowData> {
    getRowEditMode: (rowId: string) => EditMode;
    setRowEditMode: (
      rowId: string,
      mode: EditMode,
      editValue?: Record<string, unknown>,
    ) => void;
    setRowEditValue: (rowId: string, rowValue: Record<string, unknown>) => void;
    setCellEditValue: (rowId: string, column: string, value: unknown) => void;
    getRowEditValue: (rowId: string) => Record<string, unknown> | undefined;
    getCellEditValue: (rowId: string, column: string) => unknown;
  }
}

const TableContext = createContext<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ({ table: Table<any> } & ExtraOptions) | null
>(null);

type ExtraOptions = {
  slots?: { toolbar?: React.ReactNode; footer?: React.ReactNode };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slotProps?: { row?: TableRowProps };
};

export type TableProviderProps<TData extends RowData> = MarkOptional<
  TableOptions<TData>,
  "getCoreRowModel"
> &
  ExtraOptions;

export function useTableContext() {
  const context = useContext(TableContext);
  if (!context) throw new Error("TableContext is not defined");
  return context;
}

export default function TableProvider<TData>({
  children,
  slots,
  slotProps,
  ...props
}: TableProviderProps<TData> & {
  children: React.ReactNode;
  slots?: { toolbar?: React.ReactNode };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slotProps?: { row?: any };
}) {
  const [sorting, setSorting] = useAtom(sortingAtom);
  const [rowsModeModel, setRowsModeModel] = useAtom(rowsModeModelAtom);
  const [rowsEditModel, setRowsEditModel] = useAtom(rowsEditModelAtom);

  const table = useReactTable<TData>({
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
    ...props,
    meta: {
      getRowEditMode: (rowId) => rowsModeModel?.[rowId] ?? "view",
      setRowEditMode: (rowId, mode, editValue) => {
        if (mode === "edit") {
          setRowsEditModel((prevModel) => {
            return {
              ...prevModel,
              [rowId]:
                editValue ??
                (table.getRow(rowId).original as Record<string, unknown>),
            };
          });
        }
        if (mode === "view") {
          setRowsEditModel((prevModel) => {
            if (!rowsEditModel[rowId]) return prevModel;
            const newModel = { ...prevModel };
            delete newModel[rowId];
            return newModel;
          });
        }

        setRowsModeModel({ ...rowsModeModel, [rowId]: mode });
      },
      setRowEditValue: (rowId, rowValue) => {
        setRowsEditModel((prevModel) => {
          return {
            ...prevModel,
            [rowId]: rowValue,
          };
        });
      },
      setCellEditValue: (rowId, column, value) => {
        setRowsEditModel((prevModel) => {
          return {
            ...prevModel,
            [rowId]: {
              ...prevModel[rowId],
              [column]: value,
            },
          };
        });
      },
      getRowEditValue: (rowId) => rowsEditModel?.[rowId],
      getCellEditValue: (rowId, column) => rowsEditModel?.[rowId]?.[column],
    },
  });

  return (
    <AtomsProvider>
      <TableContext.Provider value={{ table, slots, slotProps }}>
        {children}
      </TableContext.Provider>
    </AtomsProvider>
  );
}
