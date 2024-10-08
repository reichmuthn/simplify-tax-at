import { prisma } from "@simplifytax/database";
import "server-only";
import { CreateUserAnswerCommand } from "@app/entities/userAnswers/commands/createUserAnswer/schemas";

export async function updateUserAnswerCommand(
  id: string,
  values: CreateUserAnswerCommand,
) {
  await prisma.userAnswer.update({
    where: { id },
    data: values,
  });
}
