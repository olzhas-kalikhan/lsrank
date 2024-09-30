"use client";

import { CircleDashed, Pencil, Save, Trash, X } from "lucide-react";
import { Button } from "@components/ui/button";

export const DeleteListItemButton = ({
  rowId,
  onClick,
}: {
  rowId: string;
  onClick: () => void;
}) => {
  return (
    <Button size="icon" variant="secondary" tabIndex={-1} onClick={onClick}>
      {false ? <CircleDashed className="animate-spin" /> : <Trash />}
    </Button>
  );
};
export const EditListItemButton = ({
  rowId,
  onClick,
}: {
  rowId: string;
  onClick: () => void;
}) => {
  return (
    <Button size="icon" variant="secondary" tabIndex={-1} onClick={onClick}>
      {false ? <CircleDashed className="animate-spin" /> : <Pencil />}
    </Button>
  );
};

export const CancelListItemButton = ({
  rowId,
  onClick,
}: {
  rowId: string;
  onClick: () => void;
}) => {
  return (
    <Button size="icon" variant="secondary" tabIndex={-1} onClick={onClick}>
      {false ? <CircleDashed className="animate-spin" /> : <X />}
    </Button>
  );
};

export const SaveListItemButton = ({
  rowId,
  onClick,
}: {
  rowId: string;
  onClick: () => void;
}) => {
  return (
    <Button size="icon" variant="secondary" tabIndex={-1} onClick={onClick}>
      {false ? <CircleDashed className="animate-spin" /> : <Save />}
    </Button>
  );
};
