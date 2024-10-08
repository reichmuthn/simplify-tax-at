import { prisma } from "@simplifytax/database";
import "server-only";

export async function getPostTagDetailsQuery(slug: string) {
  return await prisma.tag.findFirst({
    where: {
      slug,
      tagGroup: {
        title: "PostCategories",
      },
    },
  });
}
