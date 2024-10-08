import React from "react";
import { Metadata } from "next";
import { generatePageMetadata } from "@/assets/data/sharedMetadata";
import {
  getPostDetailsQueryCached,
  PostDetailView,
} from "@ui/entities/posts/views/client/postDetailView/view";
import { getCldOgImageUrl } from "next-cloudinary";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({
                                         params,
                                       }: PageProps): Promise<Metadata> {
  const post = await getPostDetailsQueryCached(params.slug);

  if (!post) return generatePageMetadata("/blog", "Blog - Ihr Steuer- und Finanzratgeber");

  const description = post.summary?.substring(0, 140)?.trim() ?? undefined;
  const imageUrl = post?.titleImage
    ? getCldOgImageUrl({
      src: post?.titleImage,
      width: 1200,
      height: 675,
    })
    : undefined;

  return generatePageMetadata(
    `/blog/${post?.slug}`,
    `${post.title} - Blog`,
    description,
    imageUrl,
  );
}

export default function Page({ params }: PageProps) {
  return (
    <div>
      <PostDetailView postSlug={params.slug} />
    </div>
  );
}
