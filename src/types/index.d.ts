export * from "@tanstack/table-core";

declare module "@tanstack/table-core" {
  export type EditModesModel = Record<string, boolean>;
  export type EditRowsModel<TData extends RowData> = Record<string, TData>;
  interface TableMeta<TData extends RowData> {
    editable?: boolean;
    editModesModel: EditModesModel;
    setRowEditMode: (id: string, mode: boolean) => void;
    getRowEditMode: (id: string) => boolean;
  }
}
