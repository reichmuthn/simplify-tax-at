import { Prisma } from "@prisma/client";
import { z } from "zod";

export type AdminQuestionItem = Prisma.QuestionGetPayload<{
  select: typeof getAdminQuestionItemsSelect;
}>;

export type GetAdminQuestionItemsSearchParams = {
  page?: string;
  per_page?: string;
  title?: string;
};

export const getAdminQuestionItemsWhere = z
  .object({
    title: z.string().optional(),
  })
  .transform((searchParams) => {
    let query: Prisma.QuestionWhereInput = {};

    if (searchParams.title) {
      query = {
        title: {
          contains: searchParams.title,
        },
      };
    }

    return query;
  });

export const getAdminQuestionItemsSelect = {
  id: true,
  title: true,
} satisfies Prisma.QuestionSelect;
