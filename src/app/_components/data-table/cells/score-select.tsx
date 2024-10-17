import { type CellContext, type RowData } from "@tanstack/react-table";
import ScoreSelect from "../../slider-select";
import { useEditCellValue } from "../atoms-provider";

export default function CellScoreSelect<T extends RowData, TValue>(
  cell: CellContext<T, TValue>,
) {
  const [value, setValue] = useEditCellValue<TValue>(
    cell.row.id,
    cell.column.id,
  );
  return <ScoreSelect value={value as number} onValueChange={setValue} />;
}
