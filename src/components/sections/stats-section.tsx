"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { MotionWrapper } from "@/components/animations/motion-wrapper";
import { STATS_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

function AnimatedNumber({
  value,
  suffix = "",
  duration = 2000,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const startTime = performance.now();
    const startValue = value > 1000 ? value - 20 : 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (value - startValue) * eased);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section
      className="section-spacing relative overflow-hidden border-y border-border bg-primary"
      aria-labelledby="stats-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.12)_0%,_transparent_50%)]"
        aria-hidden="true"
      />

      <Container className="relative">
        <MotionWrapper variant="fade-up">
          <SectionHeading
            badge="Rakamlarla Biz"
            title="Güvenin Sayılarla Kanıtı"
            description="Yılların deneyimi ve müşteri memnuniyeti odaklı hizmet anlayışımız."
            className="[&_h2]:text-white [&_p]:text-white/75 [&_span]:border-white/20 [&_span]:bg-white/10 [&_span]:text-white"
          />
        </MotionWrapper>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS_ITEMS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                "rounded-2xl border border-white/15 bg-white/10 p-6 text-center backdrop-blur-sm",
                "transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-lg",
              )}
            >
              <p
                id={index === 0 ? "stats-heading" : undefined}
                className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
              >
                {stat.type === "number" ? (
                  <AnimatedNumber value={stat.value as number} suffix={stat.suffix} />
                ) : (
                  <>
                    {stat.value}
                    {stat.suffix}
                  </>
                )}
              </p>
              <p className="mt-2 text-sm font-medium text-white/75">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
