"use client";

import { useState } from "react";
import Image from "next/image";
import { type inferProcedureOutput } from "@trpc/server";
import Combobox from "../combobox";
import { api } from "~/trpc/react";
import { useDebounce } from "~/app/_hooks/use-debounce";
import { type AppRouter } from "~/server/api/root";

export type GameData = inferProcedureOutput<
  AppRouter["videoGame"]["getGames"]
>[number];

export default function GamesCombobox({
  value,
  onValueChange,
}: {
  value?: GameData | null;
  onValueChange?: (value: GameData | null) => void;
}) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data } = api.videoGame.getGames.useQuery(
    { search: debouncedSearch },
    { enabled: !!search },
  );

  return (
    <Combobox
      value={value}
      onValueChange={onValueChange}
      options={data ?? []}
      inputValue={search}
      onInputValueChange={setSearch}
      renderValue={(value) => {
        if (!value) return "Select Items...";
        return (
          <div className="flex min-w-0 flex-grow items-center">
            <Image
              className="mr-2 rounded-md"
              src={
                value?.cover?.url
                  ? `https:${value?.cover?.url}`
                  : "https://imageplaceholder.net/128x128/eeeeee/131313?text=N/A"
              }
              width={28}
              height={28}
              alt={value.label}
            />
            <span className="truncate">{value.label}</span>
          </div>
        );
      }}
      renderOption={(option) => (
        <div className="flex min-w-0 flex-grow items-center">
          <Image
            className="mr-2 rounded-md"
            src={
              option?.cover?.url
                ? `https:${option?.cover?.url}`
                : "https://imageplaceholder.net/128x128/eeeeee/131313?text=N/A"
            }
            width={28}
            height={28}
            alt={option.label}
          />
          <span>{option.label}</span>
        </div>
      )}
    />
  );
}
