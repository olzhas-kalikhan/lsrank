"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type inferProcedureOutput } from "@trpc/server";
import { type AppRouter } from "~/server/api/root";
import { useTableContext } from "~/components/data-table";
import { Button } from "../ui/button";
import { Pencil, XCircle } from "lucide-react";
import { Input } from "../ui/input";
import React, { useEffect, useRef } from "react";

type ListItemOutput = inferProcedureOutput<
  AppRouter["listItem"]["get"]
>[number];

export type ListItem = Pick<ListItemOutput, "name" | "score" | "tags">;
export const columns: ColumnDef<ListItem>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue, row }) => {
      const value = getValue<ListItem["name"]>();
      return <EditableCell id={row.id} value={value} />;
    },
  },
  {
    accessorKey: "score",
    header: "Score",
  },
  {
    accessorKey: "tags",
    header: "Tags",
  },
  {
    id: "actions",
    enableHiding: false,
    size: 20,
    cell: ({ row }) => <EditButtonCell id={row.id} />,
  },
];

const emptyListItem: ListItem = {
  name: "",
  score: 0,
  tags: "",
};

const EditableCell = ({ id, value }: { id: string; value: string }) => {
  const { editModesModel } = useTableContext<ListItem>();
  const isEdit = editModesModel[id];

  return isEdit ? <InputCell id={id} initialValue={value} /> : value;
};

const InputCell = ({
  id,
  initialValue,
}: {
  id: string;
  initialValue: string;
}) => {
  const { setEditRowsModel } = useTableContext<ListItem>();
  const commitValue = useRef("");

  useEffect(() => {
    return () => {
      console.log("use");
      setEditRowsModel((prevModel) => ({
        ...prevModel,
        [id]: {
          ...(prevModel[id] ?? emptyListItem),
          name: commitValue.current,
        },
      }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Input
      ref={(e) => {
        e?.setAttribute("value", initialValue);
      }}
      // value={value}
      onChange={(e) => {
        // setValue(e.target.value);
        commitValue.current = e.target.value;
      }}
    />
  );
};

const EditButtonCell = ({ id }: { id: string }) => {
  const { editModesModel, editRowsModel, setEditModesModel, setEditRowsModel } =
    useTableContext<ListItem>();
  const isEdit = editModesModel[id];
  const editRow = editRowsModel[id];

  useEffect(() => {
    if (editRow) {
      console.log(editRow);
      setEditRowsModel((prevModel) => {
        const newModel = { ...prevModel };
        delete newModel[id];
        return newModel;
      });
    }
  }, [editRow, id, setEditRowsModel]);

  return (
    <Button
      variant="secondary"
      onClick={() => {
        setEditModesModel((prevModel) => {
          const newModel = { ...prevModel };
          if (isEdit) delete newModel[id];
          else {
            newModel[id] = true;
          }
          return newModel;
        });
      }}
    >
      {isEdit ? <XCircle /> : <Pencil />}
    </Button>
  );
};
