import { CreatePostCommand } from "@app/entities/posts/commands/createPost/schemas";
import { prisma } from "@simplifytax/database";
import "server-only";

export async function createPostCommand(values: CreatePostCommand) {
  await prisma.post.create({
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
