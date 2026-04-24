"use client";

import { useState, useEffect } from "react";
import { Calculator } from "lucide-react";
import { ToolPageLayout } from "@/components/ui/ToolComponents";

export default function EmiCalculatorPage() {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(10);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const r = rate / 12 / 100;
    const n = tenure;
    if (r === 0) {
      const e = principal / n;
      setEmi(e);
      setTotalAmount(principal);
      setTotalInterest(0);
    } else {
      const e = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setEmi(e);
      setTotalAmount(e * n);
      setTotalInterest(e * n - principal);
    }
  }, [principal, rate, tenure]);

  const fmt = (n: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  const principalPercentage = (principal / totalAmount) * 100;

  return (
    <ToolPageLayout title="EMI Calculator" description="Calculate monthly installments for loans" icon={Calculator} color="#fbbf24" backHref="/dashboard/productivity">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="glass-card rounded-2xl p-7 space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[var(--color-muted-foreground)]">Loan Amount</span>
              <span className="font-mono font-bold">{fmt(principal)}</span>
            </div>
            <input type="range" min={10000} max={10000000} step={10000} value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full accent-[var(--color-primary)]" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[var(--color-muted-foreground)]">Interest Rate (% p.a.)</span>
              <span className="font-mono font-bold">{rate}%</span>
            </div>
            <input type="range" min={1} max={30} step={0.5} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-[var(--color-primary)]" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[var(--color-muted-foreground)]">Tenure (months)</span>
              <span className="font-mono font-bold">{tenure} months</span>
            </div>
            <input type="range" min={1} max={360} value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full accent-[var(--color-primary)]" />
          </div>
        </div>

        {/* Results */}
        <div className="glass-card rounded-2xl p-7">
          <div className="text-center mb-6">
            <p className="text-sm text-[var(--color-muted-foreground)] mb-1">Monthly EMI</p>
            <p className="text-4xl font-bold gradient-text">{fmt(emi)}</p>
          </div>

          {/* Visual breakdown */}
          <div className="mb-6">
            <div className="h-4 rounded-full overflow-hidden flex">
              <div className="bg-[var(--color-primary)] transition-all" style={{ width: `${principalPercentage}%` }} />
              <div className="bg-[var(--color-accent-2)] flex-1" />
            </div>
            <div className="flex justify-between mt-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                <span className="text-[var(--color-muted-foreground)]">Principal</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[var(--color-accent-2)]" />
                <span className="text-[var(--color-muted-foreground)]">Interest</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between py-3 border-b border-[var(--color-border)]">
              <span className="text-sm text-[var(--color-muted-foreground)]">Principal Amount</span>
              <span className="font-semibold">{fmt(principal)}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-[var(--color-border)]">
              <span className="text-sm text-[var(--color-muted-foreground)]">Total Interest</span>
              <span className="font-semibold text-[var(--color-accent-2)]">{fmt(totalInterest)}</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-sm text-[var(--color-muted-foreground)]">Total Amount</span>
              <span className="font-semibold text-lg">{fmt(totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
