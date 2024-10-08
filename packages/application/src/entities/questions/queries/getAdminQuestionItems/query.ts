import {
  GetAdminQuestionItemsSearchParams,
  getAdminQuestionItemsSelect,
  getAdminQuestionItemsWhere,
} from "@app/entities/questions/queries/getAdminQuestionItems/schemas";
import "server-only";
import { prisma } from "@simplifytax/database";

export async function getAdminQuestionItemsQuery(
  props?: GetAdminQuestionItemsSearchParams,
) {
  const whereQuery = props ? getAdminQuestionItemsWhere.parse(props) : {};

  const result = await prisma.question.paginate(
    {
      where: {
        ...whereQuery,
      },
      select: getAdminQuestionItemsSelect,
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
