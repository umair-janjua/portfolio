"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Layers,
  Database,
  Rocket,
  ShieldCheck,
  Code2,
} from "lucide-react";
import { SKILL_GROUPS, SkillGroup } from "@/data/portfolio";
import { SectionGridBackground, SectionBadge } from "@/components/ui/Primitives";
import { TechIcon } from "@/components/ui/TechIcons";

const ACCENT_STYLES: Record<SkillGroup["accent"], string> = {
  emerald:
    "border-emerald-500/30 bg-emerald-500/[0.07] text-emerald-300 shadow-[0_0_24px_rgba(16,185,129,0.12)]",
  sky: "border-sky-500/30 bg-sky-500/[0.07] text-sky-300 shadow-[0_0_24px_rgba(14,165,233,0.12)]",
  cyan: "border-cyan-500/30 bg-cyan-500/[0.07] text-cyan-300 shadow-[0_0_24px_rgba(6,182,212,0.12)]",
  teal: "border-teal-500/30 bg-teal-500/[0.07] text-teal-300 shadow-[0_0_24px_rgba(20,184,166,0.12)]",
  amber:
    "border-amber-500/30 bg-amber-500/[0.07] text-amber-300 shadow-[0_0_24px_rgba(245,158,11,0.12)]",
};

const GROUP_ICONS = [Smartphone, Layers, Database, Rocket, ShieldCheck];

const PACKET_TRAILS = [
  { top: "16%", width: 90, duration: "10s", delay: "0s" },
  { top: "28%", width: 96, duration: "12s", delay: "1.4s" },
  { top: "44%", width: 84, duration: "9s", delay: "0.7s" },
  { top: "61%", width: 105, duration: "13s", delay: "2.2s" },
  { top: "77%", width: 88, duration: "10.5s", delay: "1.1s" },
];

const CONSTELLATION_DOTS = [
  { left: "8%", top: "20%", size: 3, delay: "0s" },
  { left: "19%", top: "38%", size: 2, delay: "0.9s" },
  { left: "31%", top: "18%", size: 3, delay: "1.6s" },
  { left: "46%", top: "52%", size: 2, delay: "0.4s" },
  { left: "63%", top: "26%", size: 3, delay: "2.1s" },
  { left: "78%", top: "62%", size: 2, delay: "0.8s" },
  { left: "89%", top: "34%", size: 3, delay: "1.4s" },
];

export function TechStackSection() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-black py-20 text-white sm:py-24"
    >
      <SectionGridBackground rgb="14, 165, 233" />

      {/* Animated Packet Trails & Constellation Nodes (from reference site) */}
      <div className="pointer-events-none absolute inset-0 z-[12] overflow-hidden">
        {PACKET_TRAILS.map((trail, i) => (
          <span
            key={i}
            style={{
              top: trail.top,
              width: `${trail.width}px`,
              animationDuration: trail.duration,
              animationDelay: trail.delay,
            }}
            className="animate-packet-trail absolute left-0 h-[1.2px] bg-gradient-to-r from-transparent via-sky-300/70 to-transparent"
          />
        ))}
        {CONSTELLATION_DOTS.map((dot, i) => (
          <span
            key={i}
            style={{
              left: dot.left,
              top: dot.top,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              animationDelay: dot.delay,
            }}
            className="animate-constellation-pulse absolute rounded-full bg-sky-300 shadow-[0_0_10px_#38bdf8]"
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-black via-black/50 to-transparent" />

      <div className="relative z-20 mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-4xl flex-col gap-4 text-center"
        >
          <SectionBadge label="Tech Stack" tone="sky" />
          <h2 className="font-serif text-4xl font-extrabold tracking-tight text-zinc-100 sm:text-5xl md:text-6xl">
            Area of Expertise
          </h2>
          <p className="font-mono text-[12px] leading-relaxed text-zinc-400 sm:text-sm">
            Production mobile languages, state architectures, offline-first sync engines, and release automation tools.
          </p>
        </motion.div>

        {/* Terminal-Indexed Stack Matrix */}
        <div className="rounded-2xl border border-sky-500/20 bg-zinc-950/65 p-4 backdrop-blur-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between border-b border-sky-500/15 px-2 pb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400">
            <span className="inline-flex items-center gap-2">
              <Code2 className="h-3.5 w-3.5 text-sky-400" />
              stack.index.ts
            </span>
            <span className="text-[10px] text-sky-300/80">
              {SKILL_GROUPS.reduce((acc, g) => acc + g.items.length, 0)} capabilities indexed
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {SKILL_GROUPS.map((group, idx) => {
              const Icon = GROUP_ICONS[idx % GROUP_ICONS.length];
              return (
                <motion.div
                  key={group.index}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                  className={`rounded-xl border border-zinc-800/70 bg-black/45 p-4 transition hover:border-zinc-700 ${
                    group.colSpan ? "md:col-span-2" : ""
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-400">
                        [{group.index}]
                      </span>
                      <Icon className="h-3.5 w-3.5 text-zinc-400" />
                      <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-zinc-200">
                        {group.title}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-zinc-500">
                      {group.items.length} items
                    </span>
                  </div>

                  <div
                    className={`flex flex-wrap items-center gap-2 rounded-lg border p-3.5 ${
                      ACCENT_STYLES[group.accent]
                    }`}
                  >
                    {group.items.map((item) => (
                      <a
                        key={item.name}
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group/chip inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-black/50 px-3 py-1.5 font-mono text-[12px] font-medium tracking-[0.02em] transition hover:border-white/25 hover:bg-black/80 hover:text-white sm:text-[13px]"
                      >
                        <TechIcon
                          name={item.name}
                          className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover/chip:scale-110"
                        />
                        <span>{item.name}</span>
                      </a>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-28 bg-gradient-to-t from-black via-black/40 to-transparent" />
    </section>
  );
}

