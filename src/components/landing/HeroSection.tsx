"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ChevronRight } from "lucide-react";
import { getAvailableTools } from "@/lib/tools-config";

const rotatingWords = ["Writing", "Coding", "Detection", "Media", "Productivity"];

const stats = [
  { label: "AI Tools", value: "30+", color: "#7c5cfc" },
  { label: "Categories", value: "5", color: "#38bdf8" },
  { label: "Free to Use", value: "100%", color: "#34d399" },
  { label: "AI Engine", value: "Gemini", color: "#c084fc" },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const [prevWord, setPrevWord] = useState(-1);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setPrevWord(currentWord);
      setCurrentWord((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [currentWord]);

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-32 text-center">
      <div className={`transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass text-xs font-medium text-[var(--color-primary)] mb-10 animate-border-glow">
          <Sparkles className="w-3.5 h-3.5" />
          Powered by Google Gemini AI
          <ChevronRight className="w-3 h-3" />
        </div>

        {/* Headline with rotating text */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] mb-4">
          {getAvailableTools().length}+ Premium AI Tools.
        </h1>
        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8">
          One{" "}
          <span className="hero-word-wrapper">
            {rotatingWords.map((word, i) => (
              <span
                key={word}
                className={`hero-word gradient-text ${
                  i === currentWord ? "active" : i === prevWord ? "exit-up" : ""
                }`}
              >
                {word}.
              </span>
            ))}
          </span>
        </h2>

        {/* Subtext */}
        <p className="text-base sm:text-lg md:text-xl text-[var(--color-muted-foreground)] max-w-xl mx-auto mb-12 leading-relaxed">
          AI writing, coding, detection & productivity tools — all in one workspace. Free forever.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            href="/dashboard"
            className="group btn-primary !px-10 !py-4 !text-lg !rounded-2xl animate-pulse-glow flex items-center gap-3"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#features"
            className="btn-secondary !px-10 !py-4 !text-lg !rounded-2xl"
          >
            Explore Tools
          </a>
        </div>
      </div>

      {/* Stats */}
      <div
        className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card rounded-2xl p-5 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="text-xs text-[var(--color-muted-foreground)] mt-1.5">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
