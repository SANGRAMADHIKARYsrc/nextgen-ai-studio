"use client";

import Link from "next/link";
import { ArrowLeft, Loader2, Copy, Check, Download } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/* ============== Tool Page Layout ============== */
export function ToolPageLayout({
  title,
  description,
  icon: Icon,
  color,
  backHref,
  children,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  backHref: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to category
      </Link>

      <div className="text-center mb-10">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: `${color}12` }}
        >
          <Icon className="w-7 h-7" style={{ color }} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">{title}</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">{description}</p>
      </div>

      {children}
    </div>
  );
}

/* ============== Input Area ============== */
export function ToolInput({
  value,
  onChange,
  placeholder,
  rows = 6,
  label,
  maxLength,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  rows?: number;
  label?: string;
  maxLength?: number;
}) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold mb-2.5 text-[var(--color-muted-foreground)]">
          {label}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className="input-field resize-none font-sans"
      />
      {maxLength && (
        <p className="text-xs text-[var(--color-muted)] mt-1.5 text-right">
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  );
}

/* ============== Text Input ============== */
export function ToolTextInput({
  value,
  onChange,
  placeholder,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  label?: string;
}) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold mb-2.5 text-[var(--color-muted-foreground)]">
          {label}
        </label>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field"
      />
    </div>
  );
}

/* ============== Select Dropdown ============== */
export function ToolSelect({
  value,
  onChange,
  label,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold mb-2.5 text-[var(--color-muted-foreground)]">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field appearance-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ============== Submit Button ============== */
export function ToolSubmitButton({
  onClick,
  loading,
  disabled,
  label = "Generate",
  icon: Icon,
}: {
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
  label?: string;
  icon?: LucideIcon;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4" />}
          {label}
        </>
      )}
    </button>
  );
}

/* ============== Output Display ============== */
export function ToolOutput({
  output,
  loading,
  error,
}: {
  output: string;
  loading: boolean;
  error: string;
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadOutput = () => {
    const blob = new Blob([output], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "output.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (error) {
    return (
      <div className="mt-8 p-5 rounded-2xl bg-[var(--color-error)]/8 border border-[var(--color-error)]/20">
        <p className="text-sm text-[var(--color-error)]">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mt-8 py-14 rounded-2xl glass-card flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
          <div className="absolute inset-0 w-8 h-8 rounded-full animate-pulse-glow" />
        </div>
        <span className="text-sm text-[var(--color-muted-foreground)]">
          AI is processing your request...
        </span>
      </div>
    );
  }

  if (!output) return null;

  return (
    <div className="mt-8 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-[var(--color-muted-foreground)] uppercase tracking-wider">
          Output
        </h3>
        <div className="flex gap-2">
          <button
            onClick={copyToClipboard}
            className="btn-secondary flex items-center gap-1.5 !px-3 !py-1.5 text-xs"
          >
            {copied ? <Check className="w-3 h-3 text-[var(--color-success)]" /> : <Copy className="w-3 h-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            onClick={downloadOutput}
            className="btn-secondary flex items-center gap-1.5 !px-3 !py-1.5 text-xs"
          >
            <Download className="w-3 h-3" />
            Download
          </button>
        </div>
      </div>
      <div className="p-7 rounded-2xl glass-card tool-output">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{output}</ReactMarkdown>
      </div>
    </div>
  );
}

/* ============== Card ============== */
export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass-card rounded-2xl p-7 ${className}`}>
      {children}
    </div>
  );
}
