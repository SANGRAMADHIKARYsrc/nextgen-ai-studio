"use client";

import { Check, X } from "lucide-react";

const oldProblems = [
  "Multiple subscriptions & accounts",
  "Constant tab switching",
  "Inconsistent experience",
  "Costs $49+/month",
];

const studioFeatures = [
  "30+ tools in one platform",
  "Powered by Gemini AI",
  "Premium UI, zero ads",
  "No account needed",
  "100% free forever",
];

export default function ComparisonSection() {
  return (
    <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-14 scroll-reveal">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
          Everything for{" "}
          <span className="gradient-text">Free</span>
        </h2>
        <p className="text-[var(--color-muted-foreground)] text-lg">
          Stop paying for tools separately
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-stretch gap-5 scroll-reveal">
        {/* Old Way */}
        <div className="flex-1 glass-card rounded-2xl p-7 text-center opacity-60">
          <p className="text-sm text-[var(--color-muted-foreground)] mb-1">The old way</p>
          <p className="text-3xl font-extrabold text-[var(--color-error)] mb-6">$49+/mo</p>
          <div className="space-y-3">
            {oldProblems.map((p) => (
              <div key={p} className="flex items-center justify-center gap-2.5 text-sm text-[var(--color-muted-foreground)]">
                <X className="w-4 h-4 text-[var(--color-error)] shrink-0" />
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* VS Badge */}
        <div className="flex items-center justify-center py-3 md:py-0">
          <div className="vs-badge">VS</div>
        </div>

        {/* NextGen */}
        <div className="flex-1 glass-card rounded-2xl p-7 text-center comparison-winner">
          <p className="text-sm text-[var(--color-muted-foreground)] mb-1">NextGen AI Studio</p>
          <p className="text-3xl font-extrabold gradient-text mb-6">FREE</p>
          <div className="space-y-3">
            {studioFeatures.map((f) => (
              <div key={f} className="flex items-center justify-center gap-2.5 text-sm">
                <span className="w-5 h-5 rounded-full bg-[var(--color-success)]/15 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[var(--color-success)]" />
                </span>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
