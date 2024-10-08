import "server-only";
import { prisma } from "@simplifytax/database";
import { getTermDetailsSelect } from "@app/entities/terms/queries/getTermDetails/schemas";

export async function getTermDetailsQuery(slug: string) {
  return await prisma.term.findUnique({
    where: {
      slug: slug,
    },
    select: getTermDetailsSelect,
  });
}
