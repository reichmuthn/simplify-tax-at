import { prisma } from "@simplifytax/database";
import "server-only";

export async function getAllTagGroupSearchItemsQuery(search: string) {
  return await prisma.tagGroup.findMany({
    take: 20,
    where: {
      title: {
        contains: search,
        mode: "insensitive",
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
