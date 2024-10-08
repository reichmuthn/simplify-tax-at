import { DashboardHome } from "@ui/views/dashboard/home/view";

import { Metadata } from "next";
import { getCldOgImageUrl } from "next-cloudinary";

const publicId = "Wandelnde_Welt_Digitalisierung_rvfta1_yrpagz.webp";
const headline = "Gemeinsam entdecken wir eine sich wandelnde Welt";
const tagline = "AngelStone Media GmbH";
const logoPublicId = "icon_vpicrr.png";

export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        width: 1200,
        height: 630,
        url: getCldOgImageUrl({
          src: publicId,
          effects: [
            {
              background: "rgb:010A44",
            },
            {
              color: "rgb:2A005F",
              colorize: "100",
            },
            {
              gradientFade: "symmetric",
            },
          ],
          overlays: [
            {
              publicId,
              width: 1200,
              height: 630,
              crop: "fill",
              effects: [{ opacity: 20 }],
            },
            {
              width: 1000,
              crop: "fit",
              text: {
                color: "white",
                fontFamily: "Merriweather",
                fontSize: 58,
                fontWeight: "bold",
                lineSpacing: 10,
                text: headline,
              },
              position: {
                x: 100,
                y: 100,
                gravity: "north_west",
              },
            },
            {
              publicId,
              width: 1000,
              height: 2,
              effects: [
                {
                  colorize: "100,co_white",
                  opacity: 70,
                },
              ],
              position: {
                x: 100,
                y: 175,
                gravity: "south_west",
              },
            },
            {
              width: 60,
              crop: "fit",
              publicId: logoPublicId,
              position: {
                x: 100,
                y: 102,
                gravity: "south_west",
              },
            },
            {
              text: {
                color: "white",
                fontFamily: "Lato",
                fontSize: 37,
                fontWeight: "bold",
                text: tagline,
              },
              position: {
                x: 180,
                y: 100,
                gravity: "south_west",
              },
            },
          ],
        }),
      },
    ],
  },
};

export default function Page() {
  return <DashboardHome />;
}
