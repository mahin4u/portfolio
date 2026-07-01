"use client";

import { motion } from "framer-motion";
import { whatsappLink } from "@/lib/site";

/**
 * Global floating action button linking to WhatsApp Click-to-Chat.
 * Rendered once from the root layout so it's present on every page.
 */
export function WhatsAppButton() {
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/20"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20 group-hover:opacity-30" />
      <svg
        viewBox="0 0 32 32"
        className="relative h-7 w-7 fill-white"
        aria-hidden="true"
      >
        <path d="M16.003 3C9.383 3 4 8.383 4 15.003c0 2.117.553 4.185 1.603 6.008L4 29l8.16-1.57a11.94 11.94 0 0 0 3.84.63h.003C22.62 28.06 28 22.677 28 16.057 28 9.437 22.623 3 16.003 3zm0 21.86h-.002a9.9 9.9 0 0 1-3.42-.62l-.245-.09-4.842.93.918-4.72-.16-.242a9.86 9.86 0 0 1-1.51-5.263c0-5.49 4.47-9.96 9.965-9.96 2.66 0 5.16 1.037 7.04 2.92a9.88 9.88 0 0 1 2.918 7.05c0 5.49-4.47 9.96-9.96 9.96zm5.46-7.46c-.3-.15-1.77-.874-2.045-.974-.274-.1-.474-.15-.674.15-.2.3-.774.974-.95 1.174-.174.2-.35.224-.65.075-.3-.15-1.264-.466-2.408-1.485-.89-.794-1.49-1.774-1.665-2.074-.174-.3-.02-.462.13-.611.134-.134.3-.35.45-.524.15-.174.2-.3.3-.5.1-.2.05-.374-.025-.524-.075-.15-.674-1.624-.924-2.224-.243-.583-.49-.504-.674-.514l-.574-.01c-.2 0-.524.075-.8.374-.274.3-1.05 1.024-1.05 2.498 0 1.474 1.075 2.898 1.224 3.098.15.2 2.114 3.228 5.12 4.525.716.31 1.274.494 1.71.632.718.228 1.372.196 1.888.12.576-.086 1.77-.724 2.02-1.424.25-.7.25-1.3.174-1.424-.074-.124-.274-.2-.574-.35z" />
      </svg>
    </motion.a>
  );
}
