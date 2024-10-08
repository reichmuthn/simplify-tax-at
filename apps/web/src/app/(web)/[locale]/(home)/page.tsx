import {Article} from "@ui/components/layout/article";
import {B1, D1, SubHeading} from "@ui/typography/typography";
import {getTranslations} from "next-intl/server";
import {ArticleLayout} from "@ui/components/layout/article-layout";
import {Grid} from "@ui/components/layout/grid";
import {careers, contactOptions, coreCompetences, priciples, services} from "@/assets/data/messages/home";
import {Link} from "@/components/localeConfig";
import {getNewsletterMessages} from "@/assets/data/messages/newsletter";
import {Box} from "@ui/components/layout/box";
import {PostListView} from "@ui/entities/posts/views/client/postListView/view";
import {CldImage} from "@ui/components/cldImage";
import {NewsletterView} from "@ui/components/newsletter/view";
import {partners} from "@/assets/data/messages/partners";
import {CarouselItem} from "@/assets/data/messages/carousel";
import {generatePageMetadata} from "@/assets/data/sharedMetadata";
import {ArticleImage} from "@ui/components/layout/article-image";
import {Button} from "@ui/components/ui-app/button";
import React from "react";
import {GoogleMaps} from "@ui/components/map/googleMaps";

export async function generateMetadata({params}: { params: { locale: string; } }) {
  const currentLocale = params.locale;
  const t = await getTranslations("HomePage");

  return generatePageMetadata(`/${currentLocale}/`, t("HeroArticle.title"), t("HeroArticle.description"));
}

