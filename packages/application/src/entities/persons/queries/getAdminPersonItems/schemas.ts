import { Prisma } from "@prisma/client";
import { z } from "zod";

export type AdminPersonItem = Prisma.PersonGetPayload<{
  select: typeof getAdminPersonItemsSelect;
}>;

export type GetAdminPersonItemsSearchParams = {
  page?: string;
  per_page?: string;
  title?: string;
};

export const getAdminPersonItemsWhere = z
  .object({
    title: z.string().optional(),
  })
  .transform((searchParams) => {
    let query: Prisma.PersonWhereInput = {};

    if (searchParams.title) {
      query = {
        title: {
          contains: searchParams.title,
        },
      };
    }

    return query;
  });

export const getAdminPersonItemsSelect = {
  id: true,
  title: true,
  image: true,
  position: true,
  socialLinks: true,
  description: true,
} satisfies Prisma.PersonSelect;
