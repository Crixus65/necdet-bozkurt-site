import "server-only";

import { fetchRSS } from "./news/rss";
import { newsCache } from "./news/cache";
import { parseRSSItem } from "./news/parser";
import { NEWS_PROVIDERS } from "./news/providers";
import { NewsFetchResult, NewsItem, NewsProviderReport } from "./news/types";

export async function getNews(): Promise<NewsFetchResult> {
  const now = new Date();
  const cachedData = newsCache.get("news");

  if (cachedData) {
    return {
      news: cachedData.data,
      lastUpdated: cachedData.lastUpdated,
      sources: cachedData.sources,
      cached: true,
    };
  }

  try {
    const activeProviders = NEWS_PROVIDERS.filter((provider) => provider.enabled && provider.rssUrl);
    const results = await Promise.allSettled(
      activeProviders.map((provider) => fetchRSS(provider.rssUrl!, provider.name)),
    );

    const allNews: NewsItem[] = [];
    const reports: NewsProviderReport[] = buildDisabledReports();

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        const { items, report } = result.value;
        reports.push(report);

        items.forEach((item) => {
          const parsed = parseRSSItem(item);
          if (parsed) {
            allNews.push(parsed);
          }
        });
        return;
      }

      const provider = activeProviders[index];
      reports.push({
        source: provider.name,
        url: provider.rssUrl || "",
        enabled: true,
        itemCount: 0,
        error: result.reason instanceof Error ? result.reason.message : "Unknown provider error",
      });
    });

    const sortedNews = dedupeByTitle(allNews).sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
    const cachedNews = sortedNews.map((news) => ({
      ...news,
      cachedAt: now.toISOString(),
    }));

    const lastUpdated = now.toISOString();
    newsCache.set("news", cachedNews, reports, lastUpdated);

    const errors = reports
      .filter((report) => report.enabled && report.error)
      .map((report) => `${report.source}: ${report.error}`);

    return {
      news: sortedNews,
      lastUpdated,
      error: errors.length > 0 ? errors.join(", ") : undefined,
      sources: reports,
      cached: false,
    };
  } catch (error) {
    console.error("Error fetching news:", error);

    return {
      news: [],
      lastUpdated: now.toISOString(),
      error: "Haberler yuklenemedi. Lutfen daha sonra tekrar deneyiniz.",
      sources: buildDisabledReports(),
      cached: false,
    };
  }
}

export function clearNewsCache() {
  newsCache.clear();
}

function dedupeByTitle(news: NewsItem[]): NewsItem[] {
  return news.filter(
    (item, index, self) => index === self.findIndex((other) => other.title === item.title),
  );
}

function buildDisabledReports(): NewsProviderReport[] {
  return NEWS_PROVIDERS.filter((provider) => !provider.enabled).map((provider) => ({
    source: provider.name,
    url: provider.rssUrl || provider.apiUrl || "",
    enabled: false,
    itemCount: 0,
    error: provider.disabledReason,
  }));
}
