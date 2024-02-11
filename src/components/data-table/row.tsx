import { type RowProps } from "@tanstack/react-table";
import { TableRow } from "~/components/ui/table";
import { useTableContext } from "./utils";

export const Row = <TData,>(props: RowProps<TData>) => {
  const { children, getRowProps, ...row } = props;
  const { options } = useTableContext<TData>();
  const isEditMode = options.meta?.editModesModel?.[row.id];
  const Component = options.meta?.components?.Row;
  const rowContent = Component ? <Component {...props} /> : children;

  return (
    <TableRow
      key={row.id}
      data-state={row.getIsSelected() && "selected"}
      className={
        isEditMode
          ? "!border-b border-b-gray-500 transition-none hover:border-b-gray-400 hover:bg-transparent"
          : ""
      }
      {...getRowProps?.(row, row.index)}
    >
      {rowContent}
    </TableRow>
  );
};
