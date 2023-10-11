import Link from "next/link";
import { trpcServer } from "~/server/api/root";
import { DataTable } from "../data-table";
import { columns } from "./columns";

const Lists = async () => {
  const lists = await (await trpcServer()).list.get();

  return <DataTable columns={columns} data={lists} />;
};

export default Lists;
