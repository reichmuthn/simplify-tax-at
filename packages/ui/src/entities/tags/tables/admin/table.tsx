"use client";
import React from "react";
import { getAdminTagItemsQuery } from "@app/entities/tags/queries/getAdminTagItems/query";
import { getAdminTagItemsTableColumns } from "@ui/entities/tags/tables/admin/columns";
import { DataTableFilterField } from "@ui/types";
import { AdminTagItem } from "@app/entities/tags/queries/getAdminTagItems/schemas";
import { useDataTable } from "@ui/hooks/use-data-table";
import { DataTableToolbar } from "@ui/components/data-table/data-table-toolbar";
import { AdminTagItemsToolbar } from "@ui/entities/tags/tables/admin/toolbar";
import { DataTable } from "@ui/components/data-table/data-table";
import { AdminTagItemsFloatingBar } from "@ui/entities/tags/tables/admin/floatingBar";
import { StatusEnums } from "@app/enums/status/enum";
import { getStatusIcon } from "@ui/lib/utils";
import { getAdminTagGroupItemsQuery } from "@app/entities/tagGroups/queries/getAdminTagGroupItems/query";

interface AdminTagItemsTableProps {
  tagItems: ReturnType<typeof getAdminTagItemsQuery>;
  tagGroupItems: ReturnType<typeof getAdminTagGroupItemsQuery>;
}

export function AdminTagItemsTable({
  tagItems,
  tagGroupItems,
}: AdminTagItemsTableProps) {
  const { data, pageCount } = React.use(tagItems);
  const { data: tagGroups } = React.use(tagGroupItems);

  const columns = React.useMemo(() => getAdminTagItemsTableColumns(), []);

  const filterFields: DataTableFilterField<AdminTagItem>[] = [
    {
      label: "Titel",
      value: "title",
      placeholder: "Titel filtern...",
    },
    {
      label: "Gruppe",
      value: "tagGroup",
      options: tagGroups.map((tagGroup) => ({
        label: tagGroup.title,
        value: tagGroup.id,
        withCount: true,
      })),
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
        <AdminTagItemsToolbar table={table} />
      </DataTableToolbar>
      <DataTable
        table={table}
        floatingBar={<AdminTagItemsFloatingBar table={table} />}
      />
    </div>
  );
}
