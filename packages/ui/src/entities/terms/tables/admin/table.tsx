"use client";
import React from "react";
import { getAdminTermItemsQuery } from "@app/entities/terms/queries/getAdminTermItems/query";
import { getAdminTermItemsTableColumns } from "@ui/entities/terms/tables/admin/columns";
import { DataTableFilterField } from "@ui/types";
import { AdminTermItem } from "@app/entities/terms/queries/getAdminTermItems/schemas";
import { useDataTable } from "@ui/hooks/use-data-table";
import { DataTableToolbar } from "@ui/components/data-table/data-table-toolbar";
import { AdminTermItemsToolbar } from "@ui/entities/terms/tables/admin/toolbar";
import { DataTable } from "@ui/components/data-table/data-table";
import { AdminTermItemsFloatingBar } from "@ui/entities/terms/tables/admin/floatingBar";

interface AdminTermItemsTableProps {
  termItems: ReturnType<typeof getAdminTermItemsQuery>;
}

export function AdminTermItemsTable({ termItems }: AdminTermItemsTableProps) {
  const { data, pageCount } = React.use(termItems);

  const columns = React.useMemo(() => getAdminTermItemsTableColumns(), []);

  const filterFields: DataTableFilterField<AdminTermItem>[] = [
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
        <AdminTermItemsToolbar table={table} />
      </DataTableToolbar>
      <DataTable
        table={table}
        floatingBar={<AdminTermItemsFloatingBar table={table} />}
      />
    </div>
  );
}
