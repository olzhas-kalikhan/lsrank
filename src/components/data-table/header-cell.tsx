import { type SortDirection, flexRender, type Header } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "~/components/ui/button";

const getIcon = (isSorted: false | SortDirection) => {
  switch (isSorted) {
    case "asc":
      return <ArrowUp className="ml-2 h-4 w-4" />;
    case "desc":
      return <ArrowDown className="ml-2 h-4 w-4" />;
    default:
      return <ArrowDown className="invisible ml-2 h-4 w-4" />;
  }
};

export const HeaderCell = <TData, TValue>({
  column,
  getContext,
}: Header<TData, TValue>) => {
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
      {flexRender(column.columnDef.header, getContext())}
      {getIcon(isSorted)}
    </Button>
  );
};
