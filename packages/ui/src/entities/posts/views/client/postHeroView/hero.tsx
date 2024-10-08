import {CldImage} from "@ui/components/cldImage";
import Link from "next/link";
import {getActivePostListItemsQuery} from "@app/entities/posts/queries/getActivePostListItems/query";
import React from "react";
import {B3, H4} from "@ui/typography/typography";
import {renderFullDate} from "@ui/lib/utils";
import {Badge} from "@ui/components/ui-app/badge";

type PostHeroProps = {
  postItems: ReturnType<typeof getActivePostListItemsQuery>;
};

export function PostHero({postItems}: PostHeroProps) {
  const {data, pageCount} = React.use(postItems);
  if (data.length === 0 || !data[0]) return;
  const post = data[0];

  return (
    <Link
      href={`/de/blog/${post?.slug}`}
      className="pb-[80%] sm:pb-[60%] lg:pb-[50%] relative rounded-xl md:rounded-2xl shadow-img border-[0.75px] border-surface-1/80 overflow-hidden block"
    >
      <CldImage
        className="absolute w-full h-full object-cover"
        src={post.titleImage ?? "og-image.img"}
        fill={true}
        priority={true}
        sizes="(max-width: 1200px) 100vw, 1200px"
        alt={`Beitrags Bild: ${post.title}`}
      />

      <div
        className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 md:right-6 lg:bottom-8 lg:left-8 p-4 sm:p-6 lg:p-8 max-w-none sm:max-w-lg sm:mr-2 md:mr-0 rounded-md md:rounded-lg bg-surface-2/90 backdrop-blur-sm border-[0.75px] border-surface-1/80 shadow-img">
        <span className="block text-xs sm:text-sm text-body pb-2">
          {renderFullDate(post.publishedAt)}
        </span>
        <div className="space-y-2 lg:space-y-4">
          <H4 className="text-balance hyphens-auto line-clamp-2" lang={"de"}>
            {post.title}
          </H4>
          <B3 className="text-balance hyphens-auto line-clamp-2" lang={"de"}>
            {post.summary}
          </B3>
          <div className="space-x-2">
            {post.tags?.map((x: any) => (
              <Badge key={x.id}>
                {x.title}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function PostHeroSkeleton() {
  return (
    <div
      className="animate-pulse pb-[100%] sm:pb-[90%] md:pb-[50%] bg-gray-300 relative rounded-2xl overflow-hidden block">
      <svg
        className="w-12 h-12 text-gray-200 absolute top-0 bottom-0 left-0 right-0 m-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 640 512"
      >
        <path
          d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/>
      </svg>
      <div
        className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 lg:bottom-10 lg:left-10 bg-white/90 backdrop-blur-sm p-2 sm:p-4 md:p-6 lg:p-8 md:w-[65%] lg:w-[45%] rounded-xl border-[0.75px] border-white/60">
        <span className="block text-xs font-medium text-body">
          <div className="h-2 bg-gray-200 rounded-full w-36 mb-4"></div>
        </span>
        <div className="mb-1 sm:1.5 md:mb-2 lg:mb-3">
          <h4 className="text-base md:text-lg font-[580] text-display tracking-tight sm:text-lg lg:text-2xl mt-2">
            <div className="h-4 bg-gray-200 rounded-full w-full mb-2.5"></div>
            <div className="h-4 bg-gray-200 rounded-full w-1/2 mb-4"></div>
          </h4>
        </div>
        <div className="font-normal text-body text-sm md:text-base tracking-tight line-clamp-2">
          <div className="h-2.5 bg-gray-200 rounded-full w-full mb-2.5"></div>
          <div className="h-2.5 bg-gray-200 rounded-full w-1/2"></div>
        </div>
        <div className="flex gap-4 mt-4 sm:mt-6 flex-wrap">
          <div className="h-4 bg-gray-200 w-20 rounded-full"></div>
          <div className="h-4 bg-gray-200 w-20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
