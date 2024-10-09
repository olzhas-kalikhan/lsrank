import { type inferProcedureInput } from "@trpc/server";
import { type GameData } from "~/app/_components/games-combobox";
import { type AppRouter } from "~/server/api/root";

export type ListItemRowModel = {
  _id: string;
  item: GameData | null;
  score: number;
};

export type NewListReqBody = inferProcedureInput<
  AppRouter["list"]["createList"]
>;

export type FormDefaultValues = {
  listName: string;
  listItems: ListItemRowModel[];
};
