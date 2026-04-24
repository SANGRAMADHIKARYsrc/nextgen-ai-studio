"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "What is NextGen AI Studio?",
    a: "NextGen AI Studio is an all-in-one AI-powered platform with 30+ tools for writing, coding, detection, media, and productivity. It combines AI tools powered by Google Gemini with client-side utilities — all in a single, premium workspace.",
  },
  {
    q: "Is it really free?",
    a: "Yes, completely free. No sign-up required, no credit card, no hidden costs. Just open the studio and start using any available tool instantly.",
  },
  {
    q: "What AI model powers the tools?",
    a: "Our AI-powered tools use Google Gemini 2.0 Flash — one of the fastest and most capable AI models available. Client-side tools (calculators, QR generator, etc.) run directly in your browser with zero latency.",
  },
  {
    q: "How many tools are available?",
    a: "Currently 25+ tools are fully functional across 5 categories: AI Writing (8 tools), Detection & Analysis (5 tools), Developer Tools (5 tools), Productivity (5 tools), and Media (1 tool with more coming soon).",
  },
  {
    q: "Do I need to create an account?",
    a: "No account needed. All tools are accessible immediately. Your data is processed in real-time and never stored on our servers.",
  },
  {
    q: "Is my data safe?",
    a: "Absolutely. We follow a privacy-first approach. AI-powered tools send data to Google Gemini for processing but we never store your inputs or outputs. Client-side tools process everything locally in your browser.",
  },
  {
    q: "Can I use it on mobile?",
    a: "Yes! NextGen AI Studio is fully responsive and works beautifully on phones, tablets, and desktops. No app installation needed — just open it in your browser.",
  },
  {
    q: "Will new tools be added?",
    a: "Yes! We're actively developing new tools including OCR (image to text), background removal, image conversion, and more media tools. All future additions will remain free.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-14 scroll-reveal">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-5">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
        <p className="text-[var(--color-muted-foreground)] text-lg">
          Everything you need to know about NextGen AI Studio
        </p>
      </div>

      <div className="space-y-3 scroll-reveal">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`faq-item ${openIndex === i ? "open" : ""}`}
          >
            <button
              className="faq-trigger"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="flex-1 text-center">{faq.q}</span>
              <Plus className="w-5 h-5 faq-icon text-[var(--color-primary)]" />
            </button>
            <div className="faq-answer">
              <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed text-center">
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
