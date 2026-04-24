"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, TrendingUp, Cpu, Layers } from "lucide-react";
import { toolCategories, getAvailableTools } from "@/lib/tools-config";

export default function DashboardPage() {
  const availableTools = getAvailableTools();

  return (
    <div className="animate-fade-in">
      {/* Welcome */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-[var(--color-primary)] mb-6">
          <Sparkles className="w-3 h-3" />
          Welcome to your AI workspace
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          <span className="gradient-text">NextGen AI</span> Studio
        </h1>
        <p className="text-[var(--color-muted-foreground)] text-lg max-w-lg mx-auto">
          Choose a category below to access your AI-powered tools
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
        {[
          { icon: Sparkles, label: "Active Tools", value: availableTools.length.toString(), color: "var(--color-primary)" },
          { icon: Layers, label: "Categories", value: "5", color: "var(--color-accent)" },
          { icon: TrendingUp, label: "Pricing", value: "Free", color: "var(--color-accent-3)" },
          { icon: Cpu, label: "AI Engine", value: "Gemini", color: "var(--color-secondary)" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass-card rounded-2xl p-5 text-center">
              <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                <Icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <p className="text-2xl font-bold mb-0.5">{stat.value}</p>
              <p className="text-xs text-[var(--color-muted-foreground)]">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Categories */}
      <h2 className="text-xl font-bold mb-6">Tool Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-14">
        {toolCategories.map((cat, i) => {
          const Icon = cat.icon;
          const available = cat.tools.filter((t) => t.available).length;
          return (
            <Link
              key={cat.id}
              href={`/dashboard/${cat.id}`}
              className="glass-card gradient-border rounded-2xl p-7 group animate-fade-in"
              style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: `${cat.color}12` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: cat.color }} />
                  </div>
                  <div>
                    <h3 className="font-bold">{cat.name}</h3>
                    <p className="text-xs text-[var(--color-muted-foreground)]">
                      {available}/{cat.tools.length} available
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--color-muted)] group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed mb-5">
                {cat.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.tools.slice(0, 3).map((tool) => (
                  <span
                    key={tool.id}
                    className="px-3 py-1 rounded-lg text-[11px] font-medium glass"
                  >
                    {tool.name}
                  </span>
                ))}
                {cat.tools.length > 3 && (
                  <span className="px-3 py-1 rounded-lg text-[11px] font-medium text-[var(--color-primary)]">
                    +{cat.tools.length - 3} more
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Popular Tools */}
      <h2 className="text-xl font-bold mb-6">Popular Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {availableTools.slice(0, 8).map((tool, i) => {
          const Icon = tool.icon;
          const cat = toolCategories.find((c) => c.id === tool.category);
          return (
            <Link
              key={tool.id}
              href={tool.href}
              className="glass-card rounded-2xl p-5 group animate-fade-in"
              style={{ animationDelay: `${i * 60}ms`, opacity: 0 }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${cat?.color || "#7c5cfc"}12` }}
                >
                  <Icon className="w-5 h-5" style={{ color: cat?.color || "#7c5cfc" }} />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm group-hover:text-[var(--color-primary)] transition-colors">
                    {tool.name}
                  </p>
                  <p className="text-xs text-[var(--color-muted)] mt-1">
                    {tool.apiType === "gemini" ? "AI Powered" : "Local Tool"}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
