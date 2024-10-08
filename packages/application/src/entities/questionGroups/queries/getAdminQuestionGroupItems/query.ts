import {
  GetAdminQuestionGroupItemsSearchParams,
  getAdminQuestionGroupItemsSelect,
  getAdminQuestionGroupItemsWhere,
} from "@app/entities/questionGroups/queries/getAdminQuestionGroupItems/schemas";
import "server-only";
import { prisma } from "@simplifytax/database";

export async function getAdminQuestionGroupItemsQuery(
  props?: GetAdminQuestionGroupItemsSearchParams,
) {
  const whereQuery = props ? getAdminQuestionGroupItemsWhere.parse(props) : {};

  const result = await prisma.questionGroup.paginate(
    {
      where: {
        ...whereQuery,
      },
      select: getAdminQuestionGroupItemsSelect,
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
