import { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { MotionWrapper, StaggerContainer, StaggerItem } from "@/components/animations/motion-wrapper";
import { SERVICES_LIST } from "@/lib/constants";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { metadata as rootMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...rootMetadata,
  title: "Hizmetler | Necdet Bozkurt SMMM",
  description: "Muhasebe, vergi danışmanlığı, şirket kuruluşu, SGK işlemleri, bordrolama ve finansal danışmanlık hizmetleri.",
};

export default function HizmetlerPage() {
  return (
    <div className="section-spacing">
      <Container>
        <MotionWrapper variant="fade-up">
          <SectionHeading
            badge="Hizmetler"
            title="Kapsamlı Mali ve Vergi Hizmetleri"
            description="İşletmenizin ihtiyaç duyduğu tüm muhasebe, vergi ve danışmanlık hizmetlerini tek çatı altında sunuyoruz."
          />
        </MotionWrapper>

        <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES_LIST.map((service) => {
            const Icon = service.icon;

            return (
              <StaggerItem key={service.title}>
                <div
                  className="group h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-card"
                >
                  <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <MotionWrapper variant="fade-up" delay={0.2} className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/iletisim">
              Danışmanlık Alın
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </MotionWrapper>
      </Container>
    </div>
  );
}