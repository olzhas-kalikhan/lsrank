"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "../data-table";
import { columns, type ListRow } from "./columns";
import { trpcReact } from "../../utils/trpc";

const ListsDataTable = ({ initialLists }: { initialLists: ListRow[] }) => {
  const { data: lists } = trpcReact.list.getMany.useQuery(undefined, {
    initialData: initialLists,
  });

  return (
    <DataTable
      columns={columns}
      data={lists}
      getRowProps={() => ({
        className: "hover:cursor-pointer",
      })}
    />
  );
};
export default ListsDataTable;
