import { prisma } from "@simplifytax/database";
import "server-only";

export async function deleteTagGroupCommand(id: string) {
  await prisma.tagGroup.delete({
    where: {
      id: id,
    },
  });
}
