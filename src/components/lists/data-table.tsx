"use client";

import { DataTable } from "../data-table";
import { columns, type ListRow } from "./columns";
import { trpcReact } from "../../utils/trpc";
import { useRouter } from "next/navigation";

const ListsDataTable = ({ initialLists }: { initialLists: ListRow[] }) => {
  const { data: lists } = trpcReact.list.getMany.useQuery(undefined, {
    initialData: initialLists,
  });
  const router = useRouter();

  return (
    <DataTable
      columns={columns}
      data={lists}
      getRowProps={({ id }) => ({
        className: "hover:cursor-pointer",
        onClick: (e) => {
          e.stopPropagation();
          router.push(`/${id}`);
        },
      })}
    />
  );
};
export default ListsDataTable;
