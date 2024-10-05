"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@components/ui/command";
import useControlled from "~/app/_hooks/use-controlled";
import { cn } from "~/lib/utils";

export type ComboboxOption = {
  value: string;
  label: string;
};

export default function Combobox<TOption extends ComboboxOption>({
  value,
  onValueChange,

  inputValue: inputValueProp,
  onInputValueChange,
  renderOption,
  options,
  renderValue,
}: {
  value?: TOption | null;
  onValueChange?: (value: TOption | null) => void;
  options: TOption[];
  inputValue?: string;
  onInputValueChange?: (value: string) => void;
  renderOption?: (option: TOption) => React.ReactNode;
  renderValue?: (option: TOption | null | undefined) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useControlled<TOption | null>({
    controlled: value,
    default: null,
    name: "Combobox",
  });
  const [inputValue, setInputValue] = useControlled({
    controlled: inputValueProp,
    default: "",
    name: "Combobox Input",
  });

  const handleInputValueChange = (value: string) => {
    setInputValue(value);
    onInputValueChange?.(value);
  };

  return (
    <Command shouldFilter={false}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            asChild
            className="w-[300px] justify-between"
            variant="outline"
            role="combobox"
            aria-expanded={open}
          >
            <button>
              {renderValue ? (
                renderValue(selectedOption)
              ) : (
                <span className="truncate">
                  {selectedOption?.label ?? "Select item"}
                </span>
              )}
              <ArrowUp
                className={cn(
                  "ml-2 inline-block h-4 w-4 shrink-0 rotate-90 opacity-50 transition-transform",
                  open && "rotate-180",
                )}
              />
            </button>
          </Button>
        </PopoverTrigger>
        <PopoverContent asChild align="start">
          <CommandList>
            <CommandInput
              value={inputValue}
              onValueChange={handleInputValueChange}
            />
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  asChild
                  key={option.value}
                  value={option.value}
                  data-state={
                    selectedOption?.value === option.value && "selected"
                  }
                  className="data-[state=selected]:bg-muted"
                  onSelect={() => {
                    const newOption =
                      option.value === selectedOption?.value ? null : option;
                    handleInputValueChange(newOption ? newOption?.label : "");

                    setSelectedOption(newOption);
                    onValueChange?.(newOption);
                    setOpen(false);
                  }}
                >
                  {renderOption?.(option) ?? <div>{option.label}</div>}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </PopoverContent>
      </Popover>
    </Command>
  );
}
