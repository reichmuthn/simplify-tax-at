import { LogoWhiteFull } from "@ui/components/icons/Logos";
import { ContactCard } from "@/app/(iframe)/kontakt/[slug]/_sections/contact-card";
import { generatePageMetadata } from "@/assets/data/sharedMetadata";
import { data } from "@/app/(iframe)/kontakt/[slug]/_sections/data";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: PageProps) {
  const businessCard = data.find(
    (businessCard) => businessCard.slug === params.slug,
  );

  if (!businessCard) return generatePageMetadata("/kontakt", "Kontakt");

  return generatePageMetadata(
    `/kontakt/${businessCard.slug}`,
    `${businessCard.title} - Kontakt`,
    businessCard.notes,
  );
}

export default function Page({ params }: PageProps) {
  return <ContactCard slug={params.slug} Logo={LogoWhiteFull} />;
}
