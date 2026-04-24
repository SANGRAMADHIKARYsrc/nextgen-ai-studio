"use client";

import { useState } from "react";
import { FileSignature, Wand2 } from "lucide-react";
import { ToolPageLayout, ToolInput, ToolTextInput, ToolOutput, ToolSubmitButton } from "@/components/ui/ToolComponents";
import { useAITool } from "@/hooks/useAITool";
import { AI_PROMPTS } from "@/lib/gemini";

export default function ResumeSummaryPage() {
  const [experience, setExperience] = useState("");
  const [role, setRole] = useState("");
  const { output, loading, error, generate } = useAITool();

  const handleGenerate = () => {
    if (!experience.trim() || !role.trim()) return;
    const { system, prompt } = AI_PROMPTS.resumeSummary(experience, role);
    generate(prompt, system);
  };

  return (
    <ToolPageLayout
      title="Resume Summary Generator"
      description="Generate compelling resume summaries and bullet points"
      icon={FileSignature}
      color="#7c5cfc"
      backHref="/dashboard/writing"
    >
      <div className="glass-card rounded-2xl p-7 space-y-5">
        <ToolTextInput
          value={role}
          onChange={setRole}
          placeholder="e.g., Full Stack Developer, ML Engineer, Product Manager"
          label="Target Role"
        />
        <ToolInput
          value={experience}
          onChange={setExperience}
          placeholder="Describe your experience, skills, and achievements..."
          rows={6}
          label="Your Experience & Skills"
          maxLength={3000}
        />
        <ToolSubmitButton
          onClick={handleGenerate}
          loading={loading}
          disabled={!experience.trim() || !role.trim()}
          label="Generate Summary"
          icon={Wand2}
        />
      </div>
      <ToolOutput output={output} loading={loading} error={error} />
    </ToolPageLayout>
  );
}
