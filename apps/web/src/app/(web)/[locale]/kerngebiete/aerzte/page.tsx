import {useTranslations} from "next-intl";
import {HeroLayout} from "@ui/components/layout/hero-layout";
import {Article} from "@ui/components/layout/article";
import {ArticleLayout} from "@ui/components/layout/article-layout";
import {Grid} from "@ui/components/layout/grid";
import {Box} from "@ui/components/layout/box";
import {Check} from "@ui/components/icons/ClassicRegularIcons";
import {getNewsletterMessages} from "@/assets/data/messages/newsletter";
import {Link} from "@/components/localeConfig";
import {doctorsAdvantage} from "@/assets/data/messages/doctors";
import {NewsletterView} from "@ui/components/newsletter/view";
import {getTranslations} from "next-intl/server";
import {generatePageMetadata} from "@/assets/data/sharedMetadata";

export async function generateMetadata({params}: {params: {locale: string;}}) {
  const currentLocale = params.locale;
  const t = await getTranslations("DoctorsPage");

  return generatePageMetadata(`/${currentLocale}/aerzte`, t("HeroArticle.title"), t("HeroArticle.description"));
}

export default function Page() {

  const t = useTranslations('DoctorsPage');
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
          subtitle={t("BlockArticle.subtitle")}
          title={t("BlockArticle.title")}
          description={t("BlockArticle.description")}
        >
          <Grid maxCols={2}>
            {doctorsAdvantage.map(item => (
              <Box
                Icon={Check}
                title={t(`BlockArticle.${item.messageKey}.title`)}
                description={t(`BlockArticle.${item.messageKey}.description`)}
                key={item.messageKey}
                moreLink={{
                  href: item.href,
                  title: t(`BlockArticle.moreLink`)
                }}
                LinkComponent={Link}
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