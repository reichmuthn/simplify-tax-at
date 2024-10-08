import {Article} from "@ui/components/layout/article";
import {B2, B3, H2, H4, H5, SubHeading} from "@ui/typography/typography";
import {ArticleLayout} from "@ui/components/layout/article-layout";
import {useTranslations} from "next-intl";
import {getNewsletterMessages} from "@/assets/data/messages/newsletter";
import {Link} from "@/components/localeConfig";
import {CldImage} from "@ui/components/cldImage";
import {NewsletterView} from "@ui/components/newsletter/view";
import React from "react";
import {getTranslations} from "next-intl/server";
import {generatePageMetadata} from "@/assets/data/sharedMetadata";
import {ArticleImage} from "@ui/components/layout/article-image";
import {Button} from "@ui/components/ui-app/button";
import {HeroLayout} from "@ui/components/layout/hero-layout";
import {OpenLink} from "@ui/components/icons/ClassicRegularIcons";

export async function generateMetadata({params}: { params: { locale: string; } }) {
  const currentLocale = params.locale;
  const t = await getTranslations("AboutUsPage");

  return generatePageMetadata(`/${currentLocale}/ueber-uns`, t("HeroArticle.subtitle"), t("HeroArticle.description"));
}

const employees = [
  {
    messageKey: "FatmaSahin",
    src: "simplifytax-at/content/team/Fatma-Sahin",
    href: "mailto:fatma.sahin@simplifytax.at"
  },
  {
    messageKey: "JinwenSong",
    src: "simplifytax-at/content/team/Jinwen-Song",
    href: "mailto:jinwen.song@simplifytax.at"
  },
  {
    messageKey: "SilvieZlateva",
    src: "simplifytax-at/content/team/Silvie-Zlateva",
    href: "mailto:silvie.zlateva@simplifytax.at"
  },
  {
    messageKey: "MarcoElsner",
    src: "simplifytax-at/content/team/Marco-Elsner",
    href: "mailto:marco.elsner@simplifytax.at"
  },
  {
    messageKey: "PatriziaSchuster",
    src: "simplifytax-at/content/team/Patrizia-Schuster",
    href: "mailto:patrizia.schuster@simplifytax.at"
  },
  {
    messageKey: "MajaBogosavljevic",
    src: "simplifytax-at/content/team/Maja-Bogosavljevic",
    href: "mailto:office@simplifytax.at"
  },
  {
    messageKey: "VesnaJokic",
    src: "simplifytax-at/content/team/Vesna-Jokic",
    href: "mailto:office@simplifytax.at"
  },
]
const values = [
  {
    messageKey: "ValueOne",
  },
  {
    messageKey: "ValueTwo",
  },
  {
    messageKey: "ValueThree",
  },
  {
    messageKey: "ValueFour",
  },
  {
    messageKey: "ValueFive",
  },
  {
    messageKey: "ValueSix",
  }
]

