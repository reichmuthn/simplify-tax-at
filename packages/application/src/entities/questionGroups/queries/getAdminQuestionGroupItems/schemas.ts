import { Prisma } from "@prisma/client";
import { z } from "zod";

export type AdminQuestionGroupItem = Prisma.QuestionGroupGetPayload<{
  select: typeof getAdminQuestionGroupItemsSelect;
}>;

export type GetAdminQuestionGroupItemsSearchParams = {
  page?: string;
  per_page?: string;
  title?: string;
};

export const getAdminQuestionGroupItemsWhere = z
  .object({
    title: z.string().optional(),
  })
  .transform((searchParams) => {
    let query: Prisma.QuestionGroupWhereInput = {};

    if (searchParams.title) {
      query = {
        title: {
          contains: searchParams.title,
        },
      };
    }

    return query;
  });

export const getAdminQuestionGroupItemsSelect = {
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
        },
      },
    },
  },
} satisfies Prisma.QuestionGroupSelect;
