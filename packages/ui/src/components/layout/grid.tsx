import {cn} from "@ui/lib/utils";
import React from "react";

export function Grid({children, maxCols}: {
  children: React.ReactNode;
  maxCols?: number;
}) {
  return (
    <div className={cn(
      "grid gap-6 sm:gap-8",
      (!maxCols || maxCols === 3) && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      maxCols === 2 && "grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2"
    )}>
      {children}
    </div>
  )
}