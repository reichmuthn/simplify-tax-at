import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import { GetAdminPostItemsSearchParams } from "@app/entities/posts/queries/getAdminPostItems/schemas";
import { getAdminPostItemsQuery } from "@app/entities/posts/queries/getAdminPostItems/query";
import { DataTableSkeleton } from "@ui/components/data-table/data-table-skeleton";
import { AdminPostItemsTable } from "@ui/entities/posts/tables/admin/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";
import { Suspense } from "react";

export function AdminPostItemsView({
  searchParams,
}: {
  searchParams?: GetAdminPostItemsSearchParams;
}) {
  noStore();
  const postItems = getAdminPostItemsQuery(searchParams);

  return (
    <div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Alle Blogbeiträge</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <DataTableSkeleton
                columnCount={3}
                searchableColumnCount={1}
                filterableColumnCount={1}
                cellWidths={["10rem", "40rem", "12rem"]}
                shrinkZero
              />
            }
          >
            <AdminPostItemsTable postItems={postItems} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
