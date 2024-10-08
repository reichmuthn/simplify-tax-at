"use client";
import React, { useEffect } from "react";
import { getAdminPostItemsQuery } from "@app/entities/posts/queries/getAdminPostItems/query";
import { getAdminPostItemsTableColumns } from "@ui/entities/posts/tables/admin/columns";
import { DataTableFilterField } from "@ui/types";
import { AdminPostItem } from "@app/entities/posts/queries/getAdminPostItems/schemas";
import { useDataTable } from "@ui/hooks/use-data-table";
import { DataTableToolbar } from "@ui/components/data-table/data-table-toolbar";
import { AdminPostItemsToolbar } from "@ui/entities/posts/tables/admin/toolbar";
import { DataTable } from "@ui/components/data-table/data-table";
import { AdminPostItemsFloatingBar } from "@ui/entities/posts/tables/admin/floatingBar";
import { StatusEnums } from "@app/enums/status/enum";
import { getStatusIcon } from "@ui/lib/utils";

interface AdminPostItemsTableProps {
  postItems: ReturnType<typeof getAdminPostItemsQuery>;
}

export function AdminPostItemsTable({ postItems }: AdminPostItemsTableProps) {
  const { data, pageCount } = React.use(postItems);

  const columns = React.useMemo(() => getAdminPostItemsTableColumns(), []);

  const filterFields: DataTableFilterField<AdminPostItem>[] = [
    {
      label: "Titel",
      value: "title",
      placeholder: "Titel filtern...",
    },
    {
      label: "Status",
      value: "status",
      options: Object.values(StatusEnums).map((status) => ({
        label: status[0]?.toUpperCase() + status.slice(1),
        value: status,
        icon: getStatusIcon(status),
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
    defaultPerPage: 20,
    defaultSort: "publishedAt.desc",
  });

  return (
    <div className={"w-full space-y-2.5 overflow-auto"}>
      <DataTableToolbar table={table} filterFields={filterFields}>
        <AdminPostItemsToolbar table={table} />
      </DataTableToolbar>
      <DataTable
        table={table}
        floatingBar={<AdminPostItemsFloatingBar table={table} />}
      />
    </div>
  );
}
