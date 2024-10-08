"use server";
import { getAllPersonSearchItemsQuery } from "@app/entities/persons/queries/getAllPersonSearchItems/query";

export async function searchPersons(search: string) {
  const items = await getAllPersonSearchItemsQuery(search);

  return items.map((x) => ({
    value: x.id,
    label: x.title,
  }));
}
