import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateWithGemini(
  prompt: string,
  systemInstruction?: string
): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: systemInstruction || "You are a helpful AI assistant.",
  });

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}

export const AI_PROMPTS = {
  grammarFix: (text: string) => ({
    system:
      "You are a professional grammar and style editor. Fix all grammar, spelling, and punctuation errors. Maintain the original meaning and tone. Return only the corrected text, no explanations unless asked.",
    prompt: `Fix the grammar, spelling, and punctuation in the following text:\n\n${text}`,
  }),

  blogGenerator: (topic: string, tone: string, length: string) => ({
    system:
      "You are a professional blog writer. Write engaging, SEO-optimized blog posts with proper headings, subheadings, and formatting in Markdown.",
    prompt: `Write a ${length} blog post about "${topic}" in a ${tone} tone. Include:\n- An engaging title\n- Introduction\n- 3-5 main sections with subheadings\n- Conclusion\n- Use markdown formatting`,
  }),

  readmeGenerator: (
    projectName: string,
    description: string,
    techStack: string,
    features: string
  ) => ({
    system:
      "You are a developer documentation expert. Create professional, comprehensive GitHub README files in Markdown format with badges, proper sections, and clear instructions.",
    prompt: `Generate a professional GitHub README.md for:\n\nProject: ${projectName}\nDescription: ${description}\nTech Stack: ${techStack}\nFeatures: ${features}\n\nInclude: badges, installation, usage, API docs (if applicable), contributing guidelines, and license section.`,
  }),

  codeExplainer: (code: string, language: string) => ({
    system:
      "You are a senior software engineer and educator. Explain code clearly and thoroughly, breaking down complex logic for developers of all levels. Use markdown formatting.",
    prompt: `Explain this ${language} code in detail:\n\n\`\`\`${language}\n${code}\n\`\`\`\n\nProvide:\n1. Overview of what the code does\n2. Line-by-line or block-by-block explanation\n3. Key concepts used\n4. Potential improvements`,
  }),

  codeConverter: (code: string, fromLang: string, toLang: string) => ({
    system:
      "You are an expert polyglot programmer. Convert code between languages while following idiomatic patterns and best practices of the target language. Preserve all logic and add comments where the conversion differs.",
    prompt: `Convert this ${fromLang} code to ${toLang}:\n\n\`\`\`${fromLang}\n${code}\n\`\`\`\n\nProvide the converted code with comments explaining any notable differences.`,
  }),

  resumeSummary: (experience: string, role: string) => ({
    system:
      "You are a professional resume writer with expertise in HR and recruiting. Write compelling, ATS-friendly resume content.",
    prompt: `Generate a professional resume summary for:\n\nTarget Role: ${role}\nExperience/Skills: ${experience}\n\nProvide:\n1. A 3-4 sentence professional summary\n2. 5 bullet points highlighting key achievements\n3. Skills section optimized for ATS`,
  }),

  coverLetter: (role: string, company: string, experience: string) => ({
    system:
      "You are an expert career coach. Write professional, tailored cover letters that highlight relevant experience and demonstrate cultural fit.",
    prompt: `Write a cover letter for:\n\nRole: ${role}\nCompany: ${company}\nBackground: ${experience}\n\nMake it professional, engaging, and tailored. Include proper formatting.`,
  }),

  paraphrase: (text: string, style: string) => ({
    system:
      "You are a professional writer. Paraphrase text while preserving the original meaning. Adapt to the requested style.",
    prompt: `Paraphrase the following text in a ${style} style:\n\n${text}`,
  }),

  paragraphCorrection: (text: string) => ({
    system:
      "You are a professional editor. Restructure and improve paragraphs for better flow, clarity, and readability while preserving the core message.",
    prompt: `Improve the following paragraph(s) for better structure, flow, and clarity:\n\n${text}`,
  }),

  plagiarismCheck: (text: string) => ({
    system:
      "You are an academic integrity specialist. Analyze text for potential plagiarism indicators like common phrases, unusual style shifts, and overly generic content. Note: This is an AI-based analysis, not a database check.",
    prompt: `Analyze this text for potential plagiarism indicators:\n\n${text}\n\nProvide:\n1. Originality score estimate (percentage)\n2. Flagged sections (if any)\n3. Style consistency analysis\n4. Recommendations`,
  }),

  fakeNewsDetector: (text: string) => ({
    system:
      "You are a media literacy expert and fact-checker. Analyze news articles for credibility indicators, logical fallacies, and potential misinformation.",
    prompt: `Analyze this article/text for potential misinformation:\n\n${text}\n\nProvide:\n1. Credibility score (1-10)\n2. Red flags identified\n3. Claims that need verification\n4. Source assessment\n5. Overall verdict`,
  }),

  atsScoring: (resume: string, jobDescription: string) => ({
    system:
      "You are an HR technology expert specializing in Applicant Tracking Systems. Score resumes against job descriptions and provide actionable improvement suggestions.",
    prompt: `Score this resume against the job description:\n\nRESUME:\n${resume}\n\nJOB DESCRIPTION:\n${jobDescription}\n\nProvide:\n1. ATS Score (0-100)\n2. Keyword match analysis\n3. Missing keywords\n4. Format issues\n5. Specific improvement suggestions`,
  }),

  sentimentAnalysis: (text: string) => ({
    system:
      "You are a natural language processing expert specializing in sentiment analysis. Provide detailed emotional analysis of text.",
    prompt: `Analyze the sentiment of this text:\n\n${text}\n\nProvide:\n1. Overall sentiment (Positive/Negative/Neutral/Mixed)\n2. Confidence score (percentage)\n3. Emotion breakdown (joy, sadness, anger, fear, surprise, etc.)\n4. Key phrases contributing to sentiment\n5. Tone analysis`,
  }),

  toxicCommentDetector: (text: string) => ({
    system:
      "You are a content moderation expert. Analyze text for toxicity, hate speech, harassment, and other harmful content. Be objective and thorough.",
    prompt: `Analyze this text for toxicity:\n\n${text}\n\nProvide:\n1. Toxicity score (0-100)\n2. Categories detected (hate, threat, insult, obscene, etc.)\n3. Flagged phrases\n4. Severity level\n5. Moderation recommendation`,
  }),

  aiContentDetector: (text: string) => ({
    system:
      "You are an expert in distinguishing AI-generated text from human-written text. Analyze writing patterns, consistency, creativity markers, and other indicators.",
    prompt: `Analyze whether this text is AI-generated or human-written:\n\n${text}\n\nProvide:\n1. AI probability score (percentage)\n2. Key indicators found\n3. Patterns analysis (perplexity, burstiness, etc.)\n4. Verdict with confidence level`,
  }),
};
