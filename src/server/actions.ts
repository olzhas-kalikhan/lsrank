"use server";

import { revalidatePath } from "next/cache";
import { trpcServer } from "./api/root";

export const createList = async (formData: FormData) => {
  await (
    await trpcServer()
  ).list.create({
    name: formData.get("name") as string,
    type: formData.get("type") as "VIDEO_GAME",
    listItems: [],
  });
  revalidatePath('/new-list')
};
