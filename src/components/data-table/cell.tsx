import { type Cell as CellType, flexRender } from "@tanstack/react-table";
import { TableCell } from "~/components/ui/table";
import { cn } from "~/utils/ui";

export const Cell = <TData, TValue>(cell: CellType<TData, TValue>) => {
  const meta = cell.getContext().table.options.meta;
  const isEdit = meta?.editModesModel[cell.row.id];
  return (
    <TableCell
      className={cn(
        isEdit && cell.column.id !== "actions" ? "p-0" : "",
        "h-[50px]",
      )}
      style={{
        width: cell.column.getSize(),
      }}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  );
};
