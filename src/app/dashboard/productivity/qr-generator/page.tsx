"use client";

import { useState, useRef } from "react";
import { QrCode, Download } from "lucide-react";
import { ToolPageLayout, ToolTextInput, ToolSelect } from "@/components/ui/ToolComponents";
import QRCode from "qrcode";

export default function QrGeneratorPage() {
  const [text, setText] = useState("");
  const [size, setSize] = useState("300");
  const [color, setColor] = useState("#6366f1");
  const [bgColor, setBgColor] = useState("#09090b");
  const [qrUrl, setQrUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = async () => {
    if (!text.trim()) return;
    try {
      const url = await QRCode.toDataURL(text, {
        width: parseInt(size),
        margin: 2,
        color: {
          dark: color,
          light: bgColor,
        },
      });
      setQrUrl(url);
    } catch {
      console.error("QR generation failed");
    }
  };

  const downloadQR = () => {
    if (!qrUrl) return;
    const a = document.createElement("a");
    a.href = qrUrl;
    a.download = "qrcode.png";
    a.click();
  };

  return (
    <ToolPageLayout title="QR Code Generator" description="Generate customizable QR codes from any text or URL" icon={QrCode} color="#fbbf24" backHref="/dashboard/productivity">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="glass-card rounded-2xl p-7 space-y-5">
          <ToolTextInput value={text} onChange={setText} placeholder="Enter URL or text..." label="Content" />
          <ToolSelect value={size} onChange={setSize} label="Size" options={[
            { value: "200", label: "200 × 200" },
            { value: "300", label: "300 × 300" },
            { value: "400", label: "400 × 400" },
            { value: "500", label: "500 × 500" },
          ]} />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--color-muted-foreground)]">QR Color</label>
              <div className="flex items-center gap-2">
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0" />
                <span className="text-xs font-mono text-[var(--color-muted)]">{color}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--color-muted-foreground)]">Background</label>
              <div className="flex items-center gap-2">
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0" />
                <span className="text-xs font-mono text-[var(--color-muted)]">{bgColor}</span>
              </div>
            </div>
          </div>
          <button onClick={generateQR} disabled={!text.trim()} className="w-full px-6 py-3 rounded-xl font-semibold text-sm gradient-primary text-white hover:opacity-90 disabled:opacity-50 transition-all">
            Generate QR Code
          </button>
        </div>

        {/* Preview */}
        <div className="glass-card rounded-2xl p-7 flex flex-col items-center justify-center">
          <canvas ref={canvasRef} className="hidden" />
          {qrUrl ? (
            <>
              <img src={qrUrl} alt="QR Code" className="rounded-xl mb-4" style={{ maxWidth: `${size}px` }} />
              <button onClick={downloadQR} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm glass hover:bg-[var(--color-card-hover)] transition-colors">
                <Download className="w-4 h-4" />
                Download PNG
              </button>
            </>
          ) : (
            <div className="text-center py-12">
              <QrCode className="w-16 h-16 text-[var(--color-muted)] mx-auto mb-4 opacity-30" />
              <p className="text-sm text-[var(--color-muted)]">QR code preview will appear here</p>
            </div>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}
