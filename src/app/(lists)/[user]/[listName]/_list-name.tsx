import { useParams, useRouter } from "next/navigation";
import { type inferProcedureOutput } from "@trpc/server";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { api } from "~/trpc/react";
import { type AppRouter } from "~/server/api/root";
import { Input } from "~/app/_components/ui/input";
import IconButton from "~/app/_components/icon-button";
import { ACTION_ICONS } from "~/app/_components/data-table";

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

export const ListName = ({
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
