"use client";
import React from "react";
import { getAdminQuestionGroupItemsQuery } from "@app/entities/questionGroups/queries/getAdminQuestionGroupItems/query";
import { getAdminQuestionGroupItemsTableColumns } from "@ui/entities/questionGroups/tables/admin/columns";
import { DataTableFilterField } from "@ui/types";
import { AdminQuestionGroupItem } from "@app/entities/questionGroups/queries/getAdminQuestionGroupItems/schemas";
import { useDataTable } from "@ui/hooks/use-data-table";
import { DataTableToolbar } from "@ui/components/data-table/data-table-toolbar";
import { AdminQuestionGroupItemsToolbar } from "@ui/entities/questionGroups/tables/admin/toolbar";
import { DataTable } from "@ui/components/data-table/data-table";
import { AdminQuestionGroupItemsFloatingBar } from "@ui/entities/questionGroups/tables/admin/floatingBar";

interface AdminQuestionGroupItemsTableProps {
  questionGroupItems: ReturnType<typeof getAdminQuestionGroupItemsQuery>;
}

export function AdminQuestionGroupItemsTable({
  questionGroupItems,
}: AdminQuestionGroupItemsTableProps) {
  const { data, pageCount } = React.use(questionGroupItems);

  const columns = React.useMemo(
    () => getAdminQuestionGroupItemsTableColumns(),
    [],
  );

  const filterFields: DataTableFilterField<AdminQuestionGroupItem>[] = [
    {
      label: "Titel",
      value: "title",
      placeholder: "Titel filtern...",
    },
  ];

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    filterFields,
    enableAdvancedFilter: false,
    defaultPerPage: 10,
    defaultSort: "title.asc",
  });

  return (
    <div className={"w-full space-y-2.5 overflow-auto"}>
      <DataTableToolbar table={table} filterFields={filterFields}>
        <AdminQuestionGroupItemsToolbar table={table} />
      </DataTableToolbar>
      <DataTable
        table={table}
        floatingBar={<AdminQuestionGroupItemsFloatingBar table={table} />}
      />
    </div>
  );
}
