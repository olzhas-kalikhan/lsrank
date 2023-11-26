"use client";

import {
  type Table as TableType,
  type Row as RowType,
} from "@tanstack/react-table";
import { Row, type GetRowPropsFn } from "./row";
import { TableBody, TableCell, TableRow } from "~/components/ui/table";
import { Cell } from "./cell";

const Cells = <TData,>(row: RowType<TData>) =>
  row.getVisibleCells().map((cell) => <Cell key={cell.id} {...cell} />);

const NoRows = () => (
  <TableRow>
    <TableCell className="h-24 text-center">No results.</TableCell>
  </TableRow>
);

const Rows = <TData,>({
  getRowModel,
  getRowProps,
}: Pick<TableType<TData>, "getRowModel"> & {
  getRowProps?: GetRowPropsFn<TData>;
}) => {
  const rowModel = getRowModel();

  if ((rowModel.rows?.length ?? 0) === 0) return <NoRows />;
  return rowModel.rows.map((row) => (
    <Row key={row.id} getRowProps={getRowProps} {...row}>
      <Cells {...row} />
    </Row>
  ));
};

export const Body = <TData,>({
  getRowModel,
  getRowProps,
}: Pick<TableType<TData>, "getRowModel"> & {
  getRowProps?: GetRowPropsFn<TData>;
}) => (
  <TableBody>
    <Rows {...{ getRowModel, getRowProps }} />
  </TableBody>
);
