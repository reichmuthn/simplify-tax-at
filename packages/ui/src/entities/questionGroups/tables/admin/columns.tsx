"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { AdminQuestionGroupItem } from "@app/entities/questionGroups/queries/getAdminQuestionGroupItems/schemas";
import { Checkbox } from "@ui/components/ui/checkbox";
import { DataTableColumnHeader } from "@ui/components/data-table/data-table-column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu";
import { Button } from "@ui/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { AdminQuestionGroupItemsSheet } from "@ui/entities/questionGroups/tables/admin/sheet";
import { toast } from "sonner";

export function getAdminQuestionGroupItemsTableColumns(): ColumnDef<AdminQuestionGroupItem>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Alle auswählen"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Reihe auswählen"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Titel" />
      ),
      cell: ({ row }) => {
        const [
          showAdminQuestionGroupItemsSheet,
          setShowAdminQuestionGroupItemsSheet,
        ] = React.useState(false);

        return (
          <>
            <AdminQuestionGroupItemsSheet
              open={showAdminQuestionGroupItemsSheet}
              onOpenChange={setShowAdminQuestionGroupItemsSheet}
              questionGroup={row.original}
            />
            <Button
              aria-label={"Reihe bearbeiten"}
              variant="link"
              className="font-medium p-0"
              onClick={() => setShowAdminQuestionGroupItemsSheet(true)}
            >
              {row.getValue("title")}
            </Button>
          </>
        );
      },
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        return (
          <div className={"flex items-center gap-2"}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Menü öffnen"
                  variant="ghost"
                  className="flex size-8 p-0 data-[state=open]:bg-muted"
                >
                  <MoreHorizontalIcon className="size-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onSelect={() => {}}>
                  Vorschau
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={async () => {
                    try {
                      await navigator.clipboard.writeText(row.original.id);
                      toast.success("Kopieren erfolgreich");
                    } catch (err: any) {
                      toast.error("Kopieren fehlgeschlagen");
                    }
                  }}
                >
                  Id kopieren
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}
