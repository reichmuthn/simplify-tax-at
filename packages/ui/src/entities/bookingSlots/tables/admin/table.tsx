"use client";
import React from "react";
import {getAdminBookingSlotItemsQuery} from "@app/entities/bookingSlots/queries/getAdminBookingSlotItems/query";
import {getAdminBookingSlotItemsTableColumns} from "@ui/entities/bookingSlots/tables/admin/columns";
import {DataTableFilterField} from "@ui/types";
import {AdminBookingSlotItem} from "@app/entities/bookingSlots/queries/getAdminBookingSlotItems/schemas";
import {useDataTable} from "@ui/hooks/use-data-table";
import {DataTableToolbar} from "@ui/components/data-table/data-table-toolbar";
import {AdminBookingSlotItemsToolbar} from "@ui/entities/bookingSlots/tables/admin/toolbar";
import {DataTable} from "@ui/components/data-table/data-table";
import {AdminBookingSlotItemsFloatingBar} from "@ui/entities/bookingSlots/tables/admin/floatingBar";

interface AdminBookingSlotItemsTableProps {
  bookingSlotItems: ReturnType<typeof getAdminBookingSlotItemsQuery>;
}

export function AdminBookingSlotItemsTable({ bookingSlotItems}: AdminBookingSlotItemsTableProps) {
  const {data, pageCount} = React.use(bookingSlotItems);

  const columns = React.useMemo(() => getAdminBookingSlotItemsTableColumns(), []);

  const filterFields: DataTableFilterField<AdminBookingSlotItem>[] = [
    {
      label: "Titel",
      value: "title",
      placeholder: "Titel filtern...",
    },
  ];

  const {table} = useDataTable({
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
        <AdminBookingSlotItemsToolbar table={table}/>
      </DataTableToolbar>
      <DataTable
        table={table}
        floatingBar={<AdminBookingSlotItemsFloatingBar table={table}/>}
      />
    </div>
  );
}
