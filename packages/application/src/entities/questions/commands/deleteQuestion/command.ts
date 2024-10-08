import { prisma } from "@simplifytax/database";
import "server-only";

export async function deleteQuestionCommand(id: string) {
  await prisma.question.delete({
    where: {
      id: id,
    },
  });
}
