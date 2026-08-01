import { NewsSourceConfig } from "./types";

export const NEWS_SOURCES: Record<string, { label: string; color: string }> = {
  "Resmi Gazete": {
    label: "Resmi Gazete",
    color: "bg-red-500",
  },
  TURMOB: {
    label: "TURMOB",
    color: "bg-emerald-500",
  },
  "NTV Ekonomi": {
    label: "NTV Ekonomi",
    color: "bg-blue-500",
  },
  "AA Ekonomi": {
    label: "AA Ekonomi",
    color: "bg-sky-600",
  },
};

export const NEWS_PROVIDERS: NewsSourceConfig[] = [
  {
    name: "Resmi Gazete",
    label: "Resmi Gazete",
    color: "bg-red-500",
    rssUrl: "https://www.resmigazete.gov.tr/rss",
    enabled: false,
    disabledReason: "Endpoint RSS/XML yerine HTML veya timeout davranisi gosteriyor.",
  },
  {
    name: "TURMOB",
    label: "TURMOB",
    color: "bg-emerald-500",
    rssUrl: "https://www.turmob.org.tr/rss/duyurular",
    enabled: false,
    disabledReason: "Endpoint 404 Not Found donuyor.",
  },
  {
    name: "NTV Ekonomi",
    label: "NTV Ekonomi",
    color: "bg-blue-500",
    rssUrl: "https://www.ntv.com.tr/ekonomi.rss",
    enabled: true,
  },
  {
    name: "AA Ekonomi",
    label: "AA Ekonomi",
    color: "bg-sky-600",
    rssUrl: "https://www.aa.com.tr/tr/rss/default?cat=ekonomi",
    enabled: true,
  },
];

export function getProvider(source: string): NewsSourceConfig | undefined {
  return NEWS_PROVIDERS.find((p) => p.name === source);
}
