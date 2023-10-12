import { type inferProcedureOutput } from "@trpc/server";
import {
  type Control,
  useFieldArray,
  FieldValues,
  UseFieldArrayReturn,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { type AppRouter } from "~/server/api/root";
import { cn } from "~/utils/ui";
import { Button } from "../ui/button";

type ListItemOutput = inferProcedureOutput<
  AppRouter["listItem"]["get"]
>[number];

export type ListItem = Pick<ListItemOutput, "name" | "score" | "tags">;

const ListItemForm = ({
  fields,
  append,
}: UseFieldArrayReturn<
  { name: string; type: "VIDEO_GAME"; listItems: ListItem[] },
  "listItems"
>) => {
  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id}>
          <FormField
            name={`listItems.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn(index !== 0 && "sr-only")}>
                  Item
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name={`listItems.${index}.score`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn(index !== 0 && "sr-only")}>
                  Score
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) => {
                      field.onChange(parseFloat(e.target.value));
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name={`listItems.${index}.tags`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn(index !== 0 && "sr-only")}>
                  Tags
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      ))}
      <Button
        type="button"
        onClick={() => {
          append({ name: "", tags: "", score: 0 });
        }}
      >
        Add Item
      </Button>
    </>
  );
};

export default ListItemForm;
