"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Gitlab,
  Github,
  Linkedin,
  Mail,
  Phone,
  ShieldCheck,
  WifiOff,
  Zap,
  ArrowUpRight,
  Wifi,
  BatteryFull,
  Home,
  Layers,
  Activity,
  UserCheck,
} from "lucide-react";
import { PROFILE } from "@/data/portfolio";
import {
  SectionGridBackground,
  SectionBadge,
  EmphasisSparkLeft,
  ExpandingDotButton,
} from "@/components/ui/Primitives";
import { TechIcon } from "@/components/ui/TechIcons";

const HERO_TECH_PILLS = [
  "Flutter",
  "Dart",
  "Kotlin",
  "PowerSync",
  "Clean Architecture",
  "Fastlane",
];

const PHONE_SCREENS = [
  {
    id: "ohana",
    tab: "Fintech",
    appName: "Ohana Africa",
    badge: "20,000+ Active Users",
    balanceLabel: "Community Savings Pool",
    balanceValue: "$48,920.00",
    delta: "+18.4% this month",
    subMetric: "15,000+ multi-gateway tx / mo",
    syncTag: "PowerSync Offline-First",
    bars: [42, 58, 51, 74, 68, 88, 95],
    items: [
      { title: "Lagos Tech Circle", meta: "Mobile Money · Instant", amount: "+$450" },
      { title: "Nairobi Founders Pool", meta: "Card Gateway · Verified", amount: "+$1,200" },
      { title: "Accra Micro-Savings", meta: "Biometric RBAC Sync", amount: "+$680" },
      { title: "Encrypted SQLite Queue", meta: "Sub-second Latency", amount: "99.4%" },
    ],
  },
  {
    id: "ecosystems",
    tab: "Apps",
    appName: "Live Store Portfolio",
    badge: "Play · App Store · Web",
    balanceLabel: "Production Deployments",
    balanceValue: "26 Builds",
    delta: "7+ Global Markets",
    subMetric: "Android (14) · iOS (8) · Web (4)",
    syncTag: "Customer + Vendor + Rider",
    bars: [55, 64, 72, 80, 85, 92, 100],
    items: [
      { title: "GCart-Bazaar Suite", meta: "4 Play Apps + 2 Web", amount: "6 Live" },
      { title: "Salveowell & SWAPP", meta: "150K+ Users · RBAC + EdTech", amount: "4 Live" },
      { title: "Buzzr & Cubicles", meta: "BLE Beacons + 60fps Game", amount: "2 Live" },
      { title: "Lofu · Boshna · POS", meta: "UK · KSA · Cloud POS", amount: "12 Live" },
    ],
  },
  {
    id: "cicd",
    tab: "CI/CD",
    appName: "Fastlane & Perf",
    badge: "30+ Store Submissions",
    balanceLabel: "Automated Release Pipeline",
    balanceValue: "15 mins",
    delta: "-87% deploy time",
    subMetric: "Reduced from 2 hours manual",
    syncTag: "Hermes + MMKV Tuned",
    bars: [90, 76, 62, 48, 35, 24, 18],
    items: [
      { title: "Cold Start Speedup", meta: "3.1s → 1.4s Startup", amount: "-55%" },
      { title: "Memory Footprint", meta: "MMKV Binary Cache", amount: "-22%" },
      { title: "Crashlytics Stability", meta: "Production Sessions", amount: "99.4%" },
      { title: "Team Architecture", meta: "Clean MVVM Standard", amount: "4 Devs" },
    ],
  },
];

