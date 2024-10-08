import { getActiveTermItemsQuery } from "@app/entities/terms/queries/getActiveTermItems/query";
import { Suspense } from "react";
import {
  TermList,
  TermListSkeleton,
} from "@ui/entities/terms/views/client/termListView/list";
import { GetActiveTermItemsSearchParams } from "@app/entities/terms/queries/getActiveTermItems/schemas";
import { unstable_cache as cache } from "next/cache";

type TermListViewProps = {
  searchParams: GetActiveTermItemsSearchParams;
};

export const getActiveTermItemsQueryCached = cache(
  async (searchParams) => {
    return getActiveTermItemsQuery(searchParams);
  },
  ["terms-getActiveTermItemsQuery"],
  {
    tags: ["terms", "tags"],
  },
);

export function TermListView({ searchParams }: TermListViewProps) {
  const { begriff, ...listSearchParams } = searchParams;
  const termItems = getActiveTermItemsQueryCached(listSearchParams);

  return (
    <Suspense fallback={<TermListSkeleton />}>
      <TermList termItems={termItems} />
    </Suspense>
  );
}