export default async function Page() {
  const t = await getTranslations('HomePage');
  const tServices = await getTranslations("Services");
  const tCoreCompetences = await getTranslations("CoreCompetences");
  const tContact = await getTranslations("Contact");
  const tNewsletter = await getTranslations("Newsletter");
  const newsletterMessages = getNewsletterMessages(tNewsletter);

  return (
    <div>
      <article className="w-full py-16 md:py-20 lg:py-24 bg-surface-2">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center gap-16 md:gap-16">
            <div className="basis-1 md:basis-1/2 ">
              <div className="space-y-4">
                <div className="space-y-2">
                  <SubHeading>{t("HeroArticle.subtitle")}</SubHeading>
                  <D1>{t("HeroArticle.title")}</D1>
                </div>
                <B1>{t("HeroArticle.description")}</B1>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <Button variant="default" asChild>
                  <Link
                    href={"/booking"}
                    className="">
                    {t("HeroArticle.secondaryButton")}
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link
                    href={"/kontakt"}
                    className="">
                    {t("HeroArticle.primaryButton")}
                  </Link>
                </Button>
              </div>
            </div>
            <div className="basis-1 md:basis-1/2">
              <ArticleImage
                src={"simplifytax-at/content/hero"}
                alt={"meeting room at Simplify Tax"}
                className="pb-[100%]"/>
            </div>
          </div>
        </div>
      </article>
      <Article className="bg-surface-1">
        <ArticleLayout
          columns={1}
          alignHeader={"left"}
          subtitle={t("CoreCompetencesArticle.subtitle")}
          title={t("CoreCompetencesArticle.title")}
          description={t("CoreCompetencesArticle.description")}
        >
          <Grid>
            {coreCompetences.map(item => (
              <Box
                title={tCoreCompetences(`${item.messageKey}.title`)}
                description={tCoreCompetences(`${item.messageKey}.description`)}
                Icon={item.Icon}
                key={item.messageKey}
                moreLink={{
                  href: item.href,
                  title: t(`CoreCompetencesArticle.moreLink`)
                }}
                LinkComponent={Link}
              />
            ))}
          </Grid>
        </ArticleLayout>
      </Article>
      <Article className="bg-surface-2">
        <div className="text-center space-y-8">
          <SubHeading>{t("ReferencesArticle.subtitle")}</SubHeading>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 grid-rows-auto gap-x-8 lg:gap-x-16 gap-y-12 justify-items-center content-center items-center place-content-center place-items-center">
            {CarouselItem.map(item => (
              <a key={item.title} href={item.href} target="_blank" className="last:col-span-3 sm:last:col-span-1 cursor-pointer">
                <CldImage src={item.srcURL} title={item.title} className={item.style} width="300" height="100" alt={item.title}/>
              </a>
            ))}
          </div>
        </div>
      </Article>
      <Article className="bg-surface-1">
        <ArticleLayout
          columns={1}
          subtitle={t('ServicesArticle.subtitle')}
          title={t('ServicesArticle.title')}
          description={t('ServicesArticle.description')}
        >
          <Grid>
            {services.map(item => (
              <Box
                title={tServices(`${item.messageKey}.title`)}
                description={tServices(`${item.messageKey}.description`)}
                Icon={item.Icon}
                moreLink={{
                  href: item.href,
                  title: t(`ServicesArticle.moreLink`)
                }}
                LinkComponent={Link}
                key={item.messageKey}
              />
            ))}
          </Grid>
        </ArticleLayout>
      </Article>
      <Article className={"bg-surface-2"}>
        <ArticleLayout
          columns={2}
          subtitle={t("PartnersArticle.subtitle")}
          title={t("PartnersArticle.title")}
          description={t("PartnersArticle.description")}
        >
          <div className={"w-full grid gap-6 md:gap-8 grid-cols-3 h-full content-end items-center"}>
            {partners.map(item => (
              <CldImage key={item.messageKey} src={item.image} alt={item.messageKey} width={300} height={80}
                        className={"max-h-12 max-w-20 sm:max-w-20 md:max-w-24 lg:max-w-32 h-auto w-auto mx-auto"}/>
            ))}
          </div>
        </ArticleLayout>
      </Article>
      <Article className="bg-surface-1">
        <>
          <ArticleLayout
            columns={2}
            subtitle={t("PrinciplesArticle.subtitle")}
            title={t("PrinciplesArticle.title")}
            moreLink={{
              href: "/ueber-uns",
              title: t("PrinciplesArticle.moreLink")
            }}
            LinkComponent={Link}
          >
            <div className={"flex flex-col gap-y-8"}>
              {priciples.map(item => (
                <Box
                  description={t(`PrinciplesArticle.${item.messageKey}.description`)}
                  title={t(`PrinciplesArticle.${item.messageKey}.title`)}
                  key={item.messageKey}
                  unboxed={true}
                />
              ))}
            </div>
          </ArticleLayout>
          <ArticleImage
            src={"simplifytax-at/content/image-reception"}
            alt={"image reception of the Simplify Tax office"}
          />
        </>
      </Article>
      <Article className="bg-surface-1">
        <>
          <ArticleLayout
            columns={1}
            subtitle={tContact("subtitle")}
            title={tContact("title")}
            description={tContact("description")}
          >
            <Grid>
              {contactOptions.map(item => (
                <Box
                  description={tContact(`${item.messageKey}.description`)}
                  title={tContact(`${item.messageKey}.title`)}
                  key={item.messageKey}
                  Icon={item.Icon}
                  textLink={{
                    href: item.href,
                    title: item.linkTitle,
                  }}
                  LinkComponent={Link}
                />
              ))}
            </Grid>
          </ArticleLayout>
          <div className="relative pb-[45%] min-h-64">
            <div
              className="w-full absolute h-full rounded-xl md:rounded-2xl shadow-img border-[0.75px] border-surface-1/80 overflow-hidden">
              <GoogleMaps/>
            </div>
          </div>
        </>
      </Article>
      <Article className={"bg-surface-2"}>
        <>
          <ArticleLayout
            columns={2}
            subtitle={t("CareersArticle.subtitle")}
            title={t("CareersArticle.title")}
            moreLink={{
              href: "/karriere",
              title: t("CareersArticle.moreLink")
            }}
            LinkComponent={Link}
          >
            <div className={"flex flex-col gap-10"}>
              {careers.map(item => (
                <Box
                  description={t(`CareersArticle.${item.messageKey}.description`)}
                  title={t(`CareersArticle.${item.messageKey}.title`)}
                  key={item.messageKey}
                  unboxed={true}
                />
              ))}
            </div>
          </ArticleLayout>
          <ArticleImage src={"simplifytax-at/content/image_openspace"} alt={"open space desks at simplify tax"}/>
        </>
      </Article>
      <Article className={"bg-surface-1"}>
        <ArticleLayout
          columns={1}
          subtitle={t("BlogArticle.subtitle")}
          title={t("BlogArticle.title")}
          description={t("BlogArticle.description")}
        >
          <div className="block">
            <PostListView searchParams={{limit: "3"}} hidePagination={true}/>
          </div>
        </ArticleLayout>
      </Article>
      <Article className="!pt-0">
        <NewsletterView messages={newsletterMessages}/>
      </Article>
    </div>
  );
}