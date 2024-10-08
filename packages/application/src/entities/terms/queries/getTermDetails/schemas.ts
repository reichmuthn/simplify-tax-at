import { Prisma } from "@prisma/client";

export type TermDetails = Prisma.TermGetPayload<{
  select: typeof getTermDetailsSelect;
}>;

export const getTermDetailsSelect = {
  id: true,
  slug: true,
  title: true,
  description: true,
  tags: {
    select: {
      id: true,
      slug: true,
      title: true,
    },
  },
} satisfies Prisma.TermSelect;
