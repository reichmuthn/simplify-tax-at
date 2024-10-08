import { prisma } from "@simplifytax/database";
import "server-only";
import { CreateTagGroupCommand } from "@app/entities/tagGroups/commands/createTagGroup/schemas";

export async function updateTagGroupCommand(
  id: string,
  values: CreateTagGroupCommand,
) {
  await prisma.tagGroup.update({
    where: { id },
    data: {
      ...values,
      tags:
        values.tags.length > 0
          ? { connect: values.tags.map((x) => ({ id: x })) }
          : undefined,
    },
  });
}
