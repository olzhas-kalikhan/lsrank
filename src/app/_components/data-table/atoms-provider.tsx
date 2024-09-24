import { type SortingState } from "@tanstack/react-table";
import { atom } from "jotai";
import { AtomsHydrator } from "~/lib/utils";

export const sortingAtom = atom<SortingState>([]);
export type EditMode = "edit" | "view";
export type RowsEditMode = Record<string, EditMode>;
export const rowsEditModeAtom = atom<RowsEditMode>({});

export function AtomsProvider({ children }: { children: React.ReactNode }) {
  return (
    <AtomsHydrator
      atomValues={[
        [sortingAtom, []],
        [rowsEditModeAtom, {}],
      ]}
    >
      {children}
    </AtomsHydrator>
  );
}
