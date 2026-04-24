"use client";

import { useState } from "react";
import { MessageSquare, Wand2 } from "lucide-react";
import { ToolPageLayout, ToolInput, ToolOutput, ToolSubmitButton } from "@/components/ui/ToolComponents";
import { useAITool } from "@/hooks/useAITool";
import { AI_PROMPTS } from "@/lib/gemini";

export default function SentimentPage() {
  const [text, setText] = useState("");
  const { output, loading, error, generate } = useAITool();

  const handleGenerate = () => {
    if (!text.trim()) return;
    const { system, prompt } = AI_PROMPTS.sentimentAnalysis(text);
    generate(prompt, system);
  };

  return (
    <ToolPageLayout title="Sentiment Analysis" description="Analyze the emotional tone and sentiment of text" icon={MessageSquare} color="#34d399" backHref="/dashboard/detection">
      <div className="glass-card rounded-2xl p-7 space-y-5">
        <ToolInput value={text} onChange={setText} placeholder="Enter text to analyze sentiment..." rows={6} label="Text to Analyze" maxLength={5000} />
        <ToolSubmitButton onClick={handleGenerate} loading={loading} disabled={!text.trim()} label="Analyze Sentiment" icon={Wand2} />
      </div>
      <ToolOutput output={output} loading={loading} error={error} />
    </ToolPageLayout>
  );
}
