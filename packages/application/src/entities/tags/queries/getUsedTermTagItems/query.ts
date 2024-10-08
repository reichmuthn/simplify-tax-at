import "server-only";
import { prisma } from "@simplifytax/database";
import { getUsedTermTagItemsSelect } from "@app/entities/tags/queries/getUsedTermTagItems/schemas";

export async function getUsedTermTagItemsQuery() {
  return await prisma.tag.findMany({
    where: {
      terms: {
        some: {
          status: "Active",
        },
      },
    },
    select: getUsedTermTagItemsSelect,
    orderBy: {
      title: "asc",
    },
  });
}
