import { prisma } from "@simplifytax/database";
import {
  GetAdminTagItemsSearchParams,
  getAdminTagItemsSelect,
  getAdminTagItemsWhere,
} from "@app/entities/tags/queries/getAdminTagItems/schemas";

export async function getAdminTagItemsQuery(
  searchParams?: GetAdminTagItemsSearchParams,
) {
  const whereQuery = searchParams
    ? getAdminTagItemsWhere.parse(searchParams)
    : {};

  const result = await prisma.tag.paginate(
    {
      where: whereQuery,
      select: getAdminTagItemsSelect,
      orderBy: {
        createdAt: "desc",
      },
    },
    {
      page: searchParams?.page ? parseInt(searchParams.page) : 1,
      limit: searchParams?.per_page ? parseInt(searchParams.per_page) : 20,
    },
  );

  return {
    data: result.result,
    pageCount: result.totalPages,
  };
}
