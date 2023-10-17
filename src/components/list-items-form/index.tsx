import { type inferProcedureOutput } from "@trpc/server";
import { type UseFieldArrayReturn } from "react-hook-form";
import { type AppRouter } from "~/server/api/root";
import { Button } from "~/components/ui/button";
import { PlusCircle, XCircle } from "lucide-react";
import { FormInput, FormNumberInput } from "~/components/form";
import { Label } from "~/components/ui/label";
import React from "react";
import { type ListType } from "@prisma/client";

type ListItemOutput = inferProcedureOutput<
  AppRouter["listItem"]["get"]
>[number];

export type ListItem = Pick<ListItemOutput, "name" | "score" | "tags">;

const ListItemForm = ({
  fields,
  prepend,
  remove,
}: UseFieldArrayReturn<
  { name: string; type: ListType; listItems: ListItem[] },
  "listItems"
>) => {
  const addButton = (
    <Button
      type="button"
      className="mt-3"
      onClick={() => {
        prepend({ name: "", tags: "", score: 0 });
      }}
    >
      <PlusCircle className="pr-1" />
      Add to the list
    </Button>
  );

  const getRemoveButton = (index: number) => (
    <Button
      type="button"
      variant="secondary"
      onClick={() => {
        remove(index);
      }}
    >
      <XCircle className="col-span-1 pr-1" />
      Remove
    </Button>
  );

  return (
    <>
      {addButton}

      <div className="my-3 grid max-w-screen-lg grid-cols-7 gap-x-2 gap-y-3">
        <Label className="col-span-2">Name</Label>
        <Label className="col-span-2">Type</Label>
        <Label className="col-span-2">Tags</Label>
        <div className="col-span-1" />
        {fields.map((field, index) => (
          <React.Fragment key={field.id}>
            <FormInput
              name={`listItems.${index}.name`}
              componentsProps={{ formItem: { className: "col-span-2" } }}
            />
            <FormNumberInput
              name={`listItems.${index}.score`}
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
              name={`listItems.${index}.tags`}
              componentsProps={{ formItem: { className: "col-span-2" } }}
            />
            {getRemoveButton(index)}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default ListItemForm;
