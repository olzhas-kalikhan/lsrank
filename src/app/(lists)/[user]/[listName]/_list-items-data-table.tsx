"use client";

import { useParams, useRouter } from "next/navigation";
import { type inferProcedureOutput } from "@trpc/server";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { defaultColumns, type ListItemRowModel } from "./_data-table-columns";
import { ACTION_ICONS, DataTable } from "@components/data-table";
import { api } from "~/trpc/react";
import { type AppRouter } from "~/server/api/root";
import { Input } from "~/app/_components/ui/input";
import IconButton from "~/app/_components/icon-button";

const ListNameForm = ({
  data,
  onCancel,
}: {
  data: NonNullable<inferProcedureOutput<AppRouter["list"]["getList"]>>;
  onCancel: () => void;
}) => {
  const params = useParams<{ user: string; listName: string }>();
  const router = useRouter();
  const formMethods = useForm({
    defaultValues: { name: data.lists?.[0]?.name },
  });
  const { mutateAsync: updateList } = api.list.updateList.useMutation({
    onSuccess: (_, args) => {
      router.push(`/${params.user}/${args.name}`);
    },
  });

  const { isSubmitting } = formMethods.formState;

  return (
    <form
      id="list-name"
      className="flex gap-2"
      onSubmit={formMethods.handleSubmit(async (values) => {
        if (values.name && data.lists[0]?.id)
          await updateList({ id: data.lists[0].id, name: values.name });
      })}
    >
      <Input {...formMethods.register("name")} />
      <IconButton
        form="list-name"
        icon={<ACTION_ICONS.Save />}
        type="submit"
        isLoading={isSubmitting}
      />
      <IconButton icon={<ACTION_ICONS.Cancel />} onClick={onCancel} />
    </form>
  );
};

const EditableListName = ({
  data,
}: {
  data: inferProcedureOutput<AppRouter["list"]["getList"]>;
}) => {
  const [isEdit, setIsEdit] = useState(false);
  if (!data) return null;
  return (
    <div className="py-2">
      {isEdit ? (
        <ListNameForm data={data} onCancel={() => setIsEdit(false)} />
      ) : (
        <div className="flex items-center gap-4">
          <h1 className="text-2xl">List: {data?.lists[0]?.name}</h1>
          <IconButton
            icon={<ACTION_ICONS.Edit />}
            onClick={() => {
              setIsEdit(true);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default function ListItemsDataTable({
  list,
}: {
  list: inferProcedureOutput<AppRouter["list"]["getList"]>;
}) {
  const params = useParams<{ user: string; listName: string }>();
  const { data } = api.list.getList.useQuery(
    {
      userName: params.user,
      listName: params.listName,
    },
    { initialData: list },
  );
  const listItems = data?.lists[0]?.listItems ?? [];

  return (
    <div>
      <EditableListName data={list} />
      <DataTable
        columns={defaultColumns}
        data={listItems.reduce(
          (output, { name, meta_id, meta_pic_url, ...rest }) => {
            if (name && meta_id) {
              output.push({
                item: Object.assign(
                  {
                    label: name,
                    value: meta_id,
                  },
                  meta_pic_url && {
                    cover: {
                      url: meta_pic_url,
                    },
                  },
                ),
                ...rest,
              });
            }
            return output;
          },
          [] as ListItemRowModel[],
        )}
        getRowId={(row) => row.id}
      />
    </div>
  );
}
