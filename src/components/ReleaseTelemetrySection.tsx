"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Activity, ArrowUpRight } from "lucide-react";
import { PROFILE } from "@/data/portfolio";
import { SectionGridBackground, SectionBadge } from "@/components/ui/Primitives";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const LEVEL_CLASSES = [
  "bg-zinc-900/90 border-zinc-800/60",
  "bg-emerald-950/90 border-emerald-800/50",
  "bg-emerald-700/60 border-emerald-500/40",
  "bg-emerald-500/80 border-emerald-400/60",
  "bg-emerald-300 border-emerald-200 shadow-[0_0_8px_rgba(110,231,183,0.65)]",
];

const RELEASE_TAGS = [
  "Fastlane iOS + Android release",
  "PowerSync offline-first sync commit",
  "Multi-gateway payment webhook flow",
  "Clean Architecture PR review & merge",
  "Crashlytics 99.4% stability check",
  "MMKV cache & startup profiling",
];

const FLOAT_DOTS = [
  { left: "6%", size: 5, duration: "10s", delay: "0s" },
  { left: "16%", size: 6, duration: "12s", delay: "1.2s" },
  { left: "29%", size: 4, duration: "9s", delay: "2.4s" },
  { left: "44%", size: 6, duration: "11s", delay: "0.7s" },
  { left: "61%", size: 5, duration: "13s", delay: "1.8s" },
  { left: "77%", size: 7, duration: "11.5s", delay: "0.5s" },
  { left: "91%", size: 5, duration: "10s", delay: "2.1s" },
];

export function ReleaseTelemetrySection() {
  const [hoveredCell, setHoveredCell] = useState<{
    week: number;
    day: number;
    commits: number;
    note: string;
  } | null>(null);

  // Deterministic 52x7 production engineering velocity matrix
  const weeks = useMemo(() => {
    const grid: { level: number; commits: number; note: string }[][] = [];
    for (let w = 0; w < 52; w++) {
      const col: { level: number; commits: number; note: string }[] = [];
      for (let d = 0; d < 7; d++) {
        const seed = (w * 13 + d * 7 + (w % 5) * 3) % 19;
        const isWeekend = d === 0 || d === 6;
        let level = 0;
        if (isWeekend) {
          level = seed > 15 ? 2 : seed > 11 ? 1 : 0;
        } else {
          level = seed > 14 ? 4 : seed > 9 ? 3 : seed > 4 ? 2 : 1;
        }
        const commits = level === 0 ? 0 : level * 2 + ((w + d) % 3);
        const note = RELEASE_TAGS[(w + d) % RELEASE_TAGS.length];
        col.push({ level, commits, note });
      }
      grid.push(col);
    }
    return grid;
  }, []);

  return (
    <section
      id="github-contribution"
      className="relative overflow-hidden bg-black py-20 text-white sm:py-24"
    >
      <SectionGridBackground rgb="34, 197, 94" />

      {/* Floating ambient emerald particles */}
      <div className="pointer-events-none absolute inset-0 z-[12]">
        {FLOAT_DOTS.map((dot, idx) => (
          <span
            key={idx}
            style={{
              left: dot.left,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              animationDuration: dot.duration,
              animationDelay: dot.delay,
            }}
            className="animate-float-dot absolute bottom-0 rounded-full bg-emerald-400/50 blur-[0.5px]"
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-black via-black/50 to-transparent" />

      <div className="relative z-20 mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-4xl flex-col gap-4 text-center"
        >
          <SectionBadge label="Shipping Velocity" tone="emerald" />
          <h2 className="font-serif text-4xl font-extrabold tracking-tight text-zinc-100 sm:text-5xl md:text-6xl">
            Release &amp; Commit Telemetry
          </h2>
          <p className="font-mono text-[12px] leading-relaxed text-zinc-400 sm:text-sm">
            Consistent architecture commits, 30+ automated Fastlane store submissions, and 99.4%+ crash-free sessions across 12 live iOS &amp; Android apps.
          </p>
        </motion.div>

        <div className="rounded-2xl border border-emerald-500/20 bg-zinc-950/75 p-4 backdrop-blur-sm sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-300">
              <Activity className="h-3.5 w-3.5 text-emerald-400" />
              <span>gitlab.telemetry @Umair_Amjad</span>
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={PROFILE.gitlab}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[11px] text-emerald-300/90 transition hover:text-emerald-200"
              >
                <span>View GitLab @Umair_Amjad</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[11px] text-zinc-400 transition hover:text-emerald-200"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Month Labels + Scrollable 52-Week Heatmap */}
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[740px]">
              <div className="mb-2 grid grid-cols-12 px-1 font-mono text-[10px] text-zinc-500">
                {MONTHS.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>

              <div className="flex gap-[4px]">
                {weeks.map((col, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-[4px]">
                    {col.map((cell, dIdx) => (
                      <button
                        key={dIdx}
                        type="button"
                        aria-label={`Week ${wIdx + 1}, ${cell.commits} engineering events`}
                        onMouseEnter={() =>
                          setHoveredCell({
                            week: wIdx + 1,
                            day: dIdx + 1,
                            commits: cell.commits,
                            note: cell.note,
                          })
                        }
                        className={`h-[11px] w-[11px] rounded-[2.5px] border transition-transform duration-150 hover:scale-125 ${
                          LEVEL_CLASSES[cell.level]
                        }`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Status Footer */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800/80 pt-3 font-mono text-[11px] text-zinc-400">
            <span className="text-emerald-200/90">
              {hoveredCell
                ? `Week ${hoveredCell.week} · ${hoveredCell.commits} commits/builds — ${hoveredCell.note}`
                : "Hover any cell to inspect production sprint & store release activity"}
            </span>
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
              <span>Less</span>
              {LEVEL_CLASSES.map((cls, i) => (
                <span key={i} className={`h-2.5 w-2.5 rounded-[2px] border ${cls}`} />
              ))}
              <span>More</span>
            </div>
          </div>

          {/* 4 Production Telemetry Cards */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { kpi: "12 Apps", label: "App Store & Google Play" },
              { kpi: "30+ Builds", label: "Automated via Fastlane" },
              { kpi: "99.4%", label: "Crash-Free Sessions" },
              { kpi: "15m Deploy", label: "Down from 2 Hours" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-emerald-500/20 bg-black/55 p-3 text-center"
              >
                <p className="font-mono text-base font-bold text-emerald-300 sm:text-lg">
                  {stat.kpi}
                </p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

