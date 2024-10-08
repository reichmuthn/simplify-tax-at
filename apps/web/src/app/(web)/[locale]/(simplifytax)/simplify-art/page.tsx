import {Article} from "@ui/components/layout/article";
import {HeroLayout} from "@ui/components/layout/hero-layout";
import {useTranslations} from "next-intl";
import {B2, H2, SubHeading} from "@ui/typography/typography";
import {CldImage} from "@ui/components/cldImage";
import {getTranslations} from "next-intl/server";
import {generatePageMetadata} from "@/assets/data/sharedMetadata";

export async function generateMetadata({params}: { params: { locale: string; } }) {
  const currentLocale = params.locale;
  const t = await getTranslations("SimplifyArtPage");

  return generatePageMetadata(`/${currentLocale}/simplify-art`, t("HeroArticle.subtitle"), t("HeroArticle.description"));
}

export default function Page() {

  const t = useTranslations('SimplifyArtPage');

  return (<>
    <Article className={"bg-surface-2"}>
      <HeroLayout
        subtitle={t("HeroArticle.subtitle")}
        title={t("HeroArticle.title")}
        description={t("HeroArticle.description")}
      />
    </Article>
    <Article>
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div className="basis-1/2 space-y-4">
          <div className="space-y-2">
            <SubHeading>{t("SectionOne.subtitle")}</SubHeading>
            <H2>{t("SectionOne.title")}</H2>
          </div>
          <B2>{t("SectionOne.description")}</B2>
        </div>
        <div className="relative pb-[77%] md:pb-[37%] w-full md:w-1/2">
          <CldImage fill={true} className={"w-full h-full object-cover border border-white/80 shadow-img rounded-[2px]"}
                    sizes={"600px"}
                    src={"simplifytax-at/content/simplify-art-1"} alt={"Abstract art by Antje Liemann"}/>
        </div>
      </div>
    </Article>
    <Article>
      <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16">
        <div className="relative pb-[77%] md:pb-[37%] w-full md:w-1/2">
          <CldImage fill={true}
                    className={"w-full h-full object-cover border border-white/80 shadow-image rounded-[2px]"}
                    sizes={"600px"}
                    src={"simplifytax-at/content/simplify-art-2"} alt={"Abstract art by Antje Liemann"}/>
        </div>
        <div className="basis-1/2 space-y-4">
          <div className="space-y-2">
            <SubHeading>{t("SectionTwo.subtitle")}</SubHeading>
            <H2>{t("SectionTwo.title")}</H2>
          </div>
          <B2>{t("SectionTwo.description")}</B2>
        </div>
      </div>
    </Article>
  </>)
}