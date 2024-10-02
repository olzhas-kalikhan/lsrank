"use client";

import { Pencil, Save, Trash, X } from "lucide-react";
import React from "react";
import { type EditMode } from "../atoms-provider";
import IconButton from "../../icon-button";

export const ACTION_ICONS = {
  Edit: Pencil,
  Delete: Trash,
  Save: Save,
  Cancel: X,
} as const;

export const ActionsWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex justify-end gap-x-2">{children}</div>;
};
export const DataTableActions = ({
  editMode,
  onEdit,
  onDelete,
  onSave,
  onCancel,
}: {
  editMode?: EditMode;
  onEdit: () => void;
  onDelete: () => void;
  onSave: () => void;
  onCancel: () => void;
}) => {
  return (
    <ActionsWrapper>
      {editMode === "view" && (
        <>
          <IconButton icon={<ACTION_ICONS.Edit />} onClick={onEdit} />
          <IconButton icon={<ACTION_ICONS.Delete />} onClick={onDelete} />
        </>
      )}
      {editMode === "edit" && (
        <>
          <IconButton icon={<ACTION_ICONS.Save />} onClick={onSave} />
          <IconButton icon={<ACTION_ICONS.Cancel />} onClick={onCancel} />
        </>
      )}
    </ActionsWrapper>
  );
};
