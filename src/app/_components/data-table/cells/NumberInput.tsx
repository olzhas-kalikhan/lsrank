import { type CellContext, type RowData } from "@tanstack/react-table";
import { useEditCellValue } from "../atoms-provider";
import NumberInput from "@components/number-input";
import { isNumber } from "~/lib/utils";

export default function DataTableCellNumberInput<T extends RowData, TValue>(
  cell: CellContext<T, TValue>,
) {
  const [value, setValue] = useEditCellValue<TValue>(cell.row.id, "score");

  return (
    <NumberInput
      value={(value as number) ?? null}
      onValueChange={(values) => {
        setValue(values.floatValue);
      }}
      defaultValue={cell.getValue() as number}
      isAllowed={(values) => {
        if (values.value === "") return true;
        if (
          values.floatValue === null ||
          values.floatValue === undefined ||
          !isNumber(values.floatValue)
        )
          return false;

        return values.floatValue >= 0 && values.floatValue <= 10;
      }}
    />
  );
}
