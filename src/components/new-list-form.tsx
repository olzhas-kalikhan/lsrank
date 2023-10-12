"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { createList } from "~/server/actions";
import ListItemForm, { type ListItem } from "./list-item-form";
import { trpcReact } from "~/utils/trpc";
import { revalidatePath } from "next/cache";

const defaultValues = {
  name: "",
  type: "VIDEO_GAME" as const,
  listItems: [] as ListItem[],
};
const NewListForm = () => {
  const formMethods = useForm({ defaultValues });
  const arrayMethods = useFieldArray({
    control: formMethods.control,
    name: "listItems",
  });
  const { mutate } = trpcReact.list.create.useMutation();

  return (
    <Form {...formMethods}>
      <form
        className="py-4"
        onSubmit={(e) => {
          e.preventDefault();
          void formMethods.handleSubmit((values) => {
            console.log(values);
            return mutate(values);
          })(e);
        }}
      >
        <h1 className="mb-2 text-2xl font-semibold">New List</h1>
        <FormField
          control={formMethods.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>List Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formMethods.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select
                  name={field.name}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VIDEO_GAME">Video Games</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <ListItemForm {...arrayMethods} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
export default NewListForm;
