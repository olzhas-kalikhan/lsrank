import { type Cell as CellType, flexRender } from "@tanstack/react-table";
import { TableCell } from "~/app/_components/ui/table";
import { type EditMode } from "./atoms-provider";

export const Cell = <TData, TValue>({
  editMode = "view",
  ...cell
}: CellType<TData, TValue> & { editMode: EditMode | undefined }) => {
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
