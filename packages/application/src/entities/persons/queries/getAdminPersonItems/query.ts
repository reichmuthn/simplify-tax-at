import {
  GetAdminPersonItemsSearchParams,
  getAdminPersonItemsSelect,
  getAdminPersonItemsWhere,
} from "@app/entities/persons/queries/getAdminPersonItems/schemas";
import "server-only";
import { prisma } from "@simplifytax/database";

export async function getAdminPersonItemsQuery(
  props?: GetAdminPersonItemsSearchParams,
) {
  const whereQuery = props ? getAdminPersonItemsWhere.parse(props) : {};

  const result = await prisma.person.paginate(
    {
      where: {
        ...whereQuery,
      },
      select: getAdminPersonItemsSelect,
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
