export interface NewsItem {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  source: NewsSource;
  url: string;
  cachedAt?: string;
}

export interface NewsProviderReport {
  source: string;
  url: string;
  enabled: boolean;
  status?: number;
  responseType?: string | null;
  itemCount: number;
  error?: string;
}

export interface NewsFetchResult {
  news: NewsItem[];
  lastUpdated: string;
  error?: string;
  sources: NewsProviderReport[];
  cached: boolean;
}

export interface RSSItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
}

export type NewsSource =
  | "Resmi Gazete"
  | "TURMOB"
  | "NTV Ekonomi"
  | "AA Ekonomi";

export interface NewsSourceConfig {
  name: NewsSource;
  label: string;
  color: string;
  rssUrl?: string;
  apiUrl?: string;
  enabled: boolean;
  disabledReason?: string;
}
