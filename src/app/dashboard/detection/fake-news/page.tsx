"use client";

import { useState } from "react";
import { AlertTriangle, Wand2 } from "lucide-react";
import { ToolPageLayout, ToolInput, ToolOutput, ToolSubmitButton } from "@/components/ui/ToolComponents";
import { useAITool } from "@/hooks/useAITool";
import { AI_PROMPTS } from "@/lib/gemini";

export default function FakeNewsPage() {
  const [text, setText] = useState("");
  const { output, loading, error, generate } = useAITool();

  const handleGenerate = () => {
    if (!text.trim()) return;
    const { system, prompt } = AI_PROMPTS.fakeNewsDetector(text);
    generate(prompt, system);
  };

  return (
    <ToolPageLayout title="Fake News Detector" description="Analyze news articles for potential misinformation" icon={AlertTriangle} color="#34d399" backHref="/dashboard/detection">
      <div className="glass-card rounded-2xl p-7 space-y-5">
        <ToolInput value={text} onChange={setText} placeholder="Paste a news article or text to analyze for misinformation..." rows={8} label="Article / Text" maxLength={5000} />
        <ToolSubmitButton onClick={handleGenerate} loading={loading} disabled={!text.trim()} label="Analyze" icon={Wand2} />
      </div>
      <ToolOutput output={output} loading={loading} error={error} />
    </ToolPageLayout>
  );
}
