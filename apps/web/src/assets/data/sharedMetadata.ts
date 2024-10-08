import { Metadata } from "next";

export const sharedApp = {
  title: "Simplify Tax",
  url: "https://www.simplifytax.at",
  eMail: "office@simplifytax.at",
  phone: "+43 1 925 86 48",
};

//60-70 Zeichen
export const sharedTitle = {
  default: `${sharedApp.title} - Ihr digitaler Steuerberater in Wien`,
  template: `%s | ${sharedApp.title}`,
  absolute: `${sharedApp.title} - Ihr digitaler Steuerberater in Wien`,
};

//120-160 Zeichen
export const sharedDescription =
  "Kompetente und zuverlässige Steuerberatung. Von KMU und Start-ups bis hin zu Ärzten und Apotheker.";

export const sharedOpenGraph = {
  type: "website",
  locale: "de_AT",
  siteName: sharedApp.title,
  description: sharedDescription,
  images: [
    {
      url: "/img/opengraph-image.jpg",
      width: 1200,
      height: 675,
      alt: `${sharedApp} OpenGraph Bild`,
    },
  ],
  title: sharedTitle,
  url: "/",
};

export const sharedTwitter = {
  card: "summary_large_image",
  title: sharedTitle,
  description: sharedDescription,
  images: {
    url: "/img/opengraph-image.jpg",
    alt: `${sharedApp} Twitter Bild`,
  },
};

export const sharedRootMetadata: Metadata = {
  metadataBase: new URL(sharedApp.url),
  applicationName: sharedApp.title,
  referrer: "origin-when-cross-origin",
  keywords: ["E-Commerce", "Start-Ups", "Immobilien", "Ärzte", "Apotheker", "Hotels", "Gastronomie", "Klassische Steuerberatung", "Rechtsformwahl und Umstrukturierung", "Content Creator", ",Influencer", "E-Sports", "Finanzbuchhaltung", "Personalverrechnung","Jahresabschluss und Bilanzierung","Steuererklärungen","Beratung in steuerlichen Belangen", "Betriebswirtschaftliche Beratung", "Nachfolgeplanung und Unternehmensbewertung", "Steuerberatung bei internationalen Sachverhalten", "Beratung & Unterstützung in Fragen des Finanzstrafrechts"],
  authors: [
    {
      name: "Noémie Reichmuth",
      url: "https://www.angelstone.at/kontakt/noemie-reichmuth",
    },
    {
      name: "Christoph Angel",
      url: "https://www.angelstone.at/kontakt/christoph-angel",
    },
  ],
  creator: "AngelStone Media GmbH",
  publisher: "Simplify Tax Steuerberatung GmbH",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  title: sharedTitle,
  description: sharedDescription,
  openGraph: sharedOpenGraph,
  twitter: sharedTwitter,
  icons: {
    icon: [
      {
        url: "/icons/icon-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/icons/icon-384x384.png",
        type: "image/png",
        sizes: "384x384",
      },
      {
        url: "/icons/icon-1024x1024.png",
        type: "image/png",
        sizes: "1024x1024",
      },
    ],
    apple: [
      {
        url: "/icons/icon-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/icons/icon-384x384.png",
        type: "image/png",
        sizes: "384x384",
      },
      {
        url: "/icons/icon-1024x1024.png",
        type: "image/png",
        sizes: "1024x1024",
      },
    ],
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/icons/icon-1024x1024.png",
    },
  },
};

export function generatePageMetadata(
  url: string,
  title: string,
  description?: string,
  imageUrl?: string,
) {
  return {
    title,
    alternates: {
      canonical: url,
    },
    description: description ?? sharedDescription,
    openGraph: {
      ...sharedOpenGraph,
      images: imageUrl
        ? [{ ...sharedOpenGraph.images[0], url: imageUrl }]
        : sharedOpenGraph.images,
      title,
      url,
      description: description ?? sharedDescription,
    },
    twitter: {
      ...sharedTwitter,
      images: imageUrl
        ? { ...sharedTwitter.images, url: imageUrl }
        : sharedTwitter.images,
      title,
      description: description ?? sharedDescription,
    },
  };
}