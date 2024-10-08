export type BusinessCard = {
  slug: string;
  title: string;
  imgSrc: string;
  position: string;
  company: string;
  mobile: string;
  mobileFE: string;
  landline: string;
  landlineFE: string;
  email: string;
  website: string;
  street: string;
  zip: string;
  city: string;
  country: string;
  linkedinHandle: string;
  instagramHandle: string;
  facebookHandle: string;
  vcfSrc: string;
  notes: string;
}

export const data: BusinessCard[] = [
  {
    slug: "dimitar-zlatev",
    title: "Mag. Dimitar Zlatev",
    imgSrc: "simplifytax-at/content/team/Dimitar-Zlatev",
    position: "Managing Director | Steuerberater",
    company: "Simplify Tax",
    mobile: "+4366499115412",
    mobileFE: "+43 664 9911 54 12",
    landline: "+4319258648",
    landlineFE: "+43 1 925 86 48",
    email: "dimitar.zlatev@simplifytax.at",
    website: "simplifytax.at",
    street: "Mommsengasse 33 Top 2+5",
    zip: "1040",
    city: "Wien",
    country: "Österreich",
    linkedinHandle: "company/simplifytaxsteuerberatung",
    instagramHandle: "simplifytaxsteuerberatung",
    facebookHandle: "simplifytaxsteuerberatung",
    vcfSrc: "Dimitar-Zlatev.vcf",
    notes: "Simplify Tax - Ihr digitaler Steuerberater in 1040 Wien",
  },
  {
    slug: "anna-pasquale",
    title: "Anna Pasquale, LL.M. (WU) BSc (WU)",
    imgSrc: "simplifytax-at/content/team/Anna-Moshammer",
    position: "Director | Steuerberaterin",
    company: "Simplify Tax",
    mobile: "+436642620760",
    mobileFE: "+43 664 262 07 60",
    landline: "+4319258648",
    landlineFE: "+43 1 925 86 48",
    email: "anna.pasquale@simplifytax.at",
    website: "simplifytax.at",
    street: "Mommsengasse 33 Top 2+5",
    zip: "1040",
    city: "Wien",
    country: "Österreich",
    linkedinHandle: "company/simplifytaxsteuerberatung",
    instagramHandle: "simplifytaxsteuerberatung",
    facebookHandle: "simplifytaxsteuerberatung",
    vcfSrc: "Anna-Pasquale.vcf",
    notes: "Simplify Tax - Ihr digitaler Steuerberater in 1040 Wien",
  },
  {
    slug: "marco-elsner",
    title: "Marco Elsner",
    imgSrc: "/simplifytax-at/content/team/Marco-Elsner",
    position: "Associate",
    company: "Simplify Tax",
    mobile: "",
    mobileFE: "",
    landline: "+4319258648",
    landlineFE: "+43 1 925 86 48",
    email: "marco.elsner@simplifytax.at",
    website: "simplifytax.at",
    street: "Mommsengasse 33 Top 2+5",
    zip: "1040",
    city: "Wien",
    country: "Österreich",
    linkedinHandle: "company/simplifytaxsteuerberatung",
    instagramHandle: "simplifytaxsteuerberatung",
    facebookHandle: "simplifytaxsteuerberatung",
    vcfSrc: "Marco-Elsner.vcf",
    notes: "Simplify Tax - Ihr digitaler Steuerberater in 1040 Wien",
  }
];