"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import {
  MotionWrapper,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/motion-wrapper";
import { SERVICES_LIST } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  return (
    <section
      id="hizmetler"
      className="section-spacing bg-card/50"
      aria-labelledby="services-heading"
    >
      <Container>
        <MotionWrapper variant="fade-up">
          <SectionHeading
            badge="Hizmetler"
            title="Kapsamlı Mali ve Vergi Hizmetleri"
            description="İşletmenizin ihtiyaç duyduğu tüm muhasebe, vergi ve danışmanlık hizmetlerini tek çatı altında sunuyoruz."
          />
        </MotionWrapper>

        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICES_LIST.map((service, index) => {
            const Icon = service.icon;

            return (
              <StaggerItem key={service.title}>
                <article
                  className={cn(
                    "group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft",
                    "transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-elevated",
                  )}
                >
                  <div
                    className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-primary/8 transition-transform duration-500 group-hover:scale-150"
                    aria-hidden="true"
                  />

                  <div className="relative">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>

                    <h3
                      id={index === 0 ? "services-heading" : undefined}
                      className="text-base font-semibold text-foreground"
                    >
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {service.description}
                    </p>

                    <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <span>Detaylı bilgi</span>
                      <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                    </div>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <MotionWrapper variant="fade-up" delay={0.2} className="mt-12 text-center">
          <Button asChild variant="secondary" size="lg">
            <Link href="/hizmetler">
              Tüm Hizmetleri Gör
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </MotionWrapper>
      </Container>
    </section>
  );
}
