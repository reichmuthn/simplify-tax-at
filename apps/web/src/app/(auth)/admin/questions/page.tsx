import React from "react";
import { GetAdminQuestionGroupItemsSearchParams } from "@app/entities/questionGroups/queries/getAdminQuestionGroupItems/schemas";
import { AdminQuestionGroupItemsView } from "@ui/entities/questionGroups/tables/admin/view";

export default function Page({
  searchParams,
}: {
  searchParams?: GetAdminQuestionGroupItemsSearchParams;
}) {
  return <AdminQuestionGroupItemsView searchParams={searchParams} />;
}
