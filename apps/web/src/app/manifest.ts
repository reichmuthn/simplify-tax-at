export default function manifest() {
  return {
    name: "Simplify Tax",
    short_name: "Simplify Tax",
    start_url: "https://www.simplifytax.at/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#58A709",
    description:
      "Simplify Tax - Ihr digitaler Steuerberater in Wien",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        src: "/icons/icon-384x384.png",
        type: "image/png",
        sizes: "384x384",
      },
      {
        src: "/icons/icon-1024x1024.png",
        type: "image/png",
        sizes: "1024x1024",
      },
    ],
    shortcuts: [
      {
        name: "Lexikon öffnen",
        short_name: "Lexikon",
        description: "Öffnet das Lexikon",
        url: "https://www.simplifytax.at/de/lexikon",
        icons: [{ src: "/icons/lexikon-icon.png", sizes: "512x512" }],
      },
    ],
    lang: "de-AT",
    dir: "ltr",
    display_override: ["fullscreen", "standalone"],
    categories: ["E-Commerce", "Start-Ups", "Immobilien", "Ärzte", "Apotheker", "Hotels", "Gastronomie", "Klassische Steuerberatung", "Rechtsformwahl und Umstrukturierung", "Content Creator", ",Influencer", "E-Sports", "Finanzbuchhaltung", "Personalverrechnung","Jahresabschluss und Bilanzierung","Steuererklärungen","Beratung in steuerlichen Belangen", "Betriebswirtschaftliche Beratung", "Nachfolgeplanung und Unternehmensbewertung", "Steuerberatung bei internationalen Sachverhalten", "Beratung & Unterstützung in Fragen des Finanzstrafrechts"],
    orientation: "portrait-primary",
    scope: "https://www.simplifytax.at/",
    theme_color_adjustable: true,
    share_target: {
      action: "https://www.simplifytax.at/share",
      method: "post",
      enctype: "multipart/form-data",
      params: {
        title: "name",
        text: "description",
        url: "link",
        files: [
          {
            name: "files",
            accept: ["image/*", "video/*"],
          },
        ],
      },
    },
  };
}
