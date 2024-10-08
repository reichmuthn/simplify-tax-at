import Link from "next/link";
import React from "react";
import {CircleCheck} from "@ui/components/icons/ClassicRegularIcons";
import {H5} from "@ui/typography/typography";
import {MultiStepFormMessages} from "@ui/components/booking/multi-step-form/schemas";
import {Button} from "@ui/components/ui-app/button";

type BookingThankProps = {
  messages: MultiStepFormMessages;
  reset: Function;
}

export function BookingThankYou({messages, reset}: BookingThankProps) {

  return (
    <div className="text-left space-y-2">
      <div className="flex items-center gap-2 text-display">
        <CircleCheck className="size-4 fill-current" />
        <H5 className="!text-base">
          {messages.statusMessages.submitSuccessful.headline}
        </H5>
      </div>
      <p className="text-body text-sm">{messages.statusMessages.submitSuccessful.message}</p>
        <Button
          onClick={() => reset()}
          className="text-body inline-block !mt-4 md:!mt-6 py-1.5 md:py-2 px-3 md:px-4 text-xs md:text-sm bg-onPrimary hover:bg-surface-1 border border-body/20 font-medium rounded-md cursor-pointer"
        >
          {messages.statusMessages.submitSuccessful.button}
        </Button>
    </div>
  );
}
