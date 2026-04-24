"use client";

import { useState } from "react";
import { GitBranch, Wand2 } from "lucide-react";
import { ToolPageLayout, ToolTextInput, ToolInput, ToolOutput, ToolSubmitButton } from "@/components/ui/ToolComponents";
import { useAITool } from "@/hooks/useAITool";
import { AI_PROMPTS } from "@/lib/gemini";

export default function ReadmeGeneratorPage() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [features, setFeatures] = useState("");
  const { output, loading, error, generate } = useAITool();

  const handleGenerate = () => {
    if (!projectName.trim() || !description.trim()) return;
    const { system, prompt } = AI_PROMPTS.readmeGenerator(projectName, description, techStack, features);
    generate(prompt, system);
  };

  return (
    <ToolPageLayout
      title="README Generator"
      description="Create professional GitHub README files automatically"
      icon={GitBranch}
      color="#7c5cfc"
      backHref="/dashboard/writing"
    >
      <div className="glass-card rounded-2xl p-7 space-y-5">
        <ToolTextInput
          value={projectName}
          onChange={setProjectName}
          placeholder="e.g., NextGen AI Studio"
          label="Project Name"
        />
        <ToolInput
          value={description}
          onChange={setDescription}
          placeholder="Describe your project in a few sentences..."
          rows={3}
          label="Project Description"
        />
        <ToolTextInput
          value={techStack}
          onChange={setTechStack}
          placeholder="e.g., Next.js, TypeScript, Tailwind, Gemini API"
          label="Tech Stack"
        />
        <ToolInput
          value={features}
          onChange={setFeatures}
          placeholder="List key features, one per line..."
          rows={4}
          label="Key Features"
        />
        <ToolSubmitButton
          onClick={handleGenerate}
          loading={loading}
          disabled={!projectName.trim() || !description.trim()}
          label="Generate README"
          icon={Wand2}
        />
      </div>
      <ToolOutput output={output} loading={loading} error={error} />
    </ToolPageLayout>
  );
}
