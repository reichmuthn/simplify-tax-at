import { Prisma } from "@prisma/client";
import { z } from "zod";

export type ActivePostListItem = Prisma.PostGetPayload<{
  select: typeof getActivePostListItemsSelect;
}>;

export type GetActivePostListItemsSearchParams = {
  seite?: string;
  limit?: string;
  tag?: string;
};

export const getActivePostListItemsWhere = z
  .object({
    tag: z.string().optional(),
  })
  .transform((searchParams) => {
    let query: Prisma.PostWhereInput = {};

    if (searchParams.tag) {
      query = {
        tags: {
          some: {
            slug: searchParams.tag,
          },
        },
      };
    }

    return query;
  });

export const getActivePostListItemsSelect = {
  id: true,
  title: true,
  slug: true,
  summary: true,
  publishedAt: true,
  titleImage: true,
  tags: {
    select: {
      id: true,
      slug: true,
      title: true,
    },
  },
} satisfies Prisma.PostSelect;
