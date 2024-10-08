import { sharedApp } from "@/assets/data/sharedMetadata";
import { getUsedPostTagItemsQueryCached } from "@ui/entities/posts/views/client/postTagList/view";
import { getActivePostListItemsQueryCached } from "@ui/entities/posts/views/client/postListView/view";
import { MetadataRoute } from "next";
import { getActiveTermItemsQueryCached } from "@ui/entities/terms/views/client/termListView/view";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = [
    "/",
    "/blog",
    "/blog/kategorien",
    "/blog/kategorien/klienteninfo",
    "/blog/kategorien/rechtssprechung",
    "/blog/kategorien/steuertipps",
    "/kerngebiete",
    "/kerngebiete/e-commerce",
    "/kerngebiete/e-commerce/automatisierung-und-digitalisierung",
    "/kerngebiete/e-commerce/schnittstellen",
    "/kerngebiete/e-commerce/automatisierte-fakturierung-an-kunden",
    "/kerngebiete/e-commerce/digitale-vertriebskanaele",
    "/kerngebiete/e-commerce/einhaltung-gesetzlicher-vorschriften",
    "/kerngebiete/start-ups",
    "/kerngebiete/start-ups/erstellung-eines-businessplans",
    "/kerngebiete/start-ups/foerdermittel",
    "/kerngebiete/start-ups/internationale-investoren",
    "/kerngebiete/start-ups/liquiditaetsplanung",
    "/kerngebiete/start-ups/mitarbeiterbeteiligungen",
    "/kerngebiete/start-ups/rechtsformwahl",
    "/kerngebiete/start-ups/wachstumsstrategien",
    "/kerngebiete/immobilien",
    "/kerngebiete/aerzte",
    "/kerngebiete/aerzte/betriebsausgaben",
    "/kerngebiete/aerzte/investitionen-in-die-eigene-aerztepraxis",
    "/kerngebiete/aerzte/mitarbeiter",
    "/kerngebiete/aerzte/praxisgruendung-und-fuehrung",
    "/kerngebiete/aerzte/praxisverkauf-und-nachfolgeplanung",
    "/kerngebiete/aerzte/vorsorge-und-altersvorsorge",
    "/kerngebiete/apotheker",
    "/kerngebiete/apotheker/analyse-wirtschaftlichkeit",
    "/kerngebiete/apotheker/betriebsausgaben",
    "/kerngebiete/apotheker/gruendung-und-fuehrung",
    "/kerngebiete/apotheker/investitionen",
    "/kerngebiete/apotheker/konditionsverhandlungen-mit-pharmagrosshandel",
    "/kerngebiete/apotheker/mitarbeiter",
    "/kerngebiete/apotheker/umsatzsteuer",
    "/kerngebiete/apotheker/verkauf-und-nachfolgeplanung",
    "/kerngebiete/apotheker/vorsorge-und-altersvorsorge",
    "/kerngebiete/hotels-und-gastronomie",
    "/kerngebiete/klassische-steuerberatung",
    "/kerngebiete/rechtsformwahl-und-umstrukturierung",
    "/kerngebiete/content-creator-influencer-esportler",
    "/leistungen",
    "/leistungen/beratung-in-steuerlichen-belangen",
    "/leistungen/beratung-und-unterstuetzung-in-fragen-des-finanzstrafrechts",
    "/leistungen/betriebswirtschaftliche-beratung",
    "/leistungen/finanzbuchhaltung",
    "/leistungen/jahresabschluss-und-bilanzierung",
    "/leistungen/nachfolgeplanung-und-unternehmensbewertung",
    "/leistungen/personalverrechnung",
    "/leistungen/steuerberatung-bei-internationalen-sachverhalten",
    "/leistungen/steuererklaerung",
    "/lexikon",
    "/booking",
    "/simplify-art",
    "/newsletter",
    "/kontakt",
    "/ueber-uns",
    "/impressum"
  ];

  const routes = pages.map((route: string) => ({
    url: `${sharedApp.url}${route}`,
  }));

  const postCategories = await getUsedPostTagItemsQueryCached();

  const postCategoryRoutes = postCategories.map((postCategory) => ({
    url: `${sharedApp.url}/blog/kategorien/${postCategory?.slug}`,
  }));

  const { data: posts } = await getActivePostListItemsQueryCached({
    limit: "9999",
  });

  const postRoutes = posts.map((post) => ({
    url: `${sharedApp.url}/blog/${post?.slug}`,
    lastModified: post.publishedAt?.toISOString(),
  }));

  const { data: terms } = await getActiveTermItemsQueryCached({
    limit: "9999",
  });

  const termRoutes = terms.map((term) => ({
    url: `${sharedApp.url}/lexikon/${term?.slug}`,
  }));

  return [...routes, ...postRoutes, ...postCategoryRoutes, ...termRoutes];
}
