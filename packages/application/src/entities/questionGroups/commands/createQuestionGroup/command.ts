import { prisma } from "@simplifytax/database";
import "server-only";
import { CreateQuestionGroupCommand } from "@app/entities/questionGroups/commands/createQuestionGroup/schemas";

export async function createQuestionGroupCommand(
  values: CreateQuestionGroupCommand,
) {
  await prisma.questionGroup.create({
    data: {
      title: values.title,
      questions: {
        create: values.questions
          .filter((x) => !x.id)
          .map((x) => ({
            title: x.title,
            answers: {
              create: x.answers
                .filter((a) => !a.id)
                .map((a) => ({
                  title: a.title,
                })),
            },
          })),
      },
    },
  });
}
