<div align="center">

# ✨ NextGen AI Studio

### Your All-in-One AI-Powered Tool Suite

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**30+ AI & utility tools** in a single, premium dark-themed platform — **100% free, no sign-up required.**

[🚀 Live Demo](#) · [📖 Documentation](#features) · [🐛 Report Bug](../../issues) · [✨ Request Feature](../../issues)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [🤖 AI-Assisted Development](#-ai-assisted-development)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Tool Categories](#-tool-categories)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About

**NextGen AI Studio** is a modern, full-stack AI-powered platform that brings together 30+ tools across 5 categories into one unified interface. Built with Next.js 16, React 19, and Google's Gemini AI, it offers a premium dark-themed experience with glassmorphism design, motion backgrounds, and smooth animations.

Unlike typical AI tools that require multiple subscriptions and constant tab-switching, NextGen AI Studio provides everything in one place — completely free, with no account creation needed.

### Why NextGen AI Studio?

| Traditional Approach | NextGen AI Studio |
|---|---|
| ❌ Multiple subscriptions & accounts | ✅ 30+ tools in one platform |
| ❌ Constant tab switching | ✅ Powered by Gemini AI |
| ❌ Inconsistent experience | ✅ Premium UI, zero ads |
| ❌ Costs $49+/month | ✅ 100% free forever |

---

## 🤖 AI-Assisted Development

This repository is **AI-human hybrid built**. It was developed using cutting-edge AI pair programming agents (including Gemini and Claude) collaborating directly with the developer. 

To maintain this interactive environment, the repository includes system files used by the AI coding assistants:
- [AGENTS.md](file:///c:/Users/ASUS/OneDrive/Desktop/Antigravity/nextgen-ai-studio/AGENTS.md) - Instructions and framework rules for AI developer agents.
- [CLAUDE.md](file:///c:/Users/ASUS/OneDrive/Desktop/Antigravity/nextgen-ai-studio/CLAUDE.md) - Context mapping file for AI systems.

These files help AI agents understand the codebase architecture instantly, allowing for rapid feature development and bug fixes.

---

## ✨ Features

### 🎨 Premium UI/UX
- **Dark-themed glassmorphism** design with dynamic motion backgrounds
- **Particle animations** and floating gradient orbs
- **Scroll-reveal animations** with intersection observer
- **Fully responsive** — works beautifully on mobile, tablet, and desktop
- **Sticky navigation bar** with smooth section scrolling

### 🤖 AI-Powered Tools
- Powered by **Google Gemini AI** (`@google/generative-ai`)
- Server-side API routes for secure key management
- Real-time AI responses with streaming-ready architecture
- Markdown rendering with syntax highlighting for code outputs

### 🛠️ Developer Experience
- **TypeScript** throughout — full type safety
- **Modular architecture** — centralized tool configuration
- **Component-based design** — reusable UI components
- **Hot module replacement** — instant feedback during development

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **UI Library** | React 19 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 |
| **AI Engine** | Google Gemini AI |
| **Icons** | Lucide React |
| **Markdown** | react-markdown + remark-gfm |
| **Code Highlighting** | react-syntax-highlighter |
| **QR Generation** | qrcode |
| **Deployment** | Vercel-ready |

---

## 🏛️ Architecture

```
┌─────────────────────────────────────────────────┐
│                  Landing Page                    │
│  (Hero, Features, Comparison, FAQ, CTA)         │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│              Dashboard Layout                    │
│  ┌──────────┐  ┌──────────────────────────────┐ │
│  │  Navbar   │  │      Tool Categories        │ │
│  │          │  │                              │ │
│  └──────────┘  │  ┌────────┐  ┌────────────┐ │ │
│                │  │Writing │  │  Developer  │ │ │
│                │  │ Tools  │  │   Tools     │ │ │
│                │  ├────────┤  ├────────────┤ │ │
│                │  │ Media  │  │Productivity│ │ │
│                │  │ Tools  │  │   Tools    │ │ │
│                │  ├────────┤  └────────────┘ │ │
│                │  │Detection│                │ │
│                │  │ Tools  │                 │ │
│                │  └────────┘                 │ │
│                └──────────────────────────────┘ │
└─────────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│              API Layer (Route Handlers)           │
│  POST /api/generate  →  Gemini AI Integration    │
└─────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ installed
- **npm** or **yarn** or **pnpm**
- **Google Gemini API Key** ([Get one free](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SANGRAMADHIKARYsrc/nextgen-ai-studio.git
   cd nextgen-ai-studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
```

---

## 🧰 Tool Categories

### ✍️ AI Writing Tools (8 tools)
| Tool | Description | API |
|---|---|---|
| Grammar Fix | Fix grammar, spelling, and punctuation errors | Gemini |
| Blog Generator | Generate professional blog posts from topics | Gemini |
| README Generator | Create professional GitHub README files | Gemini |
| Resume Summary | Generate compelling resume summaries | Gemini |
| Cover Letter | Craft tailored cover letters | Gemini |
| Paraphrasing Tool | Rewrite text in different styles | Gemini |
| Paragraph Correction | Restructure and improve paragraph flow | Gemini |
| Plagiarism Checker | Detect potential plagiarism in content | Gemini |

### 🖼️ AI Media Tools (7 tools)
| Tool | Description | Status |
|---|---|---|
| Text to Speech | Convert text to natural-sounding speech | ✅ Available |
| Text to Image | Generate images from text descriptions | 🔜 Coming Soon |
| Image to Text (OCR) | Extract text from images | 🔜 Coming Soon |
| Background Remover | Remove backgrounds automatically | 🔜 Coming Soon |
| PDF to Word | Convert PDF to editable Word format | 🔜 Coming Soon |
| Word to PDF | Convert Word documents to PDF | 🔜 Coming Soon |
| Image Converter | Convert between PNG, JPG, WebP | 🔜 Coming Soon |

### 🛡️ AI Detection & Analysis (5 tools)
| Tool | Description | API |
|---|---|---|
| Fake News Detector | Analyze articles for misinformation | Gemini |
| Resume ATS Scoring | Score resume against job descriptions | Gemini |
| Sentiment Analysis | Analyze emotional tone of text | Gemini |
| Toxic Comment Detector | Identify toxic or harmful content | Gemini |
| AI Content Detector | Detect AI vs human-written content | Gemini |

### 💻 Developer Tools (5 tools)
| Tool | Description | API |
|---|---|---|
| Code Explainer | Get clear explanations of code snippets | Gemini |
| Code Converter | Convert code between languages | Gemini |
| API Tester | Test REST APIs with clean interface | Client |
| JSON Formatter | Format, validate, and beautify JSON | Client |
| Markdown Preview | Write and preview markdown in real-time | Client |

### ⚡ Productivity Tools (5 tools)
| Tool | Description | API |
|---|---|---|
| QR Code Generator | Generate customizable QR codes | Local |
| Password Generator | Create strong, secure passwords | Client |
| EMI Calculator | Calculate monthly loan installments | Client |
| Unit Converter | Convert between measurement units | Client |
| Percentage Calculator | Calculate percentages and ratios | Client |

---

## 📂 Project Structure

```
nextgen-ai-studio/
├── public/                    # Static assets
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── generate/      # Gemini AI API route
│   │   ├── dashboard/
│   │   │   ├── writing/       # 8 writing tool pages
│   │   │   ├── media/         # Media tool pages
│   │   │   ├── detection/     # 5 detection tool pages
│   │   │   ├── developer/     # 5 developer tool pages
│   │   │   ├── productivity/  # 5 productivity tool pages
│   │   │   ├── layout.tsx     # Dashboard shell layout
│   │   │   └── page.tsx       # Dashboard home
│   │   ├── globals.css        # Global styles & design system
│   │   ├── layout.tsx         # Root layout with fonts
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── landing/           # Landing page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── ComparisonSection.tsx
│   │   │   ├── FaqSection.tsx
│   │   │   └── StickyBar.tsx
│   │   ├── layout/            # Layout components
│   │   │   └── MotionBackground.tsx
│   │   ├── ui/                # Reusable UI components
│   │   └── CategoryPage.tsx   # Dynamic category page
│   ├── hooks/                 # Custom React hooks
│   └── lib/
│       └── tools-config.ts    # Centralized tool registry
├── .env.example               # Environment template
├── .env.local                 # Local environment (git-ignored)
├── next.config.ts             # Next.js configuration
├── postcss.config.mjs         # PostCSS config for Tailwind
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies & scripts
```

---

## 🔌 API Reference

### `POST /api/generate`

Proxies requests to Google Gemini AI with server-side API key management.

**Request Body:**
```json
{
  "prompt": "Your prompt text here",
  "type": "grammar | blog | code-explain | sentiment | ..."
}
```

**Response:**
```json
{
  "result": "AI-generated response text"
}
```

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow existing TypeScript conventions
- Use the centralized `tools-config.ts` for adding new tools
- Maintain the glassmorphism design system
- Test on mobile and desktop viewports

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

Built by [**Sangram Adhikary**](https://github.com/SANGRAMADHIKARYsrc) with ❤️ using **Next.js**, **React**, and **Google Gemini AI**.

---

<div align="center">

### ⭐ Star this repo if you find it useful!

[![GitHub stars](https://img.shields.io/github/stars/SANGRAMADHIKARYsrc/nextgen-ai-studio?style=social)](../../stargazers)

</div>
