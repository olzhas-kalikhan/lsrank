import { type inferProcedureOutput } from "@trpc/server";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput, FormNumberInput } from "~/components/form";
import { type AppRouter } from "~/server/api/root";
import { trpcReact } from "~/utils/trpc";

type ListItemOutput = inferProcedureOutput<
  AppRouter["listItem"]["get"]
>[number];

export type ListItem = Pick<ListItemOutput, "name" | "score" | "tags">;
const defaultValues: ListItem = { name: "", score: 0, tags: "" };
const EditButton = () => {
  const { mutate } = trpcReact.listItem.update.useMutation();
};

export const ListItemForm = ({ item }: { item?: ListItem }) => {
  const formMethods = useForm({ defaultValues: item ?? defaultValues });

  return (
    <FormProvider {...formMethods}>
      <FormInput
        name="name"
        componentsProps={{ formItem: { className: "col-span-2" } }}
      />
      <FormNumberInput
        name="score"
        componentsProps={{
          formItem: { className: "col-span-2" },
          input: {
            decimalScale: 0,
            isAllowed: ({ floatValue = 0 }) =>
              floatValue >= 0 && floatValue <= 100,
          },
        }}
      />
      <FormInput
        name="tags"
        componentsProps={{ formItem: { className: "col-span-2" } }}
      />
    </FormProvider>
  );
};
