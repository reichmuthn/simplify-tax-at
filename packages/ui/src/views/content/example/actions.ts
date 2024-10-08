"use server";
import { saveSectionContentCommand } from "@app/content/commands/saveSectionContent/command";
import { revalidatePath } from "next/cache";

export async function saveContent(content: string, key: string) {
  try {
    await saveSectionContentCommand({
      title: "title",
      subtitle: "subtitle",
      description: content,
    });
    revalidatePath("/content");
  } catch (error) {
    console.log(error);
    return { errors: { root: ["Error"] } };
  }
}
