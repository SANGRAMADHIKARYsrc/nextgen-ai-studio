"use client";

import { useState } from "react";
import { Percent } from "lucide-react";
import { ToolPageLayout } from "@/components/ui/ToolComponents";

export default function PercentageCalculatorPage() {
  const [mode, setMode] = useState<"basic" | "increase" | "of">("basic");
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");

  const calculate = (): string => {
    const a = parseFloat(val1);
    const b = parseFloat(val2);
    if (isNaN(a) || isNaN(b)) return "—";

    switch (mode) {
      case "basic":
        return `${((a / b) * 100).toFixed(2)}%`;
      case "increase":
        return `${(((b - a) / a) * 100).toFixed(2)}%`;
      case "of":
        return `${((a / 100) * b).toFixed(2)}`;
      default:
        return "—";
    }
  };

  const getLabels = () => {
    switch (mode) {
      case "basic":
        return { a: "Value", b: "Total", question: "What % is {a} of {b}?" };
      case "increase":
        return { a: "From", b: "To", question: "% change from {a} to {b}" };
      case "of":
        return { a: "Percentage (%)", b: "Of Value", question: "{a}% of {b} =" };
    }
  };

  const labels = getLabels();

  return (
    <ToolPageLayout title="Percentage Calculator" description="Calculate percentages, discounts, and ratios" icon={Percent} color="#fbbf24" backHref="/dashboard/productivity">
      <div className="max-w-2xl mx-auto glass rounded-2xl p-6 space-y-6">
        {/* Mode Tabs */}
        <div className="flex gap-2 p-1 bg-[var(--color-surface)] rounded-xl">
          {([
            { key: "basic", label: "What % is A of B?" },
            { key: "increase", label: "% Change" },
            { key: "of", label: "A% of B" },
          ] as const).map((m) => (
            <button
              key={m.key}
              onClick={() => { setMode(m.key); setVal1(""); setVal2(""); }}
              className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                mode === m.key
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--color-muted-foreground)]">{labels.a}</label>
            <input
              type="number"
              value={val1}
              onChange={(e) => setVal1(e.target.value)}
              placeholder="0"
              className="w-full glass-card rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:border-[var(--color-primary)] transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--color-muted-foreground)]">{labels.b}</label>
            <input
              type="number"
              value={val2}
              onChange={(e) => setVal2(e.target.value)}
              placeholder="0"
              className="w-full glass-card rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:border-[var(--color-primary)] transition-all"
            />
          </div>
        </div>

        {/* Result */}
        <div className="text-center py-6 bg-[var(--color-surface)] rounded-xl">
          <p className="text-sm text-[var(--color-muted-foreground)] mb-2">Result</p>
          <p className="text-4xl font-bold gradient-text">{calculate()}</p>
        </div>
      </div>
    </ToolPageLayout>
  );
}
