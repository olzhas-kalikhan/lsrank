import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type WritableAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function AtomsHydrator({
  atomValues,
  children,
}: {
  atomValues: Iterable<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly [WritableAtom<unknown, [any], unknown>, unknown]
  >;
  children: React.ReactNode;
}) {
  useHydrateAtoms(new Map(atomValues));
  return children;
}

export function isNumber(value: number): value is number {
  return typeof value === "number" && !isNaN(value);
}
