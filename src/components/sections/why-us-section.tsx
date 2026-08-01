"use client";

import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  MotionWrapper,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/motion-wrapper";
import { WHY_US_ICONS, WHY_US_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function WhyUsSection() {
  return (
    <section
      id="neden-biz"
      className="section-spacing border-t border-border bg-background"
      aria-labelledby="why-us-heading"
    >
      <Container>
        <MotionWrapper variant="fade-up">
          <SectionHeading
            badge="Neden Biz"
            title="Güvenilir Mali Müşavirlik Ortağınız"
            description="2012'den bu yana işletmenizin mali süreçlerinde profesyonel, şeffaf ve güvenilir hizmet sunuyoruz."
          />
        </MotionWrapper>

        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {WHY_US_ITEMS.map((item, index) => {
            const Icon = WHY_US_ICONS[index] ?? Check;

            return (
              <StaggerItem key={item.title}>
                <MotionCard className="group h-full">
                  <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                  <div className="mb-3 flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 size-5 shrink-0 text-primary transition-transform duration-300 group-hover:scale-110"
                      aria-hidden="true"
                    />
                    <h3
                      id={index === 0 ? "why-us-heading" : undefined}
                      className="text-base font-semibold text-foreground"
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </MotionCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Container>
    </section>
  );
}

function MotionCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300",
        "hover:-translate-y-1 hover:border-primary/25 hover:shadow-card",
        className,
      )}
    >
      {children}
    </div>
  );
}
