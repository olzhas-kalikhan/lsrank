"use client"

import { type SortingState } from "@tanstack/react-table";
import { atom, useAtom } from "jotai";
import { useMemo } from "react";
import { AtomsHydrator } from "~/lib/utils";

export const sortingAtom = atom<SortingState>([]);
export type EditMode = "edit" | "view";
export type RowsModeModel = Record<string, EditMode>;
export const rowsModeModelAtom = atom<RowsModeModel>({});
export type RowsEditModel = Record<string, Record<string, unknown>>;
export const rowsEditModelAtom = atom<RowsEditModel>({});

export const useEditCellValue = <TValue,>(rowId: string, column: string) => {
  const cellEditAtom = useMemo(
    () =>
      atom(
        (get) => get(rowsEditModelAtom)[rowId]?.[column] as TValue,
        (_, set, newValue) => {
          set(rowsEditModelAtom, (prev) => ({
            ...prev,
            [rowId]: { ...prev[rowId], [column]: newValue },
          }));
        },
      ),
    [column, rowId],
  );

  return useAtom(cellEditAtom);
};

export function AtomsProvider({ children }: { children: React.ReactNode }) {
  return (
    <AtomsHydrator
      atomValues={[
        [sortingAtom, []],
        [rowsModeModelAtom, {}],
        [rowsEditModelAtom, {}],
      ]}
    >
      {children}
    </AtomsHydrator>
  );
}
