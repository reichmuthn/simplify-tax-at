"use client";
import React from "react";
import { DownloadIcon, PlusIcon } from "lucide-react";
import { type Table } from "@tanstack/react-table";

import { exportTableToCSV } from "@ui/lib/export";
import { Button } from "@ui/components/ui/button";
import { AdminPostItem } from "@app/entities/posts/queries/getAdminPostItems/schemas";
import { AdminPostItemsSheet } from "@ui/entities/posts/tables/admin/sheet";

interface AdminPostItemsToolbarProps {
  table: Table<AdminPostItem>;
}

export function AdminPostItemsToolbar({ table }: AdminPostItemsToolbarProps) {
  const [showAdminPostItemsSheet, setShowAdminPostItemsSheet] =
    React.useState(false);

  return (
    <>
      <AdminPostItemsSheet
        open={showAdminPostItemsSheet}
        onOpenChange={setShowAdminPostItemsSheet}
        post={undefined}
      />
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAdminPostItemsSheet(true)}
        >
          <PlusIcon className="mr-2 size-4" aria-hidden="true" />
          Neuer Post
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            exportTableToCSV(table, {
              filename: "posts",
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
