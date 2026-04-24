"use client";

import { useState } from "react";
import { Braces, Check, X } from "lucide-react";
import { ToolPageLayout } from "@/components/ui/ToolComponents";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indentSize, setIndentSize] = useState(2);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indentSize));
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <ToolPageLayout
      title="JSON Formatter"
      description="Format, validate, and beautify JSON data"
      icon={Braces}
      color="#38bdf8"
      backHref="/dashboard/developer"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">Input JSON</h3>
            <div className="flex items-center gap-2">
              <label className="text-xs text-[var(--color-muted-foreground)]">Indent:</label>
              <select
                value={indentSize}
                onChange={(e) => setIndentSize(Number(e.target.value))}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-2 py-1 text-xs"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
                <option value={1}>1 tab</option>
              </select>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value"}'
            rows={16}
            className="w-full glass-card rounded-xl px-4 py-3 text-sm font-mono resize-none focus:outline-none focus:border-[var(--color-primary)] transition-all placeholder:text-[var(--color-muted)]"
          />
          <div className="flex gap-2 mt-3">
            <button onClick={formatJson} className="px-4 py-2 rounded-xl text-sm font-medium btn-primary">
              Format
            </button>
            <button onClick={minifyJson} className="px-4 py-2 rounded-xl text-sm font-medium glass hover:bg-[var(--color-card-hover)] transition-colors">
              Minify
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              Output
              {output && <Check className="w-4 h-4 text-[var(--color-success)]" />}
              {error && <X className="w-4 h-4 text-[var(--color-error)]" />}
            </h3>
            {output && (
              <button onClick={copyOutput} className="text-xs text-[var(--color-primary)] hover:underline">
                Copy
              </button>
            )}
          </div>
          {error ? (
            <div className="p-4 rounded-xl bg-[var(--color-error)]/10 border border-[var(--color-error)]/30 text-sm text-[var(--color-error)] font-mono">
              {error}
            </div>
          ) : (
            <pre className="w-full h-[400px] overflow-auto glass-card rounded-xl px-4 py-3 text-sm font-mono whitespace-pre">
              {output || "Formatted JSON will appear here..."}
            </pre>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}
