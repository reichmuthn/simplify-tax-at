import {Article} from "@ui/components/layout/article";
import {useTranslations} from "next-intl";
import {HeroLayout} from "@ui/components/layout/hero-layout";
import {getNewsletterMessages} from "@/assets/data/messages/newsletter";
import {NewsletterView} from "@ui/components/newsletter/view";
import {getTranslations} from "next-intl/server";
import {generatePageMetadata} from "@/assets/data/sharedMetadata";

export async function generateMetadata({params}: { params: { locale: string; } }) {
  const currentLocale = params.locale;
  const t = await getTranslations("NewsletterPage");

  return generatePageMetadata(`/${currentLocale}/newsletter`, t("HeroArticle.subtitle"), t("HeroArticle.description"));
}

export default function Page() {
  const t = useTranslations('NewsletterPage');
  const tNewsletter = useTranslations("Newsletter");
  const newsletterMessages = getNewsletterMessages(tNewsletter);

  return (<>
    <Article className={"bg-surface-2"}>
      <HeroLayout
        subtitle={t("HeroArticle.subtitle")}
        title={t("HeroArticle.title")}
        description={t("HeroArticle.description")}
      />
    </Article>
    <Article>
      <NewsletterView messages={newsletterMessages}/>
    </Article>
  </>)
}