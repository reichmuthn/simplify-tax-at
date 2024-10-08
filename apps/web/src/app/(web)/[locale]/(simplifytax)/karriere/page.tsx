import {Article} from "@ui/components/layout/article";
import {useTranslations} from "next-intl";
import {getNewsletterMessages} from "@/assets/data/messages/newsletter";
import {HeroLayout} from "@ui/components/layout/hero-layout";
import {ArticleLayout} from "@ui/components/layout/article-layout";
import {features} from "@/assets/data/messages/home";
import {Grid} from "@ui/components/layout/grid";
import {Box} from "@ui/components/layout/box";
import {B2, H2, SubHeading} from "@ui/typography/typography";
import React from "react";
import Script from "next/script";
import {getTranslations} from "next-intl/server";
import {generatePageMetadata} from "@/assets/data/sharedMetadata";
import {ArticleImage} from "@ui/components/layout/article-image";
import {Button} from "@ui/components/ui-app/button";

export async function generateMetadata({params}: { params: { locale: string; } }) {
  const currentLocale = params.locale;
  const t = await getTranslations("CareerPage");

  return generatePageMetadata(`/${currentLocale}/karriere`, t("HeroArticle.subtitle"), t("HeroArticle.description"));
}

export default function Page() {

  const t = useTranslations('CareerPage');
  const tNewsletter = useTranslations("Newsletter");
  const newsletterMessages = getNewsletterMessages(tNewsletter);

  return (<>
    <Article className="bg-surface-2">
      <>
        <HeroLayout
          alignHeader={"left"}
          subtitle={t("HeroArticle.subtitle")}
          title={t("HeroArticle.title")}
          description={t("HeroArticle.description")}
        />
        <ArticleImage src={"simplifytax-at/content/image_openspace"} alt={"office space"}/>
        <div className="space-y-4">
          <SubHeading className="">{t("JobAdvertismentArticle.subtitle")}</SubHeading>
          <style>{`#TaxFinder{margin-left:0 !important;margin-right:0 !important;}`}</style>
          <div
            id="TaxFinder"
            data-type="employerId"
            data-filter="cln3bg7ri0000mq0fwivf6dp1"
            data-bg="fafafa"
            data-primary="58A709"
            data-padding="none"
          ></div>
          <Script src={"https://taxfinder.at/js/iframe.min.js"}></Script>
        </div>
      </>
    </Article>
    <Article>
      <ArticleLayout
        columns={3}
        subtitle={t("SimplifyTaxFeaturesArticle.subtitle")}
        title={t("SimplifyTaxFeaturesArticle.title")}
        description={t("SimplifyTaxFeaturesArticle.description")}
      >
        <Grid maxCols={2}>
          {features.map(item => (
            <Box
              title={t(`SimplifyTaxFeaturesArticle.${item.messageKey}.title`)}
              description={t(`SimplifyTaxFeaturesArticle.${item.messageKey}.description`)}
              key={t(`SimplifyTaxFeaturesArticle.${item.messageKey}.key`)}
              unboxed={true}
            />
          ))}
        </Grid>
      </ArticleLayout>
    </Article>
    <Article className="!pt-0">
      <div className="bg-surface-2 rounded-xl md:rounded-2xl border-[0.75px] border-surface-1/80 shadow-img px-6 py-6 md:p-10 lg:p-16">
        <div className="items-end justify-between gap-16 lg:flex lg:gap-24">
          <div className="w-full text-left">
            <div className="space-y-4">
              <div className="space-y-2">
                <SubHeading>{t("CTAArticle.subtitle")}</SubHeading>
                <H2>{t("CTAArticle.title")}</H2>
              </div>
              <B2>{t("CTAArticle.description")}</B2>
            </div>
          </div>
          <div className="w-full mt-8 lg:mt-0 ">
            <div className="flex flex-col md:flex-row gap-4 lg:justify-end">
              <Button asChild>
                <a
                  href={"https://taxfinder.at/arbeitgeber/simplify-tax-steuerberatung-gmbh"}
                  className="">
                  {t("CTAArticle.buttonPrimary")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Article>
  </>)
}