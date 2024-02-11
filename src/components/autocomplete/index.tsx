import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from "~/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  type CommandInputProps,
  CommandItem,
  CommandLoading,
} from "~/components/ui/command";
import { isValidElement, useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "~/utils/ui";
import useControlled from "~/utils/use-controlled";

const COMPONENT_NAME = "Autocomplete";

export type AutocompleteValue<
  Value extends string | object,
  FreeSolo extends boolean | undefined,
> = FreeSolo extends true ? string : Value | null;

type UseAutocompleteProps<
  Value extends string | object,
  FreeSolo extends boolean | undefined,
> = {
  value?: AutocompleteValue<Value, FreeSolo>;
  freeSolo?: FreeSolo;
  inputValue?: string;
  onInputChange?: (inputValue: string) => void;
  getOptionLabel?: (option: Value) => string;
  getOptionValue?: (option: Value) => string;
  onChange?: (option: AutocompleteValue<Value, FreeSolo>) => void;
};

export type AutocompleteProps<
  Value extends string | object,
  FreeSolo extends boolean | undefined = undefined,
> = UseAutocompleteProps<Value, FreeSolo> & {
  loading?: boolean;
  options: Value[];
  renderOption?: (
    option: Value,
    state: {
      isSelected: boolean;
      value: string;
      label: string;
    },
  ) => React.ReactNode;
  componentProps?: {
    input?: CommandInputProps;
  };
};

const useAutocomplete = <
  Value extends object | string,
  FreeSolo extends boolean | undefined,
>({
  inputValue: inputValueProp,
  onInputChange,
  onChange,
  getOptionValue: getOptionValueProp,
  getOptionLabel: getOptionLabelProp,
  freeSolo,
  value: valueProp,
}: UseAutocompleteProps<Value, FreeSolo>) => {
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: (freeSolo ? "" : null) as AutocompleteValue<Value, FreeSolo>,
  });

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useControlled({
    default: "",
    controlled: freeSolo ? (valueProp as string) : inputValueProp,
  });

  const getOptionLabel = (option: Value) => {
    let label: string;

    if (getOptionLabelProp) {
      label = getOptionLabelProp(option);
    } else if (typeof option === "object" && "label" in option) {
      label = option.label as string;
    } else {
      label = option as string;
    }
    if (isValidElement(label) || typeof label === "string") return label;
    throw new Error(`Invalid option label ${JSON.stringify(option)}`);
  };
  const getOptionValue = (option: Value) => {
    let value: string;

    if (getOptionValueProp) {
      value = getOptionValueProp(option);
    } else if (typeof option === "object" && "value" in option) {
      value = option.value as string;
    } else {
      value = option as string;
    }
    if (isValidElement(value) || typeof value === "string") return value;
    throw new Error(`Invalid option value ${JSON.stringify(option)}`);
  };

  const handleOptionSelect = (option: Value) => () => {
    const newInputValue = getOptionLabel(option);
    const newOption = (freeSolo ? newInputValue : option) as AutocompleteValue<
      Value,
      FreeSolo
    >;

    setValue(newOption);
    onChange?.(newOption);

    setInputValue(newInputValue);
    onInputChange?.(newInputValue);
  };

  const handleInputValueChange = (value: string) => {
    setInputValue(value);
    onInputChange?.(value);
    if (freeSolo) {
      setValue(value as AutocompleteValue<Value, FreeSolo>);
      onChange?.(value as AutocompleteValue<Value, FreeSolo>);
    }
  };

  return {
    value,
    setValue,
    open,
    setOpen,
    inputValue,
    getOptionLabel,
    getOptionValue,
    handleOptionSelect,
    handleInputValueChange,
  };
};

const Autocomplete = <
  Value extends string | object,
  FreeSolo extends boolean | undefined = undefined,
>({
  loading,
  options,
  renderOption,
  componentProps,
  ...props
}: AutocompleteProps<Value, FreeSolo>) => {
  const {
    value,
    open,
    setOpen,
    inputValue,
    getOptionLabel,
    getOptionValue,
    handleOptionSelect,
    handleInputValueChange,
  } = useAutocomplete(props);
  const [triggerWidth, setTriggerWidth] = useState(400);

  return (
    <Command shouldFilter={false} data-test-id={`${COMPONENT_NAME}-Command`}>
      <Popover open={open}>
        <PopoverAnchor asChild>
          <CommandInput
            data-test-id={`${COMPONENT_NAME}-CommandInput`}
            placeholder="Search framework..."
            value={inputValue}
            onValueChange={handleInputValueChange}
            ref={(node) => {
              if (node) setTriggerWidth(node.offsetWidth);
            }}
            onFocus={() => {
              setOpen(true);
            }}
            onBlur={() => {
              setOpen(false);
            }}
            {...componentProps?.input}
          />
        </PopoverAnchor>
        <PopoverContent
          align="start"
          className="p-0"
          style={{ width: triggerWidth ? triggerWidth + 12 : undefined }}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          {loading ? (
            <CommandLoading>
              <Loader2 className="h-4 w-4 animate-spin" />
              <p> Searching...</p>
            </CommandLoading>
          ) : (
            <CommandEmpty>No framework found.</CommandEmpty>
          )}
          <CommandGroup>
            {options.map((option) => {
              const isSelected = value === getOptionValue(option);
              const optionValue = getOptionValue(option);
              const optionLabel = getOptionLabel(option);

              return (
                <CommandItem
                  key={optionValue}
                  value={optionValue}
                  onSelect={handleOptionSelect(option)}
                  className={cn(isSelected && "bg-accent")}
                >
                  {renderOption
                    ? renderOption(option, {
                        isSelected,
                        value: optionValue,
                        label: optionLabel,
                      })
                    : optionLabel}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </PopoverContent>
      </Popover>
    </Command>
  );
};

export default Autocomplete;
