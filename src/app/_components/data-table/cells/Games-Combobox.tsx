import { type CellContext, type RowData } from "@tanstack/react-table";
import { useEditCellValue } from "../atoms-provider";
import GamesCombobox, { type GameData } from "../../games-combobox";

export default function CellGamesCombobox<T extends RowData, TValue>(
  cell: CellContext<T, TValue>,
) {
  const [value, setValue] = useEditCellValue<TValue>(
    cell.row.id,
    cell.column.id,
  );

  return <GamesCombobox value={value as GameData} onValueChange={setValue} />;
}
