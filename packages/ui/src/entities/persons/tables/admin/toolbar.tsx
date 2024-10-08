"use client";
import React from "react";
import { DownloadIcon, PlusIcon } from "lucide-react";
import { type Table } from "@tanstack/react-table";

import { exportTableToCSV } from "@ui/lib/export";
import { Button } from "@ui/components/ui/button";
import { AdminPersonItem } from "@app/entities/persons/queries/getAdminPersonItems/schemas";
import { AdminPersonItemsSheet } from "@ui/entities/persons/tables/admin/sheet";

interface AdminPersonItemsToolbarProps {
  table: Table<AdminPersonItem>;
}

export function AdminPersonItemsToolbar({
  table,
}: AdminPersonItemsToolbarProps) {
  const [showAdminPersonItemsSheet, setShowAdminPersonItemsSheet] =
    React.useState(false);

  return (
    <>
      <AdminPersonItemsSheet
        open={showAdminPersonItemsSheet}
        onOpenChange={setShowAdminPersonItemsSheet}
        person={undefined}
      />
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAdminPersonItemsSheet(true)}
        >
          <PlusIcon className="mr-2 size-4" aria-hidden="true" />
          Person erstellen
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            exportTableToCSV(table, {
              filename: "persons",
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
