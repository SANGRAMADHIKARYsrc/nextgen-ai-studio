"use client";

import { useState } from "react";
import { Star, Wand2 } from "lucide-react";
import { ToolPageLayout, ToolInput, ToolOutput, ToolSubmitButton } from "@/components/ui/ToolComponents";
import { useAITool } from "@/hooks/useAITool";
import { AI_PROMPTS } from "@/lib/gemini";

export default function AtsScorePage() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const { output, loading, error, generate } = useAITool();

  const handleGenerate = () => {
    if (!resume.trim() || !jobDescription.trim()) return;
    const { system, prompt } = AI_PROMPTS.atsScoring(resume, jobDescription);
    generate(prompt, system);
  };

  return (
    <ToolPageLayout title="Resume ATS Scoring" description="Score your resume against job descriptions for ATS compatibility" icon={Star} color="#34d399" backHref="/dashboard/detection">
      <div className="glass-card rounded-2xl p-7 space-y-5">
        <ToolInput value={resume} onChange={setResume} placeholder="Paste your resume content here..." rows={8} label="Resume Content" maxLength={5000} />
        <ToolInput value={jobDescription} onChange={setJobDescription} placeholder="Paste the job description here..." rows={6} label="Job Description" maxLength={3000} />
        <ToolSubmitButton onClick={handleGenerate} loading={loading} disabled={!resume.trim() || !jobDescription.trim()} label="Score Resume" icon={Wand2} />
      </div>
      <ToolOutput output={output} loading={loading} error={error} />
    </ToolPageLayout>
  );
}
