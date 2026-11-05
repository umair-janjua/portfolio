"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Calendar,
  MapPin,
  Sparkles,
} from "lucide-react";
import { EXPERIENCES, EDUCATION } from "@/data/portfolio";
import { SectionGridBackground, SectionBadge } from "@/components/ui/Primitives";
import { TechIcon } from "@/components/ui/TechIcons";

export function ExperienceSection() {
  const [selectedId, setSelectedId] = useState<string>(EXPERIENCES[0].id);

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-black py-20 text-white sm:py-24"
    >
      <SectionGridBackground rgb="20, 184, 166" />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-black via-black/50 to-transparent" />

      <div className="relative z-20 mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-4xl flex-col gap-4 text-center"
        >
          <SectionBadge label="Experience" tone="teal" />
          <h2 className="font-serif text-4xl font-extrabold tracking-tight text-zinc-100 sm:text-5xl md:text-6xl">
            Production Track Record
          </h2>
          <p className="font-mono text-[12px] leading-relaxed text-zinc-400 sm:text-sm">
            4+ years owning mobile architecture, multi-gateway payments, offline-first sync, and automated releases across fintech, e-commerce, and EdTech.
          </p>
        </motion.div>

        {/* Interactive Timeline Workspace */}
        <div className="rounded-2xl border border-teal-500/20 bg-zinc-950/70 p-4 backdrop-blur-sm sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-teal-500/15 px-2 pb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400">
            <span className="inline-flex items-center gap-2">
              <Briefcase className="h-3.5 w-3.5 text-teal-400" />
              career.timeline.ts
            </span>
            <span className="text-[10px] text-teal-300/80">
              12 Production Apps · 3 Engineering Roles
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
            {/* Left Role Selector Tabs + Education Card */}
            <div className="flex flex-col gap-3">
              {EXPERIENCES.map((exp, idx) => {
                const isSelected = exp.id === selectedId;
                return (
                  <button
                    key={exp.id}
                    type="button"
                    onClick={() => setSelectedId(exp.id)}
                    className={`group relative rounded-xl border p-4 text-left transition-all ${
                      isSelected
                        ? "border-teal-400/55 bg-teal-400/10 shadow-[0_0_28px_rgba(20,184,166,0.12)]"
                        : "border-zinc-800/80 bg-black/45 hover:border-teal-500/30 hover:bg-zinc-900/50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-teal-300/80">
                        [0{idx + 1}] {exp.current ? "· CURRENT" : ""}
                      </span>
                      {exp.current && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-400/15 px-2 py-0.5 font-mono text-[9px] text-emerald-200">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Active
                        </span>
                      )}
                    </div>
                    <h3 className="mt-1.5 text-base font-bold text-zinc-100">
                      {exp.company}
                    </h3>
                    <p className="mt-0.5 font-mono text-xs text-teal-200/90">
                      {exp.role}
                    </p>
                    <p className="mt-2 font-mono text-[11px] text-zinc-500">
                      {exp.period}
                    </p>
                  </button>
                );
              })}

              {/* Education Card */}
              <div className="mt-1 rounded-xl border border-amber-400/25 bg-amber-500/[0.05] p-4">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-amber-300">
                  <GraduationCap className="h-4 w-4" />
                  <span>Education</span>
                </div>
                <h4 className="mt-2 text-sm font-bold text-zinc-100">
                  {EDUCATION.degree}
                </h4>
                <p className="mt-1 font-mono text-xs text-zinc-300">
                  {EDUCATION.institution}
                </p>
                <p className="mt-1.5 font-mono text-[11px] text-amber-200/80">
                  {EDUCATION.period}
                </p>
              </div>
            </div>

            {/* Right Detailed Role View */}
            {EXPERIENCES.filter((e) => e.id === selectedId).map((active) => (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col justify-between rounded-xl border border-teal-500/25 bg-black/55 p-5 sm:p-6"
              >
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-800/90 pb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="font-serif text-2xl font-extrabold text-zinc-100 sm:text-3xl">
                          {active.role}
                        </h3>
                        <span className="rounded-md border border-teal-400/35 bg-teal-400/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-200">
                          @ {active.company}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-4 font-mono text-xs text-zinc-400">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-teal-400" />
                          {active.period}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-teal-400" />
                          {active.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quantified Impact Strip */}
                  <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    {active.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-lg border border-teal-500/20 bg-teal-500/[0.06] px-3 py-2.5"
                      >
                        <p className="font-mono text-sm font-bold text-teal-200 sm:text-base">
                          {m.value}
                        </p>
                        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-400">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Engineering Bullet Points */}
                  <ul className="mt-5 space-y-3">
                    {active.highlights.map((bullet, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 font-mono text-xs leading-relaxed text-zinc-300 sm:text-[13px]"
                      >
                        <CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-teal-400" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Role Tech Pills */}
                <div className="mt-6 border-t border-zinc-800/80 pt-4">
                  <p className="mb-2.5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-400">
                    <Sparkles className="h-3 w-3 text-teal-400" />
                    Core Architecture &amp; Tooling
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {active.stack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 rounded-full border border-teal-400/25 bg-teal-400/10 px-3 py-1 font-mono text-[11px] text-teal-100"
                      >
                        <TechIcon name={tech} className="h-3.5 w-3.5 shrink-0" />
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-28 bg-gradient-to-t from-black via-black/40 to-transparent" />
    </section>
  );
}

