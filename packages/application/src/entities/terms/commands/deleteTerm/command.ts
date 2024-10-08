import { prisma } from "@simplifytax/database";
import "server-only";

export async function deleteTermCommand(id: string) {
  await prisma.term.delete({
    where: {
      id: id,
    },
  });
}
