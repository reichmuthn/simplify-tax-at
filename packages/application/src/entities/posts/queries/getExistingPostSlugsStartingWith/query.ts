import { prisma } from "@simplifytax/database";

export async function getExistingPostSlugsStartingWithQuery(slug: string) {
  return await prisma.post.findMany({
    where: {
      slug: {
        startsWith: slug,
      },
    },
    select: {
      slug: true,
    },
    orderBy: {
      slug: "asc",
    },
  });
}
