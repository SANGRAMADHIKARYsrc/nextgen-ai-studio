"use client";

import { useState } from "react";
import { RefreshCw, Wand2 } from "lucide-react";
import { ToolPageLayout, ToolInput, ToolSelect, ToolOutput, ToolSubmitButton } from "@/components/ui/ToolComponents";
import { useAITool } from "@/hooks/useAITool";
import { AI_PROMPTS } from "@/lib/gemini";

export default function ParaphrasePage() {
  const [text, setText] = useState("");
  const [style, setStyle] = useState("professional");
  const { output, loading, error, generate } = useAITool();

  const handleGenerate = () => {
    if (!text.trim()) return;
    const { system, prompt } = AI_PROMPTS.paraphrase(text, style);
    generate(prompt, system);
  };

  return (
    <ToolPageLayout
      title="Paraphrasing Tool"
      description="Rewrite text in different styles while preserving meaning"
      icon={RefreshCw}
      color="#7c5cfc"
      backHref="/dashboard/writing"
    >
      <div className="glass-card rounded-2xl p-7 space-y-5">
        <ToolInput
          value={text}
          onChange={setText}
          placeholder="Enter the text you want to paraphrase..."
          rows={6}
          label="Original Text"
          maxLength={5000}
        />
        <ToolSelect
          value={style}
          onChange={setStyle}
          label="Style"
          options={[
            { value: "professional", label: "Professional" },
            { value: "casual", label: "Casual" },
            { value: "academic", label: "Academic" },
            { value: "simple", label: "Simple / Easy to Read" },
            { value: "creative", label: "Creative" },
            { value: "formal", label: "Formal" },
          ]}
        />
        <ToolSubmitButton
          onClick={handleGenerate}
          loading={loading}
          disabled={!text.trim()}
          label="Paraphrase"
          icon={Wand2}
        />
      </div>
      <ToolOutput output={output} loading={loading} error={error} />
    </ToolPageLayout>
  );
}
