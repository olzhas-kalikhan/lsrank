import { CellContext, RowData } from "@tanstack/react-table";
import { useEditCellValue } from "../atoms-provider";
import { Input } from "@components/ui/input";

export default function CellTextInput<T extends RowData, TValue>({
  row,
}: CellContext<T, TValue>) {
  const [value, setValue] = useEditCellValue<TValue>(row.id, "name");

  return (
    <Input
      value={(value as string) ?? ""}
      onChange={(e) => {
        setValue(e.target.value ?? "");
      }}
    />
  );
}
