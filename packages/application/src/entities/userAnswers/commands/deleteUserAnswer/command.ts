import { prisma } from "@simplifytax/database";
import "server-only";

export async function deleteUserAnswerCommand(id: string) {
  await prisma.userAnswer.delete({
    where: {
      id: id,
    },
  });
}
