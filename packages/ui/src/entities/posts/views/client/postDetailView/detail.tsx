import { getPostDetailsQuery } from "@app/entities/posts/queries/getPostDetails/query";
import React from "react";
import { renderFullDateWithWeekday } from "@ui/lib/utils";
import Link from "next/link";
import { Badge } from "@ui/components/ui-app/badge";
import { CldImage } from "@ui/components/cldImage";
import { SectionFull } from "@ui/components/layout/section";
import { Author } from "@ui/entities/posts/views/client/postDetailView/author";
import { ProgressBar } from "@ui/components/progress-bar/progress-bar";
import { PostContent } from "@ui/entities/posts/views/client/postDetailView/content";

type PostDetailProps = {
  postDetail: ReturnType<typeof getPostDetailsQuery>;
};

export function PostDetail({ postDetail }: PostDetailProps) {
  const data = React.use(postDetail);

  if (!data) return null;

  const post = data;

  return (
    <>
      <ProgressBar referenceSection={"#blog-post"} />
      <SectionFull>
        <div
          className="bg-white shado-img flex flex-col rounded-2xl"
          id="blog-post"
        >
          <div className="sm:-mt-8 pb-[40%] relative rounded-b-2xl sm:rounded-2xl block">
            <CldImage
              className="absolute w-full h-full object-cover rounded-b-2xl sm:rounded-2xl"
              src={post.titleImage ?? "lf-bg-2.png"}
              fill={true}
              priority={true}
              sizes="(max-width: 1200px) 100vw, 1200px"
              alt={`Beitrags Bild: ${post.title}`}
            />
          </div>
          <div className="p-4 md:p-8 flex flex-col gap-6">
            <div className="break-word">
              <span className="block text-xs sm:text-sm">
                {renderFullDateWithWeekday(post.publishedAt)}
              </span>
              <h1 className="text-display break-words text-lg md:text-xl lg:text-2xl font-semibold mt-4">
                {post.title}
              </h1>
              <div className="flex gap-4 mt-4 sm:mt-6 flex-wrap">
                {post.tags?.map((x: any) => (
                  <Link key={x.slug} href={`/de/blog/kategorien/${x.slug}`}>
                    <Badge>{x.title}</Badge>
                  </Link>
                ))}
              </div>
            </div>
            <section className="break-words">
              <PostContent jsonContent={post?.content ?? ""} />
            </section>
            {post.author && (
              <Author
                imageSrc={post.author.image || "avatar.svg"}
                title={post.author.title}
                position={post.author?.position}
                description={post.author?.description}
                socialLinks={post.author.socialLinks?.split(";") || []}
              />
            )}
          </div>
        </div>
      </SectionFull>
    </>
  );
}

export function PostDetailsSkeleton() {
  return (
    <SectionFull>
      <div
        className="animate-pulse bg-white shadow-img flex flex-col rounded-2xl"
        id="blog-post"
      >
        <div className="sm:-mt-8 pb-[40%] bg-gray-300 relative rounded-b-2xl sm:rounded-2xl block">
          <svg
            className="w-12 h-12 text-gray-200 absolute top-0 bottom-0 left-0 right-0 m-auto"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 640 512"
          >
            <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
          </svg>
        </div>
        <div className="p-4 md:p-8 flex flex-col gap-6">
          <div className="break-word">
            <span className="block text-xs sm:text-sm">
              <div className="h-2 bg-gray-200 rounded-full w-36 mb-4"></div>
            </span>
            <h1 className="break-words text-lg md:text-xl lg:text-2xl font-semibold mt-4">
              <div className="h-4 bg-gray-200 rounded-full w-full mb-2.5"></div>
              <div className="h-4 bg-gray-200 rounded-full w-1/2 mb-4"></div>
            </h1>
            <div className="flex gap-4 mt-4 sm:mt-6 flex-wrap">
              <div className="h-4 bg-gray-200 w-20 rounded-full"></div>
              <div className="h-4 bg-gray-200 w-20 rounded-full"></div>
            </div>
          </div>
          <section className="break-words">
            <div className="w-full">
              <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full max-w-[440px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full max-w-[460px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
              <div className="h-2.5 bg-gray-200 rounded-full w-48 mt-4"></div>
              <div className="h-2.5 bg-gray-200 rounded-full w-48 mt-2"></div>
            </div>
            <div className="w-full mt-8">
              <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full max-w-[440px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full max-w-[460px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
              <div className="h-2.5 bg-gray-200 rounded-full w-48 mt-4"></div>
              <div className="h-2.5 bg-gray-200 rounded-full w-48 mt-2"></div>
            </div>
          </section>
        </div>
      </div>
    </SectionFull>
  );
}
