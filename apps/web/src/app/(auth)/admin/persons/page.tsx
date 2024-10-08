import { GetAdminPersonItemsSearchParams } from "@app/entities/persons/queries/getAdminPersonItems/schemas";
import { AdminPersonItemsView } from "@ui/entities/persons/tables/admin/view";

export default function Page({
  searchParams,
}: {
  searchParams?: GetAdminPersonItemsSearchParams;
}) {
  return <AdminPersonItemsView searchParams={searchParams} />;
}
