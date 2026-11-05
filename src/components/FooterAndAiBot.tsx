"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles, Send, X } from "lucide-react";
import { PROFILE, PROJECTS, EXPERIENCES, EDUCATION } from "@/data/portfolio";

interface ChatMessage {
  role: "bot" | "user";
  text: string;
}

const SUGGESTED_PROMPTS = [
  "What apps has Umair published?",
  "Tell me about his offline-first work",
  "Experience & CI/CD impact?",
  "How can I hire Umair?",
];

function generatePortfolioAnswer(query: string, mode: "pro" | "friendly"): string {
  const q = query.toLowerCase();

  if (q.includes("app") || q.includes("project") || q.includes("ohana") || q.includes("salveowell") || q.includes("swapp") || q.includes("gcart") || q.includes("lofu") || q.includes("boshna") || q.includes("gahhak") || q.includes("pos")) {
    const list = PROJECTS.map(
      (p) => `• ${p.title} (${p.links.length} link${p.links.length > 1 ? "s" : ""} · ${p.region})`
    ).join("\n");
    return mode === "pro"
      ? `Umair's portfolio spans 24 live Android, iOS, and Web/POS deployments across 9 product ecosystems:\n${list}\n\nUse the 'Ecosystems' or 'All Links' toggle in Production Work (#projects) to launch any Google Play, App Store, or Web POS build.`
      : `Hey! Umair has shipped 24 Android, iOS, and Web/POS builds across 9 ecosystems:\n${list}\n\nCheck out #projects and toggle 'All Links' to open any Play Store, App Store, or Web POS link directly!`;
  }

  if (q.includes("offline") || q.includes("powersync") || q.includes("sync") || q.includes("architecture")) {
    return mode === "pro"
      ? "Umair specialises in Feature-First Clean Architecture (MVVM) with BLoC, Cubit, and Riverpod. At Bixo Soft, he engineered an offline-first system using PowerSync, encrypted local storage, biometric auth, and RBAC—keeping fintech & enterprise workflows 100% operational without connectivity and syncing in sub-second latency."
      : "Offline-first is Umair's superpower! He pairs Clean Architecture (BLoC/Riverpod) with PowerSync, encrypted SQLite storage, and biometric RBAC so users can transact smoothly even with zero signal.";
  }

  if (q.includes("experience") || q.includes("work") || q.includes("company") || q.includes("bixo") || q.includes("gteksol") || q.includes("ci/cd") || q.includes("fastlane")) {
    const roles = EXPERIENCES.map((e) => `• ${e.role} @ ${e.company} (${e.period})`).join("\n");
    return `Umair brings 4+ years of production mobile experience:\n${roles}\n\nKey wins: Automated iOS & Android releases with Fastlane (2 hours → 15 minutes across 30+ submissions), cut cold start from 3.1s → 1.4s (-22% RAM), and standardized Clean Architecture across a 4-developer mobile team.`;
  }

  if (q.includes("payment") || q.includes("fintech") || q.includes("transaction")) {
    return "Umair has deep fintech payment expertise—integrating multi-gateway mobile money & card payment pipelines with real-time event streaming that process 15,000+ monthly transactions for 20,000+ users at 99.4%+ crash-free reliability.";
  }

  if (q.includes("skill") || q.includes("stack") || q.includes("flutter") || q.includes("kotlin") || q.includes("react native")) {
    return "Core stack: Flutter, Dart, Kotlin, Java, and React Native. State & Architecture: Clean Architecture (MVVM), BLoC, Cubit, Riverpod, GetX, Provider, Zustand & TanStack Query. Backend: PowerSync, Firebase, Supabase, GraphQL, REST, WebSockets, Node.js, Google Maps SDK, and Fastlane CI/CD.";
  }

  if (q.includes("education") || q.includes("degree") || q.includes("university")) {
    return `Umair holds a ${EDUCATION.degree} from ${EDUCATION.institution} (${EDUCATION.period}).`;
  }

  if (q.includes("git") || q.includes("gitlab") || q.includes("repo") || q.includes("code")) {
    return `You can check out Umair's repositories and activity on GitLab here:\n• GitLab: ${PROFILE.gitlab}\n• LinkedIn: ${PROFILE.linkedin}`;
  }

  if (q.includes("hire") || q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("available")) {
    return `Umair is open to Senior Mobile / Flutter roles, remote contracts, and global client builds!\n• Email: ${PROFILE.email}\n• Phone / WhatsApp: ${PROFILE.phone}\n• GitLab: ${PROFILE.gitlab}\n• LinkedIn: linkedin.com/in/umair-amjad-53410b149\n• Location: ${PROFILE.location} (Remote-ready)`;
  }

  return mode === "pro"
    ? `Umair Amjad is a Senior Mobile Application Developer with 4+ years of experience, 12 live store apps, 20,000+ fintech users, and 99.4% crash-free reliability. Ask me about his apps (Ohana Africa, Salveowell, SWAPP), offline-first PowerSync architecture, Fastlane CI/CD, or how to contact him!`
    : `Awesome question! Umair is a Senior Mobile App Developer (Flutter, Kotlin, React Native) with 12 live iOS & Android apps. Try asking about his fintech apps, offline-first PowerSync setup, performance wins, or contact details!`;
}

