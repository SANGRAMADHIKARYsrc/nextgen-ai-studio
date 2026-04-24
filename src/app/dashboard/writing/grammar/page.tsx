"use client";

import { useState } from "react";
import { SpellCheck, Wand2 } from "lucide-react";
import { ToolPageLayout, ToolInput, ToolOutput, ToolSubmitButton } from "@/components/ui/ToolComponents";
import { useAITool } from "@/hooks/useAITool";
import { AI_PROMPTS } from "@/lib/gemini";

export default function GrammarFixPage() {
  const [text, setText] = useState("");
  const { output, loading, error, generate } = useAITool();

  const handleGenerate = () => {
    if (!text.trim()) return;
    const { system, prompt } = AI_PROMPTS.grammarFix(text);
    generate(prompt, system);
  };

  return (
    <ToolPageLayout
      title="Grammar Fix"
      description="Fix grammar, spelling, and punctuation errors instantly"
      icon={SpellCheck}
      color="#7c5cfc"
      backHref="/dashboard/writing"
    >
      <div className="glass-card rounded-2xl p-7 space-y-5">
        <ToolInput
          value={text}
          onChange={setText}
          placeholder="Paste your text here to fix grammar, spelling, and punctuation errors..."
          rows={8}
          label="Your Text"
          maxLength={5000}
        />
        <ToolSubmitButton
          onClick={handleGenerate}
          loading={loading}
          disabled={!text.trim()}
          label="Fix Grammar"
          icon={Wand2}
        />
      </div>
      <ToolOutput output={output} loading={loading} error={error} />
    </ToolPageLayout>
  );
}
