"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type UseFieldArrayReturn } from "react-hook-form";
import { DataTable } from "@components/data-table";
import {
  CancelListItemButton,
  DeleteListItemButton,
  EditListItemButton,
  SaveListItemButton,
} from "@components/data-table/actions";
type ListItem = {
  id: string;
  name: string | null;
  score: number;
};
const getDefaultColumns = () //     {
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
  //   {
  //     id: "actions",
  //     enableHiding: false,
  //     cell: ({ row, table, editMode }) => (
  //       <div className="flex justify-end gap-x-2">
  //         {editMode === "view" && (
  //           <>
  //             <EditListItemButton
  //               rowId={row.id}
  //               onClick={() => {
  //                 table.options.meta?.setRowEditMode(row.id, "edit");
  //               }}
  //             />
  //             <DeleteListItemButton
  //               rowId={row.id}
  //               onClick={() => {
  //                 remove(row.index);
  //               }}
  //             />
  //           </>
  //         )}
  //         {editMode === "edit" && (
  //           <>
  //             <SaveListItemButton
  //               rowId={row.id}
  //               onClick={() => {
  //                 update(
  //                   row.index,
  //                   table.options.meta?.getRowEditValue(row.id) as ListItem,
  //                 );
  //                 table.options.meta?.setRowEditMode(row.id, "view");
  //               }}
  //             />
  //             <CancelListItemButton
  //               rowId={row.id}
  //               onClick={() => {
  //                 table.options.meta?.setRowEditMode(row.id, "view");
  //               }}
  //             />
  //           </>
  //         )}
  //       </div>
  //     ),

  //     size: 20,
  //     minSize: 20,
  //   },
];

export default function ListDataTable({ data }: { data: ListItem[] }) {
  return <DataTable columns={getDefaultColumns()} data={data} />;
}
