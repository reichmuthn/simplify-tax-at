import { prisma } from "@simplifytax/database";
import "server-only";
import { CreateAnswerCommand } from "@app/entities/answers/commands/createAnswer/schemas";

export async function updateAnswerCommand(
  id: string,
  values: CreateAnswerCommand,
) {
  await prisma.answer.update({
    where: { id },
    data: values,
  });
}
