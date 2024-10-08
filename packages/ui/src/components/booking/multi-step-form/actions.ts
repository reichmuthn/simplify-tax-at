"use server";
import {sendTransactionalEmailCommand} from "@app/email/commands/sendTransactionalEmail/command";
import {renderFullDateWithWeekday} from "@ui/lib/utils";
import {
  bookingMultiStepFormSubmittedAdminNotification
} from "@app/email/templates/bookingMultiStepFormSubmitted/bookingMultiStepFormSubmittedAdminNotification";
import {
  bookingMultiStepFormSubmittedClientNotification
} from "@app/email/templates/bookingMultiStepFormSubmitted/bookingMultiStepFormSubmittedClientNotification";
import {SubmitMultiStepFormCommand} from "@ui/components/booking/multi-step-form/schemas";

export async function submitMultiStepForm(values: SubmitMultiStepFormCommand) {
  //const slotDateTime = parseISO(values.time);

  const adminNotificationEmail = {
    sender: {
      name: `Simplify Tax Office`,
      email: "office@simplifytax.at",
    },
    to: [
      {
        email: "office@simplifytax.at",
      },
    ],
    bcc: [
      {
        email: "n.reichmuth@angelstone.at",
      },
    ],
    htmlContent: bookingMultiStepFormSubmittedAdminNotification,
    params: {
      firstName: values.firstName,
      lastName: values.lastName,
      eMail: values.eMail,
      phone: values.phone,
      date: renderFullDateWithWeekday(values.date),
      time: values.time,
      appointment: values.appointmentType,
      additionalInfos: values.additionalInfos,
      siteTitle: "Simplify Tax",
      siteUrl: "https://simplifytax.at",
      logoHeight: "40",
    },
    headers: {
      "X-Automatic-Platform-Mail": "Simplify Tax",
    },
    subject: "✉️ Neue Terminanfrage von {{params.firstName}} {{params.lastName}}",
    tags: ["Simplify Tax"],
  };

  const clientNotificationEmail = {
    sender: {
      name: `Simplify Tax Office`,
      email: "office@simplifytax.at",
    },
    to: [
      {
        email: values.eMail,
      },
    ],
    bcc: [
      {
        email: "n.reichmuth@angelstone.at",
      },
    ],
    htmlContent: bookingMultiStepFormSubmittedClientNotification,
    params: {
      firstName: values.firstName,
      lastName: values.lastName,
      eMail: values.eMail,
      phone: values.phone,
      date: renderFullDateWithWeekday(values.date),
      time: values.time,
      appointment: values.appointmentType,
      additionalInfos: values.additionalInfos,
      siteTitle: "Simplify Tax",
      siteUrl: "https://simplifytax.at",
      logoHeight: "40",
    },
    headers: {
      "X-Automatic-Platform-Mail": "Simplify Tax",
    },
    subject: "✉️ Neue Terminanfrage von {{params.firstName}} {{params.lastName}}",
    tags: ["Simplify Tax"],
  };

  //console.log(values);

  await sendTransactionalEmailCommand(adminNotificationEmail);
  await sendTransactionalEmailCommand(clientNotificationEmail);
}
