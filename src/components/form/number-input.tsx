import { type UseControllerProps, type FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  type FormItemProps,
  FormLabel,
} from "~/components/ui/form";
import NumberInput, { type NumberInputProps } from "~/components/number-input";

export const FormNumberInput = <TFieldValues extends FieldValues>({
  label,
  name,
  control,
  componentsProps,
}: Pick<UseControllerProps<TFieldValues>, "control" | "name"> & {
  label?: string;
  componentsProps?: {
    input?: Omit<NumberInputProps, "name">;
    formItem?: FormItemProps;
  };
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, ...field } }) => (
        <FormItem {...componentsProps?.formItem}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <NumberInput
              {...field}
              onValueChange={({ floatValue }) => {
                onChange(floatValue);
              }}
              {...componentsProps?.input}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
