"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Sparkles, ArrowRight, ChevronRight } from "lucide-react";
import { toolCategories, getAvailableTools } from "@/lib/tools-config";
import MotionBackground from "@/components/layout/MotionBackground";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import ComparisonSection from "@/components/landing/ComparisonSection";
import FaqSection from "@/components/landing/FaqSection";
import StickyBar from "@/components/landing/StickyBar";

export default function LandingPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-background)] relative overflow-hidden">
      <MotionBackground />

      {/* Navbar */}
      <nav className="relative z-10 glass-strong sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">
                NextGen <span className="gradient-text">AI Studio</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors">Features</a>
              <a href="#categories" className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors">Categories</a>
              <a href="#faq" className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors">FAQs</a>
            </div>
            <Link href="/dashboard" className="btn-primary !py-2 !px-5 text-sm">
              Launch Studio
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <HeroSection />

      <div className="section-divider max-w-6xl mx-auto" />

      {/* Features */}
      <FeaturesSection />

      <div className="section-divider max-w-6xl mx-auto" />

      {/* Comparison */}
      <ComparisonSection />

      <div className="section-divider max-w-6xl mx-auto" />

      {/* Categories */}
      <section id="categories" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-14 scroll-reveal">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            <span className="gradient-text">{getAvailableTools().length}+ Tools</span> Across 5 Categories
          </h2>
          <p className="text-[var(--color-muted-foreground)] text-lg">
            Organized and ready to use
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 scroll-reveal">
          {toolCategories.map((cat) => {
            const Icon = cat.icon;
            const availableCount = cat.tools.filter((t) => t.available).length;
            return (
              <Link
                key={cat.id}
                href={`/dashboard/${cat.id}`}
                className="glass-card gradient-border rounded-2xl p-6 text-center group"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                  style={{ background: `${cat.color}12` }}
                >
                  <Icon className="w-6 h-6" style={{ color: cat.color }} />
                </div>
                <h3 className="font-bold mb-1">{cat.name}</h3>
                <p className="text-xs text-[var(--color-muted-foreground)] mb-4">
                  {availableCount} of {cat.tools.length} tools available
                </p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {cat.tools.slice(0, 3).map((tool) => (
                    <span key={tool.id} className="px-2.5 py-1 rounded-lg text-[10px] font-medium glass">
                      {tool.name}
                    </span>
                  ))}
                  {cat.tools.length > 3 && (
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-medium text-[var(--color-primary)]">
                      +{cat.tools.length - 3}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="section-divider max-w-6xl mx-auto" />

      {/* FAQ */}
      <FaqSection />

      <div className="section-divider max-w-6xl mx-auto" />

      {/* CTA */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center scroll-reveal">
        <div className="glass-card gradient-border p-12 sm:p-14 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute inset-0 gradient-primary opacity-[0.03]" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-[var(--color-primary)] mb-6">
              <Sparkles className="w-3 h-3" />
              No sign-up required
              <ChevronRight className="w-3 h-3" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Ready to Experience <span className="gradient-text">Smarter AI</span>?
            </h2>
            <p className="text-[var(--color-muted-foreground)] mb-8 max-w-md mx-auto">
              All tools free. No accounts. Start creating now.
            </p>
            <Link
              href="/dashboard"
              className="btn-primary !px-10 !py-4 !text-lg !rounded-2xl inline-flex items-center gap-3"
            >
              Launch Studio
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[var(--color-border)] py-8 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
            <span className="text-sm font-semibold">NextGen AI Studio</span>
          </div>
          <p className="text-xs text-[var(--color-muted)]">
            &copy; {new Date().getFullYear()} NextGen AI Studio. Built with Next.js & Gemini AI.
          </p>
        </div>
      </footer>

      {/* Sticky Bar */}
      <StickyBar />
    </div>
  );
}
