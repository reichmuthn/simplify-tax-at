"use server";

import { unstable_noStore as noStore, revalidateTag } from "next/cache";
import {
  CreateTagGroupCommand,
  createTagGroupCommandSchema,
} from "@app/entities/tagGroups/commands/createTagGroup/schemas";
import { createTagGroupCommand } from "@app/entities/tagGroups/commands/createTagGroup/command";
import { updateTagGroupCommand } from "@app/entities/tagGroups/commands/updateTagGroup/command";
import { deleteTagGroupCommand } from "@app/entities/tagGroups/commands/deleteTagGroup/command";

export async function saveTagGroup(values: CreateTagGroupCommand, id?: string) {
  noStore();
  const validatedFields = createTagGroupCommandSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      data: null,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    id
      ? await updateTagGroupCommand(id, validatedFields.data)
      : await createTagGroupCommand(validatedFields.data);
    revalidateTag("tagGroups");
  } catch (err: any) {
    return {
      data: null,
      errors: { root: [err.message] },
    };
  }
}

export async function deleteTagGroup(id: string) {
  noStore();
  try {
    await deleteTagGroupCommand(id);
  } catch (err: any) {
    return {
      data: null,
      errors: { root: [err.message] },
    };
  }

  revalidateTag("tagGroups");
}
