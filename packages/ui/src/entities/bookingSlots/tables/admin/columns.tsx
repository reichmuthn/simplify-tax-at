"use client";
import React from "react";
import {ColumnDef} from "@tanstack/react-table";
import {AdminBookingSlotItem} from "@app/entities/bookingSlots/queries/getAdminBookingSlotItems/schemas";
import {Checkbox} from "@ui/components/ui/checkbox";
import {DataTableColumnHeader} from "@ui/components/data-table/data-table-column-header";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,} from "@ui/components/ui/dropdown-menu";
import {Button} from "@ui/components/ui/button";
import { Edit2Icon, MoreHorizontalIcon } from "lucide-react";
import {AdminBookingSlotItemsSheet} from "@ui/entities/bookingSlots/tables/admin/sheet";

export function getAdminBookingSlotItemsTableColumns(): ColumnDef<AdminBookingSlotItem>[] {
  return [
    {
      id: "select",
      header: ({table}) => (
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
      cell: ({row}) => (
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
      header: ({column}) => (
        <DataTableColumnHeader column={column} title="Titel"/>
      ),
      cell: ({row}) => {
        const [showAdminBookingSlotItemsSheet, setShowAdminBookingSlotItemsSheet] =
          React.useState(false);

        return (
          <>
            <AdminBookingSlotItemsSheet
              open={showAdminBookingSlotItemsSheet}
              onOpenChange={setShowAdminBookingSlotItemsSheet}
              bookingSlot={row.original}
            />
            <Button
              aria-label={"Reihe bearbeiten"}
              variant="link"
              className="font-medium p-0"
              onClick={() => setShowAdminBookingSlotItemsSheet(true)}
            >
              {row.getValue("title")}
            </Button>
          </>
        );
      },
    },
    {
      id: "actions",
      cell: function Cell({row}) {
        return (
          <div className={"flex items-center gap-2"}>
            {/*<DropdownMenu>*/}
            {/*  <DropdownMenuTrigger asChild>*/}
            {/*    <Button*/}
            {/*      aria-label="Menü öffnen"*/}
            {/*      variant="ghost"*/}
            {/*      className="flex size-8 p-0 data-[state=open]:bg-muted"*/}
            {/*    >*/}
            {/*      <MoreHorizontalIcon className="size-4" aria-hidden="true"/>*/}
            {/*    </Button>*/}
            {/*  </DropdownMenuTrigger>*/}
            {/*  <DropdownMenuContent align="end" className="w-40">*/}
            {/*    <DropdownMenuItem onSelect={() => {*/}
            {/*    }}>*/}
            {/*      Vorschau*/}
            {/*    </DropdownMenuItem>*/}
            {/*    <DropdownMenuSeparator/>*/}
            {/*    <DropdownMenuItem onSelect={() => {*/}
            {/*    }}>Löschen</DropdownMenuItem>*/}
            {/*  </DropdownMenuContent>*/}
            {/*</DropdownMenu>*/}
          </div>
        );
      },
    },
  ];
}
