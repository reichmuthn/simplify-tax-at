import React from "react";
import { getActiveTermItemsQuery } from "@app/entities/terms/queries/getActiveTermItems/query";
import {
  TermListItemView,
  TermListItemViewSkeleton,
} from "@ui/entities/terms/views/client/termListView/item";
import { Pagination } from "@ui/components/pagination/pagination";

type TermListProps = {
  termItems: ReturnType<typeof getActiveTermItemsQuery>;
};

export function TermList({ termItems }: TermListProps) {
  const { data, currentPage, totalItems } = React.use(termItems);

  return (
    <>
      {data.length === 0 && (
        <div className="bg-white tracking-[2%] shadow-img rounded-lg border-l-2 border-l-appPrimary text-center text-base p-6 md:text-lg md:p-10">
          Wir konnten leider keine Begriffe für deine Suchanfrage finden.
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto md:max-w-none">
        {data.map((termItem) => (
          <TermListItemView termItem={termItem} key={termItem.id} />
        ))}
      </div>
      <div className={"mt-20"}>
        <Pagination currentPage={currentPage} totalItems={totalItems} />
      </div>
    </>
  );
}

export function TermListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto md:max-w-none">
      <TermListItemViewSkeleton />
      <TermListItemViewSkeleton />
      <TermListItemViewSkeleton />
      <TermListItemViewSkeleton />
      <TermListItemViewSkeleton />
      <TermListItemViewSkeleton />
      <TermListItemViewSkeleton />
      <TermListItemViewSkeleton />
      <TermListItemViewSkeleton />
      <TermListItemViewSkeleton />
    </div>
  );
}
