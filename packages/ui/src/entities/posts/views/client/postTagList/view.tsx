import { Suspense } from "react";
import { PostTagList } from "@ui/entities/posts/views/client/postTagList/list";
import { getUsedPostTagItemsQuery } from "@app/entities/tags/queries/getUsedPostTagItems/query";
import { unstable_cache as cache } from "next/cache";
import { getPostTagDetailsQuery } from "@app/entities/tags/queries/getPostTagDetails/query";

export const getUsedPostTagItemsQueryCached = cache(
  async () => {
    return getUsedPostTagItemsQuery();
  },
  ["posts-getUsedPostTagItemsQuery"],
  {
    tags: ["posts", "tags"],
  },
);

export const getPostTagDetailsQueryCached = cache(
  async (slug) => {
    return getPostTagDetailsQuery(slug);
  },
  ["posts-getPostTagDetailsQuery"],
  {
    tags: ["posts", "tags"],
  },
);

export function PostTagListView() {
  const postTagItems = getUsedPostTagItemsQueryCached();

  return (
    <Suspense fallback={null}>
      <PostTagList postTagItems={postTagItems} />
    </Suspense>
  );
}
