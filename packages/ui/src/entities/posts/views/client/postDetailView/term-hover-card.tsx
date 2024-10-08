"use client";
import * as Popover from "@radix-ui/react-popover";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

export function TermHoverCard({
  title,
  className,
  style,
  href,
}: {
  title: string;
  className: string;
  style: React.CSSProperties;
  href: string;
}) {
  const [termContent, setTermContent] = useState("Begriff wird geladen...");
  const [termTitle, setTermTitle] = useState("Lexikon");

  useEffect(() => {
    (async () => {
      const slug = href.split("/").pop();
      const response = await fetch(`/api/lexicon/term/${slug}`);
      const data = await response.json();
      setTermContent(data.description);
      setTermTitle(data.title);
    })();
  }, [href]);

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <span className={className} style={style}>
          {title}
        </span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="leading-2 text-sm md:text-base w-[300px] md:w-[500px] data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade rounded-md bg-white p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all outline-none"
          sideOffset={5}
        >
          <div className="flex flex-col gap-4">
            <div className={"flex gap-4 items-center"}>
              <img
                className="block hidden h-[30px] w-[30px]"
                src="/icons/icon-72x72.png"
                alt="Logo"
              />
              <div className="m-0 text-display text-base md:text-lg font-medium">
                {termTitle}
              </div>
            </div>
            <div className={"text-body"}>{termContent}</div>
            <Link
              href={href}
              className={
                "inline-flex items-center gap-1 text-base font-medium text-appAccent hover:underline"
              }
              target={"_blank"}
            >
              <span>mehr</span>
              <ChevronRight className="inline w-5 h-5" />
            </Link>
          </div>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
