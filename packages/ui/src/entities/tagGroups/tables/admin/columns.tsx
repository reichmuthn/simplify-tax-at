"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { AdminTagGroupItem } from "@app/entities/tagGroups/queries/getAdminTagGroupItems/schemas";
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
import { AdminTagGroupItemsSheet } from "@ui/entities/tagGroups/tables/admin/sheet";

export function getAdminTagGroupItemsTableColumns(): ColumnDef<AdminTagGroupItem>[] {
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
        const [showAdminTagGroupItemsSheet, setShowAdminTagGroupItemsSheet] =
          React.useState(false);

        return (
          <>
            <AdminTagGroupItemsSheet
              open={showAdminTagGroupItemsSheet}
              onOpenChange={setShowAdminTagGroupItemsSheet}
              tagGroup={row.original}
            />
            <Button
              aria-label={"Reihe bearbeiten"}
              variant="link"
              className={"font-medium p-0"}
              onClick={() => setShowAdminTagGroupItemsSheet(true)}
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
              <DropdownMenuItem onSelect={() => {}}>Vorschau</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => {}}>Löschen</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
