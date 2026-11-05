"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MessageSquare,
  Phone,
  Linkedin,
  Gitlab,
  Github,
  Copy,
  Check,
  FileDown,
  Clock,
  Globe2,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Send,
} from "lucide-react";
import { PROFILE } from "@/data/portfolio";
import {
  SectionGridBackground,
  SectionBadge,
  ExpandingDotButton,
} from "@/components/ui/Primitives";

type EngagementTrack =
  | "Senior Mobile Role"
  | "Remote Contract"
  | "End-to-End App Build"
  | "Architecture / Advisory";

const ENGAGEMENT_TRACKS: {
  id: EngagementTrack;
  short: string;
  template: string;
}[] = [
  {
    id: "Senior Mobile Role",
    short: "Full-Time Role",
    template:
      "Hi Umair, we're hiring a Senior Flutter / Mobile Engineer and were impressed by your offline-first fintech and Clean Architecture experience. Would love to schedule a quick intro chat this week.",
  },
  {
    id: "Remote Contract",
    short: "Contract / Staff Aug",
    template:
      "Hi Umair, we need an experienced Senior Mobile Developer to join our engineering squad on a remote contract to accelerate our iOS & Android roadmap and Fastlane CI/CD pipeline.",
  },
  {
    id: "End-to-End App Build",
    short: "Build an App",
    template:
      "Hi Umair, we're looking to build and launch a production iOS & Android app (with payments / offline sync) and would love to discuss scope, architecture, and timeline with you.",
  },
  {
    id: "Architecture / Advisory",
    short: "Advisory / Audit",
    template:
      "Hi Umair, we'd like your help auditing our Flutter app's architecture, offline sync reliability, and cold-start performance before scaling to more users.",
  },
];

const TIMELINES = [
  "Immediate Start",
  "Within 2–4 Weeks",
  "Flexible / Exploring",
];

