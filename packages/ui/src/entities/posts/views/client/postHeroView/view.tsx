import {
  PostHero,
  PostHeroSkeleton,
} from "@ui/entities/posts/views/client/postHeroView/hero";
import { Suspense } from "react";
import { getActivePostListItemsQueryCached } from "@ui/entities/posts/views/client/postListView/view";

export function PostHeroView() {
  const postItems = getActivePostListItemsQueryCached({ limit: "1" });

  return (
    <Suspense fallback={<PostHeroSkeleton />}>
      <PostHero postItems={postItems} />
    </Suspense>
  );
}
