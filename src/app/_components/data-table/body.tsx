import { Row } from "./row";
import { TableBody, TableCell, TableRow } from "~/app/_components/ui/table";
import { Cell } from "./cell";
import { useTableContext } from "./table-provider";
import { useAtomValue } from "jotai";
import { sortingAtom } from "./atoms-provider";

const NoRows = () => (
  <TableRow>
    <TableCell className="h-24 text-center">No results.</TableCell>
  </TableRow>
);

const Rows = () => {
  const { getRowModel, options } = useTableContext();
  const rowModel = getRowModel();

  useAtomValue(sortingAtom);

  if ((rowModel.rows?.length ?? 0) === 0) return <NoRows />;
  return rowModel.rows.map((row) => (
    <Row key={row.id} {...row}>
      {row.getVisibleCells().map((cell) => (
        <Cell
          key={cell.id}
          {...cell}
          editMode={options?.meta?.getRowEditMode(row.id)}
        />
      ))}
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
