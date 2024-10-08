"use server";

import { unstable_noStore as noStore, revalidateTag } from "next/cache";
import {
  CreateTermCommand,
  createTermCommandSchema,
} from "@app/entities/terms/commands/createTerm/schemas";
import { createTermCommand } from "@app/entities/terms/commands/createTerm/command";
import { updateTermCommand } from "@app/entities/terms/commands/updateTerm/command";
import { deleteTermCommand } from "@app/entities/terms/commands/deleteTerm/command";

export async function saveTerm(values: CreateTermCommand, id?: string) {
  noStore();
  const validatedFields = createTermCommandSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      data: null,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    id
      ? await updateTermCommand(id, validatedFields.data)
      : await createTermCommand(validatedFields.data);
    revalidateTag("terms");
  } catch (err: any) {
    return {
      data: null,
      errors: { root: [err.message] },
    };
  }
}

export async function deleteTerm(id: string) {
  noStore();
  try {
    await deleteTermCommand(id);
  } catch (err: any) {
    return {
      data: null,
      errors: { root: [err.message] },
    };
  }

  revalidateTag("terms");
}
