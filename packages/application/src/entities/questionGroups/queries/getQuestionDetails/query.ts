import { getQuestionGroupDetailsSelect } from "./schemas";
import "server-only";
import { prisma } from "@simplifytax/database";

export async function getQuestionGroupDetailsQuery(id: string) {
  return prisma.questionGroup.findUnique({
    where: {
      id,
    },
    select: getQuestionGroupDetailsSelect,
  });
}
