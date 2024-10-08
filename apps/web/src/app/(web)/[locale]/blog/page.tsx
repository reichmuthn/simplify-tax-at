import {Article} from "@ui/components/layout/article";
import {getNewsletterMessages} from "@/assets/data/messages/newsletter";
import {getTranslations} from "next-intl/server";
import React from "react";
import {ArticleLayout} from "@ui/components/layout/article-layout";
import {PostHeroView} from "@ui/entities/posts/views/client/postHeroView/view";
import {PostListView} from "@ui/entities/posts/views/client/postListView/view";
import {generatePageMetadata} from "@/assets/data/sharedMetadata";
import {NewsletterView} from "@ui/components/newsletter/view";
import {HeroLayout} from "@ui/components/layout/hero-layout";

export function generateMetadata() {
  return generatePageMetadata("/blog", "Finanz- und Steuernews");
}

export default async function BlogPage({
                                         searchParams,
                                       }: {
  searchParams: { [key: string]: string[] | string };
}) {
  const t = await getTranslations("BlogPage");
  const tNewsletter = await getTranslations("Newsletter");
  const newsletterMessages = getNewsletterMessages(tNewsletter);
  return (
    <>
      <Article className="bg-surface-2">
        <>
          <HeroLayout
            subtitle={t("HeroArticle.subtitle")}
            title={t("HeroArticle.title")}
            description={t("HeroArticle.description")}>
          </HeroLayout>
          <PostHeroView/>
        </>
      </Article>
      <Article className="bg-surface-1">
        <ArticleLayout
          columns={1}
          subtitle={t("ListViewArticle.subtitle")}
          className="gap-4 md:gap-4">
            <PostListView searchParams={searchParams} skipItems={1}/>
        </ArticleLayout>
      </Article>
      <Article className="!pt-0">
        <NewsletterView messages={newsletterMessages}/>
      </Article>
    </>
  );
}
