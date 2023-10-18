"use client";

import { type Table as TableType } from "@tanstack/react-table";
import { Row, type GetRowPropsFn } from "./row";
import { TableBody, TableCell, TableRow } from "~/components/ui/table";
import { Cell } from "./cell";

export const Body = <TData,>({
  getRowModel,
  getRowProps,
}: Pick<TableType<TData>, "getRowModel"> & {
  getRowProps?: GetRowPropsFn<TData>;
}) => {
  const rowModel = getRowModel();
  return (
    <TableBody>
      {rowModel.rows?.length ? (
        rowModel.rows.map((row) => (
          <Row key={row.id} getRowProps={getRowProps} {...row}>
            {row.getVisibleCells().map((cell) => (
              <Cell key={cell.id} {...cell} />
            ))}
          </Row>
        ))
      ) : (
        <TableRow>
          <TableCell className="h-24 text-center">No results.</TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};
