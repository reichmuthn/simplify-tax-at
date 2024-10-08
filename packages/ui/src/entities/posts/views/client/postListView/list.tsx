import React from "react";
import { getActivePostListItemsQuery } from "@app/entities/posts/queries/getActivePostListItems/query";
import {
  PostListItemView,
  PostListItemViewSkeleton,
} from "@ui/entities/posts/views/client/postListView/item";
import { Pagination } from "@ui/components/pagination/pagination";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@ui/components/ui/tabs";

type PostListProps = {
  postItems: ReturnType<typeof getActivePostListItemsQuery>;
  skipItems?: number;
  hidePagination?: boolean;
};

export function PostList({ postItems, skipItems = 0 , hidePagination}: PostListProps) {
  const { data, pageCount, currentPage, totalItems } = React.use(postItems);

  return (
    <>
      {data.length === 0 && (
        <div className="bg-white shadow-img rounded-xl md:rounded-2xl border-b-2 border-b-primary text-center text-base p-6 md:text-lg md:p-10">
          Wir konnten leider keine Posts für deine Suchanfrage finden.
        </div>
      )}
      <div className="gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-12 grid grid-cols-1 mx-auto sm:grid-cols-2 lg:grid-cols-3 cursor-pointer">
        {data
          .filter((x, index) => currentPage !== 1 || index > skipItems - 1)
          .map((postItem) => (
            <PostListItemView postItem={postItem} key={postItem.id} />
          ))}
      </div>
      {!hidePagination && <div className={"mt-20"}>
          <Pagination currentPage={currentPage} totalItems={totalItems}/>
      </div>}
    </>
  );
}

export function PostListVertical({ postItems, skipItems = 0 , hidePagination}: PostListProps) {
  const { data, pageCount, currentPage, totalItems } = React.use(postItems);

  return (
    <>
      {data.length === 0 && (
        <div className="bg-white shadow-img rounded-xl md:rounded-2xl border-b-2 border-b-primary text-center text-base p-6 md:text-lg md:p-10">
          Wir konnten leider keine Posts für deine Suchanfrage finden.
        </div>
      )}
      <div className="gap-10 grid grid-cols-1 grid-rows-2 cursor-pointer">
        {data
          .filter((x, index) => currentPage !== 1 || index > skipItems - 1)
          .map((postItem) => (
            <PostListItemView postItem={postItem} key={postItem.id} />
          ))}
      </div>
      {!hidePagination && <div className={"mt-20"}>
          <Pagination currentPage={currentPage} totalItems={totalItems}/>
      </div>}
    </>
  );
}

export function PostListSkeleton() {
  return (
    <div className="gap-10 grid grid-cols-1 max-w-lg mx-auto md:max-w-none md:grid-cols-2 lg:grid-cols-3 cursor-pointer">
      <PostListItemViewSkeleton />
      <PostListItemViewSkeleton />
      <PostListItemViewSkeleton />
      <PostListItemViewSkeleton />
      <PostListItemViewSkeleton />
      <PostListItemViewSkeleton />
    </div>
  );
}
