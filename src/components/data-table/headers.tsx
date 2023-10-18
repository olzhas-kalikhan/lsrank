import { type Table as TableType } from "@tanstack/react-table";
import { TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { HeaderCell } from "./header-cell";

export const Headers = <TData,>({
  getHeaderGroups,
}: Pick<TableType<TData>, "getHeaderGroups">) => {
  return (
    <TableHeader>
      {getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} className="hover:bg-transparent">
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              style={{
                width: header.column.getSize(),
              }}
            >
              {header.isPlaceholder ? null : <HeaderCell {...header} />}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
};
