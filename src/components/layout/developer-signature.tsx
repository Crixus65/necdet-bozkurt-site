"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { Code2, Smartphone, Search, Zap, Rocket } from "lucide-react";

export function DeveloperSignature() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const services = [
    { icon: Code2, text: "Kurumsal Web Siteleri" },
    { icon: Smartphone, text: "Mobil Uyumlu Tasarım" },
    { icon: Search, text: "SEO Optimizasyonu" },
    { icon: Zap, text: "Yüksek Performans" },
    { icon: Rocket, text: "Modern UI/UX" },
  ];

  return (
    <div className="mt-8 pt-8 border-t border-border">
      <div className="text-center">
        <p className="text-xs text-muted mb-2">Designed & Developed by</p>
        <div
          className="relative inline-block"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <motion.button
            className="relative group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative text-lg font-bold bg-gradient-to-r from-primary via-primary-hover to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Kaiuvu
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary-hover group-hover:w-full transition-all duration-300" />
          </motion.button>

          {}
          <AnimatePresence>
            {(isHovered || isMobileOpen) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-80 sm:w-96"
              >
                <div className="rounded-2xl border border-border bg-card/95 p-6 shadow-2xl backdrop-blur-xl">
                  {}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary-hover/20 text-primary">
                      <Code2 className="size-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground">👋 Merhaba!</h3>
                      <p className="text-xs text-muted">Modern Web Çözümleri</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted mb-4 leading-relaxed">
                    Bu web sitesi <span className="font-semibold text-primary">Kaiuvu</span> tarafından modern Next.js teknolojileri kullanılarak özel olarak geliştirilmiştir.
                  </p>

                  {}
                  <div className="space-y-2 mb-4">
                    {services.map((service, index) => (
                      <motion.div
                        key={service.text}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-2 text-sm text-muted"
                      >
                        <div className="flex size-6 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <service.icon className="size-3.5" aria-hidden="true" />
                        </div>
                        <span>{service.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  {}
                  <motion.a
                    href="https://wa.me/905307687995"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#20bd5a] hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaWhatsapp className="size-4" aria-hidden="true" />
                    WhatsApp ile İletişime Geç
                  </motion.a>

                  {}
                  <p className="mt-4 text-center text-xs text-muted leading-relaxed">
                    Siz de işletmeniz için modern ve profesyonel bir web sitesi yaptırmak isterseniz benimle iletişime geçebilirsiniz.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}