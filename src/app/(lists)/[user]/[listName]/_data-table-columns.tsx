import React from "react";
import { type ColumnDef, type CellContext } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  ACTION_ICONS,
  ActionsWrapper,
  CellNumberInput,
  CellGamesCombobox,
} from "~/app/_components/data-table";
import IconButton from "~/app/_components/icon-button";
import { api } from "~/trpc/react";
import { type GameData } from "~/app/_components/games-combobox";

export type ListItemRowModel = {
  id: string;
  item: GameData | null;
  score: number;
};

export const defaultColumns: ColumnDef<ListItemRowModel>[] = [
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
            alt={gameData.label}
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
        return <CellNumberInput {...cellContext} />;
      return cellContext.cell.getValue();
    },
  },
  {
    id: "actions",
    cell: (cell) => <ListItemsActions {...cell} />,
    size: 20,
    minSize: 20,
  },
];

export function ListItemsActions({
  editMode,
  row,
  table,
}: CellContext<ListItemRowModel, unknown>) {
  const utils = api.useUtils();
  const params = useParams<{ listName: string; user: string }>();

  const { mutateAsync: deleteListItem, isPending: isDeletePending } =
    api.listItem.deleteListItem.useMutation({
      onSuccess: () => {
        void utils.list.getList.invalidate({
          listName: params.listName,
          userName: params.user,
        });
      },
    });
  const { mutateAsync: updateListItem, isPending: isUpdatePending } =
    api.listItem.updateListItem.useMutation({
      onSuccess: () => {
        void utils.list.getList.invalidate({
          listName: params.listName,
          userName: params.user,
        });
      },
    });

  return (
    <ActionsWrapper>
      {editMode === "view" && (
        <>
          <IconButton
            icon={<ACTION_ICONS.Edit />}
            onClick={() => {
              table.options.meta?.setRowEditMode(row.id, "edit");
            }}
          />
          <IconButton
            icon={<ACTION_ICONS.Delete />}
            isLoading={isDeletePending}
            onClick={() => {
              void deleteListItem({ id: row.id });
            }}
          />
        </>
      )}
      {editMode === "edit" && (
        <>
          <IconButton
            icon={<ACTION_ICONS.Save />}
            isLoading={isUpdatePending}
            onClick={async () => {
              const { item, ...rest } = table.options.meta?.getRowEditValue(
                row.id,
              ) as ListItemRowModel;
              if (!item) return;
              await updateListItem({
                name: item.label,
                meta_id: item.value,
                meta_pic_url: item?.cover?.url ?? null,
                ...rest,
              });
              table.options.meta?.setRowEditMode(row.id, "view");
            }}
          />
          <IconButton
            icon={<ACTION_ICONS.Cancel />}
            onClick={() => {
              table.options.meta?.setRowEditMode(row.id, "view");
            }}
          />
        </>
      )}
    </ActionsWrapper>
  );
}
