"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useScrollSpy } from "@/hooks/use-scroll-spy";

function AnimatedMenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative size-5" aria-hidden="true">
      <motion.span
        className="absolute left-0 top-1 h-0.5 w-5 rounded-full bg-current"
        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="absolute left-0 top-[9px] h-0.5 w-5 rounded-full bg-current"
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        className="absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current"
        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const activeSection = useScrollSpy();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleSmoothScroll = useCallback((href: string) => {
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      const target = document.getElementById(targetId);
      if (target) {
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    }
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          isScrolled ? "py-2" : "py-4",
        )}
      >
        <Container>
          <nav
            className={cn(
              "flex items-center justify-between rounded-2xl px-4 transition-all duration-500 sm:px-6",
              isScrolled
                ? "glass-dark border border-border/60 py-2 shadow-elevated backdrop-blur-2xl"
                : "border border-transparent bg-transparent py-3",
            )}
            aria-label="Ana navigasyon"
          >
            <Link
              href="/"
              className="relative z-10 shrink-0 transition-opacity hover:opacity-80"
              aria-label="Ana sayfaya git"
            >
              <motion.div
                animate={{ scale: isScrolled ? 0.92 : 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <Logo size={isScrolled ? "sm" : "md"} />
              </motion.div>
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {NAV_ITEMS.map((item) => {
                const isHomePage = pathname === "/";
                const sectionId = item.href.startsWith("/#") ? item.href.replace("/#", "") : "";
                const isActive = isHomePage && sectionId ? activeSection === sectionId : pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        if (item.href.startsWith("/#")) {
                          e.preventDefault();
                          handleSmoothScroll(item.href);
                        }
                      }}
                      className={cn(
                        "relative rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300",
                        isActive
                          ? "text-primary"
                          : "text-foreground/70 hover:text-primary",
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-primary"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="hidden items-center gap-3 lg:flex">
              <ThemeToggle />
              <Button asChild size="sm">
                <Link href="/iletisim">İletişime Geç</Link>
              </Button>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                type="button"
                className={cn(
                  "relative z-10 flex size-10 items-center justify-center rounded-xl",
                  "border border-border bg-card text-foreground transition-colors",
                  "hover:border-primary/30 hover:bg-primary/5 hover:text-primary",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
                onClick={() => setIsMobileOpen((prev) => !prev)}
                aria-expanded={isMobileOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileOpen ? "Menüyü kapat" : "Menüyü aç"}
              >
                <AnimatedMenuIcon isOpen={isMobileOpen} />
              </button>
            </div>
          </nav>
        </Container>
      </header>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-foreground/25 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-4 top-[72px] z-50 overflow-hidden rounded-2xl border border-border bg-card shadow-elevated lg:hidden"
            >
              <nav className="flex flex-col p-4" aria-label="Mobil navigasyon">
                <ul className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item, index) => {
                    const isHomePage = pathname === "/";
                    const sectionId = item.href.startsWith("/#") ? item.href.replace("/#", "") : "";
                    const isActive = isHomePage && sectionId ? activeSection === sectionId : pathname === item.href;

                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <Link
                          href={item.href}
                          onClick={(e) => {
                            if (item.href.startsWith("/#")) {
                              e.preventDefault();
                              handleSmoothScroll(item.href);
                              setIsMobileOpen(false);
                            }
                          }}
                          className={cn(
                            "flex items-center rounded-xl px-4 py-3 text-base font-medium transition-colors",
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-foreground hover:bg-background",
                          )}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                <div className="mt-4 border-t border-border pt-4">
                  <Button asChild className="w-full">
                    <Link href="/iletisim">İletişime Geç</Link>
                  </Button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}