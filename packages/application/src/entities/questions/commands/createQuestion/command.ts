import { prisma } from "@simplifytax/database";
import "server-only";
import { CreateQuestionCommand } from "@app/entities/questions/commands/createQuestion/schemas";

export async function createQuestionCommand(values: CreateQuestionCommand) {
  await prisma.question.create({
    data: values,
  });
}
