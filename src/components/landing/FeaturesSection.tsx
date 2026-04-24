"use client";

import {
  PenTool, Code2, Shield, Image, Zap,
  Check,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface FeatureData {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bullets: string[];
}

const features: FeatureData[] = [
  {
    title: "AI Writing & Content",
    description: "Grammar fix, blog generation, cover letters, paraphrasing & more",
    icon: PenTool,
    color: "#6366f1",
    bullets: ["8 writing tools", "Powered by Gemini AI", "Instant results"],
  },
  {
    title: "Developer Tools",
    description: "Code explanation, conversion, API testing, JSON & Markdown",
    icon: Code2,
    color: "#06b6d4",
    bullets: ["5 dev utilities", "Client-side processing", "Zero latency"],
  },
  {
    title: "Detection & Analysis",
    description: "AI detection, sentiment analysis, ATS scoring & toxicity checks",
    icon: Shield,
    color: "#22c55e",
    bullets: ["5 analysis tools", "Detailed reports", "AI-powered insights"],
  },
  {
    title: "Media Tools",
    description: "Text-to-speech with 50+ voices, adjustable rate & pitch",
    icon: Image,
    color: "#f472b6",
    bullets: ["Voice synthesis", "50+ voice options", "More coming soon"],
  },
  {
    title: "Productivity Suite",
    description: "QR codes, passwords, EMI calculator, unit & percentage converters",
    icon: Zap,
    color: "#f59e0b",
    bullets: ["5 utility tools", "Runs locally", "Blazing fast"],
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16 scroll-reveal">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
          One Platform.{" "}
          <span className="gradient-text">Infinite Possibilities.</span>
        </h2>
        <p className="text-[var(--color-muted-foreground)] text-lg">
          Every tool designed to amplify your productivity
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 scroll-reveal">
        {features.map((feat) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.title}
              className="glass-card rounded-2xl p-7 text-center group"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform"
                style={{ background: `${feat.color}12` }}
              >
                <Icon className="w-7 h-7" style={{ color: feat.color }} />
              </div>
              <h3 className="text-lg font-bold mb-2">{feat.title}</h3>
              <p className="text-sm text-[var(--color-muted-foreground)] mb-5 leading-relaxed">
                {feat.description}
              </p>
              <ul className="space-y-2">
                {feat.bullets.map((b) => (
                  <li key={b} className="flex items-center justify-center gap-2 text-sm text-[var(--color-muted-foreground)]">
                    <Check className="w-3.5 h-3.5 shrink-0" style={{ color: feat.color }} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
