import React from "react";
import { GetAdminTermItemsSearchParams } from "@app/entities/terms/queries/getAdminTermItems/schemas";
import { AdminTermItemsView } from "@ui/entities/terms/tables/admin/view";

export default function Page({
  searchParams,
}: {
  searchParams?: GetAdminTermItemsSearchParams;
}) {
  return <AdminTermItemsView searchParams={searchParams} />;
}
