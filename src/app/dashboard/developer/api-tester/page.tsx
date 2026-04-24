"use client";

import { useState } from "react";
import { Wifi, Send, Loader2 } from "lucide-react";
import { ToolPageLayout, ToolSelect, ToolTextInput } from "@/components/ui/ToolComponents";

export default function ApiTesterPage() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [body, setBody] = useState("");
  const [headers, setHeaders] = useState('{"Content-Type": "application/json"}');
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [responseTime, setResponseTime] = useState<number | null>(null);

  const sendRequest = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setResponse("");
    setStatus(null);

    const startTime = Date.now();

    try {
      let parsedHeaders: Record<string, string> = {};
      try {
        parsedHeaders = JSON.parse(headers);
      } catch {
        parsedHeaders = { "Content-Type": "application/json" };
      }

      const options: RequestInit = {
        method,
        headers: parsedHeaders,
      };

      if (method !== "GET" && method !== "HEAD" && body.trim()) {
        options.body = body;
      }

      const res = await fetch(url, options);
      setStatus(res.status);
      setResponseTime(Date.now() - startTime);

      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("json")) {
        const data = await res.json();
        setResponse(JSON.stringify(data, null, 2));
      } else {
        const text = await res.text();
        setResponse(text);
      }
    } catch (err: unknown) {
      setResponse(err instanceof Error ? err.message : "Request failed");
      setStatus(0);
      setResponseTime(Date.now() - startTime);
    } finally {
      setLoading(false);
    }
  };

  const statusColor = status
    ? status >= 200 && status < 300
      ? "text-[var(--color-success)]"
      : status >= 400
      ? "text-[var(--color-error)]"
      : "text-[var(--color-warning)]"
    : "";

  return (
    <ToolPageLayout
      title="API Tester"
      description="Test REST APIs with a clean, intuitive interface"
      icon={Wifi}
      color="#38bdf8"
      backHref="/dashboard/developer"
    >
      <div className="glass-card rounded-2xl p-7 space-y-5">
        <div className="flex gap-3">
          <div className="w-32">
            <ToolSelect
              value={method}
              onChange={setMethod}
              label=""
              options={[
                { value: "GET", label: "GET" },
                { value: "POST", label: "POST" },
                { value: "PUT", label: "PUT" },
                { value: "PATCH", label: "PATCH" },
                { value: "DELETE", label: "DELETE" },
              ]}
            />
          </div>
          <div className="flex-1">
            <ToolTextInput value={url} onChange={setUrl} placeholder="https://api.example.com/endpoint" />
          </div>
          <button
            onClick={sendRequest}
            disabled={loading || !url.trim()}
            className="px-6 py-3 rounded-xl font-medium gradient-primary text-white hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-2 shrink-0"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Send
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--color-muted-foreground)]">Headers (JSON)</label>
            <textarea
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
              rows={4}
              className="w-full glass-card rounded-xl px-4 py-3 text-sm font-mono resize-none focus:outline-none focus:border-[var(--color-primary)] transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--color-muted-foreground)]">Body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              placeholder='{"key": "value"}'
              className="w-full glass-card rounded-xl px-4 py-3 text-sm font-mono resize-none focus:outline-none focus:border-[var(--color-primary)] transition-all placeholder:text-[var(--color-muted)]"
            />
          </div>
        </div>
      </div>

      {/* Response */}
      {(response || loading) && (
        <div className="mt-6 glass rounded-2xl p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Response</h3>
            <div className="flex items-center gap-4 text-xs">
              {status !== null && (
                <span className={`font-mono font-bold ${statusColor}`}>
                  Status: {status}
                </span>
              )}
              {responseTime !== null && (
                <span className="text-[var(--color-muted-foreground)]">
                  {responseTime}ms
                </span>
              )}
            </div>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 animate-spin text-[var(--color-primary)]" />
            </div>
          ) : (
            <pre className="glass-card rounded-xl p-4 text-sm font-mono overflow-auto max-h-[500px] whitespace-pre-wrap">
              {response}
            </pre>
          )}
        </div>
      )}
    </ToolPageLayout>
  );
}
