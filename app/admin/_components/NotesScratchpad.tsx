"use client";

import { useState, useEffect, useRef } from "react";

const KEY = "ayla-admin-notes";

type SR = {
  start: () => void;
  stop: () => void;
  abort: () => void;
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((ev: { results: { 0: { transcript: string }; isFinal: boolean }[] }) => void) | null;
  onend: (() => void) | null;
  onerror: ((ev: { error: string }) => void) | null;
};

export function NotesScratchpad() {
  const [value, setValue] = useState("");
  const [saved, setSaved] = useState<"idle" | "saving" | "saved">("idle");
  const [recording, setRecording] = useState(false);
  const [supported, setSupported] = useState(true);
  const timer = useRef<number | null>(null);
  const recog = useRef<SR | null>(null);

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (v) setValue(v);
    } catch {}
    const SRClass = (window as unknown as {
      SpeechRecognition?: new () => SR;
      webkitSpeechRecognition?: new () => SR;
    }).SpeechRecognition || (window as unknown as {
      webkitSpeechRecognition?: new () => SR;
    }).webkitSpeechRecognition;
    if (!SRClass) setSupported(false);
  }, []);

  function persist(v: string) {
    setValue(v);
    setSaved("saving");
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      try {
        localStorage.setItem(KEY, v);
        setSaved("saved");
      } catch {}
    }, 400);
  }

  function toggleRecord() {
    if (recording) {
      recog.current?.stop();
      return;
    }
    const SRClass = (window as unknown as {
      SpeechRecognition?: new () => SR;
      webkitSpeechRecognition?: new () => SR;
    }).SpeechRecognition || (window as unknown as {
      webkitSpeechRecognition?: new () => SR;
    }).webkitSpeechRecognition;
    if (!SRClass) return;
    const r = new SRClass();
    r.continuous = true;
    r.interimResults = false;
    r.lang = "en-US";
    let buffer = "";
    r.onresult = ev => {
      for (let i = 0; i < ev.results.length; i++) {
        const res = ev.results[i];
        if (res.isFinal) buffer += (buffer ? " " : "") + res[0].transcript.trim();
      }
      if (buffer) {
        const next = (value ? value + "\n\n" : "") + buffer;
        persist(next);
        buffer = "";
      }
    };
    r.onend = () => setRecording(false);
    r.onerror = () => setRecording(false);
    r.start();
    recog.current = r;
    setRecording(true);
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-pink-400 px-6 py-3 flex justify-between items-center">
        <span className="text-white text-[11px] font-bold tracking-[0.25em] uppercase">● Scratchpad</span>
        <div className="flex items-center gap-3">
          <span className="text-white/80 text-[10px] tracking-widest uppercase">
            {saved === "saving" ? "saving…" : saved === "saved" ? "saved locally" : "autosave on"}
          </span>
          {supported && (
            <button
              onClick={toggleRecord}
              aria-label={recording ? "Stop recording" : "Start voice memo"}
              className={`text-[10px] tracking-[0.25em] uppercase font-bold px-3 py-1 rounded-full transition-colors ${
                recording
                  ? "bg-white text-pink-500 animate-pulse"
                  : "bg-white/20 text-white hover:bg-white hover:text-pink-500"
              }`}
            >
              {recording ? "● recording" : "🎙 voice"}
            </button>
          )}
        </div>
      </div>
      <textarea
        value={value}
        onChange={e => persist(e.target.value)}
        placeholder="Brain dump. Anything. This stays in your browser only."
        rows={8}
        className="w-full p-6 text-sm text-gray-700 leading-relaxed focus:outline-none resize-none placeholder-gray-300"
        style={{ fontFamily: "var(--font-playfair)" }}
      />
    </div>
  );
}
