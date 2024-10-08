import {Article} from "@ui/components/layout/article";
import {PostTagListView} from "@ui/entities/posts/views/client/postTagList/view";
import {generatePageMetadata} from "@/assets/data/sharedMetadata";
import React from "react";
import {useTranslations} from "next-intl";
import {HeroLayout} from "@ui/components/layout/hero-layout";

export function generateMetadata() {
  return generatePageMetadata("/blog/kategorien", "Kategorien - Blog");
}

export default function BlogCategorySlugPage() {
  const t = useTranslations('BlogCategoriesPage');
  return (
    <>
      <Article className="min-h-screen bg-surface-1">
        <HeroLayout
          subtitle={t("HeroArticle.subtitle")}
          title={t("HeroArticle.title")}
          description={t("HeroArticle.description")}>
        </HeroLayout>
        <PostTagListView/>
      </Article>
    </>
  );
}
