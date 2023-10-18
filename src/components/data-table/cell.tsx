import { type Cell as CellType, flexRender } from "@tanstack/react-table";
import { TableCell } from "~/components/ui/table";

export const Cell = <TData, TValue>(cell: CellType<TData, TValue>) => {
  return (
    <TableCell
      style={{
        width: cell.column.getSize(),
      }}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  );
};
