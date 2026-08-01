"use client";

import { MapPin, Navigation, Star } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { MotionWrapper } from "@/components/animations/motion-wrapper";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GoogleMapProps {
  className?: string;
}

export function GoogleMap({ className }: GoogleMapProps) {
  const { maps, contact } = siteConfig;

  return (
    <section className="section-spacing border-t border-border bg-background" aria-labelledby="map-heading">
      <Container>
        <MotionWrapper variant="fade-up">
          <div className="text-center mb-12">
            <h2 id="map-heading" className="text-3xl font-bold text-foreground">
              Ofis Konumumuz
            </h2>
            <p className="mt-3 text-base text-muted max-w-2xl mx-auto">
              Ziyaret etmek için bize ulaşın. Size en iyi hizmeti sunmak için buradayız.
            </p>
          </div>
        </MotionWrapper>

        <MotionWrapper variant="fade-up" delay={0.1}>
          <div className="grid gap-8 lg:grid-cols-3">
            {}
            <div className="lg:col-span-2">
              <div className={cn("overflow-hidden rounded-3xl border border-border shadow-xl", className)}>
                <iframe
                  src={maps.embedUrl}
                  title="Necdet Bozkurt SMMM Ofis Konumu"
                  className="aspect-[16/9] w-full border-0"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>

            {}
            <div className="flex flex-col gap-6">
              {}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 rounded-3xl border border-border bg-card/80 p-6 shadow-lg backdrop-blur-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MapPin className="size-6" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">Ofisimiz</h3>
                    <p className="mt-1 text-base font-semibold text-primary">Necdet BOZKURT</p>
                    <p className="mt-0.5 text-sm text-muted">Serbest Muhasebeci Mali Müşavir</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                    <address className="text-sm leading-relaxed text-muted not-italic">
                      {contact.address.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted">
                    <Star className="size-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                    <span className="font-medium">Google Maps</span>
                  </div>
                </div>
              </motion.div>

              {}
              <motion.a
                href={maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-primary-hover hover:shadow-xl"
              >
                <Navigation className="size-5" aria-hidden="true" />
                Yol Tarifi Al
              </motion.a>
            </div>
          </div>
        </MotionWrapper>
      </Container>
    </section>
  );
}