import { NewsItem, NewsSource, RSSItem } from "./types";
import { getProvider } from "./providers";

export function parseRSSItem(item: RSSItem): NewsItem | null {
  const provider = getProvider(item.source);
  
  if (!provider) {
    return null;
  }

  try {
    const newsItem: NewsItem = {
      id: generateId(item.link, item.pubDate),
      title: item.title,
      description: item.description || "Detaylar için kaynağı ziyaret edin.",
      publishedAt: item.pubDate,
      source: item.source as NewsSource,
      url: item.link,
    };

    return newsItem;
  } catch (error) {
    console.error("Error parsing RSS item:", error);
    return null;
  }
}

function generateId(link: string, pubDate: string): string {
  const combined = link + pubDate;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}