import { Prisma } from "@prisma/client";

export type UsedTermTagItem = Prisma.TermGetPayload<{
  select: typeof getUsedTermTagItemsSelect;
}>;

export const getUsedTermTagItemsSelect = {
  id: true,
  title: true,
  slug: true,
};
