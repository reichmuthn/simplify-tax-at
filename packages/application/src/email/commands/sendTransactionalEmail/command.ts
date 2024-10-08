import { SendTransactionalEmailCommand } from "@app/email/commands/sendTransactionalEmail/schemas";
import { brevoEmailProvider } from "@app/providers/emailProvider/provider";
import "server-only";

export async function sendTransactionalEmailCommand(
  values: SendTransactionalEmailCommand,
) {
  const res = await fetch(`${brevoEmailProvider.baseUrl}/smtp/email`, {
    method: "POST",
    headers: brevoEmailProvider.defaultHeaders,
    body: JSON.stringify(values),
  });

  await res.json();
}
