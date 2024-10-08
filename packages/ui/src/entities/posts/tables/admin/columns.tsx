"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { AdminPostItem } from "@app/entities/posts/queries/getAdminPostItems/schemas";
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
import { formatDate, getStatusIcon } from "@ui/lib/utils";
import { StatusEnums } from "@app/enums/status/enum";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ui/components/ui/tooltip";
import { AdminPostItemsSheet } from "@ui/entities/posts/tables/admin/sheet";

export function getAdminPostItemsTableColumns(): ColumnDef<AdminPostItem>[] {
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
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = Object.values(StatusEnums).find(
          (status) => status === row.original.status,
        );

        if (!status) return null;

        const Icon = getStatusIcon(status);

        return (
          <Tooltip>
            <TooltipTrigger>
              <Icon
                className="size-4 text-muted-foreground"
                aria-label={status}
              />
            </TooltipTrigger>
            <TooltipContent>
              <span className="capitalize">{status}</span>
            </TooltipContent>
          </Tooltip>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Titel" />
      ),
      cell: ({ row }) => {
        const [showAdminPostItemsSheet, setShowAdminPostItemsSheet] =
          React.useState(false);

        return (
          <>
            <AdminPostItemsSheet
              open={showAdminPostItemsSheet}
              onOpenChange={setShowAdminPostItemsSheet}
              post={row.original}
            />
            <Button
              aria-label={"Reihe bearbeiten"}
              variant="link"
              className={"font-medium p-0"}
              onClick={() => setShowAdminPostItemsSheet(true)}
            >
              {row.getValue("title")}
            </Button>
          </>
        );
      },
    },
    {
      accessorKey: "publishedAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Veröffentlicht" />
      ),
      cell: ({ cell }) =>
        cell.getValue() ? formatDate(cell.getValue() as Date) : null,
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
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
