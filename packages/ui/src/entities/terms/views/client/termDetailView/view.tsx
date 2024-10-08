import { GetActiveTermItemsSearchParams } from "@app/entities/terms/queries/getActiveTermItems/schemas";
import { getTermDetailsQuery } from "@app/entities/terms/queries/getTermDetails/query";
import { Suspense } from "react";
import {
  TermDetail,
  TermDetailSkeleton,
} from "@ui/entities/terms/views/client/termDetailView/details";
import { unstable_cache as cache } from "next/cache";

type TermDetailsViewProps = {
  searchParams: GetActiveTermItemsSearchParams;
};

export const getTermDetailsQueryCached = cache(
  async (slug: string) => {
    return getTermDetailsQuery(slug);
  },
  ["terms-getTermDetailsQuery"],
  {
    tags: ["terms"],
  },
);

export function TermDetailsView({ searchParams }: TermDetailsViewProps) {
  if (!searchParams.begriff) return;

  const termDetailsPromise = getTermDetailsQueryCached(searchParams.begriff);

  return (
    <Suspense fallback={<TermDetailSkeleton />} key={searchParams.begriff}>
      <TermDetail termDetailsPromise={termDetailsPromise} />
    </Suspense>
  );
}
