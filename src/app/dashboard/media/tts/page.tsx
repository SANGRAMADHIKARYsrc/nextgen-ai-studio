"use client";

import { useState, useEffect } from "react";
import { Volume2, Play, Square, Pause } from "lucide-react";
import { ToolPageLayout, ToolInput, ToolSelect } from "@/components/ui/ToolComponents";

export default function TextToSpeechPage() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const v = speechSynthesis.getVoices();
      setVoices(v);
      if (v.length > 0 && !selectedVoice) {
        setSelectedVoice(v[0].name);
      }
    };
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, [selectedVoice]);

  const speak = () => {
    if (!text.trim()) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find((v) => v.name === selectedVoice);
    if (voice) utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.onend = () => { setSpeaking(false); setPaused(false); };
    speechSynthesis.speak(utterance);
    setSpeaking(true);
    setPaused(false);
  };

  const pause = () => {
    speechSynthesis.pause();
    setPaused(true);
  };

  const resume = () => {
    speechSynthesis.resume();
    setPaused(false);
  };

  const stop = () => {
    speechSynthesis.cancel();
    setSpeaking(false);
    setPaused(false);
  };

  return (
    <ToolPageLayout title="Text to Speech" description="Convert text to natural-sounding speech audio" icon={Volume2} color="#f472b6" backHref="/dashboard/media">
      <div className="max-w-3xl mx-auto glass rounded-2xl p-6 space-y-6">
        <ToolInput value={text} onChange={setText} placeholder="Enter text to convert to speech..." rows={6} label="Text" maxLength={5000} />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ToolSelect
            value={selectedVoice}
            onChange={setSelectedVoice}
            label="Voice"
            options={voices.map((v) => ({ value: v.name, label: `${v.name} (${v.lang})` }))}
          />
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[var(--color-muted-foreground)]">Rate</span>
              <span className="font-mono">{rate}x</span>
            </div>
            <input type="range" min={0.5} max={2} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-[var(--color-primary)]" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[var(--color-muted-foreground)]">Pitch</span>
              <span className="font-mono">{pitch}</span>
            </div>
            <input type="range" min={0.5} max={2} step={0.1} value={pitch} onChange={(e) => setPitch(Number(e.target.value))} className="w-full accent-[var(--color-primary)]" />
          </div>
        </div>

        <div className="flex gap-3">
          {!speaking ? (
            <button onClick={speak} disabled={!text.trim()} className="flex-1 px-6 py-3 rounded-xl font-semibold text-sm gradient-primary text-white hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
              <Play className="w-4 h-4" /> Speak
            </button>
          ) : (
            <>
              <button onClick={paused ? resume : pause} className="flex-1 px-6 py-3 rounded-xl font-semibold text-sm glass hover:bg-[var(--color-card-hover)] transition-colors flex items-center justify-center gap-2">
                {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                {paused ? "Resume" : "Pause"}
              </button>
              <button onClick={stop} className="px-6 py-3 rounded-xl font-semibold text-sm bg-[var(--color-error)]/10 text-[var(--color-error)] border border-[var(--color-error)]/30 hover:bg-[var(--color-error)]/20 transition-colors flex items-center justify-center gap-2">
                <Square className="w-4 h-4" /> Stop
              </button>
            </>
          )}
        </div>

        {speaking && (
          <div className="flex items-center justify-center gap-2 py-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-1 bg-[var(--color-primary)] rounded-full animate-pulse" style={{ height: `${12 + Math.random() * 20}px`, animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
            <span className="text-sm text-[var(--color-muted-foreground)] ml-2">
              {paused ? "Paused" : "Speaking..."}
            </span>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
