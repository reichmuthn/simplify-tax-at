import { prisma } from "@simplifytax/database";
import "server-only";

export async function getAllTagSearchItemsQuery(
  search: string,
  tagGroupSlugs: string[],
) {
  return await prisma.tag.findMany({
    take: 20,
    where: {
      title: {
        contains: search,
        mode: "insensitive",
      },
      tagGroup: {
        slug: {
          in: tagGroupSlugs,
        },
      },
    },
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      title: "asc",
    },
  });
}