export function PortfolioFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-zinc-900 bg-black py-14 text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at top, rgba(245, 158, 11, 0.12), transparent 55%), linear-gradient(180deg, #020304 0%, #060a0f 65%, #020304 100%)",
        }}
      />

      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-serif text-4xl font-extrabold tracking-tight text-zinc-100 sm:text-5xl">
              {PROFILE.name}
            </h2>

            {/* Developer Code Object (signature element from reference site) */}
            <div className="mt-4 max-w-2xl font-mono text-xs leading-relaxed text-zinc-400 sm:text-sm">
              <div className="mb-1">
                <span className="text-amber-300">const</span>{" "}
                <span className="text-zinc-200">developer</span>{" "}
                <span className="text-sky-300">=</span>{" "}
                <span className="text-emerald-300">{"{"}</span>
              </div>
              <div className="mb-1 pl-6">
                <span className="text-sky-300">name:</span>{" "}
                <span className="text-amber-200">&quot;{PROFILE.name}&quot;</span>,
              </div>
              <div className="mb-1 pl-6">
                <span className="text-sky-300">role:</span>{" "}
                <span className="text-amber-200">
                  &quot;Senior Mobile Application Developer | Flutter &amp; Native&quot;
                </span>
                ,
              </div>
              <div className="mb-1 pl-6">
                <span className="text-sky-300">specialties:</span>{" "}
                <span className="text-emerald-300">[</span>
                <span className="text-amber-200">
                  &quot;Offline-First (PowerSync)&quot;, &quot;Fintech Payments&quot;, &quot;Clean Architecture&quot;
                </span>
                <span className="text-emerald-300">]</span>,
              </div>
              <div className="mb-1 pl-6">
                <span className="text-sky-300">trackRecord:</span>{" "}
                <span className="text-amber-200">
                  &quot;12 Live Store Apps · 20,000+ Users · 99.4% Crash-Free&quot;
                </span>
                ,
              </div>
              <div className="mb-1 pl-6">
                <span className="text-sky-300">gitlab:</span>{" "}
                <span className="text-amber-200">&quot;gitlab.com/Umair_Amjad&quot;</span>,
              </div>
              <div className="pl-6">
                <span className="text-sky-300">currentStatus:</span>{" "}
                <span className="text-amber-200">
                  &quot;Open to Senior Mobile roles &amp; global client collaborations&quot;
                </span>
              </div>
              <div className="mt-1">
                <span className="text-emerald-300">{"};"}</span>
              </div>
            </div>
          </div>

          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            Let&apos;s ship resilient mobile products
          </p>
        </div>

        {/* Slash-Separated Links */}
        <div className="mb-8 flex flex-wrap items-center gap-y-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-300">
          <a
            href={PROFILE.gitlab}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-amber-200"
          >
            GITLAB
          </a>
          <span className="px-3 text-zinc-600">/</span>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-amber-200"
          >
            LINKEDIN
          </a>
          <span className="px-3 text-zinc-600">/</span>
          <a
            href={`mailto:${PROFILE.email}`}
            className="transition hover:text-amber-200"
          >
            EMAIL
          </a>
          <span className="px-3 text-zinc-600">/</span>
          <a
            href={PROFILE.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-amber-200"
          >
            WHATSAPP ({PROFILE.phone})
          </a>
          <span className="px-3 text-zinc-600">/</span>
          <a
            href={PROFILE.resumeUrl}
            download="Umair_Amjad_Senior_Mobile_Developer_CV.pdf"
            className="transition hover:text-amber-200"
          >
            RESUME PDF
          </a>
        </div>

        <div className="flex flex-col items-start justify-between gap-2 border-t border-zinc-800/90 pt-5 font-mono text-[11px] uppercase tracking-[0.1em] text-zinc-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {PROFILE.name} · {PROFILE.location}</p>
          <p>Engineered with Clean Architecture &amp; ❤️</p>
        </div>
      </div>
    </footer>
  );
}

