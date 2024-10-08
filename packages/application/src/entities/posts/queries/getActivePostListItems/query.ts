import { prisma } from "@simplifytax/database";
import "server-only";
import { StatusEnums } from "@app/enums/status/enum";
import {
  GetActivePostListItemsSearchParams,
  getActivePostListItemsSelect,
  getActivePostListItemsWhere,
} from "@app/entities/posts/queries/getActivePostListItems/schemas";

export async function getActivePostListItemsQuery(
  props?: GetActivePostListItemsSearchParams,
) {
  const whereQuery = props ? getActivePostListItemsWhere.parse(props) : {};

  const result = await prisma.post.paginate(
    {
      where: {
        ...whereQuery,
        status: StatusEnums.Active,
      },
      select: getActivePostListItemsSelect,
      orderBy: {
        publishedAt: "desc",
      },
    },
    {
      page: props?.seite ? parseInt(props.seite) : 1,
      limit: props?.limit ? parseInt(props.limit) : 20,
    },
  );

  return {
    data: result.result,
    pageCount: result.totalPages,
    currentPage: result.page,
    totalItems: result.count,
  };
}
