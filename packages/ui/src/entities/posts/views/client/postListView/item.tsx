import Link from "next/link";
import React from "react";
import {CldImage} from "@ui/components/cldImage";
import {ActivePostListItem} from "@app/entities/posts/queries/getActivePostListItems/schemas";
import {B3, H5} from "@ui/typography/typography";
import {renderFullDate} from "@ui/lib/utils";
import {Badge} from "@ui/components/ui-app/badge";

type PostListItemViewProps = {
  postItem: ActivePostListItem;
};

export function PostListItemView({postItem}: PostListItemViewProps) {
  return (
    <Link href={`/de/blog/${postItem.slug}`}>
      <div
        className="flex flex-col h-full gap-4">
        <div className="relative pb-[60%] sm:pb-[66%] md:pb-[64%] lg:pb-[60%]">
          <CldImage
            className="object-cover w-full h-full rounded-xl md:rounded-2xl shadow-img border-[0.75px] border-surface-1/80"
            src={postItem.titleImage || ""}
            fill={true}
            sizes={"(max-width: 1200px) 33vw, 600px"}
            alt={`Beitrags Bild: ${postItem.title}`}
          />
        </div>
        <div className="h-full">
          <div className="space-y-2">
            <span className="block text-xs sm:text-sm text-body">
              {renderFullDate(postItem.publishedAt)}
            </span>
            <H5
              className="text-balance hyphens-auto line-clamp-2" lang={"de"}>
              {postItem.title}
            </H5>
            <B3 className="text-balance hyphens-auto line-clamp-2" lang={"de"}>
              {postItem.summary}</B3>
            <div className="flex gap-x-2 overflow-clip ">
              {postItem.tags?.map((x) => (
                <Badge key={x.id}>
                  {x.title}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function PostListItemViewSkeleton() {
  return (
    <div className="animate-pulse flex w-full">
      <div className="flex flex-col w-full gap-y-6">
        <div className="relative pb-[60%] -my-4 bg-gray-300 rounded-2xl">
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
        </div>
        <div className="mt-4">
          <span className="block text-xs sm:text-sm text-body">
            <div className="h-2 bg-gray-200 rounded-full w-36 mb-4"></div>
          </span>
          <h2 className="text-base sm:text-lg font-semibold break-words mt-2 mb-1 sm:1.5 md:mb-2 lg:mb-3">
            <div className="h-2.5 bg-gray-200 rounded-full w-full mb-2.5"></div>
            <div className="h-2.5 bg-gray-200 rounded-full w-1/2"></div>
          </h2>
          <p className="font-normal text-body text-sm md:text-base tracking-tight">
            <div className="h-2.5 bg-gray-200 rounded-full w-full mb-2.5"></div>
            <div className="h-2.5 bg-gray-200 rounded-full w-1/2"></div>
          </p>
        </div>
        <div className="mt-auto flex gap-2 flex-wrap mb-2">
          <div className="h-4 bg-gray-200 w-20 rounded-full"></div>
          <div className="h-4 bg-gray-200 w-20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
