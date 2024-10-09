"use client";

import { useAtomValue } from "jotai";
import { Row } from "./row";
import { Cell } from "./cell";
import { useTableContext } from "./table-provider";
import { rowsModeModelAtom, sortingAtom } from "./atoms-provider";
import { TableBody, TableCell, TableRow } from "~/app/_components/ui/table";

const NoRows = ({ columnsLength }: { columnsLength: number }) => (
  <TableRow>
    <TableCell colSpan={columnsLength}>
      <div className="flex justify-center">No rows</div>
    </TableCell>
  </TableRow>
);

const Rows = () => {
  const {
    table: { getRowModel, options },
    slotProps,
  } = useTableContext();
  const rowModel = getRowModel();

  useAtomValue(sortingAtom);
  useAtomValue(rowsModeModelAtom);

  if ((rowModel.rows?.length ?? 0) === 0)
    return <NoRows columnsLength={options.columns.length} />;
  return rowModel.rows.map((row) => (
    <Row
      key={row.id}
      row={row}
      onDoubleClick={() => {
        options.meta?.setRowEditMode(row.id, "edit");
      }}
      {...slotProps?.row}
    >
      {row.getVisibleCells().map((cell) => {
        const column =
          typeof cell.column.columnDef.header === "string"
            ? cell.column.columnDef.header
            : (cell.column.columnDef.id ?? "");
        return (
          <Cell
            key={cell.id}
            cell={cell}
            editMode={options?.meta?.getRowEditMode(row.id)}
            data-row-id={row.id}
            data-column={column}
          />
        );
      })}
    </Row>
  ));
};

export function Body() {
  return (
    <TableBody>
      <Rows />
    </TableBody>
  );
}
