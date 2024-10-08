"use server";
import { SubmitContactFormCommand } from "./schemas";
import { contactFormSubmittedAdminNotification } from "@app/email/templates/contactFormSubmitted/contactFormSubmittedAdminNotification";
import { sendTransactionalEmailCommand } from "@app/email/commands/sendTransactionalEmail/command";

export async function submitContactForm(values: SubmitContactFormCommand) {
  const sendSmtpEmail = {
    sender: {
      name: `AngelStone Admin`,
      email: "office@angelstone.at",
    },
    to: [
      {
        email: "office@angelstone.at",
      },
    ],
    bcc: [
      {
        email: "c.angel@angelstone.at",
      },
    ],
    htmlContent: contactFormSubmittedAdminNotification,
    params: {
      fullName: values.fullName,
      eMail: values.eMail,
      tel: values.phone,
      message: values.message,
      siteTitle: "AngelStone",
      siteUrl: "https://angelstone.at",
      logoHeight: "50",
    },
    headers: {
      "X-Automatic-Platform-Mail": "AngelStone",
    },
    subject: "✉️ Neue Kontaktformular-Nachricht von {{params.fullName}}",
    tags: ["AngelStone"],
  };

  await sendTransactionalEmailCommand(sendSmtpEmail);
}
