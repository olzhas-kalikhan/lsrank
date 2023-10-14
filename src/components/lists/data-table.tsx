"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "../data-table";
import { columns, type ListRow } from "./columns";
import { trpcReact } from "../../utils/trpc";

const ListsDataTable = ({ initialLists }: { initialLists: ListRow[] }) => {
  const router = useRouter();
  const { data: lists } = trpcReact.list.get.useQuery(undefined, {
    initialData: initialLists,
  });

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
