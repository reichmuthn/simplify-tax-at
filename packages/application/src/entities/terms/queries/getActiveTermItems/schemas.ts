import { Prisma } from "@prisma/client";
import { z } from "zod";

export type ActiveTermItem = Prisma.TermGetPayload<{
  select: typeof getActiveTermItemsSelect;
}>;

export type GetActiveTermItemsSearchParams = {
  seite?: string;
  limit?: string;
  begriff?: string;
  kategorie?: string;
  buchstabe?: string;
  suche?: string;
};

export const getActiveTermItemsWhere = z
  .object({
    kategorie: z.string().optional(),
    buchstabe: z.string().optional(),
    suche: z.string().optional(),
  })
  .transform((searchParams) => {
    let query: Prisma.TermWhereInput = {};

    if (searchParams.kategorie) {
      query = {
        tags: {
          some: {
            slug: searchParams.kategorie,
          },
        },
      };
    }

    if (searchParams.buchstabe) {
      query = {
        ...query,
        title: {
          startsWith: searchParams.buchstabe,
          mode: "insensitive",
        },
      };
    }

    if (searchParams.suche) {
      query = {
        ...query,
        title: {
          contains: searchParams.suche,
          mode: "insensitive",
        },
      };
    }

    return query;
  });

export const getActiveTermItemsSelect = {
  id: true,
  title: true,
  slug: true,
  tags: {
    select: {
      id: true,
      slug: true,
      title: true,
    },
  },
} satisfies Prisma.TermSelect;
