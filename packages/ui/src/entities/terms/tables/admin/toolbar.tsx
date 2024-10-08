"use client";
import React from "react";
import { DownloadIcon, PlusIcon } from "lucide-react";
import { type Table } from "@tanstack/react-table";

import { exportTableToCSV } from "@ui/lib/export";
import { Button } from "@ui/components/ui/button";
import { AdminTermItem } from "@app/entities/terms/queries/getAdminTermItems/schemas";
import { AdminTermItemsSheet } from "@ui/entities/terms/tables/admin/sheet";

interface AdminTermItemsToolbarProps {
  table: Table<AdminTermItem>;
}

export function AdminTermItemsToolbar({ table }: AdminTermItemsToolbarProps) {
  const [showAdminTermItemsSheet, setShowAdminTermItemsSheet] =
    React.useState(false);

  return (
    <>
      <AdminTermItemsSheet
        open={showAdminTermItemsSheet}
        onOpenChange={setShowAdminTermItemsSheet}
        term={undefined}
      />
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAdminTermItemsSheet(true)}
        >
          <PlusIcon className="mr-2 size-4" aria-hidden="true" />
          Term erstellen
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            exportTableToCSV(table, {
              filename: "terms",
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
