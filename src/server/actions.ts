"use server";

import { revalidatePath } from "next/cache";
import { trpcServer } from "./api/root";
import { ListItem } from "~/components/list-item-form";

export const createList = async (formData: FormData) => {
  console.log("fff", formData);
  await (
    await trpcServer()
  ).list.create({
    name: formData.get("name") as string,
    type: formData.get("type") as "VIDEO_GAME",
    listItems: formData.get("listItems") as unknown as ListItem[],
  });
  revalidatePath("/new-list");
};
