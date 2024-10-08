import {
  getAdminPostItemsOrderBy,
  GetAdminPostItemsSearchParams,
  getAdminPostItemsSelect,
  getAdminPostItemsWhere,
} from "@app/entities/posts/queries/getAdminPostItems/schemas";
import "server-only";
import { prisma } from "@simplifytax/database";

export async function getAdminPostItemsQuery(
  props?: GetAdminPostItemsSearchParams,
) {
  const whereQuery = props ? getAdminPostItemsWhere.parse(props) : {};

  const result = await prisma.post.paginate(
    {
      where: whereQuery,
      select: getAdminPostItemsSelect,
      orderBy: getAdminPostItemsOrderBy.parse(props),
    },
    {
      page: props?.page ? parseInt(props.page) : 1,
      limit: props?.per_page ? parseInt(props.per_page) : 20,
    },
  );

  return {
    data: result.result,
    pageCount: result.totalPages,
  };
}
