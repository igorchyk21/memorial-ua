import type { Metadata } from "next";
import conf from "@/shared/config/conf";
import { HeroShortType } from "@global/types";

type TFunction = (key: string, values?: Record<string, any>) => string;

export type HeroSeoPageKind = "about" | "biography" | "photo" | "video" | "audio" | "candles" | "unsubscribe";

const trimSlash = (value: string | undefined | null): string =>
  (value || "").replace(/\/+$/, "");

const buildAbsoluteUrl = (path: string): string => { 
  const domain = trimSlash(conf.domain); 
  if (!domain) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${domain}${path.startsWith("/") ? "" : "/"}${path}`;
};

const getKeywords = (t: TFunction): string[] => {
  const raw = t("seo.keywords");
  return raw
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
};

const getSiteName = (t: TFunction): string => t("seo.siteName");

const getHeroFullName = (hero: HeroShortType): string => {
  const parts = [hero.lName, hero.fName].filter(Boolean);
  return parts.join(" ").trim();
};

const formatHeroDate = (value?: number | null, locale?: string): string | undefined => {
  if (!value) return undefined;
  try {
    return new Date(value).toLocaleDateString(
      locale === "en" ? "en-US" : "uk-UA",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  } catch {
    return undefined;
  }
};

const buildHeroPreviewImageUrl = (hero: HeroShortType): string | undefined => {
  if (hero.photo) {
    return `${trimSlash(conf.dataUrl)}/${hero.photo}`;
  }

  const placeholderPath = "/memorial/img/placeholder.jpg";
  return buildAbsoluteUrl(placeholderPath);
};

export const buildBasePageMetadata = ({
  locale,
  path,
  pageKey,
  t,
}: {
  locale: string;
  path: string;
  pageKey: string; // e.g. 'home', 'heroes', 'newHero', 'info.offer'
  t: TFunction;
}): Metadata => {
  const siteName = getSiteName(t);
  const title = t(`seo.pages.${pageKey}.title`);
  const description = t(`seo.pages.${pageKey}.description`);
  const keywords = getKeywords(t);

  const url = buildAbsoluteUrl(path); 

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: "website",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
};

export const buildHeroPageMetadata = ({
  hero,
  locale,
  path,
  pageKind,
  t,
}: {
  hero: HeroShortType;
  locale: string;
  path: string;
  pageKind: HeroSeoPageKind;
  t: TFunction;
}): Metadata => {
  const siteName = getSiteName(t);
  const pageTitle = t(`seo.hero.pageTitles.${pageKind}`);
  const fullName = getHeroFullName(hero);
  const title = `${siteName}, ${fullName}, ${pageTitle}`;

  const deathDate = formatHeroDate(hero.death, locale);
  const descriptionKey = deathDate
    ? "seo.hero.descriptionTemplate"
    : "seo.hero.descriptionNoDeath";
  const description = t(descriptionKey, {
    name: fullName,
    deathDate: deathDate || "",
  });

  const keywords = getKeywords(t);
  const url = buildAbsoluteUrl(path);
  const imageUrl = buildHeroPreviewImageUrl(hero);

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: "profile",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: fullName,
            },
          ]
        : undefined,
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    alternates: {
      canonical: url,
    },
  };
};

export const buildHeroJsonLd = ({
  hero,
  locale,
  path,
}: {
  hero: HeroShortType;
  locale: string;
  path: string;
}): Record<string, any> => {
  const fullName = getHeroFullName(hero);
  const url = buildAbsoluteUrl(path);
  const imageUrl = buildHeroPreviewImageUrl(hero);

  const birthDateIso = hero.birth
    ? new Date(hero.birth).toISOString().split("T")[0]
    : undefined;
  const deathDateIso = hero.death
    ? new Date(hero.death).toISOString().split("T")[0]
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: fullName,
    alternateName: hero.callSign || undefined,
    image: imageUrl,
    url,
    jobTitle: "Захисник України",
    nationality: "UA",
    birthDate: birthDateIso,
    deathDate: deathDateIso,
  };
};


