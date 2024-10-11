import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Toggle, type ToggleRef } from "../ui/toggle";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import useControlled from "~/app/_hooks/use-controlled";

const SelectOption = ({
  value,
  selectedValue,
  children,
  scrollRef,
  onViewportEnter,
}: {
  value: number;
  selectedValue: number;
  children: React.ReactNode;
  scrollRef: React.MutableRefObject<HTMLDivElement | null>;
  onViewportEnter: () => void;
}) => {
  const ref = useRef<ToggleRef | null>(null);

  useLayoutEffect(() => {
    if (selectedValue === value) {
      ref.current?.scrollIntoView({ behavior: "instant" });
    }
  }, [selectedValue]);

  return (
    <motion.div
      className="snap-center"
      viewport={{ root: scrollRef }}
      onViewportEnter={onViewportEnter}
    >
      <Toggle
        value={value}
        ref={ref}
        className="text-md w-full"
        size="sm"
        pressed={selectedValue === value}
      >
        {children}
      </Toggle>
    </motion.div>
  );
};

const OPTIONS = Array.from({ length: 10 }, (_, i) => i + 1).reverse();

export default function ScoreSelect({
  value: valueProp,
  onValueChange,
}: {
  value?: number;
  onValueChange?: (value: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useControlled<number>({
    default: 10,
    controlled: valueProp,
    name: "SliderSelect",
  });

  const handleValueChange = (value: number) => {
    setSelected(value);
    onValueChange?.(value);
  };

  return (
    <div className={cn("flex w-fit items-center gap-1 py-1")}>
      <Button
        size="icon"
        className="h-8 w-8 rounded-full"
        disabled={selected === 1}
        onClick={() => {
          handleValueChange(selected - 1);
        }}
      >
        -
      </Button>
      <div
        ref={scrollRef}
        className="no-scrollbar flex h-9 snap-y snap-mandatory flex-col items-stretch gap-20 overflow-scroll scroll-smooth px-1"
      >
        {OPTIONS.map((value) => {
          return (
            <SelectOption
              key={value}
              value={value}
              selectedValue={selected}
              scrollRef={scrollRef}
              onViewportEnter={() => {
                handleValueChange(value);
              }}
            >
              {value}
            </SelectOption>
          );
        })}
      </div>
      <Button
        size="icon"
        className="h-8 w-8 rounded-full"
        disabled={selected === 10}
        onClick={() => {
          handleValueChange(selected + 1);
        }}
      >
        +
      </Button>
    </div>
  );
}
