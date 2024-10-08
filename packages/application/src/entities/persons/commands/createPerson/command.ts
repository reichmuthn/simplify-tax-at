import { prisma } from "@simplifytax/database";
import "server-only";
import { CreatePersonCommand } from "@app/entities/persons/commands/createPerson/schemas";

export async function createPersonCommand(values: CreatePersonCommand) {
  await prisma.person.create({
    data: values,
  });
}
