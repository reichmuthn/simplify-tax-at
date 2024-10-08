import Link from "next/link";
import React from "react";
import {CircleCheck, CircleExclamation} from "@ui/components/icons/ClassicRegularIcons";
import {H5} from "@ui/typography/typography";

interface ThankYouProps {
  Icon: any;
  headline: string;
  message: string;
  reset?: Function;
}

export const newsletterMessages = {
  submitSuccessful: {
    Icon: CircleExclamation,
    headline: "Bitte bestätige deine Anmeldung",
    message:
      "Wir bitten dich deine Newsletter-Anmeldung durch den per E-Mail zugesandten Link zu bestätigen. Andernfalls können wir dir leider keinen Newsletter zusenden.",
  },
  contactExists: {
    Icon: CircleExclamation,
    headline: "Dieser Kontakt existiert bereits",
    message:
      "Dieser Kontakt existiert bereits in unserer Liste. Du solltest den Newsletter bereits erhalten.",
  },
  emailConfirmed: {
    Icon: CircleCheck,
    headline: "Danke!",
    message:
      "Wir freuen uns dich über die neuesten Entwicklungen und Angebote am Laufenden halten zu dürfen.",
  },
};

export function NewsletterThankYou(props: ThankYouProps) {
  const { Icon, headline, message, reset } = props;

  return (
    <div className="text-left space-y-2">
      <div className="flex items-center gap-2 text-display">
        <Icon className="size-4 fill-current" />
        <H5 className="!text-base">
          {headline}
        </H5>
      </div>
      <p className="text-body text-sm">{message}</p>
      {!reset && (
        <Link
          href={"/newsletter"}
          className="text-body inline-block !mt-4 md:!mt-6 py-1.5 md:py-2 px-3 md:px-4 text-xs md:text-sm bg-onPrimary hover:bg-surface-1 border border-body/20 font-medium rounded-md cursor-pointer"
        >
          Zurück
        </Link>
      )}
      {reset && (
        <button
          type={"button"}
          onClick={() => reset()}
          className="text-body inline-block !mt-4 md:!mt-6 py-1.5 md:py-2 px-3 md:px-4 text-xs md:text-sm bg-onPrimary hover:bg-surface-1 border border-body/20 font-medium rounded-md cursor-pointer"
        >
          Zurück
        </button>
      )}
    </div>
  );
}
