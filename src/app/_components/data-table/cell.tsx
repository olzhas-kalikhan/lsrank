import { type Cell as CellType, flexRender } from "@tanstack/react-table";
import { type EditMode } from "./atoms-provider";
import { TableCell, type TableCellProps } from "@components/ui/table";

export const Cell = <TData, TValue>({
  cell,
  editMode,
  ...props
}: {
  cell: CellType<TData, TValue>;
  editMode: EditMode | undefined;
} & TableCellProps) => {
  return (
    <TableCell
      className={
        editMode === "edit" || cell.column.columnDef.id === "actions"
          ? "py-2"
          : "py-1"
      }
      style={{
        width: cell.column.getSize(),
      }}
      {...props}
    >
      {flexRender(
        cell.column.columnDef.cell,
        Object.assign(cell.getContext(), { editMode }),
      )}
    </TableCell>
  );
};
