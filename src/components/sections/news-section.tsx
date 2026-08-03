"use client";

import { useEffect, useState, useCallback } from "react";
import { AlertCircle, Calendar, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { NEWS_SOURCES } from "@/lib/news/providers";
import type { NewsFetchResult, NewsItem } from "@/lib/news/types";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

function NewsCard({ news }: { news: NewsItem }) {
  const sourceInfo = NEWS_SOURCES[news.source];
  const publishDate = new Date(news.publishedAt).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft",
        "transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-card",
      )}
    >
      <div className="flex items-center justify-between border-b border-border bg-card/50 p-4">
        <div className="flex items-center gap-2.5">
          <div
            className={cn(
              "rounded-lg px-2.5 py-1 text-xs font-semibold text-white",
              sourceInfo.color,
            )}
          >
            {sourceInfo.label}
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <Calendar className="size-3.5" aria-hidden="true" />
          <time dateTime={news.publishedAt}>{publishDate}</time>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
          {news.title}
        </h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
          {news.description}
        </p>

        <div className="mt-5">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="group/btn w-full justify-between"
          >
            <a
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between"
            >
              <span>Devamını Oku</span>
              <ExternalLink
                className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
};

const slideTransition = {
  type: "tween" as const,
  ease: "easeInOut" as const,
  duration: 0.4,
};

export function NewsSection() {
  const [newsData, setNewsData] = useState<NewsFetchResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const controller = new AbortController();

    async function loadNews() {
      try {
        const response = await fetch("/api/news", {
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`News API returned ${response.status}`);
        }

        const data = (await response.json()) as NewsFetchResult;
        setNewsData(data);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setNewsData({
          news: [],
          lastUpdated: new Date().toISOString(),
          error: "Haberler yüklenemedi. Lütfen daha sonra tekrar deneyiniz.",
          sources: [],
          cached: false,
        });
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadNews();

    return () => controller.abort();
  }, []);

  // Otomatik geçiş
  useEffect(() => {
    if (!isAutoPlaying || !newsData?.news.length) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsData.news.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, newsData?.news.length]);

  const handlePrevious = useCallback(() => {
    if (!newsData?.news.length) return;
    setIsAutoPlaying(false);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + newsData.news.length) % newsData.news.length);
  }, [newsData?.news.length]);

  const handleNext = useCallback(() => {
    if (!newsData?.news.length) return;
    setIsAutoPlaying(false);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % newsData.news.length);
  }, [newsData?.news.length]);

  const currentNews = newsData?.news[currentIndex];

  return (
    <section
      id="haberler"
      className="section-spacing border-t border-border bg-background"
      aria-labelledby="news-heading"
    >
      <Container>
        <div className="text-center">
          <SectionHeading
            badge="Güncel Mali Haberler"
            title="Mali Dünyadan Son Dakika"
            description="Vergi, muhasebe ve mali mevzuat ile ilgili güncel duyurular ve haberler."
          />
        </div>

        {isLoading ? (
          <div className="mt-12 flex justify-center">
            <div className="h-96 w-full max-w-3xl animate-pulse rounded-2xl border border-border bg-card" />
          </div>
        ) : (
          <>
            {newsData?.lastUpdated && (
              <p className="mt-6 text-center text-sm text-muted">
                Son Güncelleme:{" "}
                {new Date(newsData.lastUpdated).toLocaleString("tr-TR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}

            {newsData?.error && (
              <div className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-200">
                <AlertCircle className="size-5 shrink-0" aria-hidden="true" />
                <span>{newsData.error}</span>
              </div>
            )}

            {currentNews && newsData && newsData.news.length > 0 ? (
              <div className="mt-12">
                <div className="relative flex items-center justify-center gap-4">
                  {/* Sol Ok */}
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={handlePrevious}
                    className={cn(
                      "size-12 shrink-0 rounded-full border-2 border-border bg-card/80 backdrop-blur-sm",
                      "transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground",
                      "hidden sm:flex",
                    )}
                    aria-label="Önceki haber"
                  >
                    <ChevronLeft className="size-6" aria-hidden="true" />
                  </Button>

                  {/* Mobil Sol Ok */}
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={handlePrevious}
                    className={cn(
                      "size-10 shrink-0 rounded-full border-2 border-border bg-card/80 backdrop-blur-sm sm:hidden",
                      "transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground",
                    )}
                    aria-label="Önceki haber"
                  >
                    <ChevronLeft className="size-5" aria-hidden="true" />
                  </Button>

                  {/* Haber Kartı */}
                  <div className="w-full max-w-3xl">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={prefersReducedMotion ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } } : slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={prefersReducedMotion ? { duration: 0 } : slideTransition}
                        className="h-[500px]"
                        style={prefersReducedMotion ? {} : { willChange: "transform, opacity" }}
                      >
                        <NewsCard news={currentNews} />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Sağ Ok */}
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleNext}
                    className={cn(
                      "size-12 shrink-0 rounded-full border-2 border-border bg-card/80 backdrop-blur-sm",
                      "transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground",
                      "hidden sm:flex",
                    )}
                    aria-label="Sonraki haber"
                  >
                    <ChevronRight className="size-6" aria-hidden="true" />
                  </Button>

                  {/* Mobil Sağ Ok */}
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleNext}
                    className={cn(
                      "size-10 shrink-0 rounded-full border-2 border-border bg-card/80 backdrop-blur-sm sm:hidden",
                      "transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground",
                    )}
                    aria-label="Sonraki haber"
                  >
                    <ChevronRight className="size-5" aria-hidden="true" />
                  </Button>
                </div>

                {/* Sayfa Göstergesi */}
                <div className="mt-8 flex items-center justify-center gap-2">
                  {newsData.news.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setDirection(index > currentIndex ? 1 : -1);
                        setCurrentIndex(index);
                      }}
                      className={cn(
                        "rounded-full transition-all duration-300",
                        index === currentIndex
                          ? "size-2.5 bg-primary"
                          : "size-2 bg-muted hover:bg-muted/80",
                      )}
                      aria-label={`${index + 1}. haber`}
                      aria-current={index === currentIndex ? "true" : "false"}
                    />
                  ))}
                </div>

                {/* Sayfa Numarası */}
                <p className="mt-4 text-center text-sm text-muted">
                  {currentIndex + 1} / {newsData.news.length}
                </p>
              </div>
            ) : (
              <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-12 text-center">
                <AlertCircle className="size-12 text-muted" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  Henüz haber bulunmuyor
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Şu anda görüntülenecek haber bulunmamaktadır. Lütfen daha sonra tekrar
                  kontrol ediniz.
                </p>
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
}