import { type Row as RowType } from "@tanstack/react-table";
export * from "@tanstack/table-core";

declare module "@tanstack/table-core" {
  export type EditModesModel = Record<string, boolean>;
  export type EditRowsModel<TData extends RowData> = Record<string, TData>;
  export type GetRowPropsFn<TData> = (
    row: RowType<TData>,
    i: number,
  ) => React.HTMLAttributes<HTMLTableRowElement>;
  export type RowProps<TData> = RowType<TData> & {
    children: React.ReactNode;
    getRowProps?: GetRowPropsFn<TData>;
  };
  interface TableMeta<TData extends RowData> {
    editable?: boolean;
    editModesModel?: EditModesModel;
    setRowEditMode?: (id: string, mode: boolean) => void;
    getRowEditMode?: (id: string) => boolean;
    components?: {
      Row?: React.ComponentType<RowType<TData> & { children: React.ReactNode }>;
      Cell?: React.ComponentType<{ children: React.ReactNode }>;
    };
  }
}
