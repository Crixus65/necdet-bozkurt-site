"use client";

import Link from "next/link";

import { ArrowRight, CheckCircle2 } from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

import { Container } from "@/components/ui/container";

import { HeroImage } from "@/components/sections/hero-image";

import { DateCard } from "@/components/sections/date-card";

import {

  MotionWrapper,

  StaggerContainer,

  StaggerItem,

} from "@/components/animations/motion-wrapper";

import { HERO_SERVICES, WHATSAPP_URL } from "@/lib/constants";



export function HeroSection() {

  return (

    <section

      id="hero"

      className="relative overflow-hidden pt-16 pb-8 sm:pt-20 sm:pb-10 lg:pt-24 lg:pb-12"

      aria-labelledby="hero-heading"

    >

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {}
        <motion.div
          className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {}
        <motion.div
          className="absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-primary/15 blur-[100px]"
          animate={{
            opacity: [0.25, 0.5, 0.25],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        {}
        <motion.div
          className="absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-primary/10 blur-[80px]"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        {}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-primary)_0%,_transparent_50%)] opacity-[0.06]" />
      </div>



      <Container className="relative">

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">

          <div className="order-2 lg:order-1">

            <MotionWrapper variant="fade-up">

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5">

                <CheckCircle2 className="size-4 text-primary" />

                <span className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">

                  Güvenilir Mali Müşavirlik

                </span>

              </div>

            </MotionWrapper>

            

            <MotionWrapper variant="fade-up" delay={0.05}>

              <DateCard />

            </MotionWrapper>



            <MotionWrapper variant="fade-up" delay={0.1}>

              <h1

                id="hero-heading"

                className="text-balance text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.25rem]"

              >

                <span className="block text-primary">SERBEST MUHASEBECİ</span>

                <span className="block text-primary">MALİ MÜŞAVİR</span>

              </h1>

            </MotionWrapper>



            <MotionWrapper variant="fade-up" delay={0.15}>

              <p className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-[2.5rem] md:text-4xl">

                Necdet BOZKURT

              </p>

            </MotionWrapper>



            <StaggerContainer className="mt-8 flex flex-wrap gap-2.5" staggerDelay={0.06}>

              {HERO_SERVICES.map((service) => (

                <StaggerItem key={service}>

                  <span className="inline-flex items-center rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-card">

                    {service}

                  </span>

                </StaggerItem>

              ))}

            </StaggerContainer>



            <MotionWrapper variant="fade-up" delay={0.3}>

              <p className="mt-8 max-w-lg text-base leading-relaxed text-muted sm:text-lg">

                İşletmenizin mali süreçlerini profesyonelce yönetiyor, vergi

                mevzuatına uyumlu ve sürdürülebilir finansal çözümler sunuyoruz.

              </p>

            </MotionWrapper>



            <MotionWrapper variant="fade-up" delay={0.4}>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">

                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="w-full sm:w-auto"
                >

                  <Button asChild size="lg" className="group w-full shadow-card">

                    <Link href="/iletisim">

                      İletişime Geç

                      <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />

                    </Link>

                  </Button>

                </motion.div>



                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="w-full sm:w-auto"
                >

                  <Button

                    asChild

                    variant="whatsapp"

                    size="lg"

                    className="w-full"

                  >

                    <a

                      href={WHATSAPP_URL}

                      target="_blank"

                      rel="noopener noreferrer"

                      aria-label="WhatsApp ile iletişime geç"

                    >

                      <FaWhatsapp className="size-5" />

                      WhatsApp

                    </a>

                  </Button>

                </motion.div>

              </div>

            </MotionWrapper>

          </div>



          <div className="order-1 lg:order-2">

            <HeroImage />

          </div>

        </div>

      </Container>

    </section>

  );

}

