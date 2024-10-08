import { CreateEmailTemplateCommand } from "@app/email/commands/createEmailTemplate/schemas";
import { brevoEmailProvider } from "@app/providers/emailProvider/provider";
import "server-only";

export async function createEmailTemplateCommand(
  values: CreateEmailTemplateCommand,
) {
  const res = await fetch(`${brevoEmailProvider.baseUrl}/smtp/templates`, {
    method: "POST",
    cache: "no-cache",
    headers: brevoEmailProvider.defaultHeaders,
    body: JSON.stringify(values),
  });

  const json = await res.json();
  console.log(json);
}
