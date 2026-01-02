import { HeroShortType } from "@global/types";
import { buildHeroJsonLd } from "./seoHelpers";

interface HeroJsonLdProps {
  hero: HeroShortType;
  locale: string;
  path: string;
}

const HeroJsonLd = ({ hero, locale, path }: HeroJsonLdProps) => {
  const jsonLd = buildHeroJsonLd({ hero, locale, path });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default HeroJsonLd;


