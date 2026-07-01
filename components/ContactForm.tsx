"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent";

/**
 * Progressive-enhancement contact form.
 *
 * By default it composes a mailto: link (works with zero backend, perfect for
 * a static Netlify deploy). To use Netlify Forms instead, add `data-netlify`
 * attributes — see the commented block below.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}\n${email}`
    );
    // Open the user's mail client with a prefilled message.
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" placeholder="Your name" required />
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="you@email.com"
          required
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-midnight/80"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="What would you like to build, trade, shoot or talk about?"
          className="w-full rounded-xl border border-midnight/15 bg-white/70 px-4 py-3 text-sm outline-none transition-colors focus:border-electric focus:ring-2 focus:ring-electric/20"
        />
      </div>

      <motion.button
        type="submit"
        whileTap={{ scale: 0.98 }}
        disabled={status === "sending"}
        className="btn-primary w-full sm:w-auto"
      >
        {status === "sent"
          ? "Opening your mail app…"
          : status === "sending"
            ? "Preparing…"
            : "Send message"}
      </motion.button>

      {status === "sent" && (
        <p className="text-sm text-horizon-600">
          Your email client should have opened. Prefer WhatsApp? Use the button
          in the corner.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-midnight/80"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-midnight/15 bg-white/70 px-4 py-3 text-sm outline-none transition-colors focus:border-electric focus:ring-2 focus:ring-electric/20"
      />
    </div>
  );
}
