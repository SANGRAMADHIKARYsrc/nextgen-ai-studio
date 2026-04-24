"use client";

import { useState } from "react";
import { Hash } from "lucide-react";
import { ToolPageLayout } from "@/components/ui/ToolComponents";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const defaultMarkdown = `# Markdown Preview

## Features
- **Bold text** and *italic text*
- [Links](https://example.com)
- Code blocks

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

### Tables

| Feature | Status |
|---------|--------|
| Markdown | ✅ |
| GFM | ✅ |

> Blockquotes work too!

---

Start editing on the left to see live preview here.`;

export default function MarkdownPreviewPage() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);

  return (
    <ToolPageLayout
      title="Markdown Preview"
      description="Write and preview markdown in real-time"
      icon={Hash}
      color="#38bdf8"
      backHref="/dashboard/developer"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Editor */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-sm font-semibold mb-3">Editor</h3>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            rows={20}
            className="w-full glass-card rounded-xl px-4 py-3 text-sm font-mono resize-none focus:outline-none focus:border-[var(--color-primary)] transition-all"
          />
        </div>

        {/* Preview */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-sm font-semibold mb-3">Preview</h3>
          <div className="glass-card rounded-xl px-6 py-4 min-h-[480px] overflow-auto tool-output">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
