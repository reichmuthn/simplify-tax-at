import { Prisma } from "@prisma/client";
import { z } from "zod";

export type AdminUserAnswerItem = Prisma.UserAnswerGetPayload<{
  select: typeof getAdminUserAnswerItemsSelect;
}>;

export type GetAdminUserAnswerItemsSearchParams = {
  page?: string;
  per_page?: string;
  answerId?: string;
};

export const getAdminUserAnswerItemsWhere = z
  .object({
    answerId: z.string().optional(),
  })
  .transform((searchParams) => {
    let query: Prisma.UserAnswerWhereInput = {};

    if (searchParams.answerId) {
      query = {
        answerId: searchParams.answerId,
      };
    }

    return query;
  });

export const getAdminUserAnswerItemsSelect = {
  id: true,
  answerId: true,
} satisfies Prisma.UserAnswerSelect;
