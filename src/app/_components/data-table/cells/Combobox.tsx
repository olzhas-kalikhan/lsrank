import { type CellContext, type RowData } from "@tanstack/react-table";
import Combobox, { type ComboboxOption } from "../../combobox";
import { useEditCellValue } from "../atoms-provider";

export default function CellCombobox<T extends RowData, TValue>({
  options,
  ...cell
}: CellContext<T, TValue> & {
  options: ComboboxOption[];
}) {
  const [value, setValue] = useEditCellValue<TValue>(cell.row.id, "score");

  return (
    <Combobox
      options={options}
      value={value as ComboboxOption}
      onValueChange={setValue}
    />
  );
}
