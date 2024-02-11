"use client";

import { FormProvider, useForm } from "react-hook-form";
import { FormInput, FormNumberInput } from "~/components/form";
import { type ListItem } from "../list-items-form";
import { Button } from "../ui/button";
import { trpcReact } from "../../utils/trpc";
import { toast } from "sonner";
import { CircleDashed } from "lucide-react";
import React from "react";

const defaultListItem: ListItem = {
  name: "",
  tags: "",
  score: 0,
};

const NewListItem = ({ listId }: { listId: string }) => {
  const trpc = trpcReact.useContext();
  const formMethods = useForm({ defaultValues: defaultListItem });
  const { isSubmitting, isValid, isDirty } = formMethods.formState;
  const { mutateAsync: createListItem } = trpcReact.listItem.create.useMutation(
    {
      onSuccess: async ({ name }) => {
        toast.success(`${name} was created`);
        formMethods.reset();
        await trpc.list.get.invalidate({ id: listId });
      },
    },
  );

  return (
    <FormProvider {...formMethods}>
      <form
        className="mb-4 grid grid-cols-4 gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          void formMethods.handleSubmit((values) => {
            return createListItem({ ...values, listId });
          })(e);
        }}
      >
        <FormInput<ListItem> name="name" />
        <FormNumberInput<ListItem> name="score" />
        <FormInput<ListItem> name="tags" />
        <Button type="submit" disabled={isSubmitting || !isDirty || !isValid}>
          {isSubmitting ? (
            <CircleDashed className="animate-spin" />
          ) : (
            "Add Item"
          )}
        </Button>
      </form>
    </FormProvider>
  );
};

export default NewListItem;
