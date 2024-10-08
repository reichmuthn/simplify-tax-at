import { Prisma } from "@prisma/client";

export type QuestionGroupDetails = Prisma.QuestionGroupGetPayload<{
  select: typeof getQuestionGroupDetailsSelect;
}>;

export const getQuestionGroupDetailsSelect = {
  id: true,
  title: true,
  questions: {
    select: {
      id: true,
      title: true,
      answers: {
        select: {
          id: true,
          title: true,
          userAnswers: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  },
} satisfies Prisma.QuestionGroupSelect;
