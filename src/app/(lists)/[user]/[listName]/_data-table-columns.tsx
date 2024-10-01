import { type ColumnDef, type CellContext } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import { DataTableActions } from "~/app/_components/data-table";
import { api } from "~/trpc/react";

type ListItem = {
  id: string;
  name: string | null;
  score: number;
};

export const getDefaultColumns = () //     {
//   remove,
//   update,
// }: Pick<
//   UseFieldArrayReturn<FormDefaultValues>,
//   "remove" | "update"
// >
: ColumnDef<ListItem>[] => [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
    // cell: (cellContext) => {
    //   const { editMode, cell } = cellContext;
    //   if (editMode === "edit")
    //     return (
    //         <DataTableCellInput {...cellContext} />
    //     );
    //   return cell.getValue();
    // },
  },
  {
    header: "Score",
    accessorKey: "score",
    // cell: ({ editMode, cell }) => {
    //   if (editMode === "edit")
    //     return (
    //       <NumberInput
    //         defaultValue={cell.getValue() as string}
    //         isAllowed={(values) => {
    //           if (values.value === "") return true;
    //           if (
    //             values.floatValue === null ||
    //             values.floatValue === undefined ||
    //             !isNumber(values.floatValue)
    //           )
    //             return false;

    //           return values.floatValue >= 0 && values.floatValue <= 10;
    //         }}
    //       />
    //     );
    //   return cell.getValue();
    // },
  },
  {
    id: "actions",
    cell: (cell) => <ListItemsActions {...cell} />,

    size: 20,
    minSize: 20,
  },
];

export function ListItemsActions({
  editMode,
  row,
  table,
}: CellContext<ListItem, unknown>) {
  const utils = api.useUtils();
  const params = useParams<{ listName: string; user: string }>();

  const { mutate: deleteListItem } = api.listItem.deleteListItem.useMutation({
    onSuccess: () => {
      void utils.list.getList.invalidate({
        listName: params.listName,
        userName: params.user,
      });
    },
  });
  const { mutate: updateListItem } = api.listItem.updateListItem.useMutation();

  return (
    <DataTableActions
      editMode={editMode}
      onEdit={() => {
        table.options.meta?.setRowEditMode(row.id, "edit");
      }}
      onDelete={() => {
        deleteListItem({ id: row.id });
      }}
      onSave={() => {
        const newValues = table.options.meta?.getRowEditValue(
          row.id,
        ) as ListItem;
        updateListItem(newValues);
        table.options.meta?.setRowEditMode(row.id, "view");
      }}
      onCancel={() => {
        table.options.meta?.setRowEditMode(row.id, "view");
      }}
    />
  );
}
