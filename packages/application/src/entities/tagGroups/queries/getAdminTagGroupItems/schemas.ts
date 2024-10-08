import { Prisma } from "@prisma/client";
import { z } from "zod";

export type AdminTagGroupItem = Prisma.TagGroupGetPayload<{
  select: typeof getAdminTagGroupItemsSelect;
}>;

export type GetAdminTagGroupItemsSearchParams = {
  page?: string;
  per_page?: string;
  title?: string;
};

export const getAdminTagGroupItemsWhere = z
  .object({
    title: z.string().optional(),
  })
  .transform((searchParams) => {
    let query: Prisma.TagGroupWhereInput = {};

    if (searchParams.title) {
      query = {
        title: {
          contains: searchParams.title,
        },
      };
    }

    return query;
  });

export const getAdminTagGroupItemsSelect = {
  id: true,
  title: true,
} satisfies Prisma.TagGroupSelect;
