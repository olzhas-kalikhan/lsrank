"use client";

import React from "react";
import { type CellContext } from "@tanstack/react-table";
import { type UseFieldArrayReturn } from "react-hook-form";
import { type ListItem, type FormDefaultValues } from "./_types";
import { ACTION_ICONS, ActionsWrapper } from "~/app/_components/data-table";
import IconButton from "~/app/_components/icon-button";

export default function ListItemActions({
  row,
  editMode,
  table,
  remove,
  update,
}: CellContext<ListItem, unknown> &
  Pick<
    UseFieldArrayReturn<FormDefaultValues, "listItems">,
    "remove" | "update"
  >) {
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
            onClick={() => {
              remove(row.index);
            }}
          />
        </>
      )}
      {editMode === "edit" && (
        <>
          <IconButton
            icon={<ACTION_ICONS.Save />}
            onClick={() => {
              update(
                row.index,
                table.options.meta?.getRowEditValue(row.id) as ListItem,
              );
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
