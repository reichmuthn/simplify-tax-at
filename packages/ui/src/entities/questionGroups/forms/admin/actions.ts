"use server";

import { revalidateTag, unstable_noStore as noStore } from "next/cache";
import {
  CreateQuestionGroupCommand,
  createQuestionGroupCommandSchema,
} from "@app/entities/questionGroups/commands/createQuestionGroup/schemas";
import { createQuestionGroupCommand } from "@app/entities/questionGroups/commands/createQuestionGroup/command";
import { updateQuestionGroupCommand } from "@app/entities/questionGroups/commands/updateQuestionGroup/command";
import { deleteQuestionGroupCommand } from "@app/entities/questionGroups/commands/deleteQuestionGroup/command";
import { deleteAnswerCommand } from "@app/entities/answers/commands/deleteAnswer/command";
import { deleteQuestionCommand } from "@app/entities/questions/commands/deleteQuestion/command";

export async function saveQuestionGroup(
  values: CreateQuestionGroupCommand,
  id?: string,
) {
  noStore();
  const validatedFields = createQuestionGroupCommandSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      data: null,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    id
      ? await updateQuestionGroupCommand(id, validatedFields.data)
      : await createQuestionGroupCommand(validatedFields.data);
    revalidateTag("questionGroups");
  } catch (err: any) {
    return {
      data: null,
      errors: { root: [err.message] },
    };
  }
}

export async function deleteQuestionGroup(id: string) {
  noStore();
  try {
    await deleteQuestionGroupCommand(id);
  } catch (err: any) {
    return {
      data: null,
      errors: { root: [err.message] },
    };
  }

  revalidateTag("questionGroups");
}

export async function deleteQuestion(id: string) {
  noStore();
  try {
    await deleteQuestionCommand(id);
  } catch (err: any) {
    return {
      data: null,
      errors: { root: [err.message] },
    };
  }

  revalidateTag("questions");
}

export async function deleteAnswer(id: string) {
  noStore();
  try {
    await deleteAnswerCommand(id);
  } catch (err: any) {
    return {
      data: null,
      errors: { root: [err.message] },
    };
  }

  revalidateTag("answers");
}
