"use server";

import { unstable_noStore as noStore, revalidateTag } from "next/cache";
import {
  CreateTagCommand,
  createTagCommandSchema,
} from "@app/entities/tags/commands/createTag/schemas";
import { createTagCommand } from "@app/entities/tags/commands/createTag/command";
import { updateTagCommand } from "@app/entities/tags/commands/updateTag/command";
import { deleteTagCommand } from "@app/entities/tags/commands/deleteTag/command";

export async function saveTag(values: CreateTagCommand, id?: string) {
  noStore();
  const validatedFields = createTagCommandSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      data: null,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    id
      ? await updateTagCommand(id, validatedFields.data)
      : await createTagCommand(validatedFields.data);
    revalidateTag("tags");
  } catch (err: any) {
    return {
      data: null,
      errors: { root: [err.message] },
    };
  }
}

export async function deleteTag(id: string) {
  noStore();
  try {
    await deleteTagCommand(id);
  } catch (err: any) {
    return {
      data: null,
      errors: { root: [err.message] },
    };
  }

  revalidateTag("tags");
}
