"use server";
import { getEmailContactDetailsQuery } from "@app/email/queries/getEmailContactDetails/query";
import { createEmailContactCommand } from "@app/email/commands/createEmailContact/command";
import { CreateEmailContactCommand } from "@app/email/commands/createEmailContact/schemas";

export async function newsletterSignUp(values: CreateEmailContactCommand) {
  const contact = await getEmailContactDetailsQuery(values.eMail);

  const listId = parseInt(values.listId);

  if (contact) {
    if (contact.listIds?.includes(listId)) {
      return "CONTACT_EXISTS";
    } else {
      await createEmailContactCommand(values);
      return "OK";
    }
  } else {
    await createEmailContactCommand(values);
    return "OK";
  }
}
