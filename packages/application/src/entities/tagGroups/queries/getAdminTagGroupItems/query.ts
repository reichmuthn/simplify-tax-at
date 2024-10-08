import {
  GetAdminTagGroupItemsSearchParams,
  getAdminTagGroupItemsSelect,
  getAdminTagGroupItemsWhere,
} from "@app/entities/tagGroups/queries/getAdminTagGroupItems/schemas";
import "server-only";
import { prisma } from "@simplifytax/database";

export async function getAdminTagGroupItemsQuery(
  props?: GetAdminTagGroupItemsSearchParams,
) {
  const whereQuery = props ? getAdminTagGroupItemsWhere.parse(props) : {};

  const result = await prisma.tagGroup.paginate(
    {
      where: {
        ...whereQuery,
      },
      select: getAdminTagGroupItemsSelect,
      orderBy: {
        title: "asc",
      },
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
