import React from "react";
import {redirect} from "next/navigation";
import {Article} from "@ui/components/layout/article";
import {PostListView} from "@ui/entities/posts/views/client/postListView/view";
import {getPostTagDetailsQueryCached} from "@ui/entities/posts/views/client/postTagList/view";
import {generatePageMetadata} from "@/assets/data/sharedMetadata";
import {getCldOgImageUrl} from "next-cloudinary";
import {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import {HeroLayout} from "@ui/components/layout/hero-layout";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({
                                         params,
                                       }: PageProps): Promise<Metadata> {
  const tag = await getPostTagDetailsQueryCached(params.slug);

  if (!tag)
    return generatePageMetadata("/blog/kategorien", "Kategorien - Blog");

  const description = tag.description?.substring(0, 140)?.trim() ?? undefined;
  const imageUrl = tag?.image
    ? getCldOgImageUrl({
      src: tag?.image,
      width: 1200,
      height: 675,
    })
    : undefined;

  return generatePageMetadata(
    `/blog/kategorien/${tag.slug}`,
    `${tag.title} - Kategorien - Blog`,
    description,
    imageUrl,
  );
}

export default async function BlogCategorySlugPage({
                                                     params,
                                                   }: PageProps) {
  const tag = await getPostTagDetailsQueryCached(params.slug);
  const t = await getTranslations('BlogSlugPage');
  if (!tag) {
    redirect("/de/blog");
  }

  return (<>
      <Article className="min-h-screen">
        <HeroLayout
          subtitle={t("HeroArticle.subtitle")}
          title={tag.title}
          description={t("HeroArticle.description")}>
        </HeroLayout>
        <PostListView searchParams={{tag: params.slug}}/>
      </Article>
    </>
  );
}
