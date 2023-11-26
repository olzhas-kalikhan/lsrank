"use client";

import {
  type RowData,
  type CellContext,
  type ColumnDef,
} from "@tanstack/react-table";
import { type inferProcedureOutput } from "@trpc/server";
import { type AppRouter } from "~/server/api/root";
import { Button } from "~/components/ui/button";
import { CircleDashed, Pencil, Save, Trash, XCircle } from "lucide-react";
import { trpcReact } from "~/utils/trpc";
import { toast } from "sonner";
import { FormInput, FormNumberInput } from "~/components/form";
import { useFormContext, useFormState } from "react-hook-form";
import { Badge } from "~/components/ui/badge";

type ListItemOutput = inferProcedureOutput<
  AppRouter["listItem"]["get"]
>[number];

export type ListItem = ListItemOutput;
export const columns: ColumnDef<ListItem>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (cellContext) => {
      const {
        cell,
        table,
        row: { id },
      } = cellContext;

      return table.options.meta?.getRowEditMode?.(id) ? (
        <CellTextInput {...cellContext} />
      ) : (
        cell.getValue()
      );
    },
  },
  {
    accessorKey: "score",
    header: "Score",
    cell: (cellContext) => {
      const {
        cell,
        table,
        row: { id },
      } = cellContext;

      return table.options.meta?.getRowEditMode?.(id) ? (
        <CellNumberInput {...cellContext} />
      ) : (
        cell.getValue()
      );
    },
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: (cellContext) => {
      const {
        cell,
        table,
        row: { id },
      } = cellContext;

      return table.options.meta?.getRowEditMode?.(id) ? (
        <CellTextInput {...cellContext} />
      ) : (
        (cell.getValue() as string)
          .split(",")
          .map((tag, i) => <Badge key={id + i} className="mr-1 text-md">{tag}</Badge>)
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    size: 20,
    cell: (context) =>
      context.table.options.meta?.editModesModel?.[context.row.id] ? (
        <div className="flex justify-center">
          <SaveRowButton {...context} />
          <CancelEditButton {...context} />
        </div>
      ) : (
        <div className="flex justify-center">
          <EditRowButton {...context} />
          <DeleteRowButton {...context} />
        </div>
      ),
  },
];

const EditRowButton = ({
  table: {
    options: { meta },
  },
  row: { id },
}: CellContext<ListItem, unknown>) => {
  return (
    <Button
      className="rounded-full p-2"
      variant="ghost"
      size="sm"
      onClick={() => {
        if (!meta) return;
        meta.setRowEditMode?.(id, true);
      }}
    >
      <Pencil size="20px" />
    </Button>
  );
};

const DeleteRowButton = ({
  table: {
    options: { meta },
  },
  row: { id, original },
}: CellContext<ListItem, unknown>) => {
  const trpc = trpcReact.useContext();
  const { mutate: deleteListItem, isLoading: isDeleting } =
    trpcReact.listItem.delete.useMutation({
      onSuccess: async () => {
        toast.success(`${original.name} was deleted`);
        await trpc.list.get.invalidate({ id: original.listId });
        meta?.setRowEditMode?.(id, false);
      },
    });

  return (
    <Button
      className="rounded-full p-2"
      variant="ghost"
      size="sm"
      onClick={() => {
        deleteListItem({ id });
      }}
    >
      {isDeleting ? (
        <CircleDashed className="animate-spin" />
      ) : (
        <Trash size="20px" />
      )}
    </Button>
  );
};

const SaveRowButton = ({
  table: {
    options: { meta },
  },
  row: { id, original },
}: CellContext<ListItem, unknown>) => {
  const trpc = trpcReact.useContext();
  const { isDirty, isValid, isSubmitting } = useFormState();
  const { handleSubmit } = useFormContext<ListItem>();
  const { mutateAsync: updateListItem } = trpcReact.listItem.update.useMutation(
    {
      onSuccess: async () => {
        toast.success(`${original.name} was updated`);
        await trpc.list.get.invalidate({ id: original.listId });
        meta?.setRowEditMode?.(id, false);
      },
    },
  );

  return (
    <Button
      className="rounded-full p-2"
      variant="ghost"
      size="sm"
      disabled={isSubmitting || !isDirty || !isValid}
      onClick={() => {
        void handleSubmit((values) =>
          updateListItem({
            id: values.id,
            name: values.name,
            score: values.score,
            tags: values.tags,
          }),
        )();
      }}
    >
      {isSubmitting ? (
        <CircleDashed className="animate-spin" />
      ) : (
        <Save size="20px" />
      )}
    </Button>
  );
};

const CancelEditButton = ({
  table: {
    options: { meta },
  },
  row: { id },
}: CellContext<ListItem, unknown>) => {
  return (
    <Button
      className="rounded-full p-2"
      variant="ghost"
      size="sm"
      onClick={() => {
        if (!meta) return;
        meta.setRowEditMode?.(id, false);
      }}
    >
      <XCircle size="20px" />
    </Button>
  );
};

const CellTextInput = <TData extends RowData, TValue>(
  cellContext: CellContext<TData, TValue>,
) => {
  return (
    <FormInput
      // className="bor"
      name={cellContext.column.id}
      componentsProps={{
        formItem: { className: "h-full" },
        input: {
          className:
            "border-none px-4 h-full rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline focus-visible:outline-ring",
        },
      }}
    />
  );
};

const CellNumberInput = <TData extends RowData, TValue>(
  cellContext: CellContext<TData, TValue>,
) => {
  return (
    <FormNumberInput
      name={cellContext.column.id}
      componentsProps={{
        formItem: { className: "h-full" },
        input: {
          className:
            "border-none px-4 h-full rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline focus-visible:outline-ring",
        },
      }}
    />
  );
};
