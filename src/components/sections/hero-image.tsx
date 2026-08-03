"use client";

import { useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MotionWrapper } from "@/components/animations/motion-wrapper";

function HeroPlaceholder() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-primary/5 via-card to-primary/10 p-8">
      <div className="flex size-24 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <User className="size-12" strokeWidth={1.5} />
      </div>
      <div className="text-center">
        <p className="text-lg font-semibold text-foreground">Necdet BOZKURT</p>
        <p className="mt-1 text-sm text-muted">Serbest Muhasebeci Mali Müşavir</p>
      </div>
    </div>
  );
}

export function HeroImage() {
  const [hasError, setHasError] = useState(false);

  return (
    <MotionWrapper variant="fade-right" delay={0.2}>
      <div className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-xs xl:max-w-sm">
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[70px]"
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
          style={{ willChange: "opacity, transform" }}
        />

        <div
          className="absolute -right-3 -top-3 h-20 w-20 rounded-2xl bg-primary/8 lg:h-24 lg:w-24"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-3 -left-3 h-16 w-16 rounded-full bg-primary/10 lg:h-20 lg:w-20"
          aria-hidden="true"
        />

        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-elevated",
            "ring-1 ring-primary/15",
          )}
        >
          <div className="relative aspect-[3/4] w-full p-4 sm:p-5">
            {hasError ? (
              <HeroPlaceholder />
            ) : (
              <Image
                src="/necdet 2.jpg"
                alt="Serbest Muhasebeci Mali Müşavir Necdet BOZKURT"
                fill
                priority
                quality={100}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 320px"
                className="object-contain"
                onError={() => setHasError(true)}
              />
            )}
          </div>

          <div className="border-t border-border bg-card/90 p-2.5 sm:p-3 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <span className="text-sm font-bold text-primary">NB</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Necdet BOZKURT</p>
                <p className="text-xs text-muted">Serbest Muhasebeci Mali Müşavir</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionWrapper>
  );
}
