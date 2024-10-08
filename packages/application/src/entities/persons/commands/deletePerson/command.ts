import { prisma } from "@simplifytax/database";
import "server-only";

export async function deletePersonCommand(id: string) {
  await prisma.person.delete({
    where: {
      id: id,
    },
  });
}
