import {useTranslations} from "next-intl";
import {HeroLayout} from "@ui/components/layout/hero-layout";
import {Article} from "@ui/components/layout/article";
import {ArticleLayout} from "@ui/components/layout/article-layout";
import {Grid} from "@ui/components/layout/grid";
import {Box} from "@ui/components/layout/box";
import {Check} from "@ui/components/icons/ClassicRegularIcons";
import {eCommerceAdvantage} from "@/assets/data/messages/eCommerce";
import {getNewsletterMessages} from "@/assets/data/messages/newsletter";
import {Link} from "@/components/localeConfig";
import {NewsletterView} from "@ui/components/newsletter/view";
import {Breadcrumbs} from "@/components/Breadcrumbs";

export default function Page() {

  const t = useTranslations('ECommercePage');
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
{/*      <div className="bg-surface-3">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Breadcrumbs
            items={[
              {href: "/", label: "Home"},
              {href: "/kerngebiete", label: "Kerngebiete"},
              {label: "E-Commerce"},
            ]}
          />
        </div>
      </div>*/}
      <Article>
        <ArticleLayout
          columns={3}
          stickyHeader={true}
          subtitle={t("BlockArticle.subtitle")}
          title={t("BlockArticle.title")}
          description={t("BlockArticle.description")}
        >
          <Grid maxCols={2}>
            {eCommerceAdvantage.map(item => (
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