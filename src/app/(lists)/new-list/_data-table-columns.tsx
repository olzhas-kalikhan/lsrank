"use client";

import { type ColumnDef } from "@tanstack/react-table";
import React from "react";
import { type UseFieldArrayReturn } from "react-hook-form";
import Image from "next/image";
import ListItemActions from "./_data-table-actions";
import { type FormDefaultValues, type ListItemRowModel } from "./_types";
import { CellGamesCombobox } from "~/app/_components/data-table";
import { type GameData } from "~/app/_components/games-combobox";
import CellScoreSelect from "~/app/_components/data-table/cells/score-select";

export const getDefaultColumns = (
  arrayMethods: Pick<
    UseFieldArrayReturn<FormDefaultValues, "listItems">,
    "remove" | "update"
  >,
): ColumnDef<ListItemRowModel>[] => [
  {
    header: "Name",
    accessorKey: "item",
    cell: (cellContext) => {
      if (cellContext.editMode === "edit")
        return <CellGamesCombobox {...cellContext} />;
      const gameData = cellContext.cell.getValue() as GameData;

      return (
        <div className="flex items-center">
          <Image
            className="mr-2 rounded-md"
            src={
              gameData?.cover?.url
                ? `https:${gameData?.cover?.url}`
                : "https://imageplaceholder.net/128x128/eeeeee/131313?text=N/A"
            }
            width={28}
            height={28}
            alt={gameData?.label ?? "Not Available"}
          />
          <span> {gameData?.label}</span>
        </div>
      );
    },
  },
  {
    header: "Score",
    accessorKey: "score",
    cell: (cellContext) => {
      if (cellContext.editMode === "edit")
        return <CellScoreSelect {...cellContext} />;
      return cellContext.cell.getValue();
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: (cell) => <ListItemActions {...cell} {...arrayMethods} />,
    size: 20,
    minSize: 20,
  },
];
