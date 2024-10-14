import { type GameData } from "~/app/_components/games-combobox";

export type ListItemRowModel = {
  id: string;
  item: GameData | null;
  score: number;
};
