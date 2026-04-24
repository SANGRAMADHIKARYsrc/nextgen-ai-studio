"use client";

import { useState, useCallback } from "react";

interface UseAIToolReturn {
  output: string;
  loading: boolean;
  error: string;
  generate: (prompt: string, systemInstruction: string) => Promise<void>;
  reset: () => void;
}

export function useAITool(): UseAIToolReturn {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = useCallback(async (prompt: string, systemInstruction: string) => {
    setLoading(true);
    setError("");
    setOutput("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, systemInstruction }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate");
      }

      setOutput(data.result);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setOutput("");
    setError("");
  }, []);

  return { output, loading, error, generate, reset };
}
