import { Prisma } from "@prisma/client";
import { z } from "zod";

export type AdminTagItem = Prisma.TagGetPayload<{
  select: typeof getAdminTagItemsSelect;
}>;

export type GetAdminTagItemsSearchParams = {
  page?: string;
  per_page?: string;
  title?: string;
};

export const getAdminTagItemsWhere = z
  .object({
    title: z.string().optional(),
  })
  .transform((searchParams) => {
    let query: Prisma.TagWhereInput = {};

    if (searchParams.title) {
      query = {
        title: {
          contains: searchParams.title,
        },
      };
    }

    return query;
  });

export const getAdminTagItemsSelect = {
  id: true,
  title: true,
  tagGroup: {
    select: {
      id: true,
      title: true,
    },
  },
} satisfies Prisma.TagSelect;
