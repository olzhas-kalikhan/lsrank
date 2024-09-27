import { type Row as RowType } from "@tanstack/react-table";
import { TableRow, type TableRowProps } from "~/app/_components/ui/table";

export const Row = <TData,>({
  children,
  row,
  ...props
}: {
  row: RowType<TData>;
  children: React.ReactNode;
} & TableRowProps) => {
  return (
    <TableRow
      key={row.id}
      data-state={row.getIsSelected() && "selected"}
      data-row-id={row.id}
      data-row-index={row.index}
      {...props}
    >
      {children}
    </TableRow>
  );
};
