"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/sections/contact-form";
import { MotionWrapper } from "@/components/animations/motion-wrapper";
import { siteConfig } from "@/config/site";
import { WHATSAPP_URL } from "@/lib/constants";

interface ContactSectionProps {
  showHeading?: boolean;
}

export function ContactSection({ showHeading = true }: ContactSectionProps) {
  const { contact, social } = siteConfig;

  return (
    <section
      id="iletisim"
      className="section-spacing border-t border-border bg-background"
      aria-labelledby="contact-heading"
    >
      <Container>
        {showHeading && (
          <MotionWrapper variant="fade-up">
            <SectionHeading
              badge="İletişim"
              title="Bizimle İletişime Geçin"
              description="Sorularınız ve danışmanlık talepleriniz için formu doldurun veya doğrudan bize ulaşın."
            />
          </MotionWrapper>
        )}

        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
        <MotionWrapper variant="fade-left" className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Serbest Muhasebeci Mali Müşavir
              </p>
              <h3
                id="contact-heading"
                className="mt-2 text-2xl font-bold text-foreground"
              >
                Necdet BOZKURT
              </h3>

              <ul className="mt-8 space-y-5" aria-label="İletişim bilgileri">
                <li>
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-start gap-3.5 rounded-xl p-3 transition-all duration-300 hover:bg-primary/5 hover:shadow-sm"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Phone className="size-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted">Telefon</p>
                      <p className="mt-1 text-sm font-semibold text-foreground">{contact.phoneDisplay}</p>
                    </div>
                  </a>
                </li>

                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-start gap-3.5 rounded-xl p-3 transition-all duration-300 hover:bg-primary/5 hover:shadow-sm"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Mail className="size-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted">E-Posta</p>
                      <p className="mt-1 text-sm font-semibold text-foreground">{contact.email}</p>
                    </div>
                  </a>
                </li>

                <li>
                  <div className="flex items-start gap-3.5 rounded-xl p-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <MapPin className="size-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted">Adres</p>
                      <address className="mt-1 text-sm font-semibold text-foreground not-italic">
                        {contact.address.lines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </address>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="flex items-start gap-3.5 rounded-xl p-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Clock className="size-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted">Çalışma Saatleri</p>
                      <p className="mt-1 text-sm font-semibold text-foreground">
                        {contact.workingHours.start} — {contact.workingHours.end}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>

              <div className="mt-8 flex gap-3 border-t border-border pt-6">
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-11 items-center justify-center rounded-xl border border-border bg-background text-foreground transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:text-primary hover:scale-110"
                  aria-label="Instagram'da takip edin"
                >
                  <FaInstagram className="size-5" aria-hidden="true" />
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-11 items-center justify-center rounded-xl border border-border bg-background text-[#25D366] transition-all duration-300 hover:border-[#25D366]/30 hover:bg-[#25D366]/5 hover:scale-110"
                  aria-label="WhatsApp ile iletişime geç"
                >
                  <FaWhatsapp className="size-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </MotionWrapper>

          <MotionWrapper variant="fade-right" delay={0.1} className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
              <h3 className="mb-6 text-lg font-semibold text-foreground">
                Mesaj Gönderin
              </h3>
              <ContactForm />
            </div>
          </MotionWrapper>
        </div>
      </Container>
    </section>
  );
}
