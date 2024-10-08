import React, { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
import { GetAdminTermItemsSearchParams } from "@app/entities/terms/queries/getAdminTermItems/schemas";
import { getAdminTermItemsQuery } from "@app/entities/terms/queries/getAdminTermItems/query";
import { DataTableSkeleton } from "@ui/components/data-table/data-table-skeleton";
import { AdminTermItemsTable } from "@ui/entities/terms/tables/admin/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";

export function AdminTermItemsView({
  searchParams,
}: {
  searchParams?: GetAdminTermItemsSearchParams;
}) {
  noStore();
  const termItems = getAdminTermItemsQuery(searchParams);

  return (
    <div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Alle Lexikonbegriffe</CardTitle>
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
            <AdminTermItemsTable termItems={termItems} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
