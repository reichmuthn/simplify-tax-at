import {B1, D1, H1, SubHeading} from "@ui/typography/typography";
import {cn} from "@ui/lib/utils";
import React from "react";

type HeroLayoutProps = {
  alignHeader?: "center" | "left";
  subtitle?: string;
  displayTitle?: string,
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export function HeroLayout({alignHeader, subtitle, displayTitle, title, description, children}: HeroLayoutProps) {
  return (
    <header
      className={cn(
        "max-w-3xl flex flex-col space-y-4",
        alignHeader === "center" && "text-center mx-auto",
        !alignHeader || alignHeader === "left" && "text-left"
      )}>
      <div className="">
        <div className="space-y-4">
          <div className="space-y-2">
            {subtitle && <SubHeading>{subtitle}</SubHeading>}
            {displayTitle && <D1>{displayTitle}</D1>}
            {title && <H1>{title}</H1>}
          </div>
          {description && <B1>{description}</B1>}
        </div>
        {children}
      </div>
    </header>
  );
}