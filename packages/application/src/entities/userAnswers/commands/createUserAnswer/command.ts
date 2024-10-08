import { prisma } from "@simplifytax/database";
import "server-only";
import { CreateUserAnswerCommand } from "@app/entities/userAnswers/commands/createUserAnswer/schemas";

export async function createUserAnswerCommand(values: CreateUserAnswerCommand) {
  await prisma.userAnswer.create({
    data: values,
  });
}
