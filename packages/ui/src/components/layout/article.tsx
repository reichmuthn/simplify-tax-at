import React from "react";
import {cn} from "@ui/lib/utils";

export function Article({className, children}: {
  className?: string,
  children?: React.ReactNode
}) {
  return (
    <article className={cn("w-full py-16 md:py-20 lg:py-24 bg-surface-1 ", className)}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
        {children}
      </div>
    </article>
  )
}