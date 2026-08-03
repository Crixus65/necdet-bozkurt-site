"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function DateCard() {
  const [isMounted, setIsMounted] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
    
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dayName = dateTime.toLocaleDateString("tr-TR", { weekday: "long" });
  const day = dateTime.getDate();
  const month = dateTime.toLocaleDateString("tr-TR", { month: "short" });
  const year = dateTime.getFullYear();
  const hours = dateTime.getHours().toString().padStart(2, "0");
  const minutes = dateTime.getMinutes().toString().padStart(2, "0");
  const seconds = dateTime.getSeconds().toString().padStart(2, "0");

  // Server-side'da veya hydrate edilmeden önce placeholder göster
  if (!isMounted) {
    return (
      <div className="inline-flex items-center gap-4 rounded-2xl border border-primary/20 bg-card/80 p-4 shadow-lg backdrop-blur-xl sm:gap-6 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:size-12">
            <Calendar className="size-5 sm:size-6" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium uppercase tracking-wider text-muted">
              Yükleniyor...
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-foreground sm:text-xl">--</span>
              <span className="text-sm font-semibold text-primary sm:text-base">---</span>
              <span className="text-xs text-muted sm:text-sm">----</span>
            </div>
          </div>
        </div>

        <div className="h-8 w-px bg-border sm:h-10" aria-hidden="true" />

        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:size-12">
            <Clock className="size-5 sm:size-6" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium uppercase tracking-wider text-muted">
              Saat
            </span>
            <div className="flex items-center gap-1 font-mono text-lg font-bold text-foreground sm:text-xl">
              <span>--</span>
              <span className="animate-pulse text-primary">:</span>
              <span>--</span>
              <span className="animate-pulse text-primary">:</span>
              <span>--</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isMounted) {
    return (
      <div className="inline-flex items-center gap-4 rounded-2xl border border-primary/20 bg-card/80 p-4 shadow-lg backdrop-blur-xl sm:gap-6 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:size-12">
            <Calendar className="size-5 sm:size-6" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium uppercase tracking-wider text-muted">
              Yükleniyor...
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-foreground sm:text-xl">--</span>
              <span className="text-sm font-semibold text-primary sm:text-base">---</span>
              <span className="text-xs text-muted sm:text-sm">----</span>
            </div>
          </div>
        </div>

        <div className="h-8 w-px bg-border sm:h-10" aria-hidden="true" />

        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:size-12">
            <Clock className="size-5 sm:size-6" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium uppercase tracking-wider text-muted">
              Saat
            </span>
            <div className="flex items-center gap-1 font-mono text-lg font-bold text-foreground sm:text-xl">
              <span>--</span>
              <span className="animate-pulse text-primary">:</span>
              <span>--</span>
              <span className="animate-pulse text-primary">:</span>
              <span>--</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (prefersReducedMotion) {
    return (
      <div className="inline-flex items-center gap-4 rounded-2xl border border-primary/20 bg-card/80 p-4 shadow-lg backdrop-blur-xl sm:gap-6 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:size-12">
            <Calendar className="size-5 sm:size-6" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium uppercase tracking-wider text-muted">
              {dayName}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-foreground sm:text-xl">
                {day}
              </span>
              <span className="text-sm font-semibold text-primary sm:text-base">
                {month}
              </span>
              <span className="text-xs text-muted sm:text-sm">{year}</span>
            </div>
          </div>
        </div>

        <div className="h-8 w-px bg-border sm:h-10" aria-hidden="true" />

        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:size-12">
            <Clock className="size-5 sm:size-6" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium uppercase tracking-wider text-muted">
              Saat
            </span>
            <div className="flex items-center gap-1 font-mono text-lg font-bold text-foreground sm:text-xl">
              <span>{hours}</span>
              <span className="text-primary">:</span>
              <span>{minutes}</span>
              <span className="text-primary">:</span>
              <span>{seconds}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="inline-flex items-center gap-4 rounded-2xl border border-primary/20 bg-card/80 p-4 shadow-lg backdrop-blur-xl sm:gap-6 sm:p-5"
      style={{ willChange: "transform, opacity" }}
    >
      {}
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:size-12">
          <Calendar className="size-5 sm:size-6" aria-hidden="true" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium uppercase tracking-wider text-muted">
            {dayName}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-foreground sm:text-xl">
              {day}
            </span>
            <span className="text-sm font-semibold text-primary sm:text-base">
              {month}
            </span>
            <span className="text-xs text-muted sm:text-sm">{year}</span>
          </div>
        </div>
      </div>

      {}
      <div className="h-8 w-px bg-border sm:h-10" aria-hidden="true" />

      {}
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:size-12">
          <Clock className="size-5 sm:size-6" aria-hidden="true" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium uppercase tracking-wider text-muted">
            Saat
          </span>
          <div className="flex items-center gap-1 font-mono text-lg font-bold text-foreground sm:text-xl">
            <span>{hours}</span>
            <span className="animate-pulse text-primary">:</span>
            <span>{minutes}</span>
            <span className="animate-pulse text-primary">:</span>
            <span>{seconds}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}