import "server-only";
import { prisma } from "@simplifytax/database";
import { StatusEnums } from "@app/enums/status/enum";

export async function getAllActivePostUrlsQuery() {
  return await prisma.post.findMany({
    where: {
      status: StatusEnums.Active,
    },
    select: {
      slug: true,
      updatedAt: true,
    },
  });
}
