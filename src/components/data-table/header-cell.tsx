import { type Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "~/components/ui/button";

export const HeaderCell = <TData, TValue>({
  column,
  label,
}: {
  label: string;
  column: Column<TData, TValue>;
}) => {
  const isSorted = column.getIsSorted();

  return (
    <Button
      variant="link"
      className="px-0"
      onClick={() => {
        if (isSorted === "desc") column.clearSorting();
        else column.toggleSorting(isSorted === "asc");
      }}
    >
      {label}
      {isSorted === false && <ArrowDown className="invisible ml-2 h-4 w-4" />}
      {isSorted === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
      {isSorted === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
    </Button>
  );
};
