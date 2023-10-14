"use client";

import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { trpcReact } from "~/utils/trpc";
import { FormInput, FormSelect } from "./form";
import ListItemForm, { type ListItem } from "./list-item-form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { type inferProcedureOutput } from "@trpc/server";
import { type AppRouter } from "~/server/api/root";
import { type ListType } from "@prisma/client";

type List = inferProcedureOutput<AppRouter["list"]["get"]>[number];

const defaultValues = {
  name: "",
  type: "VIDEO_GAME" as ListType,
  listItems: [{ name: "", score: 0, tags: "" }] as ListItem[],
};

const ListForm = ({ list }: { list?: List }) => {
  const formMethods = useForm({
    defaultValues: list
      ? {
          name: list.name,
          type: list.type,
          listItems: list.ListItem.map(({ name, score, tags }) => ({
            name,
            score,
            tags: tags ?? "",
          })),
        }
      : defaultValues,
  });
  const arrayMethods = useFieldArray({
    control: formMethods.control,
    name: "listItems",
  });
  const { mutate, isLoading } = trpcReact.list.create.useMutation({
    onSuccess: ({ name }) => {
      formMethods.reset();
      toast.success(`${name} list was created`);
    },
  });

  return (
    <FormProvider {...formMethods}>
      <form
        className="py-4"
        onSubmit={(e) => {
          e.preventDefault();
          void formMethods.handleSubmit((values) => {
            return mutate(values);
          })(e);
        }}
      >
        <h1 className="mb-2 text-2xl font-semibold">New List</h1>
        <FormInput
          control={formMethods.control}
          name="name"
          label="List Name"
        />
        <FormSelect control={formMethods.control} name="type" label="Type" />
        <ListItemForm {...arrayMethods} />
        <Button type="submit" disabled={isLoading} className="w-[8ch]">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
        </Button>
      </form>
    </FormProvider>
  );
};
export default ListForm;
