import { trpcServer } from "~/server/api/root";
import ListsDataTable from "./data-table";

const Lists = async () => {
  const lists = await (await trpcServer()).list.getMany();

  return <ListsDataTable initialLists={lists} />;
};

export default Lists;
