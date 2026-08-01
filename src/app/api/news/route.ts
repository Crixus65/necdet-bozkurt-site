import { NextResponse } from "next/server";
import { getNews, clearNewsCache } from "@/lib/news";

export const revalidate = 3600; // 1 saat

export async function GET() {
  try {
    console.log("=".repeat(60));
    console.log("API /api/news called");
    
    const result = await getNews();
    
    console.log(`Returning ${result.news.length} news items`);
    console.log(`Last updated: ${result.lastUpdated}`);
    if (result.error) {
      console.log(`Error: ${result.error}`);
    }
    console.log("=".repeat(60));

    return NextResponse.json({
      news: result.news,
      lastUpdated: result.lastUpdated,
      error: result.error,
    });
  } catch (error) {
    console.error("API /api/news error:", error);
    return NextResponse.json(
      { 
        news: [], 
        lastUpdated: new Date().toISOString(),
        error: "Haberler yüklenemedi. Lütfen daha sonra tekrar deneyiniz." 
      },
      { status: 500 }
    );
  }
}

// Cache temizleme endpoint'i (opsiyonel - admin paneli için)
export async function DELETE() {
  try {
    clearNewsCache();
    console.log("News cache cleared");
    return NextResponse.json({ message: "Cache cleared successfully" });
  } catch (error) {
    console.error("Error clearing cache:", error);
    return NextResponse.json({ error: "Cache could not be cleared" }, { status: 500 });
  }
}