export default function Page() {
  const t = useTranslations('AboutUsPage');
  const tNewsletter = useTranslations("Newsletter");
  const newsletterMessages = getNewsletterMessages(tNewsletter);

  return (
    <>
      <Article>
        <>
          <HeroLayout
            subtitle={t("HeroArticle.subtitle")}
            title={t("HeroArticle.title")}
            description={t("HeroArticle.description")}>
          </HeroLayout>
          <ArticleImage src={"simplifytax-at/content/image_openspace"} alt={"Bild Karriere"}/>
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2 block">
                <H4>{t("HeroArticle.BlockOne.title")}</H4>
                <B3>{t("HeroArticle.BlockOne.description")}</B3>
              </div>
              <div className="space-y-2 block">
              <H4>{t("HeroArticle.BlockTwo.title")}</H4>
              <B3>{t("HeroArticle.BlockOne.description")}</B3>
            </div>
            </div>
          </>
        </>
      </Article>
      <Article className="bg-surface-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <H5>{t("NominationArticle.BlockOne.title")}</H5>
            <B3 className="">{t("NominationArticle.BlockOne.description")}<a
              href="https://imwf.at/media/berater2_stamm-1_1.pdf" target="_blank"
              className="inline-flex ml-2"><OpenLink className="size-4 fill-body"/></a></B3>

          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <H5>{t("NominationArticle.BlockTwo.title")}</H5>
              <B3 className="">{t("NominationArticle.BlockTwo.description")}</B3>
            </div>
            <CldImage alt={"Logo YoungCaritas"} src={"simplifytax-at/content/awards/ksw-logo_fmholt"} width={300}
                      height={200} className="w-auto h-6 "/>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <H5>{t("NominationArticle.BlockThree.title")}</H5>
              <B3 className="">{t("NominationArticle.BlockThree.description")}</B3>
            </div>
            <CldImage alt={"Logo YoungCaritas"} src={"simplifytax-at/content/awards/logo_youngcaritas_etwvqa"}
                      width={200} height={200} className="w-auto h-6 "/>
          </div>
        </div>
      </Article>
      <Article className="bg-surface-1">
        <ArticleLayout
          columns={3}
          subtitle={t("TeamArticle.subtitle")}
          title={t("TeamArticle.title")}
          description={t("TeamArticle.description")}>
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4 md:space-y-6">
                <CldImage src={"simplifytax-at/content/team/Dimitar-Zlatev"} alt="Dimitar Zlatev"
                          width={480} height={480}
                          className="rounded-xl md:rounded-2xl shadow-img border-[0.75px] border-surface-1/80 "/>
                <div className="space-y-1">
                  <H5 className="md:text-base">{t("TeamArticle.DimitarZlatev.name")}</H5>
                  <p
                    className="font-medium antialiased text-sm md:text-base text-appPrimary tracking-tight">{t("TeamArticle.DimitarZlatev.position")}</p>
                </div>
              </div>
              <div className="space-y-4 md:space-y-6">
                <CldImage src={"simplifytax-at/content/team/Anna-Moshammer"} alt="Mitarbeiterportrait Anna Moshammer"
                          width={480} height={480}
                          className="rounded-xl md:rounded-2xl shadow-img border-[0.75px] border-surface-1/80 "/>
                <div className="space-y-1">
                  <H5 className="md:text-base">{t("TeamArticle.AnnaPasquale.name")}</H5>
                  <p
                    className="font-medium antialiased text-sm md:text-base text-appPrimary tracking-tight">{t("TeamArticle.AnnaPasquale.position")}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {employees.map(item => (
                <div key={item.messageKey} className="space-y-4 md:space-y-6">
                  <CldImage src={item.src} alt={item.messageKey}
                            width={480} height={480}
                            className="rounded-xl md:rounded-2xl shadow-img border-[0.75px] border-surface-1/80 w-full"/>
                  <div className="space-y-1">
                    <H5 className="md:text-base">{t(`TeamArticle.Employee.${item.messageKey}.name`)}</H5>
                    <p className="font-medium antialiased text-sm md:text-base text-appPrimary tracking-tight">
                      {t(`TeamArticle.Employee.${item.messageKey}.position`)}
                    </p>
                  </div>
                  {/*<a href={item.href}
                     className="inline-flex items-center gap-2 text-xs md:text-sm text-body px-2 py-1.5 border border-body rounded-lg">
                    <Envelope className="w-4 h-4 fill-body"/>{t("TeamArticle.sendLink")}
                  </a>*/}
                </div>
              ))}
            </div>
          </div>
        </ArticleLayout>
      </Article>
      <Article className="bg-surface-2">
        <div className="flex flex-col md:flex-row gap-8 w-full items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <SubHeading>{t("CareerArticle.subtitle")}</SubHeading>
              <div className="space-y-3">
                <H2>{t("CareerArticle.title")}</H2>
                <B2>{t("CareerArticle.description")}</B2>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 ">
              <Button asChild>
                <Link
                  href={"/karriere"}
                  className="">
                  {t("CareerArticle.buttonLinkOne")}
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href={"https://taxfinder.at/arbeitgeber/simplify-tax-steuerberatung-gmbh"}
                  className="">
                  {t("CareerArticle.buttonLinkTwo")}
                </a>
              </Button>
            </div>
          </div>
          <div className="relative h-96 w-full">
            <CldImage src={"simplifytax-at/content/Contents_mamted"} alt={"Office Space"} fill={true}
                      className={"object-contain w-full h-full"}/>
          </div>
        </div>
      </Article >
      <Article className="bg-surface-1">
        <ArticleLayout
          columns={3}
          subtitle={t("ValuesArticle.subtitle")}
          title={t("ValuesArticle.title")}
          description={t("ValuesArticle.description")}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map(item => (
              <div className="space-y-2" key={item.messageKey}>
                <H4>{t(`ValuesArticle.Values.${item.messageKey}.title`)}</H4>
                <B3>{t(`ValuesArticle.Values.${item.messageKey}.description`)}</B3>
              </div>
            ))}
          </div>
        </ArticleLayout>
        <ArticleImage src={"simplifytax-at/content/image_openspace"} alt={"Bild Karriere"}/>
      </Article>
      <Article className="!pt-0">
        <NewsletterView messages={newsletterMessages}/>
      </Article>
    </>
  );
}