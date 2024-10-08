import { Prisma } from "@prisma/client";
import { z } from "zod";

export type AdminAnswerItem = Prisma.AnswerGetPayload<{
  select: typeof getAdminAnswerItemsSelect;
}>;

export type GetAdminAnswerItemsSearchParams = {
  page?: string;
  per_page?: string;
  title?: string;
};

export const getAdminAnswerItemsWhere = z
  .object({
    title: z.string().optional(),
  })
  .transform((searchParams) => {
    let query: Prisma.AnswerWhereInput = {};

    if (searchParams.title) {
      query = {
        title: {
          contains: searchParams.title,
        },
      };
    }

    return query;
  });

export const getAdminAnswerItemsSelect = {
  id: true,
  title: true,
} satisfies Prisma.AnswerSelect;
