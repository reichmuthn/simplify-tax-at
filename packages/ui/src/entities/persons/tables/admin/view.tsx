import React, { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
import { GetAdminPersonItemsSearchParams } from "@app/entities/persons/queries/getAdminPersonItems/schemas";
import { getAdminPersonItemsQuery } from "@app/entities/persons/queries/getAdminPersonItems/query";
import { DataTableSkeleton } from "@ui/components/data-table/data-table-skeleton";
import { AdminPersonItemsTable } from "@ui/entities/persons/tables/admin/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";

export function AdminPersonItemsView({
  searchParams,
}: {
  searchParams?: GetAdminPersonItemsSearchParams;
}) {
  noStore();
  const personItems = getAdminPersonItemsQuery(searchParams);

  return (
    <div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Alle Autoren</CardTitle>
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
            <AdminPersonItemsTable personItems={personItems} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
