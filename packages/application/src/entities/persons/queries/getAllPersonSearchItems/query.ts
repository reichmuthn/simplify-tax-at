import { prisma } from "@simplifytax/database";

export async function getAllPersonSearchItemsQuery(search: string) {
  return await prisma.person.findMany({
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
