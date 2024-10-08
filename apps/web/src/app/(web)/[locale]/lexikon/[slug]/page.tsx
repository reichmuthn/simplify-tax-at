import React from "react";
import {TermSearchView} from "@ui/entities/terms/views/client/termSearchView/view";
import {getTermDetailsQueryCached, TermDetailsView,} from "@ui/entities/terms/views/client/termDetailView/view";
import {generatePageMetadata} from "@/assets/data/sharedMetadata";
import {Metadata} from "next";
import {Article} from "@ui/components/layout/article";
import {useTranslations} from "next-intl";
import {getNewsletterMessages} from "@/assets/data/messages/newsletter";
import {ArticleLayout} from "@ui/components/layout/article-layout";
import {NewsletterView} from "@ui/components/newsletter/view";

type PageProps = {
  searchParams: { [key: string]: string };
  params: { slug: string };
};

export async function generateMetadata({
                                         params,
                                       }: PageProps): Promise<Metadata> {
  const term = await getTermDetailsQueryCached(params.slug);

  if (!term)
    return generatePageMetadata(
      "/lexikon",
      "Lexikon - Fachbegriffe der Steuerberatung",
    );

  const description = term.description?.substring(0, 140)?.trim() ?? undefined;

  return generatePageMetadata(
    `/lexikon/${term.slug}`,
    `${term.title} - Lexikon`,
    description,
  );
}

export default function Page({searchParams, params}: PageProps) {
  const t = useTranslations("LexiconPage");
  const tNewsletter = useTranslations("Newsletter");
  const newsletterMessages = getNewsletterMessages(tNewsletter);
  return (<>
    <Article className="bg-surface-2">
      <ArticleLayout
        columns={1}
        subtitle={t("HeroArticle.subtitle")}
        title={t("HeroArticle.title")}
        description={t("HeroArticle.description")}>
        <TermSearchView searchParams={searchParams} />
        <TermDetailsView
          searchParams={{...searchParams, begriff: params.slug}}
        />
      </ArticleLayout>
    </Article>
    <Article>
      <NewsletterView messages={newsletterMessages}/>
    </Article>
    </>
  );
}
