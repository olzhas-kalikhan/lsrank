import { type Cell as CellType, flexRender } from "@tanstack/react-table";
import { TableCell, type TableCellProps } from "@components/ui/table";
import { type EditMode } from "./atoms-provider";

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
          : undefined
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
