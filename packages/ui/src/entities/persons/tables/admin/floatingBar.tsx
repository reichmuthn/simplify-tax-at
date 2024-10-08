"use client";
import React from "react";
import { DownloadIcon, XIcon } from "lucide-react";
import { type Table } from "@tanstack/react-table";

import { exportTableToCSV } from "@ui/lib/export";
import { Button } from "@ui/components/ui/button";
import { Separator } from "@ui/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ui/components/ui/tooltip";
import { Kbd } from "@ui/components/kbd";
import { AdminPersonItem } from "@app/entities/persons/queries/getAdminPersonItems/schemas";
import { DeletePersonsDialog } from "@ui/entities/persons/tables/admin/deleteDialog";

interface AdminPersonItemsFloatingBarProps {
  table: Table<AdminPersonItem>;
}

export function AdminPersonItemsFloatingBar({
  table,
}: AdminPersonItemsFloatingBarProps) {
  const rows = table.getFilteredSelectedRowModel().rows;

  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        table.toggleAllRowsSelected(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [table]);

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 w-full px-4">
      <div className="w-full overflow-x-auto">
        <div className="mx-auto flex w-fit items-center gap-2 rounded-md border bg-card p-2 shadow-2xl">
          <div className="flex h-7 items-center rounded-md border border-dashed pl-2.5 pr-1">
            <span className="whitespace-nowrap text-xs">
              {rows.length} ausgewählt
            </span>
            <Separator orientation="vertical" className="ml-2 mr-1" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-5 hover:border"
                  onClick={() => table.toggleAllRowsSelected(false)}
                >
                  <XIcon className="size-3.5 shrink-0" aria-hidden="true" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="flex items-center border bg-accent font-semibold text-foreground dark:bg-zinc-900">
                <p className="mr-2">Auswahl aufheben</p>
                <Kbd abbrTitle="Escape" variant="outline">
                  Esc
                </Kbd>
              </TooltipContent>
            </Tooltip>
          </div>
          <Separator orientation="vertical" className="hidden h-5 sm:block" />
          <div className="flex items-center gap-1.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="size-7 border"
                  onClick={() => {
                    startTransition(() => {
                      exportTableToCSV(table, {
                        filename: "persons",
                        excludeColumns: ["select", "actions"],
                        onlySelected: true,
                      });
                    });
                  }}
                  disabled={isPending}
                >
                  <DownloadIcon className="size-4" aria-hidden="true" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className=" border bg-accent font-semibold text-foreground dark:bg-zinc-900">
                <p>Persons exportieren</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <DeletePersonsDialog
                    persons={rows}
                    onSuccess={() => table.toggleAllPageRowsSelected(false)}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent className=" border bg-accent font-semibold text-foreground dark:bg-zinc-900">
                <p>Persons löschen</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
