import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type WritableAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { AnyFunction } from "ts-essentials";
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

type RemoveUndefined<Type> = {
  [Property in keyof Type as Type[Property] extends undefined
    ? never
    : Property]: Type[Property];
};

export function getDefinedPropsObj<T extends Record<string, unknown>>(
  obj: T,
): RemoveUndefined<T> {
  const newObj = { ...obj };
  Object.keys(newObj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });
  return newObj as RemoveUndefined<T>;
}

export const throttle = <T extends AnyFunction>(func: T, delay: number) => {
  let prev = 0;
  return (...args: Parameters<T>) => {
    const now = new Date().getTime();

    if (now - prev > delay) {
      prev = now;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return func(...args);
    }
  };
};

export const debounce = <T extends AnyFunction>(fn: T, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args) as T, ms);
  };
};
