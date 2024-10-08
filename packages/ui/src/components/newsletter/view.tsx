import React, {Suspense} from "react";
import {NewsletterForm} from "./form";
import {B2, H2, SubHeading} from "@ui/typography/typography";
import {NewsletterFormMessages} from "@ui/components/newsletter/schemas";

export type NewsletterViewProps = {
  messages: NewsletterFormMessages
}

export function NewsletterView({messages}: NewsletterViewProps) {
  return (
    <div className="bg-surface-2 rounded-xl md:rounded-2xl shadow-img border-[0.75px] border-surface-1/80 px-6 py-6 md:p-10 lg:p-16">
      <div className="flex flex-col md:flex-row md:items-end gap-12 md:gap-16">
        <div className="basis-full md:basis-1/2 space-y-4">
          <div className="space-y-2">
            <SubHeading>{messages.subtitle}</SubHeading>
            <H2>{messages.title}</H2>
          </div>
          <B2>{messages.description}</B2>
        </div>
        <div className="basis-full md:basis-1/2 justify-self-end">
          <Suspense fallback={null}>
            <NewsletterForm messages={messages}/>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
