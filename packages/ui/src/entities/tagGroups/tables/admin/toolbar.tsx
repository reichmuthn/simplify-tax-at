"use client";
import React from "react";
import { DownloadIcon, PlusIcon } from "lucide-react";
import { type Table } from "@tanstack/react-table";

import { exportTableToCSV } from "@ui/lib/export";
import { Button } from "@ui/components/ui/button";
import { AdminTagGroupItem } from "@app/entities/tagGroups/queries/getAdminTagGroupItems/schemas";
import { AdminTagGroupItemsSheet } from "@ui/entities/tagGroups/tables/admin/sheet";

interface AdminTagGroupItemsToolbarProps {
  table: Table<AdminTagGroupItem>;
}

export function AdminTagGroupItemsToolbar({
  table,
}: AdminTagGroupItemsToolbarProps) {
  const [showAdminTagGroupItemsSheet, setShowAdminTagGroupItemsSheet] =
    React.useState(false);

  return (
    <>
      <AdminTagGroupItemsSheet
        open={showAdminTagGroupItemsSheet}
        onOpenChange={setShowAdminTagGroupItemsSheet}
        tagGroup={undefined}
      />
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAdminTagGroupItemsSheet(true)}
        >
          <PlusIcon className="mr-2 size-4" aria-hidden="true" />
          TagGroup erstellen
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            exportTableToCSV(table, {
              filename: "tagGroups",
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
