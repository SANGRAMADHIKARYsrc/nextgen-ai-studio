"use client";

import { useState } from "react";
import { RefreshCw, Wand2 } from "lucide-react";
import { ToolPageLayout, ToolInput, ToolSelect, ToolOutput, ToolSubmitButton } from "@/components/ui/ToolComponents";
import { useAITool } from "@/hooks/useAITool";
import { AI_PROMPTS } from "@/lib/gemini";

const languages = [
  "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Go", "Rust",
  "PHP", "Ruby", "Swift", "Kotlin", "SQL", "Shell/Bash"
].map(l => ({ value: l.toLowerCase(), label: l }));

export default function CodeConvertPage() {
  const [code, setCode] = useState("");
  const [fromLang, setFromLang] = useState("python");
  const [toLang, setToLang] = useState("javascript");
  const { output, loading, error, generate } = useAITool();

  const handleGenerate = () => {
    if (!code.trim()) return;
    const { system, prompt } = AI_PROMPTS.codeConverter(code, fromLang, toLang);
    generate(prompt, system);
  };

  return (
    <ToolPageLayout
      title="Code Converter"
      description="Convert code between programming languages"
      icon={RefreshCw}
      color="#38bdf8"
      backHref="/dashboard/developer"
    >
      <div className="glass-card rounded-2xl p-7 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ToolSelect value={fromLang} onChange={setFromLang} label="From Language" options={languages} />
          <ToolSelect value={toLang} onChange={setToLang} label="To Language" options={languages} />
        </div>
        <ToolInput value={code} onChange={setCode} placeholder="Paste your source code here..." rows={10} label="Source Code" />
        <ToolSubmitButton onClick={handleGenerate} loading={loading} disabled={!code.trim()} label="Convert Code" icon={Wand2} />
      </div>
      <ToolOutput output={output} loading={loading} error={error} />
    </ToolPageLayout>
  );
}
