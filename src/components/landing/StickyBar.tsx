"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function StickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`sticky-cta-bar ${visible ? "visible" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
          <span className="text-sm font-medium">
            NextGen <span className="gradient-text">AI Studio</span>
          </span>
          <span className="text-xs text-[var(--color-muted)]">
            — 30+ AI tools, completely free
          </span>
        </div>
        <Link
          href="/dashboard"
          className="btn-primary !py-2.5 !px-6 text-sm flex items-center gap-2 ml-auto"
        >
          Launch Studio
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
