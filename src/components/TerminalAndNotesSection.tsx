"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, X, BookOpen, CheckCircle2 } from "lucide-react";
import {
  ENGINEERING_NOTES,
  EngineeringNote,
  PROFILE,
  PROJECTS,
  EXPERIENCES,
  EDUCATION,
} from "@/data/portfolio";
import { SectionGridBackground, SectionBadge } from "@/components/ui/Primitives";

interface TerminalEntry {
  cmd?: string;
  lines: string[];
}

const QUICK_COMMANDS = ["help", "whoami", "skills", "apps", "gitlab", "experience", "contact"];

export function TerminalAndNotesSection() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      lines: [
        "Welcome to umair-portfolio interactive shell (v4.2).",
        "Type 'help' or click a command chip below to inspect Umair's profile.",
      ],
    },
  ]);
  const [activeNote, setActiveNote] = useState<EngineeringNote | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const runCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    let response: string[] = [];

    switch (cmd) {
      case "help":
        response = [
          "Available commands:",
          "  whoami       → Summary & role",
          "  skills       → Mobile, architecture & backend stack",
          "  apps         → Live App Store & Google Play products",
          "  experience   → Career timeline (Bixo Soft, Gteksol, Alrehman)",
          "  metrics      → Key production telemetry & benchmarks",
          "  education    → University degree",
          "  contact      → Email, Phone/WhatsApp & LinkedIn",
          "  resume       → Download Umair's PDF CV",
          "  clear        → Clear terminal output",
        ];
        break;
      case "whoami":
        response = [
          `${PROFILE.name} — ${PROFILE.role}`,
          `Location: ${PROFILE.location} (Remote-Ready)`,
          PROFILE.summary,
        ];
        break;
      case "skills":
        response = [
          "• Mobile: Flutter, Dart, Kotlin, Java, React Native",
          "• Architecture: Clean Architecture (MVVM), Feature-First, BLoC, Cubit, Riverpod, GetX, Provider, SOLID",
          "• Backend & Sync: PowerSync (Offline-First), Firebase, Supabase, REST, GraphQL, WebSockets, Node.js",
          "• Delivery & QA: Fastlane CI/CD, App Store Connect, Play Console, Unit/Widget/Integration Tests, Crashlytics",
        ];
        break;
      case "apps":
      case "projects":
        response = [
          "Live Portfolio Ecosystems (24 Android, iOS & Web/POS links):",
          ...PROJECTS.map(
            (p, idx) =>
              `  [0${idx + 1}] ${p.title} (${p.links.length} build${
                p.links.length > 1 ? "s" : ""
              } · ${p.region})`
          ),
          "Tip: Scroll to #projects and switch to 'All Links' to browse or copy every URL.",
        ];
        break;
      case "experience":
        response = EXPERIENCES.map(
          (e) => `• ${e.company} | ${e.role} (${e.period})`
        );
        break;
      case "metrics":
        response = [
          "• 12 Production Apps live on App Store & Google Play",
          "• 20,000+ Fintech Users @ 99.4% crash-free sessions",
          "• 15,000+ Monthly multi-gateway payment transactions",
          "• 2h → 15m Store deployments via Fastlane (30+ submissions)",
          "• 3.1s → 1.4s Cold start & -22% memory footprint",
        ];
        break;
      case "education":
        response = [
          `${EDUCATION.degree} — ${EDUCATION.institution} (${EDUCATION.period})`,
        ];
        break;
      case "gitlab":
      case "git":
        response = [
          `GitLab Profile: ${PROFILE.gitlab}`,
          "Tip: Click 'View GitLab @Umair_Amjad' in the Release Telemetry section or footer.",
        ];
        break;
      case "contact":
      case "hire":
      case "sudo hire umair":
        response = [
          `Email    : ${PROFILE.email}`,
          `Phone    : ${PROFILE.phone}`,
          `GitLab   : ${PROFILE.gitlab}`,
          `GitHub   : ${PROFILE.github}`,
          `LinkedIn : ${PROFILE.linkedin}`,
          "Tip      : Scroll down to #contact to use the instant inquiry dispatcher.",
        ];
        break;
      case "resume":
        response = [`Downloading CV → ${PROFILE.resumeUrl}`];
        if (typeof window !== "undefined") {
          window.open(PROFILE.resumeUrl, "_blank");
        }
        break;
      default:
        response = [
          `zsh: command not found: ${rawCmd}`,
          "Try 'help', 'apps', 'skills', 'metrics', or 'contact'.",
        ];
    }

    setHistory((prev) => [...prev, { cmd: rawCmd, lines: response }]);
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 30);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    runCommand(input);
    setInput("");
  };

  return (
    <section
      id="terminal"
      className="relative overflow-hidden bg-black py-20 text-white sm:py-24"
    >
      <SectionGridBackground rgb="14, 165, 233" />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black via-black/50 to-transparent" />

      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
          {/* Left Column: Interactive CLI Terminal */}
          <div className="p-2 sm:p-4">
            <div className="mb-5">
              <SectionBadge label="Terminal" tone="cyan" />
            </div>
            <h2 className="mb-3 font-serif text-4xl font-extrabold tracking-tight text-zinc-100 sm:text-5xl">
              Know Me More
            </h2>
            <p className="mb-6 font-mono text-[12px] leading-relaxed text-zinc-400 sm:text-sm">
              Query my architecture stack, live store apps, benchmarks, or contact info directly via terminal.
            </p>

            <div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#0b0e12] shadow-2xl">
              {/* macOS Window Header */}
              <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/90 px-4 py-3 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-500/90" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/90" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/90" />
                </div>
                <div className="flex-1 text-center">
                  <span className="truncate font-mono text-xs text-zinc-400">
                    umair-portfolio — zsh
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setHistory([
                      {
                        lines: [
                          "Terminal reset. Type 'help' to see available commands.",
                        ],
                      },
                    ])
                  }
                  aria-label="Reset terminal"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950 text-zinc-300 transition hover:border-cyan-400/50 hover:text-white"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Quick Command Bar */}
              <div className="flex flex-wrap items-center gap-1.5 border-b border-zinc-800/80 bg-black/50 px-3 py-2">
                {QUICK_COMMANDS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => runCommand(q)}
                    className="rounded border border-cyan-500/25 bg-cyan-500/[0.08] px-2 py-0.5 font-mono text-[10px] text-cyan-200 transition hover:border-cyan-300/60 hover:bg-cyan-400/15"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Output Area */}
              <div
                ref={scrollRef}
                className="no-visible-scrollbar h-[310px] space-y-3 overflow-y-auto p-4 font-mono text-xs"
              >
                {history.map((entry, idx) => (
                  <div key={idx} className="space-y-1">
                    {entry.cmd && (
                      <div className="flex items-center gap-1.5 text-zinc-200">
                        <span className="text-sky-400">umair-portfolio</span>
                        <span className="text-emerald-500">:</span>
                        <span className="text-sky-300">~</span>
                        <span className="text-zinc-500">$</span>
                        <span>{entry.cmd}</span>
                      </div>
                    )}
                    {entry.lines.map((line, lIdx) => (
                      <p
                        key={lIdx}
                        className="whitespace-pre-wrap leading-relaxed text-zinc-400"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                ))}

                <form onSubmit={handleSubmit} className="pt-1">
                  <label className="flex items-center gap-1.5 font-mono">
                    <span className="shrink-0">
                      <span className="text-sky-400">umair-portfolio</span>
                      <span className="text-emerald-500">:</span>
                      <span className="text-sky-300">~</span>
                      <span className="text-zinc-500">$</span>
                    </span>
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="type command..."
                      autoComplete="off"
                      spellCheck={false}
                      className="flex-1 bg-transparent font-mono text-xs text-zinc-100 outline-none placeholder:text-zinc-600"
                    />
                  </label>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column: Engineering Architecture Notes (Clickable & Readable!) */}
          <div className="p-2 sm:p-4">
            <div className="mb-5">
              <SectionBadge label="Writing" tone="cyan" />
            </div>
            <h2 className="mb-3 font-serif text-4xl font-extrabold tracking-tight text-zinc-100 sm:text-5xl">
              Architecture Notes
            </h2>
            <p className="mb-6 font-mono text-[12px] leading-relaxed text-zinc-400 sm:text-sm">
              Field playbooks from shipping offline-first fintech apps, multi-gateway payments, and 15-minute Fastlane deployments.
            </p>

            <div className="relative max-h-[420px] overflow-y-auto rounded-xl border border-cyan-500/20 bg-zinc-950/75 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="pointer-events-none sticky inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />

              {ENGINEERING_NOTES.map((note) => (
                <button
                  key={note.id}
                  type="button"
                  onClick={() => setActiveNote(note)}
                  className="block w-full border-b border-cyan-500/15 p-4 text-left transition last:border-b-0 hover:bg-cyan-400/[0.08]"
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300/85">
                      {note.domain} · {note.readTime}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500">
                      {note.index}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.06em] text-zinc-100">
                      {note.title}
                    </h3>
                    <span className="shrink-0 rounded border border-cyan-400/35 bg-cyan-400/10 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-cyan-100 transition hover:border-cyan-300/70">
                      Read
                    </span>
                  </div>

                  <p className="mt-2 font-mono text-[11px] leading-relaxed text-zinc-400">
                    {note.summary}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Note Reader Modal */}
      <AnimatePresence>
        {activeNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveNote(null)}
            className="fixed inset-0 z-[310] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[86vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-cyan-400/35 bg-[#060a0e] p-6 text-white shadow-2xl sm:p-7"
            >
              <button
                type="button"
                onClick={() => setActiveNote(null)}
                aria-label="Close note"
                className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-zinc-300 transition hover:border-cyan-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="inline-flex items-center gap-2 rounded border border-cyan-400/35 bg-cyan-400/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-cyan-200">
                <BookOpen className="h-3 w-3" />
                <span>
                  {activeNote.domain} · {activeNote.readTime}
                </span>
              </div>

              <h3 className="mt-3 font-serif text-2xl font-extrabold text-zinc-100 sm:text-3xl">
                {activeNote.title}
              </h3>

              <p className="mt-3 font-mono text-xs leading-relaxed text-zinc-300">
                {activeNote.summary}
              </p>

              <div className="mt-5 space-y-2.5">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-cyan-200/85">
                  Key Production Takeaways
                </p>
                {activeNote.takeaways.map((point, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 font-mono text-xs leading-relaxed text-zinc-300"
                  >
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 overflow-x-auto rounded-xl border border-zinc-800 bg-black/85 p-4">
                <pre className="font-mono text-[11px] leading-relaxed text-emerald-300">
                  <code>{activeNote.codeSnippet}</code>
                </pre>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

