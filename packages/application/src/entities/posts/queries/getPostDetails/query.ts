import { getPostDetailsSelect } from "./schemas";
import "server-only";
import { prisma } from "@simplifytax/database";

export async function getPostDetailsQuery(slug: string) {
  return prisma.post.findUnique({
    where: {
      slug: slug,
    },
    select: getPostDetailsSelect,
  });
}
