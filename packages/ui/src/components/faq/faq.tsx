"use client";
import React from "react";
import {Disclosure} from "@headlessui/react";
import {cn} from "@ui/lib/utils";
import {B3} from "@ui/typography/typography";
import {CircleMinus, CirclePlus} from "@ui/components/icons/ClassicRegularIcons";

interface FaqProps {
  question: string;
  answer: React.ReactNode;
}

export const Faq = ({faqs}: { faqs: FaqProps[] }) => {
  return (
    <dl className="">
      {faqs.map((faq) => (
        <Disclosure as="div" key={faq.question} className={cn("pt-6")}>
          {({open}) => (
            <>
              <div className={cn("px-5 md:px-8 py-2 rounded-[10px] md:rounded-2xl ", open && "bg-surface-2 p-5 md:p-8")}>
                <dt>
                  <Disclosure.Button className="flex w-full items-start justify-between text-left cursor-pointer">
                    <B3 className="font-semibold text-display">
                      {faq.question}
                    </B3>
                    <span className="ml-6 flex h-7 items-center">
                    {open ? (
                      <CircleMinus
                        className="size-4 md:size-5 fill-appPrimary"
                        aria-hidden="true"
                      />
                    ) : (
                      <CirclePlus className="size-4 md:size-5 fill-appPrimary" aria-hidden="true"/>
                    )}
                  </span>
                  </Disclosure.Button>
                </dt>
                <Disclosure.Panel as="dd" className="mt-2 pr-12">
                  <B3 className={"prose prose-base"}>
                      {faq.answer}
                  </B3>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>
      ))}
    </dl>
  );
};