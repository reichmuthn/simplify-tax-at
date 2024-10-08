import React, { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
import { GetAdminTagItemsSearchParams } from "@app/entities/tags/queries/getAdminTagItems/schemas";
import { getAdminTagItemsQuery } from "@app/entities/tags/queries/getAdminTagItems/query";
import { DataTableSkeleton } from "@ui/components/data-table/data-table-skeleton";
import { AdminTagItemsTable } from "@ui/entities/tags/tables/admin/table";
import { Card, CardContent, CardHeader } from "@ui/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@ui/components/ui/tabs";
import { getAdminTagGroupItemsQuery } from "@app/entities/tagGroups/queries/getAdminTagGroupItems/query";
import { AdminTagGroupItemsTable } from "@ui/entities/tagGroups/tables/admin/table";

export function AdminTagItemsView({
  searchParams,
}: {
  searchParams?: GetAdminTagItemsSearchParams;
}) {
  noStore();
  const tagItems = getAdminTagItemsQuery(searchParams);
  const tagGroupItems = getAdminTagGroupItemsQuery(searchParams);

  return (
    <div>
      <Tabs defaultValue="tags">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader className={"w-fit"}>
            <TabsList>
              <TabsTrigger value="tags">Tags</TabsTrigger>
              <TabsTrigger value="groups">Gruppen</TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <TabsContent value="tags">
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
                <AdminTagItemsTable
                  tagItems={tagItems}
                  tagGroupItems={tagGroupItems}
                />
              </Suspense>
            </TabsContent>
            <TabsContent value="groups">
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
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
