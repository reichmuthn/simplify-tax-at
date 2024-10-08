import { prisma } from "@simplifytax/database";
import "server-only";
import { CreateQuestionCommand } from "@app/entities/questions/commands/createQuestion/schemas";

export async function updateQuestionCommand(
  id: string,
  values: CreateQuestionCommand,
) {
  await prisma.question.update({
    where: { id },
    data: values,
  });
}
