"use client";
import React from "react";
import { DownloadIcon, PlusIcon } from "lucide-react";
import { type Table } from "@tanstack/react-table";

import { exportTableToCSV } from "@ui/lib/export";
import { Button } from "@ui/components/ui/button";
import { AdminTagItem } from "@app/entities/tags/queries/getAdminTagItems/schemas";
import { AdminTagItemsSheet } from "@ui/entities/tags/tables/admin/sheet";

interface AdminTagItemsToolbarProps {
  table: Table<AdminTagItem>;
}

export function AdminTagItemsToolbar({ table }: AdminTagItemsToolbarProps) {
  const [showAdminTagItemsSheet, setShowAdminTagItemsSheet] =
    React.useState(false);

  return (
    <>
      <AdminTagItemsSheet
        open={showAdminTagItemsSheet}
        onOpenChange={setShowAdminTagItemsSheet}
        tag={undefined}
      />
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAdminTagItemsSheet(true)}
        >
          <PlusIcon className="mr-2 size-4" aria-hidden="true" />
          Tag erstellen
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            exportTableToCSV(table, {
              filename: "tags",
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
