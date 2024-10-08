import {ArrowRight} from "../icons/ClassicRegularIcons";
import {cn} from "@ui/lib/utils";
import {B2, H1, H2, SubHeading} from "@ui/typography/typography";
import React from "react";

type BaseSectionLayoutProps = {
  alignHeader?: "center" | "left";
  subtitle?: string;
  title?: string;
  titleHero?:string;
  description?: string;
  moreLink?: {
    href: string;
    title?: string;
  };
  children?: React.ReactNode;
  LinkComponent?: any;
  className?: string;
}

type SectionLayoutWithOneColumn = BaseSectionLayoutProps & {
  columns: 1;
  stickyHeader?: false;
}

type SectionLayoutWithMultipleColumns = BaseSectionLayoutProps & {
  columns: 2 | 3;
  stickyHeader?: boolean;
}

type SectionLayoutProps = SectionLayoutWithOneColumn | SectionLayoutWithMultipleColumns;

export function ArticleLayout({className, columns, stickyHeader, alignHeader, subtitle, title, titleHero, description, moreLink, children, LinkComponent}: SectionLayoutProps) {
  return (
    <div className={cn(
      "flex gap-12 md:gap-16",
      !columns || columns === 1 && "flex-col",
      (columns === 2 || columns === 3) && "flex-col md:flex-row", className
    )}>
      <div className={cn(
        columns === 3 && "basis-1 md:basis-1/3",
        columns === 2 && "basis-1 md:basis-1/2",
        !columns || columns === 1 && "basis-1",
      )}>
        <header
          className={cn(
            "max-w-xl lg:max-w-3xl flex flex-col space-y-8",
            stickyHeader && "sticky top-32",
            alignHeader === "center" && "text-center mx-auto",
            !alignHeader || alignHeader === "left" && "text-left"
          )}>
          <div className="space-y-4">
            <div className="space-y-2">
              {subtitle && <SubHeading>{subtitle}</SubHeading>}
              {titleHero && <H1>{titleHero}</H1>}
              {title && <H2>{title}</H2>}
            </div>
            {description && <B2>{description}</B2>}
          </div>
          {moreLink && LinkComponent && <LinkComponent href={moreLink.href} className={"mt-auto text-display text-sm font-semibold flex gap-x-2 sm:gap-x-3 items-center"}>{moreLink?.title ?? "Weiter"}<ArrowRight
            className={"size-4 fill-current"}/></LinkComponent>}
        </header>
      </div>
      <div className={cn(
        columns === 3 && "basis-1 md:basis-2/3",
        columns === 2 && "basis-1 md:basis-1/2",
        !columns || columns === 1 && "basis-1"
      )}>
        {children}
      </div>
    </div>
  );
}