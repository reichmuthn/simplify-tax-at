import "server-only";
import { prisma } from "@simplifytax/database";

export async function getUsedPostTagItemsQuery() {
  return await prisma.tag.findMany({
    where: {
      posts: {
        some: {
          status: "Active",
        },
      },
    },
    include: {
      _count: true,
    },
    orderBy: {
      title: "asc",
    },
  });
}
