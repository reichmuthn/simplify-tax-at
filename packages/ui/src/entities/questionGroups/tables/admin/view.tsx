import React, { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
import { GetAdminQuestionGroupItemsSearchParams } from "@app/entities/questionGroups/queries/getAdminQuestionGroupItems/schemas";
import { getAdminQuestionGroupItemsQuery } from "@app/entities/questionGroups/queries/getAdminQuestionGroupItems/query";
import { DataTableSkeleton } from "@ui/components/data-table/data-table-skeleton";
import { AdminQuestionGroupItemsTable } from "@ui/entities/questionGroups/tables/admin/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";

export function AdminQuestionGroupItemsView({
  searchParams,
}: {
  searchParams?: GetAdminQuestionGroupItemsSearchParams;
}) {
  noStore();
  const questionGroupItems = getAdminQuestionGroupItemsQuery(searchParams);

  return (
    <div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Alle QuestionGroups</CardTitle>
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
            <AdminQuestionGroupItemsTable
              questionGroupItems={questionGroupItems}
            />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
