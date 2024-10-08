import { getPostDetailsQuery } from "@app/entities/posts/queries/getPostDetails/query";
import { Suspense } from "react";
import {
  PostDetail,
  PostDetailsSkeleton,
} from "@ui/entities/posts/views/client/postDetailView/detail";
import { unstable_cache as cache } from "next/cache";

export const getPostDetailsQueryCached = cache(
  async (slug) => {
    return getPostDetailsQuery(slug);
  },
  ["posts-getPostDetailsQuery"],
  {
    tags: ["posts", "tags", "persons"],
  },
);

export function PostDetailView({ postSlug }: { postSlug: string }) {
  const postDetail = getPostDetailsQueryCached(postSlug);

  return (
    <Suspense fallback={<PostDetailsSkeleton />}>
      <PostDetail postDetail={postDetail} />
    </Suspense>
  );
}
