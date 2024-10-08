"use server";
import { getAdminImageItemsQuery } from "@app/assets/images/queries/getAdminImageItems/query";

export async function loadImages(folder: string, search?: string) {
  return await getAdminImageItemsQuery({
    search: `folder:${process.env.NEXT_PUBLIC_CLOUDINARY_ROOT_FOLDER_NAME}/${folder}${search ? ` AND ${search}*` : ""}`,
  });
}

export async function loadNextImages(
  nextCursor: string,
  folder: string,
  search?: string,
) {
  return await getAdminImageItemsQuery({
    search: `folder:${process.env.NEXT_PUBLIC_CLOUDINARY_ROOT_FOLDER_NAME}/${folder}${search ? ` AND ${search}*` : ""}`,
    nextCursor,
  });
}
