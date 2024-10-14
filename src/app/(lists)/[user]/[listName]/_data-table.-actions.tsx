import React from "react";
import { type CellContext } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import { type ListItemRowModel } from "./_types";
import { ACTION_ICONS, ActionsWrapper } from "~/app/_components/data-table";
import IconButton from "~/app/_components/icon-button";
import { api } from "~/trpc/react";

export function ListItemsActions({
  editMode,
  row,
  table,
}: CellContext<ListItemRowModel, unknown>) {
  const utils = api.useUtils();
  const params = useParams<{ listName: string; user: string }>();

  const { mutateAsync: deleteListItem, isPending: isDeletePending } =
    api.listItem.deleteListItem.useMutation({
      onSuccess: async () => {
        await utils.list.getList.invalidate({
          listName: params.listName,
          userName: params.user,
        });
      },
    });
  const { mutateAsync: updateListItem, isPending: isUpdatePending } =
    api.listItem.updateListItem.useMutation({
      onSuccess: async () => {
        await utils.list.getList.invalidate({
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
