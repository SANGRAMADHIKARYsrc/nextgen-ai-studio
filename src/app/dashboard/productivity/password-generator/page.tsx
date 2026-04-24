"use client";

import { useState, useCallback } from "react";
import { Lock, Copy, Check, RefreshCw } from "lucide-react";
import { ToolPageLayout } from "@/components/ui/ToolComponents";

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const generatePassword = useCallback(() => {
    let chars = "";
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) chars = "abcdefghijklmnopqrstuvwxyz";

    let result = "";
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);
    setHistory((prev) => [result, ...prev].slice(0, 5));
  }, [length, uppercase, lowercase, numbers, symbols]);

  const copyPassword = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    let score = 0;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (uppercase) score++;
    if (numbers) score++;
    if (symbols) score++;
    if (score <= 2) return { label: "Weak", color: "var(--color-error)", width: "33%" };
    if (score <= 3) return { label: "Medium", color: "var(--color-warning)", width: "66%" };
    return { label: "Strong", color: "var(--color-success)", width: "100%" };
  };

  const strength = getStrength();

  return (
    <ToolPageLayout title="Password Generator" description="Create strong, secure passwords with custom rules" icon={Lock} color="#fbbf24" backHref="/dashboard/productivity">
      <div className="max-w-2xl mx-auto glass rounded-2xl p-6 space-y-6">
        {/* Generated Password */}
        <div className="glass-card rounded-xl p-4 flex items-center gap-3">
          <p className="flex-1 font-mono text-lg break-all select-all">
            {password || "Click generate to create a password"}
          </p>
          {password && (
            <button onClick={copyPassword} className="shrink-0 p-2 rounded-lg hover:bg-[var(--color-card-hover)] transition-colors">
              {copied ? <Check className="w-4 h-4 text-[var(--color-success)]" /> : <Copy className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Strength Bar */}
        {password && (
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[var(--color-muted-foreground)]">Strength</span>
              <span style={{ color: strength.color }} className="font-medium">{strength.label}</span>
            </div>
            <div className="h-1.5 rounded-full bg-[var(--color-surface)]">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: strength.width, background: strength.color }} />
            </div>
          </div>
        )}

        {/* Length Slider */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[var(--color-muted-foreground)]">Length</span>
            <span className="font-mono font-bold">{length}</span>
          </div>
          <input type="range" min={4} max={64} value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full accent-[var(--color-primary)]" />
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Uppercase (A-Z)", checked: uppercase, onChange: setUppercase },
            { label: "Lowercase (a-z)", checked: lowercase, onChange: setLowercase },
            { label: "Numbers (0-9)", checked: numbers, onChange: setNumbers },
            { label: "Symbols (!@#$)", checked: symbols, onChange: setSymbols },
          ].map((opt) => (
            <label key={opt.label} className="flex items-center gap-2 text-sm cursor-pointer p-2 rounded-lg hover:bg-[var(--color-surface)] transition-colors">
              <input type="checkbox" checked={opt.checked} onChange={(e) => opt.onChange(e.target.checked)} className="accent-[var(--color-primary)]" />
              {opt.label}
            </label>
          ))}
        </div>

        {/* Generate Button */}
        <button onClick={generatePassword} className="w-full px-6 py-3 rounded-xl font-semibold text-sm gradient-primary text-white hover:opacity-90 transition-all flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Generate Password
        </button>

        {/* History */}
        {history.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-[var(--color-muted-foreground)] mb-2">Recent</h4>
            <div className="space-y-1">
              {history.map((pwd, i) => (
                <div key={i} className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[var(--color-surface)] text-xs font-mono">
                  <span className="truncate">{pwd}</span>
                  <button onClick={() => { navigator.clipboard.writeText(pwd); }} className="text-[var(--color-primary)] hover:underline ml-2 shrink-0">copy</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
