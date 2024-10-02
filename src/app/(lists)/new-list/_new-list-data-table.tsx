"use client";

import React, { useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { getDefaultColumns } from "./_data-table-columns";
import DataTableToolbar from "./_data-table-toolbar";
import { DataTable } from "~/app/_components/data-table";
import { FormDefaultValues } from "./_types";

const defaultListItems = [
  {
    _id: crypto.randomUUID(),
    name: "",
    score: 0,
  },
];

export default function NewListDataTable() {
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
          <DataTableToolbar formMethods={formMethods} prepend={prepend} />
        ),
      }}
    />
  );
}
