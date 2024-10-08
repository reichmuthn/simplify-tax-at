import { cloudinaryAssetsProvider } from "@app/providers/assetsProvider/provider";
import {
  AdminImageItem,
  GetAdminImageItemsCloudinaryResponse,
  GetAdminImageItemsSearchParams,
} from "@app/assets/images/queries/getAdminImageItems/schemas";
import "server-only";

export async function getAdminImageItemsQuery(
  searchParams: GetAdminImageItemsSearchParams,
) {
  const response: GetAdminImageItemsCloudinaryResponse =
    await cloudinaryAssetsProvider.search
      .expression(searchParams.search)
      .max_results(10)
      .next_cursor(searchParams.nextCursor)
      .sort_by("created_at", "desc")
      .execute();

  const items = response.resources
    .filter((x) => x.resource_type === "image")
    .map((x) => ({
      url: x.secure_url,
      id: x.asset_id,
      name: x.public_id,
      format: x.format,
      width: x.width,
      height: x.height,
    })) as AdminImageItem[];

  return {
    items,
    nextCursor: response?.next_cursor,
  };
}
