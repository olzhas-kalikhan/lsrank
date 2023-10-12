"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "../data-table";
import { columns, type ListRow } from "./columns";

const ListsDataTable = ({ lists }: { lists: ListRow[] }) => {
  const router = useRouter();

  return (
    <DataTable
      columns={columns}
      data={lists}
      getRowProps={(row) => ({
        className: "hover:cursor-pointer",
        onClick: () => {
          router.push(`/${row.getValue<string>("name")}`);
          console.log(row);
        },
      })}
    />
  );
};
export default ListsDataTable;
