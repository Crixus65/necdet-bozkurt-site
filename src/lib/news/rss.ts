import { XMLParser } from "fast-xml-parser";
import { NewsProviderReport, RSSItem } from "./types";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
});

export interface RSSFetchResult {
  items: RSSItem[];
  report: NewsProviderReport;
}

export async function fetchRSS(url: string, source: string): Promise<RSSFetchResult> {
  const report: NewsProviderReport = {
    source,
    url,
    enabled: true,
    itemCount: 0,
  };
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "MaliMusavirBot/1.0",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      signal: controller.signal,
      next: { revalidate: 3600 },
    });

    report.status = response.status;
    report.responseType = response.headers.get("content-type");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }

    const text = await response.text();
    const parsed = parser.parse(text) as Record<string, unknown>;
    const items = extractItems(parsed, source);

    report.itemCount = items.length;
    return { items, report };
  } catch (error) {
    report.error = error instanceof Error ? error.message : "Unknown RSS fetch error";
    return { items: [], report };
  } finally {
    clearTimeout(timeoutId);
  }
}

function extractItems(parsed: Record<string, unknown>, source: string): RSSItem[] {
  const items: RSSItem[] = [];
  let rssItems: unknown[] = [];

  if (parsed.rss && typeof parsed.rss === "object" && "channel" in parsed.rss) {
    const rssObj = parsed.rss as { channel?: { item?: unknown } };
    if (rssObj.channel?.item) {
      rssItems = Array.isArray(rssObj.channel.item)
        ? rssObj.channel.item
        : [rssObj.channel.item];
    }
  } else if (parsed.feed && typeof parsed.feed === "object" && "entry" in parsed.feed) {
    const feedObj = parsed.feed as { entry?: unknown };
    if (feedObj.entry) {
      rssItems = Array.isArray(feedObj.entry) ? feedObj.entry : [feedObj.entry];
    }
  }

  rssItems.forEach((item, index) => {
    try {
      const itemRecord = item as Record<string, unknown>;
      const title = readText(itemRecord.title);
      const description = readText(itemRecord.description) || readText(itemRecord.summary);
      const link = readLink(itemRecord.link) || readText(itemRecord.url);
      const pubDate =
        readText(itemRecord.pubDate) ||
        readText(itemRecord.published) ||
        readText(itemRecord.updated);

      if (title && link) {
        items.push({
          title: cleanHtml(title),
          description: cleanHtml(description),
          link,
          pubDate: parseDate(pubDate),
          source,
        });
      }
    } catch (error) {
      console.error(`RSS item ${index + 1} could not be parsed:`, error);
    }
  });

  return items;
}

function readText(value: unknown): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return readText(record["#text"]) || readText(record.__cdata) || readText(record.value);
  }

  return "";
}

function readLink(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(readLink).find(Boolean) || "";
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return readText(record["@_href"]) || readText(record.href) || readText(record["#text"]);
  }

  return "";
}

function parseDate(value: string): string {
  const date = value ? new Date(value) : new Date();
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function cleanHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}
