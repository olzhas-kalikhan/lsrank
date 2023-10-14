"use client";

import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { trpcReact } from "~/utils/trpc";
import { FormInput, FormSelect } from "./form";
import ListItemForm, { type ListItem } from "./list-item-form";

const defaultValues = {
  name: "",
  type: "VIDEO_GAME" as const,
  listItems: [{ name: "", score: 0, tags: "" }] as ListItem[],
};

const NewListForm = () => {
  const formMethods = useForm({ defaultValues });
  const arrayMethods = useFieldArray({
    control: formMethods.control,
    name: "listItems",
  });
  const { mutate } = trpcReact.list.create.useMutation();

  return (
    <FormProvider {...formMethods}>
      <form
        className="py-4"
        onSubmit={(e) => {
          e.preventDefault();
          void formMethods.handleSubmit((values) => {
            formMethods.reset();
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
        <Button type="submit">Save</Button>
      </form>
    </FormProvider>
  );
};
export default NewListForm;
