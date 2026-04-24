"use client";

import { useState } from "react";
import { BookOpen, Wand2 } from "lucide-react";
import { ToolPageLayout, ToolInput, ToolOutput, ToolSubmitButton, ToolSelect } from "@/components/ui/ToolComponents";
import { useAITool } from "@/hooks/useAITool";
import { AI_PROMPTS } from "@/lib/gemini";

export default function BlogGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("medium");
  const { output, loading, error, generate } = useAITool();

  const handleGenerate = () => {
    if (!topic.trim()) return;
    const { system, prompt } = AI_PROMPTS.blogGenerator(topic, tone, length);
    generate(prompt, system);
  };

  return (
    <ToolPageLayout
      title="Blog Generator"
      description="Generate professional blog posts from a topic or outline"
      icon={BookOpen}
      color="#7c5cfc"
      backHref="/dashboard/writing"
    >
      <div className="glass-card rounded-2xl p-7 space-y-5">
        <ToolInput
          value={topic}
          onChange={setTopic}
          placeholder="Enter your blog topic or outline... e.g., 'The Future of AI in Healthcare'"
          rows={4}
          label="Blog Topic"
          maxLength={2000}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ToolSelect
            value={tone}
            onChange={setTone}
            label="Tone"
            options={[
              { value: "professional", label: "Professional" },
              { value: "casual", label: "Casual" },
              { value: "academic", label: "Academic" },
              { value: "conversational", label: "Conversational" },
              { value: "humorous", label: "Humorous" },
            ]}
          />
          <ToolSelect
            value={length}
            onChange={setLength}
            label="Length"
            options={[
              { value: "short (500 words)", label: "Short (~500 words)" },
              { value: "medium (1000 words)", label: "Medium (~1000 words)" },
              { value: "long (2000 words)", label: "Long (~2000 words)" },
            ]}
          />
        </div>
        <ToolSubmitButton
          onClick={handleGenerate}
          loading={loading}
          disabled={!topic.trim()}
          label="Generate Blog"
          icon={Wand2}
        />
      </div>
      <ToolOutput output={output} loading={loading} error={error} />
    </ToolPageLayout>
  );
}
