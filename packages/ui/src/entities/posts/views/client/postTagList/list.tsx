import Link from "next/link";
import React from "react";
import { ChevronRight } from "lucide-react";
import { getUsedPostTagItemsQuery } from "@app/entities/tags/queries/getUsedPostTagItems/query";
import {B3, H4} from "@ui/typography/typography";

type PostTagListProps = {
  postTagItems: ReturnType<typeof getUsedPostTagItemsQuery>;
};

export function PostTagList({ postTagItems }: PostTagListProps) {
  const tags = React.use(postTagItems);

  return (
    <div className="grid grid-cols-1 gap-6 md:gap-10 max-w-lg mx-auto md:max-w-none md:grid-cols-2 lg:grid-cols-3">
      {tags.map((tag) => (
        <Link
          key={tag.slug}
          href={`/de/blog/kategorien/${tag.slug}`}
          className="rounded-xl md:rounded-2xl p-6 md:p-8 bg-surface-2 shadow-img flex justify-between items-center"
        >
          <div className="space-y-2">
            <H4>{tag.title}</H4>
            <B3 className="text-sm md:text-base">
              {tag._count.posts}{" "}
              {tag._count.posts === 1 ? "Beitrag" : "Beiträge"}
            </B3>
          </div>
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5 outline-body" />
        </Link>
      ))}
    </div>
  );
}
