import React from "react";
import { GetAdminTagItemsSearchParams } from "@app/entities/tags/queries/getAdminTagItems/schemas";
import { AdminTagItemsView } from "@ui/entities/tags/tables/admin/view";

export default function Page({
  searchParams,
}: {
  searchParams?: GetAdminTagItemsSearchParams;
}) {
  return <AdminTagItemsView searchParams={searchParams} />;
}
