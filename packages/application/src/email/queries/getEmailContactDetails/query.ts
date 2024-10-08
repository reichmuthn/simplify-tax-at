import { EmailContactDetails } from "@app/email/queries/getEmailContactDetails/schemas";
import { brevoEmailProvider } from "@app/providers/emailProvider/provider";
import "server-only";

export async function getEmailContactDetailsQuery(
  identifier: string,
): Promise<EmailContactDetails | null> {
  const res = await fetch(
    `${brevoEmailProvider.baseUrl}/contacts/${identifier}`,
    {
      cache: "no-store",
      method: "GET",
      headers: brevoEmailProvider.defaultHeaders,
    },
  );

  if (!res.ok) {
    return null;
  }

  return await res.json();
}
