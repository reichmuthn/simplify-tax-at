import { prisma } from "@simplifytax/database";
import "server-only";

export async function deleteTagCommand(id: string) {
  await prisma.tag.delete({
    where: {
      id: id,
    },
  });
}
