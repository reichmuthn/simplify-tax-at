import React, { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
import { GetAdminTagGroupItemsSearchParams } from "@app/entities/tagGroups/queries/getAdminTagGroupItems/schemas";
import { getAdminTagGroupItemsQuery } from "@app/entities/tagGroups/queries/getAdminTagGroupItems/query";
import { DataTableSkeleton } from "@ui/components/data-table/data-table-skeleton";
import { AdminTagGroupItemsTable } from "@ui/entities/tagGroups/tables/admin/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";

export function AdminTagGroupItemsView({
  searchParams,
}: {
  searchParams?: GetAdminTagGroupItemsSearchParams;
}) {
  noStore();
  const tagGroupItems = getAdminTagGroupItemsQuery(searchParams);

  return (
    <div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Alle TagGroups</CardTitle>
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
            <AdminTagGroupItemsTable tagGroupItems={tagGroupItems} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
