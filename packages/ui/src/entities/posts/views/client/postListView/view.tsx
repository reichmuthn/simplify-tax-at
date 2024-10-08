import { getActivePostListItemsQuery } from "@app/entities/posts/queries/getActivePostListItems/query";
import { Suspense } from "react";
import {
  PostList,
  PostListSkeleton, PostListVertical,
} from "@ui/entities/posts/views/client/postListView/list";
import { GetActivePostListItemsSearchParams } from "@app/entities/posts/queries/getActivePostListItems/schemas";
import { unstable_cache as cache } from "next/cache";

type PostListViewProps = {
  searchParams: GetActivePostListItemsSearchParams;
  skipItems?: number;
  hidePagination?: boolean;
};

export const getActivePostListItemsQueryCached = cache(
  async (searchParams) => {
    return getActivePostListItemsQuery(searchParams);
  },
  ["posts-getActivePostListItemsQuery"],
  {
    tags: ["posts", "tags"],
  },
);

export function PostListView({ searchParams, skipItems, hidePagination }: PostListViewProps) {
  const postItems = getActivePostListItemsQueryCached(searchParams);

  return (
    <Suspense fallback={<PostListSkeleton />}>
      <PostList postItems={postItems} skipItems={skipItems} hidePagination={hidePagination} />
    </Suspense>
  );
}

export function PostListVerticalView({ searchParams, skipItems, hidePagination }: PostListViewProps) {
  const postItems = getActivePostListItemsQueryCached(searchParams);

  return (
    <Suspense fallback={<PostListSkeleton />}>
      <PostListVertical postItems={postItems} skipItems={skipItems} hidePagination={hidePagination} />
    </Suspense>
  );
}
