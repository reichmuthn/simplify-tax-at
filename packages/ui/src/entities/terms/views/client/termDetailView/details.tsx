"use client";
import Link from "next/link";
import {redirect, useRouter, useSearchParams} from "next/navigation";
import {TermDetails} from "@app/entities/terms/queries/getTermDetails/schemas";
import {ShareIcon, XIcon} from "lucide-react";
import {Badge} from "@ui/components/ui-app/badge";
import React from "react";
import {B3, H3} from "@ui/typography/typography";

type TermDetailsProps = {
  termDetailsPromise: Promise<TermDetails | null>;
};

export function TermDetail({termDetailsPromise}: TermDetailsProps) {
  const term = React.use(termDetailsPromise);
  if (!term) {
    redirect("/de/lexikon");
  }
  const searchParams = useSearchParams();
  const router = useRouter();

  const getCloseLink = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("begriff");

    return newSearchParams.toString();
  };

  async function shareLink(
    shareTitle: string,
    shareText: string,
    link: string,
  ) {
    const shareData = {
      title: shareTitle,
      text: shareText,
      url: link,
    };
    try {
      await navigator.share(shareData);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div
      className={
        "fixed inset-0 w-full h-full z-20 flex items-center justify-center md:inset-auto md:z-0 md:block md:relative"
      }
    >
      <div
        className={"md:hidden fixed inset-0 w-full h-full bg-black/30 z-10"}
        onClick={() => {
          router.push(`/de/lexikon?${getCloseLink()}`);
        }}
      />
      <div className="z-20 max-w-xl lg:max-w-none w-full flex flex-col items-start gap-4 p-3 sm:p-0">
        <div
          className="w-full bg-white border-l-2 border-appPrimary shadow rounded-lg flex flex-row gap-4 relative p-6 sm:p-8">
          <button
            role={"button"}
            className={
              "cursor-pointer p-2 rounded-md text-body/60 hover:text-body hover:bg-surface-2 absolute right-8 sm:right-12 top-1 sm:top-3 block"
            }
            onClick={() =>
              shareLink(
                term.title,
                term.description!,
                `https://www.simplifytax.at/de/lexikon/${term.slug}`,
              )
            }
            aria-label={"Begriff teilen"}
          >
            <ShareIcon className={"w-4 h-4 text-current"}/>
          </button>
          <Link
            href={`/de/lexikon?${getCloseLink()}`}
            className={
              "cursor-pointer p-2 rounded-md text-body/60 hover:text-body hover:bg-surface-2 absolute right-1 sm:right-3 top-1 sm:top-3 block"
            }
            aria-label={"Begriff schließen"}
          >
            <XIcon className="w-4 h-4 fill-current "/>
          </Link>
          <div className="flex flex-col gap-y-4">
            <H3>{term.title}</H3>
            <B3>{term.description}</B3>
            <div className="flex flex-row gap-4 flex-wrap mt-2">
              {term?.tags?.map((x) => (
                <Badge key={x.title}>
                  {x.title}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TermDetailSkeleton() {
  return (
    <div
      className={
        "fixed inset-0 w-full h-full z-20 flex items-center justify-center md:inset-auto md:z-0 md:block md:relative"
      }
    >
      <div
        className={"md:hidden fixed inset-0 w-full h-full bg-black/30 z-10"}
      ></div>
      <div className="animate-pulse z-20 max-w-xl lg:max-w-none w-full flex flex-col items-start gap-4 p-3 sm:p-0">
        <div
          className="w-full bg-white border-l-2 border-appAccent shadow rounded-container flex flex-row gap-4 relative p-6 sm:p-8">
          <div
            className={
              "cursor-pointer p-2 rounded text-gray-400 hover:text-gray-500 hover:bg-gray-100 absolute right-3 top-3 block"
            }
          >
            <XIcon className="w-4 h-4 fill-current "/>
          </div>
          <div className="flex flex-col gap-4 md:gap-6 md:flex-row md:items-center w-full">
            <div className={"w-full"}>
              <div className="text-lg sm:text-2xl md:text-3xl font-semibold break-words">
                <div className="h-6 bg-gray-200 rounded-full w-1/4 mb-2.5"></div>
              </div>
              <div className=" flex flex-row gap-8 w-full">
                <div className="mt-4 text-left break-words text-sm sm:text-base w-full">
                  <div className="h-2 bg-gray-200 rounded-full w-full mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full w-full mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full w-full mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full w-full mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full w-1/2 mb-2.5"></div>
                </div>
              </div>
              <div className="flex gap-4 mt-8 flex-wrap">
                <div className="h-5 bg-gray-200 w-20 rounded-full"></div>
                <div className="h-5 bg-gray-200 w-20 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
