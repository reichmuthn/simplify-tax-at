import {
  GetAdminAnswerItemsSearchParams,
  getAdminAnswerItemsSelect,
  getAdminAnswerItemsWhere,
} from "@app/entities/answers/queries/getAdminAnswerItems/schemas";
import "server-only";
import { prisma } from "@simplifytax/database";

export async function getAdminAnswerItemsQuery(
  props?: GetAdminAnswerItemsSearchParams,
) {
  const whereQuery = props ? getAdminAnswerItemsWhere.parse(props) : {};

  const result = await prisma.answer.paginate(
    {
      where: {
        ...whereQuery,
      },
      select: getAdminAnswerItemsSelect,
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
