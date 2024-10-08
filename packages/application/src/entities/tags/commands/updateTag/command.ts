import { prisma } from "@simplifytax/database";
import "server-only";
import { CreateTagCommand } from "@app/entities/tags/commands/createTag/schemas";

export async function updateTagCommand(id: string, values: CreateTagCommand) {
  await prisma.tag.update({
    where: { id },
    data: {
      ...values,
      tagGroup: values.tagGroup
        ? {
            connect: { id: values.tagGroup },
          }
        : undefined,
    },
  });
}
