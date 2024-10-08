import React, {FC} from "react";
import {ArrowRight} from "../icons/ClassicRegularIcons";
import {cn, replaceHyphen} from "@ui/lib/utils";
import {B3, H4} from "@ui/typography/typography";

type BoxProps = {
  alignItems?: "center" | "left";
  Icon?: FC<{ className?: string }>;
  title?: string;
  description?: React.ReactNode;
  image?: {
    src: string;
    alt: string;
  }
  moreLink?: {
    href: string;
    title?: string;
    noArrow?: boolean;
  }
  textLink?: {
    href: string;
    title?: string;
  }
  unboxed?: boolean;
  LinkComponent?: any;
}

export function Box({title, description, moreLink, Icon, image, alignItems, unboxed, LinkComponent, textLink}: BoxProps) {
  return (
    <div className={cn("flex flex-col", alignItems === "center" && "items-center text-center", !unboxed && "bg-surface-2 p-4 md:p-6 rounded-xl md:rounded-2xl shadow-img border-[0.75px] border-surface-1/80 overflow-hidden")}>
      {Icon && <div className={cn("bg-appPrimary mb-8 md:mb-12 self-start rounded-lg lg:rounded-[10px] p-2.5")}>
        <Icon className={cn("fill-onPrimary size-4 md:size-5")}/>
      </div>}
      {/*{image && <Image src={image.src} alt={image.alt} width={300} height={80} className={"mb-6"}/>}*/}
      <div className={cn("flex flex-col gap-y-4 md:gap-y-8")}>
        <div className="flex flex-col gap-y-2 md:gap-y-4">
          {title && <H4>{replaceHyphen(title)}</H4>}
          {description && <B3 className="prose prose-base">{description}</B3>}
        </div>
        {moreLink && LinkComponent &&
          <LinkComponent href={moreLink.href} className={"mt-auto text-display text-sm font-semibold flex gap-x-2 sm:gap-x-3 items-center"}>{moreLink?.title ?? "Weiter"}{!moreLink.noArrow &&
            <ArrowRight
              className={"w-4 h-4 fill-current"}/>}</LinkComponent>}
        {textLink && LinkComponent &&
            <LinkComponent href={textLink.href} className={"text-display text-base font-semibold antialiased"}>{textLink.title}</LinkComponent>}
      </div>
    </div>
  );
}