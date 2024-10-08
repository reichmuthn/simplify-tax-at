import {
  GetAdminTermItemsSearchParams,
  getAdminTermItemsSelect,
  getAdminTermItemsWhere,
} from "@app/entities/terms/queries/getAdminTermItems/schemas";
import "server-only";
import { prisma } from "@simplifytax/database";

export async function getAdminTermItemsQuery(
  props?: GetAdminTermItemsSearchParams,
) {
  const whereQuery = props ? getAdminTermItemsWhere.parse(props) : {};

  const result = await prisma.term.paginate(
    {
      where: {
        ...whereQuery,
      },
      select: getAdminTermItemsSelect,
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
