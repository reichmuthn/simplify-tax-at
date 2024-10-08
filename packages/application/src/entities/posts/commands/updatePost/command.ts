import { CreatePostCommand } from "@app/entities/posts/commands/createPost/schemas";
import { prisma } from "@simplifytax/database";
import "server-only";

export async function updatePostCommand(id: string, values: CreatePostCommand) {
  await prisma.post.update({
    where: {
      id,
    },
    data: {
      ...values,
      tags: values.tags
        ? {
            connect: values.tags.map((x) => ({ id: x })),
          }
        : undefined,
      author: values.author
        ? {
            connect: { id: values.author },
          }
        : undefined,
    },
  });
}
