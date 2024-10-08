import {useTranslations} from "next-intl";
import {HeroLayout} from "@ui/components/layout/hero-layout";
import {Article} from "@ui/components/layout/article";
import {ArticleLayout} from "@ui/components/layout/article-layout";
import {Grid} from "@ui/components/layout/grid";
import {Box} from "@ui/components/layout/box";
import {Check} from "@ui/components/icons/ClassicRegularIcons";
import {contactOptions} from "@/assets/data/messages/home";
import {
  successionPlanningAndBusinessValuationAdvantages
} from "@/assets/data/messages/successionPlanningAndBusinessValuation";
import {Link} from "@/components/localeConfig";
import {getNewsletterMessages} from "@/assets/data/messages/newsletter";
import {getQuoteMessages} from "@/assets/data/messages/quote";
import {QuoteCarousel} from "@ui/components/carousels/quote-carousel/carousel";
import {NewsletterView} from "@ui/components/newsletter/view";
import {partners} from "@/assets/data/messages/partners";
import {CldImage} from "@ui/components/cldImage";
import {getTranslations} from "next-intl/server";
import {generatePageMetadata} from "@/assets/data/sharedMetadata";

export async function generateMetadata({params}: { params: { locale: string; } }) {
  const currentLocale = params.locale;
  const t = await getTranslations("SuccessionPlanningAndBusinessValuationPage");

  return generatePageMetadata(`/${currentLocale}/nachfolgeplanung-und-unternehmensbewertung`, t("HeroArticle.title"), t("HeroArticle.description"));
}

export default function Page() {

  const t = useTranslations('SuccessionPlanningAndBusinessValuationPage');
  const tContact = useTranslations("Contact");
  const tNewsletter = useTranslations("Newsletter");
  const tQuotes = useTranslations("Quotes");

  const newsletterMessages = getNewsletterMessages(tNewsletter);
  const quotes = getQuoteMessages(tQuotes);
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
        >
          <Grid maxCols={2}>
            {successionPlanningAndBusinessValuationAdvantages.map(item => (
              <Box
                Icon={Check}
                title={t(`AdvantagesArticle.${item.messageKey}.title`)}
                description={t(`AdvantagesArticle.${item.messageKey}.description`)}
                key={item.messageKey}
              />
            ))}
          </Grid>
        </ArticleLayout>
      </Article>
      <Article className={"bg-surface-2"}>
        <ArticleLayout
          columns={2}
          subtitle={t("PartnerArticle.subtitle")}
          title={t("PartnerArticle.title")}
          description={t("PartnerArticle.description")}
        >
          <div className={"w-full grid gap-6 md:gap-8 grid-cols-3 h-full content-end items-center"}>
            {partners.map(item => (
              <CldImage key={item.messageKey} src={item.image} alt={item.messageKey} width={300} height={80}
                        className={"max-h-12 max-w-20 sm:max-w-20 md:max-w-24 lg:max-w-32 h-auto w-auto mx-auto"}/>
            ))}
          </div>
        </ArticleLayout>
      </Article>
      <Article>
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
                moreLink={{
                  href: item.href,
                  title: item.linkTitle,
                  noArrow: true
                }}
                LinkComponent={Link}
              />
            ))}
          </Grid>
        </ArticleLayout>
      </Article>
      <article className="w-full bg-surface-2 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <QuoteCarousel quotes={quotes}/>
        </div>
      </article>
      <Article className="">
        <NewsletterView messages={newsletterMessages}/>
      </Article>
    </div>
  )
}