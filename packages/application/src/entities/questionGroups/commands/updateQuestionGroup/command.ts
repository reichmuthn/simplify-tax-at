import { prisma } from "@simplifytax/database";
import "server-only";
import { CreateQuestionGroupCommand } from "@app/entities/questionGroups/commands/createQuestionGroup/schemas";

export async function updateQuestionGroupCommand(
  id: string,
  values: CreateQuestionGroupCommand,
) {
  await prisma.questionGroup.update({
    where: { id },
    data: {
      title: values.title,
      questions: {
        update: values.questions
          .filter((x) => x.id)
          .map((x) => ({
            where: { id: x.id },
            data: {
              title: x.title,
              answers: {
                update: x.answers
                  .filter((a) => a.id)
                  .map((a) => ({
                    where: {
                      id: a.id,
                    },
                    data: {
                      title: a.title,
                    },
                  })),
                create: x.answers
                  .filter((a) => !a.id)
                  .map((a) => ({
                    title: a.title,
                  })),
              },
            },
          })),
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
