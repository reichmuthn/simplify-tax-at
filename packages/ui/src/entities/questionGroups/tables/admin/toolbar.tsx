"use client";
import React from "react";
import { DownloadIcon, PlusIcon } from "lucide-react";
import { type Table } from "@tanstack/react-table";

import { exportTableToCSV } from "@ui/lib/export";
import { Button } from "@ui/components/ui/button";
import { AdminQuestionGroupItem } from "@app/entities/questionGroups/queries/getAdminQuestionGroupItems/schemas";
import { AdminQuestionGroupItemsSheet } from "@ui/entities/questionGroups/tables/admin/sheet";

interface AdminQuestionGroupItemsToolbarProps {
  table: Table<AdminQuestionGroupItem>;
}

export function AdminQuestionGroupItemsToolbar({
  table,
}: AdminQuestionGroupItemsToolbarProps) {
  const [
    showAdminQuestionGroupItemsSheet,
    setShowAdminQuestionGroupItemsSheet,
  ] = React.useState(false);

  return (
    <>
      <AdminQuestionGroupItemsSheet
        open={showAdminQuestionGroupItemsSheet}
        onOpenChange={setShowAdminQuestionGroupItemsSheet}
        questionGroup={undefined}
      />
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAdminQuestionGroupItemsSheet(true)}
        >
          <PlusIcon className="mr-2 size-4" aria-hidden="true" />
          QuestionGroup erstellen
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            exportTableToCSV(table, {
              filename: "questionGroups",
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
