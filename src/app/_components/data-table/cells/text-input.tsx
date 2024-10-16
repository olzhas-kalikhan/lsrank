import { type CellContext, type RowData } from "@tanstack/react-table";
import { useEditCellValue } from "../atoms-provider";
import { Input } from "@components/ui/input";

export default function CellTextInput<T extends RowData, TValue>({
  row,
  column,
}: CellContext<T, TValue>) {
  const [value, setValue] = useEditCellValue<TValue>(row.id, column.id);

  return (
    <Input
      value={(value as string) ?? ""}
      onChange={(e) => {
        setValue(e.target.value ?? "");
      }}
    />
  );
}
