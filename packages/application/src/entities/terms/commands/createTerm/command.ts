import { prisma } from "@simplifytax/database";
import "server-only";
import { CreateTermCommand } from "@app/entities/terms/commands/createTerm/schemas";

export async function createTermCommand(values: CreateTermCommand) {
  await prisma.term.create({
    data: {
      ...values,
      tags:
        values.tags.length > 0
          ? { connect: values.tags.map((x) => ({ id: x })) }
          : undefined,
    },
  });
}
