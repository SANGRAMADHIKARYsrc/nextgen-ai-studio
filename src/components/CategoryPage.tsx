"use client";

import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import type { ToolCategory } from "@/lib/tools-config";

export default function CategoryPage({ category }: { category: ToolCategory }) {
  const Icon = category.icon;
  const available = category.tools.filter((t) => t.available).length;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ background: `${category.color}12` }}
        >
          <Icon className="w-8 h-8" style={{ color: category.color }} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">{category.name}</h1>
        <p className="text-[var(--color-muted-foreground)] max-w-lg mx-auto">
          {category.description}
        </p>
        <p className="text-xs text-[var(--color-muted)] mt-3">
          {available} of {category.tools.length} tools available
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {category.tools.map((tool, i) => {
          const ToolIcon = tool.icon;
          return (
            <Link
              key={tool.id}
              href={tool.available ? tool.href : "#"}
              className={`glass-card gradient-border rounded-2xl p-6 group animate-fade-in ${
                !tool.available ? "opacity-40 cursor-not-allowed" : ""
              }`}
              style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
            >
              {!tool.available && (
                <div className="absolute top-4 right-4">
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold glass text-[var(--color-warning)]">
                    <Lock className="w-2.5 h-2.5" />
                    Coming Soon
                  </span>
                </div>
              )}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${category.color}12` }}
              >
                <ToolIcon className="w-5 h-5" style={{ color: category.color }} />
              </div>
              <h3 className="font-bold mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                {tool.name}
              </h3>
              <span className="text-[10px] text-[var(--color-muted)] uppercase tracking-wider font-medium">
                {tool.apiType === "gemini" ? "✦ AI Powered" : tool.apiType === "local" ? "⚡ Server" : "⚡ Client-side"}
              </span>
              <p className="text-sm text-[var(--color-muted-foreground)] mt-3 leading-relaxed">
                {tool.description}
              </p>
              {tool.available && (
                <div className="flex items-center gap-1.5 text-xs text-[var(--color-primary)] font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  Open Tool
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
