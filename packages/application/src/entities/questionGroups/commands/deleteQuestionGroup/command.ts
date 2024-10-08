import { prisma } from "@simplifytax/database";
import "server-only";

export async function deleteQuestionGroupCommand(id: string) {
  await prisma.questionGroup.delete({
    where: {
      id: id,
    },
  });
}
