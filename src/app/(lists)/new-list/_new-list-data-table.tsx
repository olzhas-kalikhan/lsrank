"use client";

import React, { useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getDefaultColumns } from "./_data-table-columns";
import DataTableToolbar from "./_data-table-toolbar";
import { type FormDefaultValues } from "./_types";
import DataTableFooter from "./_data-table-footer";
import { DataTable } from "~/app/_components/data-table";
import { Form } from "~/app/_components/ui/form";
import { api } from "~/trpc/react";
import { useToast } from "~/app/_hooks/use-toast";

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

  const { toast } = useToast();
  const session = useSession();
  const utils = api.useUtils();
  const router = useRouter();

  const { mutateAsync: createListReq } = api.list.createList.useMutation({
    onSuccess: (res) => {
      toast({ description: "List Was Created" });
      void utils.list.getLists.invalidate();
      router.push(`/${session.data?.user.name}/${res?.[0]?.name}`);
    },
  });

  const onSubmit = (values: FormDefaultValues) =>
    createListReq({
      name: values.listName,
      listItems: values.listItems,
    });

  return (
    <Form {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <DataTable
          data={rows}
          getRowId={(row) => row._id}
          columns={defaultColumns}
          slots={{
            toolbar: <DataTableToolbar prepend={prepend} />,
            footer: <DataTableFooter />,
          }}
        />
      </form>
    </Form>
  );
}
