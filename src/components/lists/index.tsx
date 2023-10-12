import { trpcServer } from "~/server/api/root";
import ListsDataTable from "./data-table";

const Lists = async () => {
  const lists = await (await trpcServer()).list.get();

  return <ListsDataTable lists={lists} />;
};

export default Lists;
