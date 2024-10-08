import {Article} from "@ui/components/layout/article";
import {ArticleLayout} from "@ui/components/layout/article-layout";
import {getTranslations} from "next-intl/server";
import {generatePageMetadata} from "@/assets/data/sharedMetadata";
import {useTranslations} from "next-intl";
import {HeroLayout} from "@ui/components/layout/hero-layout";
import {getBookingMultiStepFormMessages} from "@/assets/data/messages/booking";
import {BookingView} from "@ui/components/booking/multi-step-form/view";

export async function generateMetadata({params}: { params: { locale: any; } }) {
  const currentLocale = params.locale;
  const t = await getTranslations("BookingPage");
  return generatePageMetadata(`/${currentLocale}/booking/`, t("HeroArticle.subtitle"), t("HeroArticle.description"));
}

export default function Page() {
  const t = useTranslations('BookingPage');
  const tBooking = useTranslations("Booking");
  const messages = getBookingMultiStepFormMessages(tBooking);

  return (<>
    <Article className={"bg-surface-2"}>
      <HeroLayout
        subtitle={t("HeroArticle.subtitle")}
        displayTitle={t("HeroArticle.title")}
        description={t("HeroArticle.description")}
      />
    </Article>
    <Article className="bg-surface-1">
      <ArticleLayout
        columns={2}
        subtitle={t("BookingArticle.subtitle")}
        title={t("BookingArticle.title")}
        description={t("BookingArticle.description")}>
        <div>
          <BookingView messages={messages}/>
        </div>
      </ArticleLayout>
    </Article>
  </>);
}