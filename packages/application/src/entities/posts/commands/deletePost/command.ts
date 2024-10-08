import { prisma } from "@simplifytax/database";
import "server-only";

export async function deletePostCommand(id: string) {
  await prisma.post.delete({
    where: {
      id: id,
    },
  });
}
