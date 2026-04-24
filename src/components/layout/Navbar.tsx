"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  ChevronDown,
  Menu,
  X,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";
import { toolCategories } from "@/lib/tools-config";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 glass-strong">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-sm">NextGen</span>
                <span className="font-bold text-sm gradient-text ml-1">AI Studio</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Dashboard Link */}
              <Link
                href="/dashboard"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                  pathname === "/dashboard"
                    ? "text-[var(--color-primary)] bg-[var(--color-primary)]/8"
                    : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-white/5"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>

              {/* Category Dropdowns */}
              {toolCategories.map((cat) => {
                const Icon = cat.icon;
                const active = isActive(`/dashboard/${cat.id}`);
                return (
                  <div key={cat.id} className="relative nav-item">
                    <Link
                      href={`/dashboard/${cat.id}`}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                        active
                          ? "text-[var(--color-primary)] bg-[var(--color-primary)]/8"
                          : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-white/5"
                      }`}
                    >
                      <Icon className="w-4 h-4" style={active ? { color: cat.color } : {}} />
                      <span className="hidden xl:inline">
                        {cat.name.replace("AI ", "").replace(" Tools", "").replace(" & Analysis", "")}
                      </span>
                      <ChevronDown className="w-3 h-3 opacity-50" />
                    </Link>

                    {/* Dropdown */}
                    <div className="nav-dropdown w-72">
                      <div className="glass-strong rounded-2xl p-2 shadow-2xl shadow-black/40 mt-2">
                        <div className="px-3 py-2 mb-1">
                          <p className="text-xs font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wider">
                            {cat.name}
                          </p>
                        </div>
                        {cat.tools.map((tool) => {
                          const ToolIcon = tool.icon;
                          return (
                            <Link
                              key={tool.id}
                              href={tool.available ? tool.href : "#"}
                              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${
                                tool.available
                                  ? "hover:bg-white/5 cursor-pointer"
                                  : "opacity-40 cursor-not-allowed"
                              } ${
                                pathname === tool.href
                                  ? "bg-[var(--color-primary)]/8 text-[var(--color-primary)]"
                                  : ""
                              }`}
                            >
                              <ToolIcon
                                className="w-4 h-4 shrink-0"
                                style={{ color: cat.color }}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{tool.name}</p>
                              </div>
                              {tool.available && (
                                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-50 -translate-x-1 group-hover:translate-x-0 transition-all" />
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="hidden sm:inline-flex px-4 py-2 rounded-xl text-xs font-medium btn-secondary"
              >
                Home
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-white/5 transition-colors"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-[var(--color-border)] animate-slide-down">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>

              {toolCategories.map((cat) => {
                const Icon = cat.icon;
                const expanded = mobileExpanded === cat.id;
                return (
                  <div key={cat.id}>
                    <button
                      onClick={() => setMobileExpanded(expanded ? null : cat.id)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" style={{ color: cat.color }} />
                        {cat.name.replace("AI ", "").replace(" Tools", "").replace(" & Analysis", "")}
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                      />
                    </button>
                    {expanded && (
                      <div className="ml-6 mt-1 space-y-0.5 animate-slide-down">
                        {cat.tools.filter(t => t.available).map((tool) => {
                          const ToolIcon = tool.icon;
                          return (
                            <Link
                              key={tool.id}
                              href={tool.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-white/5 transition-colors"
                            >
                              <ToolIcon className="w-3.5 h-3.5" style={{ color: cat.color }} />
                              {tool.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
