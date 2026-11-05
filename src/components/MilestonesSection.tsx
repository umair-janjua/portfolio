"use client";

import React from "react";
import { motion } from "framer-motion";
import { MILESTONES, IMPACT_METRICS } from "@/data/portfolio";
import { SectionGridBackground, SectionBadge } from "@/components/ui/Primitives";

export function MilestonesSection() {
  return (
    <section
      id="achievements"
      className="relative overflow-hidden bg-black py-20 text-white sm:py-24"
    >
      <SectionGridBackground rgb="245, 158, 11" />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-black via-black/50 to-transparent" />

      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 flex max-w-4xl flex-col gap-4 text-center"
        >
          <SectionBadge label="Achievements" tone="amber" />
          <h2 className="font-serif text-4xl font-extrabold tracking-tight text-zinc-100 sm:text-5xl">
            Leadership &amp; Engineering Milestones
          </h2>
          <p className="font-mono text-[12px] leading-relaxed text-zinc-400 sm:text-sm">
            Quantified production wins, team architecture standards, and academic foundation behind 12 shipped store apps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 rounded-2xl border border-amber-500/15 bg-zinc-950/50 p-5 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          {/* Left: engineering.wins.ts */}
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-orange-300/85">
              engineering.wins.ts
            </p>
            <div className="space-y-3">
              {MILESTONES.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="rounded-xl border border-orange-500/20 bg-zinc-950/75 p-4 transition hover:border-orange-400/40"
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="rounded border border-orange-400/35 bg-orange-400/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-orange-200">
                      {item.badge}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500">
                      {item.year}
                    </span>
                  </div>
                  <p className="font-mono text-xs font-semibold text-zinc-100 sm:text-sm">
                    {item.title}
                  </p>
                  <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-zinc-400">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: impact.metrics.ts */}
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-yellow-300/85">
              impact.metrics.ts
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {IMPACT_METRICS.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-yellow-500/20 bg-zinc-950/75 p-4 transition hover:border-yellow-400/40"
                >
                  <p className="font-mono text-2xl font-bold text-yellow-200">
                    {metric.value}
                  </p>
                  <p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-200">
                    {metric.label}
                  </p>
                  <p className="mt-1 font-mono text-[11px] leading-relaxed text-zinc-400">
                    {metric.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

