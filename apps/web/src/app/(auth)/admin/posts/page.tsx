import { AdminPostItemsView } from "@ui/entities/posts/tables/admin/view";
import { GetAdminPostItemsSearchParams } from "@app/entities/posts/queries/getAdminPostItems/schemas";

export default function Page({
  searchParams,
}: {
  searchParams?: GetAdminPostItemsSearchParams;
}) {
  return <AdminPostItemsView searchParams={searchParams} />;
}
