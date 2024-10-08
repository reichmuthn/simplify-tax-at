import { prisma } from "@simplifytax/database";
import "server-only";
import { StatusEnums } from "@app/enums/status/enum";
import {
  GetActiveTermItemsSearchParams,
  getActiveTermItemsSelect,
  getActiveTermItemsWhere,
} from "@app/entities/terms/queries/getActiveTermItems/schemas";

export async function getActiveTermItemsQuery(
  searchParams?: GetActiveTermItemsSearchParams,
) {
  const whereQuery = searchParams
    ? getActiveTermItemsWhere.parse(searchParams)
    : {};

  const result = await prisma.term.paginate(
    {
      where: {
        ...whereQuery,
        status: StatusEnums.Active,
      },
      select: getActiveTermItemsSelect,
      orderBy: {
        title: "asc",
      },
    },
    {
      page: searchParams?.seite ? parseInt(searchParams.seite) : 1,
      limit: searchParams?.limit ? parseInt(searchParams.limit) : 20,
    },
  );

  return {
    data: result.result,
    pageCount: result.totalPages,
    currentPage: result.page,
    totalItems: result.count,
  };
}
