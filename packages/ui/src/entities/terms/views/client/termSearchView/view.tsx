import { GetActiveTermItemsSearchParams } from "@app/entities/terms/queries/getActiveTermItems/schemas";
import {
  TermLetterFilter,
  TermLetterFilterSkeleton,
} from "@ui/entities/terms/views/client/termSearchView/letterFilter";
import {
  TermCategoryFilter,
  TermCategoryFilterSkeleton,
} from "@ui/entities/terms/views/client/termSearchView/categoryFilter";
import { TermSearchbar } from "@ui/entities/terms/views/client/termSearchView/searchbar";
import React, { Suspense } from "react";
import { getUsedTermTagItemsQuery } from "@app/entities/tags/queries/getUsedTermTagItems/query";
import { getDistinctInitialLettersQuery } from "@app/entities/terms/queries/getDistinctInitialLetters/query";
import { unstable_cache as cache } from "next/cache";

type TermSearchViewProps = {
  searchParams: GetActiveTermItemsSearchParams;
};

export const getUsedTermTagItemsQueryCached = cache(
  async () => {
    return getUsedTermTagItemsQuery();
  },
  ["terms-getUsedTermTagItemsQuery"],
  {
    tags: ["terms", "tags"],
  },
);

export const getDistinctInitialLettersQueryCached = cache(
  async (searchParams) => {
    return getDistinctInitialLettersQuery(searchParams);
  },
  ["terms-getDistinctInitialLettersQuery"],
  {
    tags: ["terms"],
  },
);

export function TermSearchView({ searchParams }: TermSearchViewProps) {
  const categoriesPromise = getUsedTermTagItemsQueryCached();
  const { begriff, ...listSearchParams } = searchParams;
  const availableLettersPromise =
    getDistinctInitialLettersQueryCached(listSearchParams);

  return (
    <div>
      <Suspense fallback={<TermLetterFilterSkeleton />}>
        <TermLetterFilter
          searchParams={searchParams}
          availableLettersPromise={availableLettersPromise}
        />
      </Suspense>
      <div className="bg-surface-3 rounded pr-1 mb-10 flex flex-row items-center w-full">
        <Suspense fallback={<TermCategoryFilterSkeleton />}>
          <TermCategoryFilter
            searchParams={searchParams}
            categoriesPromise={categoriesPromise}
          />
        </Suspense>
        <TermSearchbar searchParams={searchParams} />
      </div>
    </div>
  );
}
