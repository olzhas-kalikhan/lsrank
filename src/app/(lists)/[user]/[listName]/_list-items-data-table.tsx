"use client";

import { useParams } from "next/navigation";
import { type inferProcedureOutput } from "@trpc/server";
import { defaultColumns } from "./_data-table-columns";
import { type ListItemRowModel } from "./_types";
import { ListName } from "./_list-name";
import { DataTable } from "@components/data-table";
import { api } from "~/trpc/react";
import { type AppRouter } from "~/server/api/root";

export default function ListItemsDataTable({
  list,
}: {
  list: inferProcedureOutput<AppRouter["list"]["getList"]>;
}) {
  const params = useParams<{ user: string; listName: string }>();
  const { data } = api.list.getList.useQuery(
    {
      userName: params.user,
      listName: params.listName,
    },
    { initialData: list },
  );
  const listItems = data?.lists[0]?.listItems ?? [];

  return (
    <div>
      <ListName data={list} />
      <DataTable
        columns={defaultColumns}
        data={listItems.reduce(
          (output, { name, meta_id, meta_pic_url, ...rest }) => {
            if (name && meta_id) {
              output.push({
                item: Object.assign(
                  {
                    label: name,
                    value: meta_id,
                  },
                  meta_pic_url && {
                    cover: {
                      url: meta_pic_url,
                    },
                  },
                ),
                ...rest,
              });
            }
            return output;
          },
          [] as ListItemRowModel[],
        )}
        getRowId={(row) => row.id}
      />
    </div>
  );
}
