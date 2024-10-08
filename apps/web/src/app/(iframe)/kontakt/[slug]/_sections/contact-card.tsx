import React from "react";
import Link from "next/link";
import {data} from "./data";
import {redirect} from "next/navigation";
import {Building, Envelope, Globe, LocationDot, Pen, Phone} from "@ui/components/icons/ClassicSolidIcons";
import {Facebook, Instagram, LinkedIn} from "@ui/components/icons/brand-icons";
import {LogoWhiteFull} from "@ui/components/icons/Logos";
import {CldImage} from "@ui/components/cldImage";

export function ContactCard({slug}: { slug: string; Logo: any }) {
  const businessCard = data.find((businessCard) => businessCard.slug === slug);

  if (!businessCard) {
    redirect("/kontakt");
  }

  return (
    <div className={`bg-surface-3 min-h-screen flex flex-col`}>
      <div className="px-4 py-12 mx-auto max-w-2xl w-full">
        <div className="flex flex-col items-center gap-y-4">
          <div className="rounded-full bg-gray-50 w-32 h-32 border-2 border-gray-50 drop-shadow">
            <CldImage
              className="object-cover rounded-full w-full h-full"
              src={businessCard.imgSrc}
              alt={businessCard.title}
              width={200}
              height={200}
            />
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl font-semibold">{businessCard.title}</div>
            <div className="text-lg font-medium">{businessCard.position}</div>
          </div>
        </div>
        <div className="mt-8 block space-y-4">
          {businessCard.mobile && <div className="space-y-1">
            <div className="text-sm font-semibold">Mobil</div>
            <div className="w-full px-2 py-2 rounded-[10px] bg-surface-1 mt-1">
              <a href={`tel:${businessCard.mobile}`}>
                <div className="flex flex-row items-center gap-x-4 px-2">
                  <Phone className="w-4 h-4 fill-appPrimary"/>
                  {businessCard.mobileFE}
                </div>
              </a>
            </div>
          </div>}
          <div className="space-y-1">
            <div className="text-sm font-semibold">Arbeit</div>
            <div className="w-full px-2 py-2 rounded-[10px] bg-surface-1 mt-1">
              <a href={`tel:${businessCard.landline}`}>
                <div className="flex flex-row items-center gap-x-4 px-2">
                  <Building className="w-4 h-4 fill-appPrimary"/>
                  {businessCard.landlineFE}
                </div>
              </a>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-semibold">E-Mail</div>
            <div className="w-full px-2 py-2 rounded-[10px] bg-surface-1">
              <a href={`mailto:${businessCard.email}`}>
                <div className="flex flex-row items-center gap-x-4 px-2">
                  <Envelope className="w-4 h-4 fill-appPrimary"/>
                  {businessCard.email}
                </div>
              </a>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-semibold">Adresse</div>
            <div className="w-full px-2 py-2 rounded-[10px] bg-surface-1">
              <div className="flex flex-row items-center gap-x-4 px-2">
                <LocationDot className="w-4 h-4 fill-appPrimary"/>
                {businessCard.street},&nbsp;{businessCard.zip}&nbsp;{businessCard.city}
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-semibold">Webseite</div>
            <div className="w-full px-2 py-2 rounded-[10px] bg-surface-1">
              <Link href={businessCard.website}>
                <div className="flex flex-row items-center gap-x-4 px-2">
                  <Globe className="w-4 h-4 fill-appPrimary"/>
                  {businessCard.website}
                </div>
              </Link>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-semibold">Social Media</div>
            <div className="space-y-2">
              <div className="w-full px-2 py-2 rounded-[10px] bg-surface-1">
                <Link href={`https://www.linkedin.com/${businessCard.linkedinHandle}`} target="_blank">
                  <div className="flex flex-row items-center gap-x-4 px-2">
                    <LinkedIn className="w-4 h-4 fill-appPrimary"/>
                    {businessCard.linkedinHandle}
                  </div>
                </Link>
              </div>
              <div className="w-full px-2 py-2 rounded-[10px] bg-surface-1">
                <Link href={`https://www.facebook.com/${businessCard.instagramHandle}`} target="_blank">
                  <div className="flex flex-row items-center gap-x-4 px-2">
                    <Facebook className="w-4 h-4 fill-appPrimary"/>
                    {businessCard.instagramHandle}
                  </div>
                </Link>
              </div>
              <div className="w-full px-2 py-2 rounded-[10px] bg-surface-1">
                <Link href={`https://www.instagram.com/${businessCard.facebookHandle}`} target="_blank">
                  <div className="flex flex-row items-center gap-x-4 px-2">
                    <Instagram className="w-4 h-4 fill-appPrimary"/>
                    {businessCard.facebookHandle}
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-semibold">Notizen</div>
            <div className="w-full px-2 py-2 rounded-[10px] bg-surface-1">
              <a href={`mailto:${businessCard.notes}`}>
                <div className="flex flex-row items-center gap-x-4 px-2">
                  <Pen className="w-4 h-4 fill-appPrimary"/>
                  {businessCard.notes}
                </div>
              </a>
            </div>
          </div>
        </div>
        <a href={`/businesscards/${businessCard.vcfSrc}`} className="mt-8 w-full flex justify-center">
          <button
            className="px-4 py-2 bg-appPrimary hover:bg-primaryPseudo-hover active:bg-primaryPseudo-active text-onPrimary text-sm rounded-[10px] border border-white/10 font-medium flex flex-row items-center cursor-pointer whitespace-nowrap">
            Zu Kontakten hinzufügen
          </button>
        </a>
      </div>
      <div className="px-4 bg-appPrimary py-4 mt-auto flex flex-col items-center">
        <Link href={businessCard.website}>
          <LogoWhiteFull className="h-8 md:h-10 fill-onPrimary"/>
        </Link>
      </div>
    </div>
  );
}
