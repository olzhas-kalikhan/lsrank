import { type Row as RowType } from "@tanstack/react-table";
import { type DefaultValues, FormProvider, useForm } from "react-hook-form";
import { TableRow } from "~/components/ui/table";
import { useTableContext } from "./utils";

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
  const { options } = useTableContext<TData>();
  const isEditMode = options.meta?.editModesModel[row.id];
  const editable = options.meta?.editable;
  const editRow =
    editable && isEditMode ? (
      <EditRowWrapper initialValue={row.original}>{children}</EditRowWrapper>
    ) : (
      children
    );

  return (
    <TableRow
      key={row.id}
      data-state={row.getIsSelected() && "selected"}
      className={isEditMode ? "!border-b border-b-gray-500 hover:border-b-gray-400 hover:bg-transparent transition-none" : ""}
      {...getRowProps?.(row, row.index)}
    >
      {editRow}
    </TableRow>
  );
};

const EditRowWrapper = <TData,>({
  children,
  initialValue,
}: {
  initialValue: TData;
  children: React.ReactNode;
}) => {
  const formMethods = useForm({
    defaultValues: initialValue as DefaultValues<TData>,
  });
  return <FormProvider {...formMethods}>{children}</FormProvider>;
};
