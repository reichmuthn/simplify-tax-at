import { prisma } from "@simplifytax/database";
import "server-only";
import { CreateTagGroupCommand } from "@app/entities/tagGroups/commands/createTagGroup/schemas";

export async function createTagGroupCommand(values: CreateTagGroupCommand) {
  await prisma.tagGroup.create({
    data: {
      ...values,
      tags:
        values.tags.length > 0
          ? { connect: values.tags.map((x) => ({ id: x })) }
          : undefined,
    },
  });
}
