"use client";
import React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@ui/lib/utils";
import { buttonVariants } from "@ui/components/ui-app/button";
import {ChevronLeft, ChevronRight} from "@ui/components/icons/ClassicRegularIcons";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  locale,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={locale}
      showOutsideDays={showOutsideDays}
      className={cn("pt-6 md:pt-10 md:pb-6 flex justify-center", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4 md:space-y-6",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-display text-sm font-medium md:text-base md:text-lg",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-9 w-9 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1 md:space-y-2",
        head_row: "flex",
        head_cell:
          "text-body rounded-md m-1 w-9 md:w-11 font-semibold text-sm mb-2",
        row: "flex w-full mt-2",
        cell: "size-9 md:size-11 m-1 text-center text-sm p-1 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/0 [&:has([aria-selected])]:bg-accent/0 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "calendar" }),
          "h-9 w-9 p-0 text-body bg-surface-1 border-body/20",
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-onPrimary hover:bg-surface-2 text-display outline-none ring-2 ring-appPrimary ring-offset-2 ",
        day_today: "bg-surface-3 text-display !font-medium",
        day_outside:
          "day-outside text-body opacity-50 aria-selected:bg-accent/50 aria-selected:text-body aria-selected:opacity-30",
        day_disabled: "text-body opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft {...props} className="h-4 w-4" />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight {...props} className="h-4 w-4"/>
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
