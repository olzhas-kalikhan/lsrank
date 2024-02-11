"use client";

import { trpcReact } from "~/utils/trpc";
import { DataTable } from "~/components/data-table";
import { columns } from "./columns";
import { type inferProcedureOutput } from "@trpc/server";
import { type AppRouter } from "~/server/api/root";
import { type RowProps } from "@tanstack/react-table";
import { FormProvider, useForm } from "react-hook-form";
import { type ListItem } from "../list-items-form";

type List = inferProcedureOutput<AppRouter["list"]["get"]>;

const defaultValues: ListItem = {
  name: "",
  score: 0,
  tags: "",
};

const Row = <TData,>(props: RowProps<TData>) => {
  const formMethods = useForm({
    defaultValues: props.original ?? defaultValues,
  });

  return <FormProvider {...formMethods}>{props.children}</FormProvider>;
};

export const ListItemsDataTable = ({
  listId,
  initialLists,
}: {
  listId: string;
  initialLists: List;
}) => {
  const { data } = trpcReact.list.get.useQuery(
    { id: listId },
    { initialData: initialLists },
  );

  return (
    <DataTable
      data={data?.ListItem ?? []}
      columns={columns}
      editable
      meta={{ components: { Row } }}
    />
  );
};
