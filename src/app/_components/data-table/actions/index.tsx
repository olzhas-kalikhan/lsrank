"use client";

import { CircleDashed, Pencil, Save, Trash, X } from "lucide-react";
import { type CellContext } from "@tanstack/react-table";
import React from "react";
import { type EditMode } from "../atoms-provider";
import { Button } from "@components/ui/button";

export const DeleteListItemButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button size="icon" variant="secondary" tabIndex={-1} onClick={onClick}>
      {false ? <CircleDashed className="animate-spin" /> : <Trash />}
    </Button>
  );
};
export const EditListItemButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button size="icon" variant="secondary" tabIndex={-1} onClick={onClick}>
      {false ? <CircleDashed className="animate-spin" /> : <Pencil />}
    </Button>
  );
};

export const CancelListItemButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button size="icon" variant="secondary" tabIndex={-1} onClick={onClick}>
      {false ? <CircleDashed className="animate-spin" /> : <X />}
    </Button>
  );
};

export const SaveListItemButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button size="icon" variant="secondary" tabIndex={-1} onClick={onClick}>
      {false ? <CircleDashed className="animate-spin" /> : <Save />}
    </Button>
  );
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
    <div className="flex justify-end gap-x-2">
      {editMode === "view" && (
        <>
          <EditListItemButton onClick={onEdit} />
          <DeleteListItemButton onClick={onDelete} />
        </>
      )}
      {editMode === "edit" && (
        <>
          <SaveListItemButton onClick={onCancel} />
          <CancelListItemButton onClick={onSave} />
        </>
      )}
    </div>
  );
};
