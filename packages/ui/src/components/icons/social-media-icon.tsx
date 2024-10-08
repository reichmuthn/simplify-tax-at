import {
  Facebook,
  Glassdoor,
  Instagram,
  Kununu,
  LinkedIn,
  TikTok,
  Watchado,
  Xing,
  XTwitter,
  Youtube,
} from "@ui/components/icons/brand-icons";
import { ExternalLink } from "lucide-react";

type SocialMediaIconProps = {
  link: string;
  className: string;
};

export function SocialMediaIcon({ link, className }: SocialMediaIconProps) {
  const renderIcon = () => {
    if (link.includes("facebook")) return <Facebook className={className} />;
    if (link.includes("instagram")) return <Instagram className={className} />;
    if (link.includes("linkedin")) return <LinkedIn className={className} />;
    if (link.includes("twitter") || link.includes("x.com"))
      return <XTwitter className={className} />;
    if (link.includes("youtube")) return <Youtube className={className} />;
    if (link.includes("xing")) return <Xing className={className} />;
    if (link.includes("kununu")) return <Kununu className={className} />;
    if (link.includes("whatchado")) return <Watchado className={className} />;
    if (link.includes("glassdoor")) return <Glassdoor className={className} />;
    if (link.includes("tiktok")) return <TikTok className={className} />;

    return <ExternalLink className={className} />;
  };

  return (
    <a
      href={link}
      target="_blank"
      aria-label="Social icon link"
      rel="noopener noreferrer"
    >
      {renderIcon()}
    </a>
  );
}
