import React from "react";
import { type ColumnDef, type CellContext } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import {
  ACTION_ICONS,
  ActionsWrapper,
  CellNumberInput,
  CellTextInput,
} from "~/app/_components/data-table";
import IconButton from "~/app/_components/icon-button";
import { api } from "~/trpc/react";

type ListItem = {
  id: string;
  name: string | null;
  score: number;
};

export const getDefaultColumns = (): ColumnDef<ListItem>[] => [
  {
    header: "Name",
    accessorKey: "name",
    cell: (cellContext) => {
      if (cellContext.editMode === "edit")
        return <CellTextInput {...cellContext} />;
      return cellContext.cell.getValue();
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
}: CellContext<ListItem, unknown>) {
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
              const newValues = table.options.meta?.getRowEditValue(
                row.id,
              ) as ListItem;
              await updateListItem(newValues);
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
