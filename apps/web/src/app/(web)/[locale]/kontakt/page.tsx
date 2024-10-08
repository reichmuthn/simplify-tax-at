import {Article} from "@ui/components/layout/article";
import {useTranslations} from "next-intl";
import {ArticleLayout} from "@ui/components/layout/article-layout";
import {Grid} from "@ui/components/layout/grid";
import {contactOptions} from "@/assets/data/messages/home";
import {Box} from "@ui/components/layout/box";
import {Link} from "@/components/localeConfig";
import {getNewsletterMessages} from "@/assets/data/messages/newsletter";
import {NewsletterView} from "@ui/components/newsletter/view";
import {getTranslations} from "next-intl/server";
import {generatePageMetadata} from "@/assets/data/sharedMetadata";
import {getBookingMultiStepFormMessages} from "@/assets/data/messages/booking";
import {BookingView} from "@ui/components/booking/multi-step-form/view";
import {GoogleMaps} from "@ui/components/map/googleMaps";
import React from "react";

export async function generateMetadata({params}: { params: { locale: string; } }) {
  const currentLocale = params.locale;
  const t = await getTranslations("Contact");

  return generatePageMetadata(`/${currentLocale}/kontakt`, t("subtitle"), t("description"));
}

export default function Page() {
  const tContact = useTranslations("Contact");
  const tNewsletter = useTranslations("Newsletter");
  const newsletterMessages = getNewsletterMessages(tNewsletter);
  const tBooking = useTranslations("Booking");
  const messages = getBookingMultiStepFormMessages(tBooking);
  const tBookingPage = useTranslations("BookingPage");

  return (<>
    <Article>
      <>
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
                textLink={{
                  href: item.href,
                  title: item.linkTitle,
                }}
                LinkComponent={Link}
              />
            ))}
          </Grid>
        </ArticleLayout>
        <div className="relative pb-[45%] min-h-64">
          <div
            className="w-full absolute h-full rounded-xl md:rounded-2xl shadow-img border-[0.75px] border-surface-1/80 overflow-hidden">
            <GoogleMaps/>
          </div>
        </div>
      </>
    </Article>
    <Article className="bg-surface-1">
      <ArticleLayout
        columns={2}
        subtitle={tBookingPage("BookingArticle.subtitle")}
        title={tBookingPage("BookingArticle.title")}
        description={tBookingPage("BookingArticle.description")}>
        <BookingView messages={messages} />
      </ArticleLayout>
    </Article>
    <Article className="">
      <NewsletterView messages={newsletterMessages}/>
    </Article>
  </>);
}