export function ContactSection() {
  const [pktTime, setPktTime] = useState<string>("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Composer state
  const [track, setTrack] = useState<EngagementTrack>("Senior Mobile Role");
  const [timeline, setTimeline] = useState<string>("Immediate Start");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [dispatchState, setDispatchState] = useState<
    "idle" | "sent_api" | "ready_channels"
  >("idle");

  // Live PKT (UTC+5) clock — hydration-safe
  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: PROFILE.timezone || "Asia/Karachi",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date());
        setPktTime(formatted);
      } catch {
        setPktTime("UTC+5");
      }
    };
    updateClock();
    const timer = setInterval(updateClock, 30000);
    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey((prev) => (prev === key ? null : prev));
      }, 2200);
    } catch {
      // Ignore clipboard permission errors silently
    }
  };

  const formattedSubject = useMemo(() => {
    const sender = name.trim() ? ` — ${name.trim()}` : "";
    return `[${track}] Portfolio Inquiry${sender}`;
  }, [track, name]);

  const formattedBody = useMemo(() => {
    const lines = [
      `Hi Umair,`,
      ``,
      message.trim() ||
        ENGAGEMENT_TRACKS.find((t) => t.id === track)?.template ||
        "",
      ``,
      `---`,
      `Name / Company : ${name.trim() || "Not specified"}`,
      `Reply Email    : ${email.trim() || "Not specified"}`,
      `Engagement     : ${track}`,
      `Timeline       : ${timeline}`,
    ];
    return lines.join("\n");
  }, [name, email, track, timeline, message]);

  const gmailComposeUrl = useMemo(() => {
    const params = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: PROFILE.email,
      su: formattedSubject,
      body: formattedBody,
    });
    return `https://mail.google.com/mail/?${params.toString()}`;
  }, [formattedSubject, formattedBody]);

  const mailtoUrl = useMemo(() => {
    return `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      formattedSubject
    )}&body=${encodeURIComponent(formattedBody)}`;
  }, [formattedSubject, formattedBody]);

  const whatsappComposeUrl = useMemo(() => {
    const cleanPhone = PROFILE.phone.replace(/[^\d]/g, "");
    const waText = [
      `Hi Umair! Reaching out from your portfolio (${track}):`,
      ``,
      message.trim() ||
        ENGAGEMENT_TRACKS.find((t) => t.id === track)?.template ||
        "",
      name.trim() ? `\n— ${name.trim()}${email.trim() ? ` (${email.trim()})` : ""}` : "",
      `Timeline: ${timeline}`,
    ]
      .filter(Boolean)
      .join("\n");
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waText)}`;
  }, [track, message, name, email, timeline]);

  const handleApplyTemplate = () => {
    const found = ENGAGEMENT_TRACKS.find((t) => t.id === track);
    if (found) {
      setMessage(found.template);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError(
        "Please fill in your name, email, and brief (or click 'Auto-fill sample' to start fast)."
      );
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          track,
          timeline,
          message: message.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok && data?.delivered) {
        setDispatchState("sent_api");
      } else {
        setDispatchState("ready_channels");
        window.location.href = mailtoUrl;
      }
    } catch {
      setDispatchState("ready_channels");
      window.location.href = mailtoUrl;
    } finally {
      setSubmitting(false);
    }
  };

  const handleInstantWhatsApp = () => {
    setError(null);
    window.open(whatsappComposeUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-zinc-900 bg-black py-24 text-white"
    >
      <SectionGridBackground rgb="16, 185, 129" />

      {/* Subtle dual ambient glows */}
      <div className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-16 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="mb-4">
              <SectionBadge label="Contact & Hire" tone="emerald" pill />
            </div>
            <h2 className="font-serif text-4xl font-extrabold tracking-tight text-zinc-100 sm:text-5xl">
              Let&apos;s Build What&apos;s Next
            </h2>
            <p className="mt-3 max-w-2xl font-mono text-xs leading-relaxed text-zinc-400 sm:text-sm">
              Hiring a Senior Mobile Engineer, scaling an offline-first fintech product, or launching a multi-app ecosystem on App Store &amp; Google Play? Reach out directly—no middlemen.
            </p>
          </div>

          {/* Live Telemetry & Timezone Pill */}
          <div className="flex flex-wrap items-center gap-2.5 rounded-2xl border border-emerald-500/25 bg-zinc-950/85 px-4 py-3 font-mono text-[11px] backdrop-blur-md">
            <span className="inline-flex items-center gap-2 text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse" />
              Available Now
            </span>
            <span className="text-zinc-700">|</span>
            <span className="inline-flex items-center gap-1.5 text-zinc-300">
              <Clock className="h-3.5 w-3.5 text-cyan-300" />
              PKT {pktTime ? `· ${pktTime}` : "· UTC+5"}
            </span>
            <span className="text-zinc-700">|</span>
            <span className="inline-flex items-center gap-1.5 text-amber-200/90">
              <Globe2 className="h-3.5 w-3.5 text-amber-300" />
              &lt; 4h Response
            </span>
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          {/* LEFT COLUMN: Direct Channels + Instant Copy + CV Dossier */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-between gap-4"
          >
            <div className="space-y-3.5">
              {/* 1. Primary Email Card */}
              <div className="group rounded-2xl border border-emerald-500/25 bg-zinc-950/80 p-4 backdrop-blur-sm transition hover:border-emerald-400/50">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300/85">
                        Primary Email · Direct Inbox
                      </p>
                      <p className="mt-1 break-all font-mono text-sm font-semibold text-zinc-100">
                        {PROFILE.email}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => copyToClipboard("email", PROFILE.email)}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-zinc-700/80 bg-zinc-900/90 px-2.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-200 transition hover:border-emerald-400/50 hover:text-emerald-200"
                  >
                    {copiedKey === "email" ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span className="text-emerald-300">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-3.5 flex flex-wrap items-center gap-2 border-t border-zinc-800/80 pt-3 font-mono text-[10px]">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                      PROFILE.email
                    )}&su=${encodeURIComponent(
                      "Senior Mobile Developer Inquiry — Umair Amjad"
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-semibold uppercase tracking-[0.1em] text-emerald-200 transition hover:border-emerald-300/60 hover:bg-emerald-500/20"
                  >
                    <span>Open Gmail Web</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="inline-flex items-center gap-1 rounded-md border border-zinc-700/75 bg-zinc-900/80 px-2.5 py-1 uppercase tracking-[0.1em] text-zinc-300 transition hover:border-zinc-500 hover:text-white"
                  >
                    <span>Default Mail App</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {/* 2. WhatsApp & Direct Phone Card */}
              <div className="group rounded-2xl border border-cyan-500/25 bg-zinc-950/80 p-4 backdrop-blur-sm transition hover:border-cyan-400/50">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300/85">
                        WhatsApp &amp; Direct Line · Fastest Reply
                      </p>
                      <p className="mt-1 font-mono text-sm font-semibold text-zinc-100">
                        {PROFILE.phone}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => copyToClipboard("phone", PROFILE.phone)}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-zinc-700/80 bg-zinc-900/90 px-2.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-200 transition hover:border-cyan-400/50 hover:text-cyan-200"
                  >
                    {copiedKey === "phone" ? (
                      <>
                        <Check className="h-3 w-3 text-cyan-400" />
                        <span className="text-cyan-300">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-3.5 flex flex-wrap items-center gap-2 border-t border-zinc-800/80 pt-3 font-mono text-[10px]">
                  <a
                    href={`${PROFILE.whatsappUrl}?text=${encodeURIComponent(
                      "Hi Umair! I just viewed your mobile engineering portfolio and would love to connect."
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-md border border-cyan-500/35 bg-cyan-500/10 px-2.5 py-1 font-semibold uppercase tracking-[0.1em] text-cyan-200 transition hover:border-cyan-300/70 hover:bg-cyan-500/20"
                  >
                    <span>Chat on WhatsApp</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                  <a
                    href={`tel:${PROFILE.phone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-1 rounded-md border border-zinc-700/75 bg-zinc-900/80 px-2.5 py-1 uppercase tracking-[0.1em] text-zinc-300 transition hover:border-zinc-500 hover:text-white"
                  >
                    <Phone className="h-3 w-3" />
                    <span>Voice Call</span>
                  </a>
                </div>
              </div>

              {/* 3. Social & Code Profiles Trio */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-950/80 p-3.5 transition hover:border-sky-400/50 hover:bg-sky-500/[0.05]"
                >
                  <div className="flex items-center justify-between">
                    <Linkedin className="h-4 w-4 text-sky-300" />
                    <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky-300" />
                  </div>
                  <div className="mt-3">
                    <p className="font-mono text-xs font-semibold text-zinc-100">
                      LinkedIn
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] text-zinc-400">
                      InMail &amp; Network
                    </p>
                  </div>
                </a>

                <a
                  href={PROFILE.gitlab}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-950/80 p-3.5 transition hover:border-amber-400/50 hover:bg-amber-500/[0.05]"
                >
                  <div className="flex items-center justify-between">
                    <Gitlab className="h-4 w-4 text-amber-300" />
                    <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-300" />
                  </div>
                  <div className="mt-3">
                    <p className="font-mono text-xs font-semibold text-zinc-100">
                      GitLab
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] text-zinc-400">
                      @Umair_Amjad
                    </p>
                  </div>
                </a>

                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-950/80 p-3.5 transition hover:border-emerald-400/50 hover:bg-emerald-500/[0.05]"
                >
                  <div className="flex items-center justify-between">
                    <Github className="h-4 w-4 text-emerald-300" />
                    <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-300" />
                  </div>
                  <div className="mt-3">
                    <p className="font-mono text-xs font-semibold text-zinc-100">
                      GitHub
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] text-zinc-400">
                      @umair-janjua
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* 4. Executive CV / Dossier Download Card */}
            <div className="rounded-2xl border border-amber-500/25 bg-gradient-to-br from-amber-500/[0.07] via-zinc-950 to-zinc-950 p-4">
              <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-300">
                    Executive CV · PDF Dossier
                  </p>
                  <p className="mt-1 font-mono text-xs text-zinc-300">
                    4+ Yrs · 24 Store &amp; Web Builds · Clean Architecture &amp; PowerSync
                  </p>
                </div>

                <a
                  href={PROFILE.resumeUrl}
                  download="Umair_Amjad_Senior_Mobile_Developer_CV.pdf"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full border border-amber-400/45 bg-amber-400/10 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-100 transition hover:border-amber-300 hover:bg-amber-400/20"
                >
                  <FileDown className="h-3.5 w-3.5 text-amber-300" />
                  <span>Download CV</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Interactive Terminal Inquiry Composer */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="overflow-hidden rounded-2xl border border-emerald-500/30 bg-[#05080b]/95 shadow-[0_25px_70px_rgba(0,0,0,0.75),0_0_45px_rgba(16,185,129,0.09)] backdrop-blur-xl"
          >
            {/* Terminal Chrome Top Bar */}
            <div className="flex items-center justify-between border-b border-zinc-800/90 bg-zinc-950/90 px-4 py-3 font-mono text-[11px]">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                <span className="ml-2 text-zinc-300">contact.dispatch.ts</span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.16em] text-emerald-300/80">
                Direct // Zero Friction
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-5 sm:p-6">
              {/* Track Selector */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                    01 // Select Engagement Track
                  </label>
                  <button
                    type="button"
                    onClick={handleApplyTemplate}
                    className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-emerald-300 transition hover:text-emerald-200"
                  >
                    <Sparkles className="h-3 w-3" />
                    <span>Auto-fill sample brief</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {ENGAGEMENT_TRACKS.map((item) => {
                    const active = track === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setTrack(item.id);
                          setDispatchState("idle");
                        }}
                        className={`rounded-xl border px-2.5 py-2 text-left font-mono text-[11px] font-medium transition ${
                          active
                            ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-100 shadow-[0_0_18px_rgba(16,185,129,0.16)]"
                            : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                        }`}
                      >
                        {item.short}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400"
                  >
                    02 // Your Name &amp; Company
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Alex Rivera · Acme Fintech"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900/75 px-3.5 py-2.5 font-mono text-xs text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-emerald-400/60 focus:bg-zinc-900"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400"
                  >
                    03 // Work Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="alex@company.com"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900/75 px-3.5 py-2.5 font-mono text-xs text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-emerald-400/60 focus:bg-zinc-900"
                  />
                </div>
              </div>

              {/* Target Timeline */}
              <div>
                <span className="mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                  04 // Target Timeline
                </span>
                <div className="flex flex-wrap gap-2">
                  {TIMELINES.map((item) => {
                    const active = timeline === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setTimeline(item)}
                        className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition ${
                          active
                            ? "border-cyan-400/55 bg-cyan-400/15 text-cyan-100"
                            : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Project / Role Brief */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label
                    htmlFor="contact-message"
                    className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400"
                  >
                    05 // Role or Project Brief
                  </label>
                  <span className="font-mono text-[10px] text-zinc-500">
                    {message.length > 0 ? `${message.length} chars` : "Required"}
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Share role details, tech stack, timeline, or app goals..."
                  className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900/75 px-3.5 py-2.5 font-mono text-xs leading-relaxed text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-emerald-400/60 focus:bg-zinc-900"
                />
              </div>

              {error && (
                <p className="rounded-xl border border-amber-400/35 bg-amber-500/10 px-3.5 py-2 font-mono text-[11px] text-amber-200">
                  {error}
                </p>
              )}

              {/* Primary Submit + Instant WhatsApp Dispatch */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <ExpandingDotButton
                  type="submit"
                  className="border-emerald-400/55 bg-emerald-400/15 text-emerald-100"
                  dotColor="bg-emerald-300"
                >
                  {submitting ? "Dispatching..." : "Dispatch Inquiry"}
                </ExpandingDotButton>

                <button
                  type="button"
                  onClick={handleInstantWhatsApp}
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-cyan-100 transition hover:border-cyan-300/75 hover:bg-cyan-400/20"
                >
                  <Send className="h-3.5 w-3.5 text-cyan-300" />
                  <span>Send via WhatsApp</span>
                </button>
              </div>

              {/* Confirmation / Multi-Channel Launcher Feedback */}
              {dispatchState === "sent_api" && (
                <div className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-3.5 font-mono text-xs text-emerald-100">
                  <div className="flex items-center gap-2 font-semibold text-emerald-200">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Inquiry delivered directly to Umair&apos;s inbox!</span>
                  </div>
                  <p className="mt-1 text-[11px] text-emerald-200/80">
                    Expect a personal reply at {email} within a few hours.
                  </p>
                </div>
              )}

              {dispatchState === "ready_channels" && (
                <div className="rounded-xl border border-emerald-400/35 bg-emerald-500/[0.08] p-3.5 font-mono text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-emerald-200">
                      ✓ Brief formatted! No desktop mail app? Launch in 1 click:
                    </span>
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    <a
                      href={gmailComposeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-emerald-400/45 bg-emerald-400/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-emerald-100 transition hover:bg-emerald-400/25"
                    >
                      <span>Send in Gmail Web</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                    <a
                      href={whatsappComposeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-cyan-400/45 bg-cyan-400/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-cyan-100 transition hover:bg-cyan-400/25"
                    >
                      <span>Send in WhatsApp</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          "brief",
                          `To: ${PROFILE.email}\nSubject: ${formattedSubject}\n\n${formattedBody}`
                        )
                      }
                      className="inline-flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-zinc-200 transition hover:border-zinc-500"
                    >
                      {copiedKey === "brief" ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          <span className="text-emerald-300">Brief Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy Full Brief</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

