import {Article} from "@ui/components/layout/article";
import {HeroLayout} from "@ui/components/layout/hero-layout";
import {useTranslations} from "next-intl";
import {B3, H5} from "@ui/typography/typography";
import {generatePageMetadata} from "@/assets/data/sharedMetadata";
import {getTranslations} from "next-intl/server";

export async function generateMetadata({params}: {params: {locale: string;}}) {
  const currentLocale = params.locale;
  const t = await getTranslations("ImprintPage");

  return generatePageMetadata(`/${currentLocale}/impressum`, t("HeroArticle.title"), t("HeroArticle.description"));
}

export default function Page() {
  const t = useTranslations('ImprintPage');
  return (<>
    <Article className={"bg-surface-2"}>
      <HeroLayout
        subtitle={t("HeroArticle.subtitle")}
        title={t("HeroArticle.title")}
        description={t("HeroArticle.description")}
      />
    </Article>
    <Article>
      <div className="space-y-8">
        <div className="space-y-2">
          <H5>{t("CompanyOwner.title")}</H5>
          <B3>{t("CompanyOwner.CompanyName")}</B3>
          <B3>{t("CompanyOwner.Street")}</B3>
          <B3>{t("CompanyOwner.ZIPCode")}</B3>
        </div>
        <div className="space-y-1">
          <H5>{t("ContactInformation.title")}</H5>
          <div className="flex gap-2">
            <B3>{t("ContactInformation.Landline.title")}</B3>
            <B3>{t("ContactInformation.Landline.description")}</B3>
          </div>
          <div className="flex gap-2">
            <B3>{t("ContactInformation.Mobile.title")}</B3>
            <B3>{t("ContactInformation.Mobile.description")}</B3>
          </div>
          <div className="flex gap-2">
            <B3>{t("ContactInformation.Email.title")}</B3>
            <B3>{t("ContactInformation.Email.description")}</B3>
          </div>
        </div>
        <div className="space-y-1">
        <H5>{t("CompanyDirector.title")}</H5>
          <B3>{t("CompanyDirector.description")}</B3>
        </div>
        <div className="space-y-1">
          <H5>{t("CompanyHeadquarters.title")}</H5>
          <B3>{t("CompanyHeadquarters.description")}</B3>
        </div>
        <div className="space-y-1">
          <H5>{t("CompanyRegistrationNumber.title")}</H5>
          <B3>{t("CompanyRegistrationNumber.description")}</B3>
        </div>
        <div className="space-y-1">
          <H5>{t("VATNumber.title")}</H5>
          <B3>{t("VATNumber.description")}</B3>
        </div>
        <div className="space-y-1">
          <H5>{t("Chamber.title")}</H5>
          <B3>{t("Chamber.description")}</B3>
        </div>
        <div className="space-y-1">
          <H5>{t("CorporatePurpose.title")}</H5>
          <B3>{t("CorporatePurpose.description")}</B3>
        </div>
        <div className="space-y-1">
          <H5>{t("DevelopedBy.title")}</H5>
          <B3><a href="https://angelstone.at" target="_blank">{t("DevelopedBy.description")}</a></B3>
        </div>
        <div className="space-y-1">
          <H5>{t("Liability.title")}</H5>
          <B3>{t("Liability.description")}</B3>
        </div>
      </div>
    </Article>
  </>)
}