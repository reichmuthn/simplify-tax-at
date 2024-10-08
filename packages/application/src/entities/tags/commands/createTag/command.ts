import { prisma } from "@simplifytax/database";
import "server-only";
import { CreateTagCommand } from "@app/entities/tags/commands/createTag/schemas";

export async function createTagCommand(values: CreateTagCommand) {
  await prisma.tag.create({
    data: {
      ...values,
      tagGroup: values.tagGroup
        ? {
            connect: {
              id: values.tagGroup,
            },
          }
        : undefined,
    },
  });
}
