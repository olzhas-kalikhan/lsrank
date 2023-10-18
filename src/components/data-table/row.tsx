import { type Row as RowType } from "@tanstack/react-table";
import { TableRow } from "~/components/ui/table";

export type GetRowPropsFn<TData> = (
  row: RowType<TData>,
  i: number,
) => React.HTMLAttributes<HTMLTableRowElement>;

export const Row = <TData,>(
  props: RowType<TData> & {
    children: React.ReactNode;
    getRowProps?: GetRowPropsFn<TData>;
  },
) => {
  const { children, getRowProps, ...row } = props;

  return (
    <TableRow
      key={row.id}
      data-state={row.getIsSelected() && "selected"}
      {...getRowProps?.(row, row.index)}
    >
      {children}
    </TableRow>
  );
};
