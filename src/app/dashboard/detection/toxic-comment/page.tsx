"use client";

import { useState } from "react";
import { Flame, Wand2 } from "lucide-react";
import { ToolPageLayout, ToolInput, ToolOutput, ToolSubmitButton } from "@/components/ui/ToolComponents";
import { useAITool } from "@/hooks/useAITool";
import { AI_PROMPTS } from "@/lib/gemini";

export default function ToxicCommentPage() {
  const [text, setText] = useState("");
  const { output, loading, error, generate } = useAITool();

  const handleGenerate = () => {
    if (!text.trim()) return;
    const { system, prompt } = AI_PROMPTS.toxicCommentDetector(text);
    generate(prompt, system);
  };

  return (
    <ToolPageLayout title="Toxic Comment Detector" description="Identify toxic, offensive, or harmful content" icon={Flame} color="#34d399" backHref="/dashboard/detection">
      <div className="glass-card rounded-2xl p-7 space-y-5">
        <ToolInput value={text} onChange={setText} placeholder="Enter text to check for toxicity..." rows={6} label="Comment / Text" maxLength={5000} />
        <ToolSubmitButton onClick={handleGenerate} loading={loading} disabled={!text.trim()} label="Detect Toxicity" icon={Wand2} />
      </div>
      <ToolOutput output={output} loading={loading} error={error} />
    </ToolPageLayout>
  );
}
