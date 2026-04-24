"use client";

import { useState } from "react";
import { Eye, Wand2 } from "lucide-react";
import { ToolPageLayout, ToolInput, ToolSelect, ToolOutput, ToolSubmitButton } from "@/components/ui/ToolComponents";
import { useAITool } from "@/hooks/useAITool";
import { AI_PROMPTS } from "@/lib/gemini";

const languages = [
  "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Go", "Rust",
  "PHP", "Ruby", "Swift", "Kotlin", "SQL", "HTML/CSS", "Shell/Bash", "Other"
].map(l => ({ value: l.toLowerCase(), label: l }));

export default function CodeExplainPage() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const { output, loading, error, generate } = useAITool();

  const handleGenerate = () => {
    if (!code.trim()) return;
    const { system, prompt } = AI_PROMPTS.codeExplainer(code, language);
    generate(prompt, system);
  };

  return (
    <ToolPageLayout
      title="Code Explainer"
      description="Get clear explanations of any code snippet"
      icon={Eye}
      color="#38bdf8"
      backHref="/dashboard/developer"
    >
      <div className="glass-card rounded-2xl p-7 space-y-5">
        <ToolSelect value={language} onChange={setLanguage} label="Programming Language" options={languages} />
        <ToolInput
          value={code}
          onChange={setCode}
          placeholder="Paste your code here..."
          rows={10}
          label="Code Snippet"
        />
        <ToolSubmitButton onClick={handleGenerate} loading={loading} disabled={!code.trim()} label="Explain Code" icon={Wand2} />
      </div>
      <ToolOutput output={output} loading={loading} error={error} />
    </ToolPageLayout>
  );
}
