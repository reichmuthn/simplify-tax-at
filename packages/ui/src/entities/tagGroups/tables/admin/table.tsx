"use client";
import React from "react";
import { getAdminTagGroupItemsQuery } from "@app/entities/tagGroups/queries/getAdminTagGroupItems/query";
import { getAdminTagGroupItemsTableColumns } from "@ui/entities/tagGroups/tables/admin/columns";
import { DataTableFilterField } from "@ui/types";
import { AdminTagGroupItem } from "@app/entities/tagGroups/queries/getAdminTagGroupItems/schemas";
import { useDataTable } from "@ui/hooks/use-data-table";
import { DataTableToolbar } from "@ui/components/data-table/data-table-toolbar";
import { AdminTagGroupItemsToolbar } from "@ui/entities/tagGroups/tables/admin/toolbar";
import { DataTable } from "@ui/components/data-table/data-table";
import { AdminTagGroupItemsFloatingBar } from "@ui/entities/tagGroups/tables/admin/floatingBar";

interface AdminTagGroupItemsTableProps {
  tagGroupItems: ReturnType<typeof getAdminTagGroupItemsQuery>;
}

export function AdminTagGroupItemsTable({
  tagGroupItems,
}: AdminTagGroupItemsTableProps) {
  const { data, pageCount } = React.use(tagGroupItems);

  const columns = React.useMemo(() => getAdminTagGroupItemsTableColumns(), []);

  const filterFields: DataTableFilterField<AdminTagGroupItem>[] = [
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
        <AdminTagGroupItemsToolbar table={table} />
      </DataTableToolbar>
      <DataTable
        table={table}
        floatingBar={<AdminTagGroupItemsFloatingBar table={table} />}
      />
    </div>
  );
}
