import {
  GetAdminUserAnswerItemsSearchParams,
  getAdminUserAnswerItemsSelect,
  getAdminUserAnswerItemsWhere,
} from "@app/entities/userAnswers/queries/getAdminUserAnswerItems/schemas";
import "server-only";
import { prisma } from "@simplifytax/database";

export async function getAdminUserAnswerItemsQuery(
  props?: GetAdminUserAnswerItemsSearchParams,
) {
  const whereQuery = props ? getAdminUserAnswerItemsWhere.parse(props) : {};

  const result = await prisma.userAnswer.paginate(
    {
      where: {
        ...whereQuery,
      },
      select: getAdminUserAnswerItemsSelect,
      orderBy: {
        createdAt: "asc",
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
