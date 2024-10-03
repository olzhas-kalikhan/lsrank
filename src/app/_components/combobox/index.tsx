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

type AutocompleteOption = {
  value: string;
  label: string;
};

export default function Combobox<TOption extends AutocompleteOption>({
  options,
}: {
  options: TOption[];
}) {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<TOption | null>(null);
  const [inputValue, setInputValue] = useState("");

  return (
    <Command shouldFilter={false}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selectedOption?.label ?? "Select item"}
            <ArrowUp className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" asChild align="start">
          <CommandList>
            <CommandInput value={inputValue} onValueChange={setInputValue} />
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    setSelectedOption(
                      option.value === selectedOption?.value
                        ? null
                        : option,
                    );
                    setOpen(false);
                  }}
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </PopoverContent>
      </Popover>
    </Command>
  );
}
