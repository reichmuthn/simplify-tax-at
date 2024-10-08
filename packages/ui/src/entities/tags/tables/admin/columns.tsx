"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { AdminTagItem } from "@app/entities/tags/queries/getAdminTagItems/schemas";
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
import { Badge } from "@ui/components/ui/badge";
import { AdminTagItemsSheet } from "@ui/entities/tags/tables/admin/sheet";

export function getAdminTagItemsTableColumns(): ColumnDef<AdminTagItem>[] {
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
        const [showAdminTagItemsSheet, setShowAdminTagItemsSheet] =
          React.useState(false);

        return (
          <>
            <AdminTagItemsSheet
              open={showAdminTagItemsSheet}
              onOpenChange={setShowAdminTagItemsSheet}
              tag={row.original}
            />
            <Button
              aria-label={"Reihe bearbeiten"}
              variant="link"
              className={"font-medium p-0"}
              onClick={() => setShowAdminTagItemsSheet(true)}
            >
              {row.getValue("title")}
            </Button>
          </>
        );
      },
    },
    {
      accessorKey: "tagGroup",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Gruppe" />
      ),
      cell: ({ row }) => {
        const group = row.original?.tagGroup?.title;

        if (!group) return null;

        return <Badge variant={"secondary"}>{group}</Badge>;
      },
      enableSorting: false,
      enableHiding: false,
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
