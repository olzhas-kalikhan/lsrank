import { useDebounce } from "@uidotdev/usehooks";
import React from "react";
import { type ProcedureUseQuery } from "@trpc/react-query/dist/createTRPCReact";
import { type AnyProcedure } from "@trpc/server";
import { type inferTransformedProcedureOutput } from "@trpc/server/shared";
import Autocomplete, { type AutocompleteProps } from "../autocomplete";
import useControlled from "~/utils/use-controlled";

const ApiAutocomplete = <
  TPath extends string,
  TProcedure extends AnyProcedure,
  TQueryFnData extends
    inferTransformedProcedureOutput<TProcedure> = inferTransformedProcedureOutput<TProcedure>,
  TData extends Record<string, unknown>[] = TQueryFnData,
  FreeSolo extends boolean | undefined = undefined,
>({
  useQuery,
  ...props
}: Pick<
  AutocompleteProps<TData[number], FreeSolo>,
  | "getOptionLabel"
  | "getOptionValue"
  | "value"
  | "onChange"
  | "freeSolo"
  | "renderOption"
  | "componentProps"
> & {
  useQuery: ProcedureUseQuery<TProcedure, TPath>;
}) => {
  const [search, setSearch] = useControlled({
    default: "",
    controlled: props.freeSolo && (props.value as string),
  });
  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading } = useQuery({
    search: debouncedSearch,
  });

  return (
    <Autocomplete
      options={data ?? []}
      inputValue={search}
      onInputChange={setSearch}
      loading={isLoading}
      {...props}
    />
  );
};

export default ApiAutocomplete;
