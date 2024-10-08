"use client";
import React from "react";
import { getAdminPersonItemsQuery } from "@app/entities/persons/queries/getAdminPersonItems/query";
import { getAdminPersonItemsTableColumns } from "@ui/entities/persons/tables/admin/columns";
import { DataTableFilterField } from "@ui/types";
import { AdminPersonItem } from "@app/entities/persons/queries/getAdminPersonItems/schemas";
import { useDataTable } from "@ui/hooks/use-data-table";
import { DataTableToolbar } from "@ui/components/data-table/data-table-toolbar";
import { AdminPersonItemsToolbar } from "@ui/entities/persons/tables/admin/toolbar";
import { DataTable } from "@ui/components/data-table/data-table";
import { AdminPersonItemsFloatingBar } from "@ui/entities/persons/tables/admin/floatingBar";

interface AdminPersonItemsTableProps {
  personItems: ReturnType<typeof getAdminPersonItemsQuery>;
}

export function AdminPersonItemsTable({
  personItems,
}: AdminPersonItemsTableProps) {
  const { data, pageCount } = React.use(personItems);

  const columns = React.useMemo(() => getAdminPersonItemsTableColumns(), []);

  const filterFields: DataTableFilterField<AdminPersonItem>[] = [
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
        <AdminPersonItemsToolbar table={table} />
      </DataTableToolbar>
      <DataTable
        table={table}
        floatingBar={<AdminPersonItemsFloatingBar table={table} />}
      />
    </div>
  );
}
