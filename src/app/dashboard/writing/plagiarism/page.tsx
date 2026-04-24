"use client";

import { useState } from "react";
import { Search, Wand2 } from "lucide-react";
import { ToolPageLayout, ToolInput, ToolOutput, ToolSubmitButton } from "@/components/ui/ToolComponents";
import { useAITool } from "@/hooks/useAITool";
import { AI_PROMPTS } from "@/lib/gemini";

export default function PlagiarismPage() {
  const [text, setText] = useState("");
  const { output, loading, error, generate } = useAITool();

  const handleGenerate = () => {
    if (!text.trim()) return;
    const { system, prompt } = AI_PROMPTS.plagiarismCheck(text);
    generate(prompt, system);
  };

  return (
    <ToolPageLayout
      title="Plagiarism Checker"
      description="Detect potential plagiarism in your content (AI-based analysis)"
      icon={Search}
      color="#7c5cfc"
      backHref="/dashboard/writing"
    >
      <div className="glass-card rounded-2xl p-7 space-y-5">
        <ToolInput
          value={text}
          onChange={setText}
          placeholder="Paste your content here to check for plagiarism indicators..."
          rows={8}
          label="Content to Check"
          maxLength={5000}
        />
        <ToolSubmitButton
          onClick={handleGenerate}
          loading={loading}
          disabled={!text.trim()}
          label="Check Plagiarism"
          icon={Wand2}
        />
      </div>
      <ToolOutput output={output} loading={loading} error={error} />
    </ToolPageLayout>
  );
}
