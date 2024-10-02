import { type UseFormReturn, type UseFieldArrayReturn } from "react-hook-form";
import { useTableContext } from "~/app/_components/data-table";
import { Button } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";
import { FormDefaultValues } from "./_types";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/_components/ui/form";

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
  prepend,
}: {
  prepend: UseFieldArrayReturn<FormDefaultValues, "listItems">["prepend"];
}) {
  return (
    <div className="mb-2 flex justify-between p-1">
      <div>
        <FormField
          name="listName"
          rules={{
            minLength: { value: 3, message: "must have at least 3 characters" },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>List Name</FormLabel>
              <FormControl>
                <Input placeholder="List Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex gap-2">
        <AddItemButton prepend={prepend} />
      </div>
    </div>
  );
}