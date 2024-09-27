import { TableHead, TableHeader, TableRow } from "~/app/_components/ui/table";
import { HeaderCell } from "./header-cell";
import { useTableContext } from "./table-provider";
import { useAtomValue } from "jotai";
import { sortingAtom } from "./atoms-provider";

export const Headers = () => {
  const {
    table: { getHeaderGroups },
  } = useTableContext();

  useAtomValue(sortingAtom);

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
