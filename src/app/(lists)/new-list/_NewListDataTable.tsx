"use client";

import { type CellContext, type ColumnDef } from "@tanstack/react-table";
import React, { useMemo } from "react";
import {
  useFieldArray,
  type UseFieldArrayReturn,
  useForm,
} from "react-hook-form";
import {
  DataTable,
  useEditCellValue,
  useTableContext,
} from "~/app/_components/data-table";
import { DataTableActions } from "~/app/_components/data-table/actions";
import NumberInput from "~/app/_components/number-input";
import { Button } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";
import { isNumber } from "~/lib/utils";
import { api } from "~/trpc/react";

type ListItem = {
  _id: string;
  name: string;
  score: number;
};

type FormDefaultValues = {
  listName: string;
  listItems: ListItem[];
};

const DataTableCellInput = ({ row }: CellContext<ListItem, unknown>) => {
  const [value, setValue] = useEditCellValue(row.id, "name");
  return (
    <Input
      value={(value as string) ?? ""}
      onChange={(e) => {
        setValue(e.target.value ?? "");
      }}
    />
  );
};

const DataTableCellNumberInput = (cell: CellContext<ListItem, unknown>) => {
  const [value, setValue] = useEditCellValue(cell.row.id, "score");
  return (
    <NumberInput
      value={(value as number) ?? null}
      onValueChange={(values) => {
        setValue(values.floatValue);
      }}
      defaultValue={cell.getValue() as string}
      isAllowed={(values) => {
        if (values.value === "") return true;
        if (
          values.floatValue === null ||
          values.floatValue === undefined ||
          !isNumber(values.floatValue)
        )
          return false;

        return values.floatValue >= 0 && values.floatValue <= 10;
      }}
    />
  );
};

const ListItemActions = ({
  row,
  editMode,
  table,
  remove,
  update,
}: CellContext<ListItem, unknown> &
  Pick<
    UseFieldArrayReturn<FormDefaultValues, "listItems">,
    "remove" | "update"
  >) => {
  return (
    <DataTableActions
      editMode={editMode}
      onEdit={() => {
        table.options.meta?.setRowEditMode(row.id, "edit");
      }}
      onDelete={() => {
        remove(row.index);
      }}
      onSave={() => {
        update(
          row.index,
          table.options.meta?.getRowEditValue(row.id) as ListItem,
        );
        table.options.meta?.setRowEditMode(row.id, "view");
      }}
      onCancel={() => {
        table.options.meta?.setRowEditMode(row.id, "view");
      }}
    />
  );
};

const getDefaultColumns = (
  arrayMethods: Pick<
    UseFieldArrayReturn<FormDefaultValues, "listItems">,
    "remove" | "update"
  >,
): ColumnDef<ListItem>[] => [
  { header: "ID", accessorKey: "_id" },
  {
    header: "Name",
    accessorKey: "name",
    cell: (cellContext) => {
      const { editMode, cell } = cellContext;
      if (editMode === "edit") return <DataTableCellInput {...cellContext} />;
      return cell.getValue();
    },
  },
  {
    header: "Score",
    accessorKey: "score",
    cell: (cellContext) => {
      if (cellContext.editMode === "edit")
        return <DataTableCellNumberInput {...cellContext} />;
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

const AddItemButton = ({
  prepend,
}: {
  prepend: UseFieldArrayReturn<FormDefaultValues, "listItems">["prepend"];
}) => {
  const { table } = useTableContext();

  return (
    <Button
      variant="secondary"
      onClick={() => {
        const newRowValue = { _id: crypto.randomUUID(), name: "", score: 0 };
        table.options.meta?.setRowEditMode(
          newRowValue._id,
          "edit",
          newRowValue,
        );
        prepend(newRowValue);
      }}
    >
      Add Item
    </Button>
  );
};
const defaultListItems = [
  {
    _id: crypto.randomUUID(),
    name: "",
    score: 0,
  },
];
export default function NewListDataTable() {
  const { mutate: createListReq } = api.list.createList.useMutation();
  const formMethods = useForm<FormDefaultValues>({
    defaultValues: {
      listName: "",
      listItems: defaultListItems,
    },
  });
  const {
    fields: rows,
    prepend,
    remove,
    update,
  } = useFieldArray({
    name: "listItems",
    control: formMethods.control,
  });

  const defaultColumns = useMemo(
    () => getDefaultColumns({ remove, update }),
    [remove, update],
  );

  return (
    <DataTable
      data={rows}
      getRowId={(row) => row._id}
      columns={defaultColumns}
      slots={{
        toolbar: (
          <div className="mb-2 flex justify-between p-1">
            <div>
              <Input
                {...formMethods.register("listName")}
                placeholder="List Name"
              />
            </div>
            <div className="flex gap-2">
              <AddItemButton prepend={prepend} />
              <Button
                onClick={async () => {
                  await formMethods.handleSubmit((values) => {
                    createListReq({
                      name: values.listName,
                      listItems: values.listItems,
                    });
                  })();
                }}
              >
                Create List
              </Button>
            </div>
          </div>
        ),
      }}
    />
  );
}
