import Link from "next/link";

import { Mail, MapPin, Phone } from "lucide-react";

import { FaInstagram, FaWhatsapp } from "react-icons/fa";

import { Logo } from "@/components/ui/logo";

import { DeveloperSignature } from "@/components/layout/developer-signature";

import { Container } from "@/components/ui/container";

import {
  FOOTER_CORPORATE_LINKS,
  FOOTER_QUICK_LINKS,
  FOOTER_SERVICE_LINKS,
  WHATSAPP_URL,
} from "@/lib/constants";

import { siteConfig } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { contact, social } = siteConfig;

  return (
    <footer className="border-t border-border bg-card">
      <Container as="div" className="py-14 lg:py-16">
        <div className="mb-12 max-w-md">
          <Logo size="md" />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Profesyonel muhasebe, vergi danışmanlığı ve finansal çözümler ile
            işletmenizin güvenilir mali müşaviri.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex size-10 items-center justify-center rounded-xl border border-border bg-background text-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary hover:scale-110"
              aria-label="Instagram'da takip edin"
              title="Instagram'da takip edin"
            >
              <FaInstagram className="size-5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-10 items-center justify-center rounded-xl border border-border bg-background text-[#25D366] transition-all hover:border-[#25D366]/30 hover:bg-[#25D366]/5"
              aria-label="WhatsApp ile iletişime geç"
            >
              <FaWhatsapp className="size-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Kurumsal
            </h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_CORPORATE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 text-sm text-muted transition-all duration-300 hover:text-primary"
                  >
                    <span className="relative h-1.5 w-1.5 rounded-full bg-primary/40 transition-all duration-300 group-hover:w-3 group-hover:bg-primary" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Hizmetler
            </h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_SERVICE_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 text-sm text-muted transition-all duration-300 hover:text-primary"
                  >
                    <span className="relative h-1.5 w-1.5 rounded-full bg-primary/40 transition-all duration-300 group-hover:w-3 group-hover:bg-primary" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              İletişim
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href={`tel:${contact.phone}`}
                  className="group flex items-start gap-3 text-sm text-muted transition-all duration-300 hover:text-primary"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <Phone className="size-4" aria-hidden="true" />
                  </div>
                  <span className="mt-1">{contact.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="group flex items-start gap-3 text-sm text-muted transition-all duration-300 hover:text-primary"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <Mail className="size-4" aria-hidden="true" />
                  </div>
                  <span className="mt-1">{contact.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-muted">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="size-4" aria-hidden="true" />
                  </div>
                  <address className="mt-1 not-italic leading-relaxed">
                    {contact.address.lines.join(", ")}
                  </address>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Hızlı Linkler
            </h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_QUICK_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 text-sm text-muted transition-all duration-300 hover:text-primary"
                  >
                    <span className="relative h-1.5 w-1.5 rounded-full bg-primary/40 transition-all duration-300 group-hover:w-3 group-hover:bg-primary" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-center text-sm text-muted sm:text-left">
            © {currentYear} {siteConfig.author}. Tüm hakları saklıdır.
          </p>
          <p className="text-sm font-medium text-muted">
            Serbest Muhasebeci Mali Müşavir
          </p>
        </div>

        <DeveloperSignature />
      </Container>
    </footer>
  );
}