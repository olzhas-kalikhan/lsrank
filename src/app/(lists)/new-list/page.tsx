import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "~/app/_components/data-table";

type ListItem = {
  id: string;
  name: string;
};
const defaultColumns: ColumnDef<ListItem>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
];

const rows: ListItem[] = [
  {
    id: "1",
    name: "A",
  },
  {
    id: "2",
    name: "B",
  },
];
export default function Page() {
  return <DataTable data={rows} columns={defaultColumns} />;
}
