import { prisma } from "@simplifytax/database";
import "server-only";
import { CreatePersonCommand } from "@app/entities/persons/commands/createPerson/schemas";

export async function updatePersonCommand(
  id: string,
  values: CreatePersonCommand,
) {
  await prisma.person.update({
    where: { id },
    data: values,
  });
}
