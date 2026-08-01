"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { ContactSection } from "@/components/sections/contact-section";
import { GoogleMap } from "@/components/sections/google-map";
import { MotionWrapper } from "@/components/animations/motion-wrapper";
import { Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function IletisimPage() {
  const [activeTab, setActiveTab] = useState<"form" | "location">("form");

  return (
    <>
      <section
        className="border-b border-border bg-card/30 pt-28 pb-12 sm:pt-32 sm:pb-16"
        aria-labelledby="iletisim-page-heading"
      >
        <Container>
          <MotionWrapper variant="fade-up">
            <div className="mx-auto max-w-2xl text-center">
              <span className="mb-4 inline-flex items-center rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                İletişim
              </span>
              <h1
                id="iletisim-page-heading"
                className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              >
                Bizimle İletişime Geçin
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                Sorularınız ve danışmanlık talepleriniz için formu doldurun veya
                doğrudan bize ulaşın.
              </p>
            </div>
          </MotionWrapper>
        </Container>
      </section>

      <section className="section-spacing border-b border-border bg-background">
        <Container>
          {}
          <div className="mb-8 flex justify-center gap-2 rounded-2xl bg-card/50 p-1.5 backdrop-blur-sm sm:gap-3">
            <motion.button
              onClick={() => setActiveTab("form")}
              className={cn(
                "relative flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300",
                activeTab === "form"
                  ? "text-foreground"
                  : "text-muted hover:text-foreground"
              )}
              whileTap={{ scale: 0.98 }}
            >
              {activeTab === "form" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl bg-background shadow-soft"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Mail className="relative z-10 size-4" aria-hidden="true" />
              <span className="relative z-10">İletişim Formu</span>
            </motion.button>

            <motion.button
              onClick={() => setActiveTab("location")}
              className={cn(
                "relative flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300",
                activeTab === "location"
                  ? "text-foreground"
                  : "text-muted hover:text-foreground"
              )}
              whileTap={{ scale: 0.98 }}
            >
              {activeTab === "location" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl bg-background shadow-soft"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <MapPin className="relative z-10 size-4" aria-hidden="true" />
              <span className="relative z-10">Konum</span>
            </motion.button>
          </div>

          {}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "form" ? (
              <ContactSection showHeading={false} />
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <GoogleMap />
              </div>
            )}
          </motion.div>
        </Container>
      </section>
    </>
  );
}
