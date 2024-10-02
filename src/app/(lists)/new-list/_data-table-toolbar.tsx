import { type UseFormReturn, type UseFieldArrayReturn } from "react-hook-form";
import { useTableContext } from "~/app/_components/data-table";
import { Button } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";
import { api } from "~/trpc/react";
import { FormDefaultValues } from "./_types";
import { useToast } from "~/app/_hooks/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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

export default function DataTableToolbar({
  formMethods,
  prepend,
}: {
  formMethods: UseFormReturn<FormDefaultValues>;
  prepend: UseFieldArrayReturn<FormDefaultValues, "listItems">["prepend"];
}) {
  const session = useSession();
  const { toast } = useToast();
  const utils = api.useUtils();
  const router = useRouter();

  const { mutate: createListReq } = api.list.createList.useMutation({
    onSuccess: (res) => {
      toast({ description: "List Was Created" });
      void utils.list.getListsByUser.invalidate();
      console.log(session.data?.user.name, res?.[0]?.name);
      router.push(`/${session.data?.user.name}/${res?.[0]?.name}`);
    },
  });

  return (
    <div className="mb-2 flex justify-between p-1">
      <div>
        <Input {...formMethods.register("listName")} placeholder="List Name" />
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
  );
}
