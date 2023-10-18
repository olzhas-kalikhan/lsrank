"use client";

import { createContext, useContext, useState } from "react";

export type EditModel<TData> = Record<string, TData>;
export type TableContextProps<TData> = {
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

export const TableProvider = <TData,>({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [editRowsModel, setEditRowsModel] = useState<EditModel<TData>>({});
  const [editModesModel, setEditModesModel] = useState<EditModel<boolean>>({});

  return (
    <TableContext.Provider
      value={{
        editRowsModel,
        setEditRowsModel,
        editModesModel,
        setEditModesModel,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
