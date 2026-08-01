"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_URL } from "@/lib/constants";

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
      }}
      transition={{ 
        delay: 1.2, 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      whileHover={{ scale: 1.1, y: -4 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-elevated transition-all hover:shadow-[0_12px_40px_-8px_rgba(37,211,102,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-8 sm:right-8"
      aria-label="WhatsApp ile iletişime geç"
      title="WhatsApp ile iletişime geç"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <FaWhatsapp className="size-7" aria-hidden="true" />
      </motion.div>
    </motion.a>
  );
}
