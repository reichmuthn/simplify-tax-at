"use server";
import { getAllTagGroupSearchItemsQuery } from "@app/entities/tagGroups/queries/getAllTagGroupSearchItems/query";

export async function searchTagGroups(search: string) {
  const items = await getAllTagGroupSearchItemsQuery(search);

  return items.map((x) => ({
    value: x.id,
    label: x.title,
  }));
}
