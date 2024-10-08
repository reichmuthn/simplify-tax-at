import { CreateEmailContactCommand } from "@app/email/commands/createEmailContact/schemas";
import { brevoEmailProvider } from "@app/providers/emailProvider/provider";
import "server-only";

export async function createEmailContactCommand(
  values: CreateEmailContactCommand,
) {
  const listId = parseInt(values.listId);

  const body = {
    email: values.eMail,
    includeListIds: [listId],
    templateId: parseInt(process.env.BREVO_DOI_TEMPLATE_ID || "0"),
    attributes: {
      FIRSTNAME: values.firstName,
      LASTNAME: values.lastName,
    },
    redirectionUrl: `https://simplifytax.at/newsletter?doi=true&listId=${values.listId}&firstName=${values.firstName}&lastName=${values.lastName}`,
  };

  const result = await fetch(
    `${brevoEmailProvider.baseUrl}/contacts/doubleOptinConfirmation`,
    {
      method: "POST",
      headers: brevoEmailProvider.defaultHeaders,
      body: JSON.stringify(body),
    },
  );

  const text = await result.json();
  console.log(text);
}
