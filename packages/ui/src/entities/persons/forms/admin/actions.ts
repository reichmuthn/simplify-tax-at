"use server";

import { unstable_noStore as noStore, revalidateTag } from "next/cache";
import {
  CreatePersonCommand,
  createPersonCommandSchema,
} from "@app/entities/persons/commands/createPerson/schemas";
import { createPersonCommand } from "@app/entities/persons/commands/createPerson/command";
import { updatePersonCommand } from "@app/entities/persons/commands/updatePerson/command";
import { deletePersonCommand } from "@app/entities/persons/commands/deletePerson/command";

export async function savePerson(values: CreatePersonCommand, id?: string) {
  noStore();
  const validatedFields = createPersonCommandSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      data: null,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    id
      ? await updatePersonCommand(id, validatedFields.data)
      : await createPersonCommand(validatedFields.data);
    revalidateTag("persons");
  } catch (err: any) {
    return {
      data: null,
      errors: { root: [err.message] },
    };
  }
}

export async function deletePerson(id: string) {
  noStore();
  try {
    await deletePersonCommand(id);
  } catch (err: any) {
    return {
      data: null,
      errors: { root: [err.message] },
    };
  }

  revalidateTag("persons");
}
