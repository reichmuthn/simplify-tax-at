import {useTranslations} from "next-intl";
import {HeroLayout} from "@ui/components/layout/hero-layout";
import {Article} from "@ui/components/layout/article";
import {Grid} from "@ui/components/layout/grid";
import {Box} from "@ui/components/layout/box";
import {coreCompetences} from "@/assets/data/messages/home";
import {Link} from "@/components/localeConfig";

export default function Page() {
  const t = useTranslations('HomePage');
  const tCoreCompetences = useTranslations('CoreCompetences');

  return (
    <div>
      <Article className={"bg-surface-2"}>
        <HeroLayout
          subtitle={t("CoreCompetencesArticle.subtitle")}
          title={t("CoreCompetencesArticle.title")}
          description={t("CoreCompetencesArticle.description")}
        />
      </Article>
      <Article>
          <Grid>
            {coreCompetences.map(item => (
              <Box
                title={tCoreCompetences(`${item.messageKey}.title`)}
                description={tCoreCompetences(`${item.messageKey}.description`)}
                Icon={item.Icon}
                key={item.messageKey}
                moreLink={{
                  href: item.href,
                  title: t(`CoreCompetencesArticle.moreLink`)
                }}
                LinkComponent={Link}
              />
            ))}
          </Grid>
      </Article>
    </div>
  )
}