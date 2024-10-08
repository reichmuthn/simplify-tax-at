import { Prisma } from "@prisma/client";
import { z } from "zod";

export type AdminTermItem = Prisma.TermGetPayload<{
  select: typeof getAdminTermItemsSelect;
}>;

export type GetAdminTermItemsSearchParams = {
  page?: string;
  per_page?: string;
  title?: string;
};

export const getAdminTermItemsWhere = z
  .object({
    title: z.string().optional(),
  })
  .transform((searchParams) => {
    let query: Prisma.TermWhereInput = {};

    if (searchParams.title) {
      query = {
        title: {
          contains: searchParams.title,
        },
      };
    }

    return query;
  });

export const getAdminTermItemsSelect = {
  id: true,
  title: true,
  description: true,
  status: true,
  tags: {
    select: {
      id: true,
      title: true,
    },
  },
} satisfies Prisma.TermSelect;