export function HeroSection() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const screen = PHONE_SCREENS[activeScreen];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -ny * 9, y: nx * 11 });
  };

  return (
    <section
      id="introSec"
      className="relative flex min-h-screen items-center overflow-hidden bg-black px-4 pb-16 pt-24 sm:px-6 lg:pb-16 lg:pt-24"
    >
      <SectionGridBackground rgb="16, 185, 129" />

      {/* Ambient radial glow */}
      <div className="pointer-events-none absolute right-[12%] top-1/2 h-[460px] w-[460px] -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[130px]" />

      <div className="relative z-20 mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          {/* LEFT COLUMN: Editorial Identity + Tech Icons + Summary + Bento + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start text-left"
          >
            {/* Greeting Badge + Live Availability Pill */}
            <div className="flex flex-wrap items-center gap-3">
              <SectionBadge label="HELLO! 👋🏻" tone="emerald" pill />
              <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                Available for Remote &amp; Global Roles
              </span>
            </div>

            {/* Display Name & Role */}
            <h1 className="mt-5 font-serif text-[2.75rem] font-extrabold leading-[1.03] tracking-tight text-zinc-100 sm:text-[3.85rem] xl:text-[4.5rem]">
              I&apos;m {PROFILE.name}
            </h1>

            <div className="relative mt-1.5 inline-flex">
              <h2 className="font-serif text-[1.7rem] font-bold leading-tight tracking-tight text-emerald-300/90 sm:text-[2.45rem] xl:text-[2.85rem]">
                {PROFILE.role}
              </h2>
              <EmphasisSparkLeft className="-bottom-6 -left-8" />
            </div>

            {/* Core Tech Stack Strip with Brand Icons */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {HERO_TECH_PILLS.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.06] px-2.5 py-1 font-mono text-[11px] font-medium text-zinc-200"
                >
                  <TechIcon name={tech} className="h-3.5 w-3.5" />
                  <span>{tech}</span>
                </span>
              ))}
            </div>

            {/* Terminal Summary Card */}
            <div className="mt-5 w-full rounded-xl border border-emerald-500/25 bg-zinc-950/75 p-4 backdrop-blur-md">
              <p className="font-mono text-xs leading-relaxed text-zinc-300 sm:text-[13px]">
                <span className="font-semibold text-emerald-300">&gt;_ </span>
                {PROFILE.summary}
              </p>
            </div>

            {/* 4-Card Key Proof Bento */}
            <div className="mt-3.5 grid w-full grid-cols-2 gap-2.5 sm:grid-cols-4">
              {[
                { kpi: "26 Live", label: "Play · iOS · Web" },
                { kpi: "170K+", label: "Users Served" },
                { kpi: "99.4%", label: "Crash-Free Rate" },
                { kpi: "15 min", label: "Fastlane Deploys" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-emerald-500/20 bg-black/55 px-3 py-2.5 backdrop-blur-sm transition hover:border-emerald-400/45"
                >
                  <p className="font-mono text-sm font-bold text-emerald-300 sm:text-base">
                    {stat.kpi}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Primary CTA Buttons + Social Icons Row */}
            <div className="mt-6 flex w-full flex-wrap items-center gap-3">
              <a
                href={PROFILE.resumeUrl}
                download="Umair_Amjad_Senior_Mobile_Developer_CV.pdf"
                className="inline-flex"
              >
                <ExpandingDotButton
                  className="border-emerald-400/50 bg-emerald-400/10 text-emerald-100 backdrop-blur-sm"
                  dotColor="bg-emerald-300"
                >
                  Resume PDF
                </ExpandingDotButton>
              </a>

              <a href="#projects" className="inline-flex">
                <ExpandingDotButton
                  className="border-zinc-700/80 bg-zinc-900/75 text-zinc-200 backdrop-blur-sm"
                  dotColor="bg-cyan-300"
                >
                  View 26 Apps
                </ExpandingDotButton>
              </a>

              <a href="#contact" className="inline-flex">
                <ExpandingDotButton
                  className="border-amber-400/45 bg-amber-400/10 text-amber-100 backdrop-blur-sm"
                  dotColor="bg-amber-300"
                >
                  Let&apos;s Talk
                </ExpandingDotButton>
              </a>

              <div className="flex items-center gap-2 sm:ml-1">
                <a
                  href={PROFILE.gitlab}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitLab"
                  title="GitLab (@Umair_Amjad)"
                  className="rounded-lg border border-emerald-500/25 bg-black/60 p-2.5 text-emerald-300 transition hover:border-emerald-300/65 hover:bg-emerald-500/10"
                >
                  <Gitlab className="h-4 w-4" />
                </a>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  title="GitHub (@umair-janjua)"
                  className="rounded-lg border border-emerald-500/25 bg-black/60 p-2.5 text-emerald-300 transition hover:border-emerald-300/65 hover:bg-emerald-500/10"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className="rounded-lg border border-emerald-500/25 bg-black/60 p-2.5 text-emerald-300 transition hover:border-emerald-300/65 hover:bg-emerald-500/10"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  aria-label="Contact Umair"
                  title={`Contact (${PROFILE.email})`}
                  className="rounded-lg border border-emerald-500/25 bg-black/60 p-2.5 text-emerald-300 transition hover:border-emerald-300/65 hover:bg-emerald-500/10"
                >
                  <Mail className="h-4 w-4" />
                </a>
                <a
                  href={PROFILE.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp / Phone"
                  title={PROFILE.phone}
                  className="rounded-lg border border-emerald-500/25 bg-black/60 p-2.5 text-emerald-300 transition hover:border-emerald-300/65 hover:bg-emerald-500/10"
                >
                  <Phone className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: True 9:19.5 Aspect-Ratio iPhone 16 Pro Titanium Simulator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12 }}
            className="flex flex-col items-center justify-center"
          >
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setTilt({ x: 0, y: 0 })}
              style={{ perspective: "1200px" }}
              className="relative flex items-center justify-center"
            >
              {/* Floating Ambient Telemetry Badges */}
              <div className="pointer-events-none absolute -left-10 top-16 z-30 hidden items-center gap-1.5 rounded-full border border-emerald-400/35 bg-[#040a08]/95 px-3 py-1.5 font-mono text-[10px] text-emerald-200 shadow-xl backdrop-blur-md xl:inline-flex">
                <WifiOff className="h-3 w-3 text-emerald-300" />
                <span>Offline-First Ready</span>
              </div>
              <div className="pointer-events-none absolute -right-8 bottom-24 z-30 hidden items-center gap-1.5 rounded-full border border-cyan-400/35 bg-[#04090d]/95 px-3 py-1.5 font-mono text-[10px] text-cyan-200 shadow-xl backdrop-blur-md xl:inline-flex">
                <ShieldCheck className="h-3 w-3 text-cyan-300" />
                <span>99.4% Crash-Free</span>
              </div>

              {/* Realistic 9:19.5 Titanium Smartphone Chassis */}
              <div
                style={{
                  transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: "transform 180ms ease-out",
                }}
                className="relative aspect-[9/19.5] w-[264px] rounded-[3rem] border-[4px] border-zinc-700/90 bg-[#080b0e] p-[9px] shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_60px_rgba(16,185,129,0.16)] ring-1 ring-white/15 sm:w-[278px]"
              >
                {/* Physical Hardware Side Buttons */}
                <span className="pointer-events-none absolute -left-[6px] top-[96px] h-6 w-[3px] rounded-l bg-zinc-600" />
                <span className="pointer-events-none absolute -left-[6px] top-[140px] h-11 w-[3px] rounded-l bg-zinc-600" />
                <span className="pointer-events-none absolute -left-[6px] top-[194px] h-11 w-[3px] rounded-l bg-zinc-600" />
                <span className="pointer-events-none absolute -right-[6px] top-[156px] h-16 w-[3px] rounded-r bg-zinc-600" />

                {/* Inner OLED Display */}
                <div className="flex h-full w-full flex-col justify-between overflow-hidden rounded-[2.45rem] border border-emerald-500/20 bg-gradient-to-b from-[#071611] via-[#05090c] to-[#030507] px-3.5 pb-2.5 pt-2.5">
                  {/* TOP: iOS Status Bar + Dynamic Island */}
                  <div>
                    <div className="flex items-center justify-between px-1.5 font-mono text-[10px] font-semibold text-zinc-200">
                      <span>9:41</span>
                      <div className="flex h-[20px] w-[78px] items-center justify-between rounded-full bg-black px-2.5 ring-1 ring-white/10">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[7px] uppercase tracking-widest text-zinc-400">
                          LIVE
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-zinc-200">
                        <Wifi className="h-2.5 w-2.5" />
                        <BatteryFull className="h-3 w-3 text-emerald-300" />
                      </div>
                    </div>

                    {/* Interactive Mode Switcher */}
                    <div className="mt-3 grid grid-cols-3 gap-1 rounded-xl border border-zinc-800/90 bg-black/75 p-1">
                      {PHONE_SCREENS.map((s, idx) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setActiveScreen(idx)}
                          className={`rounded-lg py-1 font-mono text-[9px] font-semibold uppercase tracking-wider transition ${
                            activeScreen === idx
                              ? "bg-emerald-400/20 text-emerald-200 shadow-[0_0_10px_rgba(16,185,129,0.25)]"
                              : "text-zinc-500 hover:text-zinc-300"
                          }`}
                        >
                          {s.tab}
                        </button>
                      ))}
                    </div>

                    {/* App Title Bar */}
                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-300">
                          {screen.appName}
                        </p>
                        <p className="font-mono text-[8.5px] text-zinc-400">
                          {screen.badge}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 rounded-lg border border-zinc-800 bg-black/60 px-1.5 py-1">
                        <TechIcon name="Flutter" className="h-3.5 w-3.5" />
                        <TechIcon name="Dart" className="h-3.5 w-3.5" />
                      </div>
                    </div>

                    {/* Hero Balance / KPI Card with Mini Telemetry Bars */}
                    <div className="mt-2.5 rounded-2xl border border-emerald-400/25 bg-emerald-500/[0.08] p-3">
                      <div className="flex items-center justify-between">
                        <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-emerald-200/80">
                          {screen.balanceLabel}
                        </p>
                        <span className="rounded bg-emerald-400/15 px-1.5 py-0.5 font-mono text-[8px] font-semibold text-emerald-300">
                          {screen.delta}
                        </span>
                      </div>

                      <div className="mt-1 flex items-end justify-between gap-2">
                        <div>
                          <p className="font-mono text-xl font-bold tracking-tight text-white">
                            {screen.balanceValue}
                          </p>
                          <p className="mt-0.5 font-mono text-[8.5px] text-zinc-300">
                            {screen.subMetric}
                          </p>
                        </div>

                        {/* Mini Spark Bars */}
                        <div className="flex h-8 items-end gap-[3px]">
                          {screen.bars.map((h, i) => (
                            <span
                              key={i}
                              style={{ height: `${Math.max(22, h)}%` }}
                              className="w-1.5 rounded-t bg-emerald-400/75"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Sync Engine Status Strip */}
                    <div className="mt-2 flex items-center justify-between rounded-lg border border-zinc-800/90 bg-zinc-950/85 px-2.5 py-1.5">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[8.5px] text-emerald-300">
                        <Zap className="h-2.5 w-2.5" />
                        {screen.syncTag}
                      </span>
                      <span className="font-mono text-[8px] uppercase text-zinc-500">
                        Synced
                      </span>
                    </div>

                    {/* Activity Feed Rows */}
                    <div className="mt-2 space-y-1.5">
                      {screen.items.map((row) => (
                        <div
                          key={row.title}
                          className="flex items-center justify-between rounded-xl border border-zinc-800/75 bg-black/60 px-2.5 py-1.5"
                        >
                          <div className="min-w-0 pr-2">
                            <p className="truncate font-mono text-[9.5px] font-medium text-zinc-100">
                              {row.title}
                            </p>
                            <p className="truncate font-mono text-[8px] text-zinc-500">
                              {row.meta}
                            </p>
                          </div>
                          <span className="shrink-0 rounded border border-emerald-400/25 bg-emerald-400/10 px-1.5 py-0.5 font-mono text-[8.5px] font-semibold text-emerald-200">
                            {row.amount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BOTTOM: Realistic iOS App Tab Bar + Home Indicator */}
                  <div className="pt-1.5">
                    <div className="flex items-center justify-around rounded-2xl border border-zinc-800/80 bg-black/75 py-1.5 text-zinc-500">
                      <button
                        type="button"
                        onClick={() => setActiveScreen(0)}
                        aria-label="Fintech tab"
                        className={`p-1 transition ${
                          activeScreen === 0 ? "text-emerald-300" : "hover:text-zinc-300"
                        }`}
                      >
                        <Home className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveScreen(1)}
                        aria-label="Ecosystems tab"
                        className={`p-1 transition ${
                          activeScreen === 1 ? "text-emerald-300" : "hover:text-zinc-300"
                        }`}
                      >
                        <Layers className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveScreen(2)}
                        aria-label="CI/CD telemetry tab"
                        className={`p-1 transition ${
                          activeScreen === 2 ? "text-emerald-300" : "hover:text-zinc-300"
                        }`}
                      >
                        <Activity className="h-3.5 w-3.5" />
                      </button>
                      <a
                        href="#projects"
                        aria-label="Jump to apps"
                        className="p-1 text-zinc-500 transition hover:text-emerald-300"
                      >
                        <UserCheck className="h-3.5 w-3.5" />
                      </a>
                    </div>
                    <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-zinc-600/80" />
                  </div>
                </div>
              </div>
            </div>

            <a
              href="#projects"
              className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400 transition hover:text-emerald-300"
            >
              <span>Interactive iOS/Android Preview · Explore All Apps</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom smooth gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-24 bg-gradient-to-t from-black via-black/50 to-transparent" />
    </section>
  );
}
