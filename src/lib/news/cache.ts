import { NewsItem, NewsProviderReport } from "./types";

interface CacheEntry {
  data: NewsItem[];
  sources: NewsProviderReport[];
  lastUpdated: string;
  timestamp: number;
}

class NewsCache {
  private cache: Map<string, CacheEntry> = new Map();
  private readonly CACHE_DURATION = 3600000;

  get(key: string): CacheEntry | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.CACHE_DURATION) {
      this.cache.delete(key);
      return null;
    }

    return entry;
  }

  set(key: string, data: NewsItem[], sources: NewsProviderReport[], lastUpdated: string): void {
    this.cache.set(key, {
      data,
      sources,
      lastUpdated,
      timestamp: Date.now(),
    });
  }

  clear(): void {
    this.cache.clear();
  }
}

export const newsCache = new NewsCache();
