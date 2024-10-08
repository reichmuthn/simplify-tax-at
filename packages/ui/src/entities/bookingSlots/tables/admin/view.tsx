import React, {Suspense} from "react";
import {unstable_noStore as noStore} from "next/cache";
import {GetAdminBookingSlotItemsSearchParams} from "@app/entities/bookingSlots/queries/getAdminBookingSlotItems/schemas";
import {getAdminBookingSlotItemsQuery} from "@app/entities/bookingSlots/queries/getAdminBookingSlotItems/query";
import {DataTableSkeleton} from "@ui/components/data-table/data-table-skeleton";
import {AdminBookingSlotItemsTable} from "@ui/entities/bookingSlots/tables/admin/table";
import {Card, CardContent, CardHeader, CardTitle,} from "@ui/components/ui/card";

export function AdminBookingSlotItemsView({searchParams}: { searchParams?: GetAdminBookingSlotItemsSearchParams; }) {
  noStore();
  const bookingSlotItems = getAdminBookingSlotItemsQuery(searchParams);

  return (
    <div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Alle Termine</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <DataTableSkeleton
                columnCount={3}
                searchableColumnCount={1}
                filterableColumnCount={0}
                cellWidths={["10rem", "40rem", "12rem"]}
                shrinkZero
              />
            }
          >
            <AdminBookingSlotItemsTable bookingSlotItems={bookingSlotItems}/>
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
