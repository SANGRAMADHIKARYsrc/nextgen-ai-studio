"use client";

import { useState } from "react";
import { FileCheck, Wand2 } from "lucide-react";
import { ToolPageLayout, ToolInput, ToolTextInput, ToolOutput, ToolSubmitButton } from "@/components/ui/ToolComponents";
import { useAITool } from "@/hooks/useAITool";
import { AI_PROMPTS } from "@/lib/gemini";

export default function CoverLetterPage() {
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [experience, setExperience] = useState("");
  const { output, loading, error, generate } = useAITool();

  const handleGenerate = () => {
    if (!role.trim() || !company.trim() || !experience.trim()) return;
    const { system, prompt } = AI_PROMPTS.coverLetter(role, company, experience);
    generate(prompt, system);
  };

  return (
    <ToolPageLayout
      title="Cover Letter Generator"
      description="Craft tailored cover letters for any job application"
      icon={FileCheck}
      color="#7c5cfc"
      backHref="/dashboard/writing"
    >
      <div className="glass-card rounded-2xl p-7 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ToolTextInput value={role} onChange={setRole} placeholder="e.g., Senior Frontend Developer" label="Target Role" />
          <ToolTextInput value={company} onChange={setCompany} placeholder="e.g., Google, Microsoft" label="Company Name" />
        </div>
        <ToolInput
          value={experience}
          onChange={setExperience}
          placeholder="Briefly describe your relevant experience, projects, and skills..."
          rows={6}
          label="Your Background"
          maxLength={3000}
        />
        <ToolSubmitButton
          onClick={handleGenerate}
          loading={loading}
          disabled={!role.trim() || !company.trim() || !experience.trim()}
          label="Generate Cover Letter"
          icon={Wand2}
        />
      </div>
      <ToolOutput output={output} loading={loading} error={error} />
    </ToolPageLayout>
  );
}
