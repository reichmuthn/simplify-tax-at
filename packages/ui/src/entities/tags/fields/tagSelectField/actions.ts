"use server";
import { getAllTagSearchItemsQuery } from "@app/entities/tags/queries/getAllTagSearchItems/query";

export async function searchTags(search: string, tagGroupSlugs: string[]) {
  const items = await getAllTagSearchItemsQuery(search, tagGroupSlugs);

  return items.map((x) => ({
    value: x.id,
    label: x.title,
  }));
}
