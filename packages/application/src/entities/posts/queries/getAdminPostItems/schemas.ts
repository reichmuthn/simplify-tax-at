import { $Enums, Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@simplifytax/database";

export type AdminPostItem = Prisma.PostGetPayload<{
  select: typeof getAdminPostItemsSelect;
}>;

export type GetAdminPostItemsSearchParams = {
  page?: string;
  per_page?: string;
  title?: string;
  sort?: string;
  status?: string;
};

export const getAdminPostItemsOrderBy = z
  .object({
    sort: z.string().optional(),
  })
  .transform((searchParams) => {
    let orderBy: Prisma.Args<typeof prisma.post, "findMany">["orderBy"] = {
      publishedAt: { sort: "desc", nulls: "last" },
    };

    if (searchParams.sort?.startsWith("publishedAt")) {
      const orderDirection = searchParams.sort.split(".")?.[1]?.toLowerCase();

      if (orderDirection && ["asc", "desc"].includes(orderDirection)) {
        orderBy = {
          publishedAt: {
            sort: orderDirection as Prisma.SortOrder,
            nulls: "last",
          },
        };
      }
    }

    return orderBy;
  });

export const getAdminPostItemsWhere = z
  .object({
    title: z.string().optional(),
    status: z.string().optional(),
  })
  .transform((searchParams) => {
    let query: Prisma.PostWhereInput = {};

    if (searchParams.title) {
      query = {
        title: {
          contains: searchParams.title,
          mode: "insensitive",
        },
      };
    }

    if (searchParams.status) {
      query = {
        ...query,
        OR: searchParams.status
          .split(".")
          .filter((x) =>
            Object.values($Enums.Status).includes(x as $Enums.Status),
          )
          .map((status) => ({
            status: status as $Enums.Status,
          })),
      };
    }

    return query;
  });

export const getAdminPostItemsSelect = {
  id: true,
  slug: true,
  title: true,
  status: true,
  summary: true,
  publishedAt: true,
  content: true,
  titleImage: true,
  tags: {
    select: {
      id: true,
      title: true,
    },
  },
  author: {
    select: {
      id: true,
      title: true,
    },
  },
} satisfies Prisma.PostSelect;
