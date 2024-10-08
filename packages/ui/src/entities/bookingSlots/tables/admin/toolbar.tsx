"use client";
import React from "react";
import { DownloadIcon, PlusIcon } from "lucide-react";
import { type Table } from "@tanstack/react-table";

import { exportTableToCSV } from "@ui/lib/export";
import { Button } from "@ui/components/ui/button";
import { AdminBookingSlotItem } from "@app/entities/bookingSlots/queries/getAdminBookingSlotItems/schemas";
import { AdminBookingSlotItemsSheet } from "@ui/entities/bookingSlots/tables/admin/sheet";

interface AdminBookingSlotItemsToolbarProps {
  table: Table<AdminBookingSlotItem>;
}

export function AdminBookingSlotItemsToolbar({ table }: AdminBookingSlotItemsToolbarProps) {
  const [showAdminBookingSlotItemsSheet, setShowAdminBookingSlotItemsSheet] =
    React.useState(false);

  return (
    <>
      <AdminBookingSlotItemsSheet
        open={showAdminBookingSlotItemsSheet}
        onOpenChange={setShowAdminBookingSlotItemsSheet}
        bookingSlot={undefined}
      />
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAdminBookingSlotItemsSheet(true)}
        >
          <PlusIcon className="mr-2 size-4" aria-hidden="true" />
          BookingSlot erstellen
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            exportTableToCSV(table, {
              filename: "bookingSlots",
              excludeColumns: ["select", "actions"],
            })
          }
        >
          <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
          Export
        </Button>
      </div>
    </>
  );
}
