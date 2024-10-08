import Header from "../../../components/Header";
import React from "react";
import Footer from "@/components/Footer";
import {Metadata} from "next";
import "@ui/globals.css";
import {Analytics} from "@vercel/analytics/react";
import {Montserrat} from "next/font/google";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import {useTranslations} from "next-intl";
import {coreCompetences, services} from "@/assets/data/messages/home";
import {aboutUsLinks, resourcesLinks} from "@/assets/data/messages/navigation";

const asmFont = Montserrat({weight: "variable", subsets: ['latin'], display: "swap", variable: "--font-sans"});

export const metadata: Metadata = {
  robots: {
    index: true,
  },
};

export default function LocaleLayout({
                                       children,
                                       params: {locale}
                                     }: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const t = useTranslations("Navigation");
  const tServices = useTranslations("Services");
  const tCoreCompetences = useTranslations("CoreCompetences");

  const serviceLinks = services.map(item => ({
    title: tServices(`${item.messageKey}.title`),
    href: item.href,
    messageKey: item.messageKey
  }));

  const serviceLinkConfig = {
    title: t("Services.dropdownButton"),
    items: serviceLinks,
    actions: [],
  };

  const coreCompetenceLinks = coreCompetences.map(item => ({
    title: tCoreCompetences(`${item.messageKey}.title`),
    href: item.href,
    messageKey: item.messageKey
  }));

  const coreCompetenceLinkConfig = {
    title: t("CoreCompetences.dropdownButton"),
    items: coreCompetenceLinks,
    actions: [],
  };

  const aboutUsLinkConfig = {
    title: t("AboutUs.dropdownButton"),
    items: aboutUsLinks.map(item => ({
      title: t(`AboutUs.Links.${item.messageKey}.title`),
      description: t(`AboutUs.Links.${item.messageKey}.description`),
      moreLink: t(`AboutUs.Links.${item.messageKey}.moreLink`),
      href: item.href,
      messageKey: item.messageKey
    })),
    actions: [],
  };

  const resourcesLinkConfig = {
    title: t("Resources.dropdownButton"),
    items: resourcesLinks.map(item => ({
      title: t(`Resources.Links.${item.messageKey}.title`),
      description: t(`Resources.Links.${item.messageKey}.description`),
      moreLink: t(`Resources.Links.${item.messageKey}.moreLink`),
      href: item.href,
      messageKey: item.messageKey
    })),
    actions: [],
  }

  const contactLinkConfig = {
    title: t("Contact.title"),
    items: [],
    actions: [],
  }

  return (
    <html lang={locale} className={`${asmFont.variable}`}>
    <body>
    <Header serviceLinkConfig={serviceLinkConfig} coreCompetenceLinkConfig={coreCompetenceLinkConfig}
            aboutUsLinkConfig={aboutUsLinkConfig}
            resourcesLinkConfig={resourcesLinkConfig} contactLinkConfig={contactLinkConfig}>{<LocaleSwitcher/>}</Header>
    <main className="pt-[49px] md:pt-[65px] min-h-screen">
      {children}
    </main>
    <Footer/>
    <Analytics/></body>
    </html>
  );
}