import {useTranslations} from "next-intl";
import {getNewsletterMessages} from "@/assets/data/messages/newsletter";
import {PharmacyOperatingExpensesAdvantage} from "@/assets/data/messages/pharmasists";
import {Article} from "@ui/components/layout/article";
import {HeroLayout} from "@ui/components/layout/hero-layout";
import {ArticleLayout} from "@ui/components/layout/article-layout";
import {Grid} from "@ui/components/layout/grid";
import {Box} from "@ui/components/layout/box";
import {Check} from "@ui/components/icons/ClassicRegularIcons";
import {NewsletterView} from "@ui/components/newsletter/view";
import {getTranslations} from "next-intl/server";
import {generatePageMetadata} from "@/assets/data/sharedMetadata";

export async function generateMetadata({params}: {params: {locale: string;}}) {
  const currentLocale = params.locale;
  const t = await getTranslations("PharmacyOperatingExpensesPage");

  return generatePageMetadata(`/${currentLocale}/betriebsausgaben`, t("HeroArticle.title"), t("HeroArticle.description"));
}

export default function Page() {

  const t = useTranslations('PharmacyOperatingExpensesPage');
  const tNewsletter = useTranslations("Newsletter");

  const newsletterMessages = getNewsletterMessages(tNewsletter);
  return (
    <div>
      <Article className={"bg-surface-2"}>
        <HeroLayout
          subtitle={t("HeroArticle.subtitle")}
          title={t("HeroArticle.title")}
          description={t("HeroArticle.description")}
        />
      </Article>
      <Article>
        <ArticleLayout
          columns={3}
          stickyHeader={true}
          subtitle={t("AdvantagesArticle.subtitle")}
          title={t("AdvantagesArticle.title")}
          description={t("AdvantagesArticle.description")}
        >
          <Grid maxCols={2}>
            {PharmacyOperatingExpensesAdvantage.map(item => (
              <Box
                Icon={Check}
                title={t(`AdvantagesArticle.${item.messageKey}.title`)}
                description={t.rich(`AdvantagesArticle.${item.messageKey}.description`, {
                  ul: (chunks) => <ul>{chunks}</ul>,
                  li: (chunks) => <li>{chunks}</li>,
                  p: (chunks) => <p>{chunks}</p>,
                  b: (chunks) => <b className="font-[540]">{chunks}</b>
                })}
                key={item.messageKey}
              />
            ))}
          </Grid>
        </ArticleLayout>
      </Article>
      <Article className="!pt-0">
        <NewsletterView messages={newsletterMessages}/>
      </Article>
    </div>
  )
}