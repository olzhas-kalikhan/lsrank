import { type Row as RowType } from "@tanstack/react-table";
import { TableRow } from "~/app/_components/ui/table";

export const Row = <TData,>({
  children,
  ...rowProps
}: RowType<TData> & { children: React.ReactNode }) => {
  return (
    <TableRow
      key={rowProps.id}
      data-state={rowProps.getIsSelected() && "selected"}
    >
      {children}
    </TableRow>
  );
};
