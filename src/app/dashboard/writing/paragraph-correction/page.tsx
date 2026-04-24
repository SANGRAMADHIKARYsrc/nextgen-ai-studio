"use client";

import { useState } from "react";
import { FileText, Wand2 } from "lucide-react";
import { ToolPageLayout, ToolInput, ToolOutput, ToolSubmitButton } from "@/components/ui/ToolComponents";
import { useAITool } from "@/hooks/useAITool";
import { AI_PROMPTS } from "@/lib/gemini";

export default function ParagraphCorrectionPage() {
  const [text, setText] = useState("");
  const { output, loading, error, generate } = useAITool();

  const handleGenerate = () => {
    if (!text.trim()) return;
    const { system, prompt } = AI_PROMPTS.paragraphCorrection(text);
    generate(prompt, system);
  };

  return (
    <ToolPageLayout
      title="Paragraph Correction"
      description="Restructure and improve paragraph flow and clarity"
      icon={FileText}
      color="#7c5cfc"
      backHref="/dashboard/writing"
    >
      <div className="glass-card rounded-2xl p-7 space-y-5">
        <ToolInput
          value={text}
          onChange={setText}
          placeholder="Paste your paragraph(s) here to improve structure, flow, and clarity..."
          rows={8}
          label="Your Text"
          maxLength={5000}
        />
        <ToolSubmitButton
          onClick={handleGenerate}
          loading={loading}
          disabled={!text.trim()}
          label="Improve Paragraph"
          icon={Wand2}
        />
      </div>
      <ToolOutput output={output} loading={loading} error={error} />
    </ToolPageLayout>
  );
}
