import "server-only";
import {
  GetActiveTermItemsSearchParams,
  getActiveTermItemsWhere,
} from "../getActiveTermItems/schemas";
import { prisma } from "@simplifytax/database";
import { StatusEnums } from "@app/enums/status/enum";

export async function getDistinctInitialLettersQuery(
  searchParams: GetActiveTermItemsSearchParams,
) {
  const whereQuery = searchParams
    ? getActiveTermItemsWhere.parse(searchParams)
    : {};

  const terms = await prisma.term.findMany({
    where: {
      ...whereQuery,
      status: StatusEnums.Active,
    },
    select: { title: true },
  });

  const initialLetters = new Set<string>();
  terms.forEach((term) => {
    if (term.title && term.title.length > 0) {
      initialLetters.add(term.title[0]!.toLowerCase());
    }
  });

  return Array.from(initialLetters).sort();
}
