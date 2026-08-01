import { DefaultSeoProps } from "next-seo";
import { siteConfig } from "@/config/site";

/**
 * next-seo configuration for future Pages Router pages or client-side SEO overrides.
 * App Router pages use the native Metadata API via src/lib/metadata.ts
 */
export const defaultSeoConfig: DefaultSeoProps = {
  titleTemplate: `%s | ${siteConfig.shortName}`,
  defaultTitle: siteConfig.title,
  description: siteConfig.description,
  canonical: siteConfig.url,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content: siteConfig.keywords.join(", "),
    },
  ],
};
