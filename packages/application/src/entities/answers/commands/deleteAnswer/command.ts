import { prisma } from "@simplifytax/database";
import "server-only";

export async function deleteAnswerCommand(id: string) {
  await prisma.answer.delete({
    where: {
      id: id,
    },
  });
}
