import { type Cell as CellType, flexRender } from "@tanstack/react-table";
import { TableCell } from "~/app/_components/ui/table";
import { type EditMode } from "./atoms-provider";

export const Cell = <TData, TValue>(
  cell: CellType<TData, TValue> & { editMode: EditMode | undefined },
) => {
  return (
    <TableCell
      style={{
        width: cell.column.getSize(),
      }}
      data-column={cell.column.columnDef.header ?? ""}
    >
      {flexRender(
        cell.column.columnDef.cell,
        Object.assign(cell.getContext(), { editMode: cell.editMode }),
      )}
    </TableCell>
  );
};
