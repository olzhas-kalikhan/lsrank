import { type UseControllerProps, type FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  type FormItemProps,
  FormLabel,
} from "~/components/ui/form";
import { Input, type InputProps } from "~/components/ui/input";

export const FormInput = <TFieldValues extends FieldValues>({
  label,
  name,
  control,
  componentsProps,
}: Pick<UseControllerProps<TFieldValues>, "control" | "name"> & {
  label?: string;
  componentsProps?: {
    input?: Omit<InputProps, "name">;
    formItem?: FormItemProps;
  };
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem {...componentsProps?.formItem}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input {...field} {...componentsProps?.input} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
