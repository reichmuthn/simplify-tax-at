import { prisma } from "@simplifytax/database";
import "server-only";
import { CreateAnswerCommand } from "@app/entities/answers/commands/createAnswer/schemas";

export async function createAnswerCommand(values: CreateAnswerCommand) {
  await prisma.answer.create({
    data: values,
  });
}
