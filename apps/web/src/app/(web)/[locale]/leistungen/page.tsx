import {useTranslations} from "next-intl";
import {HeroLayout} from "@ui/components/layout/hero-layout";
import {Article} from "@ui/components/layout/article";
import {Grid} from "@ui/components/layout/grid";
import {Box} from "@ui/components/layout/box";
import {services} from "@/assets/data/messages/home";
import {Link} from "@/components/localeConfig";

export default function Page() {
  const t = useTranslations('HomePage');
  const tServices = useTranslations("Services");

  return (
    <div>
      <Article className={"bg-surface-2"}>
        <HeroLayout
          subtitle={t('ServicesArticle.subtitle')}
          title={t('ServicesArticle.title')}
          description={t('ServicesArticle.description')}
        />
      </Article>
      <Article>
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
      </Article>
    </div>
  )
}