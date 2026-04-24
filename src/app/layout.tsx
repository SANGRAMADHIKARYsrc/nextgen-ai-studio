import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NextGen AI Studio — AI Tools Platform",
  description:
    "Professional AI-powered tools for writing, development, media, detection, and productivity. One platform, unlimited possibilities.",
  keywords: [
    "AI tools",
    "AI writing",
    "code converter",
    "grammar checker",
    "blog generator",
    "QR generator",
    "developer tools",
  ],
  authors: [{ name: "NextGen AI Studio" }],
  openGraph: {
    title: "NextGen AI Studio",
    description: "All-in-one AI tools platform for professionals",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
