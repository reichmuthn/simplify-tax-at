import {Link} from "./localeConfig";
import {useTranslations} from "next-intl";
import {LogoFull} from "@ui/components/icons/Logos";
import {Facebook, Instagram, LinkedIn} from "@ui/components/icons/brand-icons";

export default function Footer() {
  const t = useTranslations("FooterNavigation");

  return (<>
      <article className="w-full pt-10 lg:pt-16 pb-8 lg:pb-12 bg-surface-2">
        <div className="max-w-content mx-auto px-4 md:px-8">
          <div className="flex flex-col gap-y-16 justify-between items-start">
            <LogoFull className="w-auto h-8 lg:h-10"/>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-6">
              <div className="space-y-4">
                <div className="text-appPrimary text-xs font-semibold hyphens-auto tracking-tight">{t("expertise")}</div>
                <div className="text-body text-[11px] font-medium flex flex-col gap-y-2 hyphens-auto tracking-tight">
                  <Link href={"/kerngebiete/e-commerce"}>{t("eCommerce")}</Link>
                  <Link href={"/kerngebiete/start-ups"}>{t("startUps")}</Link>
                  <Link
                    href={"/kerngebiete/immobilien"}>{t("realEstate")}</Link>
                  <Link href={"/kerngebiete/aerzte"}>{t("doctors")}</Link>
                  <Link href={"/kerngebiete/apotheker"}>{t("pharmacy")}</Link>
                  <Link href={"/kerngebiete/hotels-und-gastronomie"}>{t("hotelsGastronomy")}</Link>
                  <Link
                    href={"/kerngebiete/klassische-steuerberatung"}>{t("classicTaxAdvice")}</Link>
                  <Link
                    href={"/kerngebiete/rechtsformwahl-und-umstrukturierung"}>{t("choiceOfLegalFormRestructuring")}</Link>
                  <Link
                    href={"/kerngebiete/content-creator-influencer-esportler"}>{t("contentCreatorInfluencerESports")}</Link>
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-appPrimary text-xs font-semibold hyphens-auto tracking-tight">{t("services")}</div>
                <div className="text-body text-[11px] font-medium flex flex-col gap-y-2  hyphens-auto tracking-tight">
                  <Link href={"/leistungen/finanzbuchhaltung"}>{t("financialAccounting")}</Link>
                  <Link href={"/leistungen/personalverrechnung"}>{t("payrollAccounting")}</Link>
                  <Link
                    href={"/leistungen/jahresabschluss-und-bilanzierung"}>{t("annualFinancialStatementsAndAccounting")}</Link>
                  <Link href={"/leistungen/steuererklaerung"}>{t("taxReturns")}</Link>
                  <Link href={"/leistungen/beratung-in-steuerlichen-belangen"}>{t("adviceOnTaxMatters")}</Link>
                  <Link href={"/leistungen/betriebswirtschaftliche-beratung"}>{t("businessAdvice")}</Link>
                  <Link
                    href={"/leistungen/nachfolgeplanung-und-unternehmensbewertung"}>{t("successionPlanningAndBusinessValuation")}</Link>
                  <Link
                    href={"/leistungen/steuerberatung-bei-internationalen-sachverhalten"}>{t("taxAdviceOnInternationalMatters")}</Link>
                  <Link
                    href={"/leistungen/beratung-und-unterstuetzung-in-fragen-des-finanzstrafrechts"}>{t("adviceInFinancialCriminalLaw")}</Link>
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-appPrimary text-xs font-semibold hyphens-auto tracking-tight">{t("simplifyTax")}</div>
                <div className="text-body text-[11px] font-medium flex flex-col gap-y-2 hyphens-auto tracking-tight">
                  <Link href={"/ueber-uns"}>{t("aboutUs")}</Link>
                  <Link href={"/karriere"}>{t("career")}</Link>
                  <Link href={"/simplify-art"}>{t("simplifyArt")}</Link>
                  <Link href={"/kontakt"}>{t("contact")}</Link>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-appPrimary text-xs font-semibold hyphens-auto tracking-tight">{t("resources")}</div>
                <div className="text-body text-[11px] font-medium flex flex-col gap-y-2 hyphens-auto tracking-tight">
                  <Link href="https://simplifytax.iurio.com">{t("iurio")}</Link>
                  <Link href={"/lexikon"}>{t("lexicon")}</Link>
                  <Link href={"/blog"}>{t("blog")}</Link>
                  <Link href={"/newsletter"}>{t("newsletter")}</Link>
                  <Link href={"/booking"}>{t("booking")}</Link>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-appPrimary text-xs font-semibold hyphens-auto tracking-tight">{t("legal")}</div>
                <div className="text-body text-[11px] font-medium flex flex-col gap-y-2 hyphens-auto tracking-tight">
                  <Link href={"/impressum"}>{t("imprint")}</Link>
                  <a href="/simplify-tax-datenschutzerklärung-für-klienten-2018.pdf"
                     target={"_blank"}>{t("dataPolicy")}</a>
                  <a href="/simplify-tax-aab-2018.pdf" target={"_blank"}>{t("aab")}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <article className="w-full py-4 md:py-4 lg:py-6 bg-appPrimary">
        <div className="max-w-content mx-auto px-4 md:px-8">
          <div className="flex flex-row justify-between items-center">
            <div className="text-onPrimary text-xs md:text-sm">© 2024 Simplify Tax</div>
            <div className="flex flex-row gap-x-4">
              <a href="https://www.linkedin.com/company/simplifytaxsteuerberatung" target="_blank"
                 className="cursor-pointer"><LinkedIn className="w-3.5 md:w-4 h-3.5 md:h-4 fill-onPrimary"/></a>
              <a
                href="https://www.instagram.com/simplifytaxsteuerberatung?fbclid=IwAR3sSsOgDaz_Us99MiPIhyOJ6iaVxmurJSMsRYxkGhv2Sv0a296hGQ06TNs"
                target="_blank" className="cursor-pointer"><Instagram
                className="w-3.5 md:w-4 h-3.5 md:h-4 fill-onPrimary"/></a>
              <a href="https://www.facebook.com/simplifytaxsteuerberatung/" target="_blank"
                 className="cursor-pointer"><Facebook className="w-3.5 md:w-4 h-3.5 md:h-4 fill-onPrimary"/></a>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}