export function FloatingAiAssistant({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [mode, setMode] = useState<"pro" | "friendly">("pro");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      text: "Hi! I'm Umair's portfolio assistant. Ask me about his 12 live apps, offline-first PowerSync architecture, Fastlane CI/CD, or availability!",
    },
  ]);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Global Cmd/Ctrl + K shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const sendQuestion = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    const reply = generatePortfolioAnswer(trimmed, mode);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: trimmed },
      { role: "bot", text: reply },
    ]);
    setInput("");
    setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }
    }, 30);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[180] flex flex-col items-end sm:bottom-7 sm:right-7">
      {/* Popup Chat Window */}
      <div
        className={`mb-3 w-[min(92vw,375px)] overflow-hidden rounded-2xl border border-emerald-500/35 bg-[#05080b]/95 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(16,185,129,0.16)] backdrop-blur-xl transition-all duration-300 ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-emerald-500/20 px-4 py-2.5 font-mono">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-200">
              Umair AI Assistant
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close AI popup"
            className="rounded p-1 text-zinc-400 transition hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="relative flex h-[410px] flex-col p-3.5">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.13),_transparent_58%)]" />

          {/* Messages */}
          <div
            ref={listRef}
            className="no-visible-scrollbar relative flex-1 space-y-3 overflow-y-auto pr-1 font-mono text-xs"
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`max-w-[88%] whitespace-pre-wrap rounded-2xl border px-3 py-2.5 leading-relaxed ${
                  m.role === "bot"
                    ? "border-zinc-700/70 bg-zinc-900/80 text-zinc-200"
                    : "ml-auto border-emerald-400/40 bg-emerald-500/15 text-emerald-100"
                }`}
              >
                {m.text}
              </div>
            ))}

            {/* Quick Prompt Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendQuestion(prompt)}
                  className="rounded-full border border-emerald-500/25 bg-emerald-500/[0.07] px-2.5 py-1 text-left font-mono text-[10px] text-emerald-200 transition hover:border-emerald-300/60 hover:bg-emerald-500/15"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Controls + Input */}
          <div className="relative mt-3 border-t border-zinc-800/80 pt-2.5">
            <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-300/75">
              <button
                type="button"
                onClick={() =>
                  setMessages([
                    {
                      role: "bot",
                      text: "Chat cleared. Ask anything about Umair's mobile apps, stack, or availability!",
                    },
                  ])
                }
                className="rounded-full border border-emerald-500/20 px-2.5 py-0.5 transition hover:border-emerald-400/50 hover:text-emerald-100"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setMode((m) => (m === "pro" ? "friendly" : "pro"))}
                className="rounded-full border border-emerald-500/20 px-2.5 py-0.5 transition hover:border-emerald-400/50 hover:text-emerald-100"
              >
                Mode: {mode}
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendQuestion(input);
              }}
              className="flex items-center gap-2 rounded-2xl border border-zinc-700/80 bg-zinc-900/80 px-3 py-2"
            >
              <span className="font-mono text-[11px] text-emerald-300">$</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about apps, Flutter, hire..."
                aria-label="Ask Umair's assistant"
                className="w-full bg-transparent font-mono text-xs text-zinc-100 outline-none placeholder:text-zinc-500"
              />
              <button
                type="submit"
                aria-label="Send question"
                className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-400/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-emerald-200 transition hover:border-emerald-300/70 hover:text-white"
              >
                <Send className="h-3 w-3" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Floating Trigger Pill (matching reference `$ Ask Tahir`) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open personal AI assistant"
        className="group relative inline-flex items-center gap-2.5 rounded-full border border-emerald-400/45 bg-black/85 px-3.5 py-2 font-mono text-xs font-semibold tracking-[0.08em] text-emerald-100 shadow-[0_10px_30px_rgba(0,0,0,0.75)] backdrop-blur-md transition hover:border-emerald-300/80"
      >
        <span className="relative grid h-8 w-8 place-items-center rounded-full border border-emerald-400/35 bg-emerald-500/15 text-emerald-200">
          <span className="absolute -left-0.5 -top-0.5 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
          <span className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.9)]" />
          <Sparkles className="h-3.5 w-3.5" />
        </span>
        <span className="whitespace-nowrap pr-1">
          <span className="text-emerald-300">$</span> Ask Umair
        </span>
        <span className="absolute -inset-1 -z-10 rounded-full bg-emerald-400/20 opacity-0 blur-xl transition group-hover:opacity-100" />
      </button>
    </div>
  );
}

