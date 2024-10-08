import {TermListView} from "@ui/entities/terms/views/client/termListView/view";
import React from "react";
import {TermSearchView} from "@ui/entities/terms/views/client/termSearchView/view";
import {getTermDetailsQueryCached, TermDetailsView,} from "@ui/entities/terms/views/client/termDetailView/view";
import {generatePageMetadata} from "@/assets/data/sharedMetadata";
import {Metadata} from "next";
import {Article} from "@ui/components/layout/article";
import {ArticleLayout} from "@ui/components/layout/article-layout";
import {NewsletterView} from "@ui/components/newsletter/view";
import {getNewsletterMessages} from "@/assets/data/messages/newsletter";
import {useTranslations} from "next-intl";

type PageProps = {
  searchParams: { [key: string]: string };
};

export async function generateMetadata({
                                         searchParams,
                                       }: PageProps): Promise<Metadata> {
  if (!searchParams["begriff"])
    return generatePageMetadata(
      "/lexikon",
      "Lexikon - Fachbegriffe der Steuerberatung",
    );

  const term = await getTermDetailsQueryCached(searchParams["begriff"]);

  if (!term) return generatePageMetadata("/lexikon", "Lexikon");

  const description = term.description?.substring(0, 140)?.trim() ?? undefined;

  return generatePageMetadata(
    `/lexikon/${term.slug}`,
    `${term.title} - Lexikon`,
    description,
  );
}


export default function Page({searchParams}: PageProps) {
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
          <TermSearchView searchParams={searchParams}/>
          <div className={"flex gap-4"}>
            <div className={"flex-1"}>
              <TermListView searchParams={searchParams}/>
            </div>
            {searchParams["begriff"] && (
              <div className={"md:basis-2/3"}>
                <TermDetailsView searchParams={searchParams}/>
              </div>
            )}
          </div>
        </ArticleLayout>
      </Article>
      <Article>
        <NewsletterView messages={newsletterMessages}/>
      </Article>
    </>
  );
}
