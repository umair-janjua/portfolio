"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export function SectionGridBackground({
  rgb = "16, 185, 129",
}: {
  rgb?: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at top, rgba(${rgb}, 0.17), transparent 54%), linear-gradient(180deg, #020304 0%, #060a0f 65%, #020304 100%)`,
        }}
      />
      <div
        className="absolute inset-0 bg-[size:42px_42px]"
        style={{
          opacity: 0.28,
          backgroundImage: `linear-gradient(rgba(${rgb}, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(${rgb}, 0.15) 1px, transparent 1px)`,
        }}
      />
    </div>
  );
}

export function EmphasisSparkRight({ className = "-right-6 -top-3" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 36 36"
      fill="none"
      className={`pointer-events-none absolute h-7 w-7 opacity-90 ${className}`}
    >
      <path
        d="M8 14L20 4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        className="text-emerald-300/80"
      />
      <path
        d="M14 21L31 15"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        className="text-cyan-300/80"
      />
      <path
        d="M16 28L29 28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-emerald-200/60"
      />
    </svg>
  );
}

export function EmphasisSparkLeft({ className = "-bottom-7 -left-9" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 56 56"
      fill="none"
      className={`pointer-events-none absolute hidden h-12 w-12 opacity-85 sm:block ${className}`}
    >
      <path
        d="M36 12L14 24"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
        className="text-emerald-300/75"
      />
      <path
        d="M40 25L12 36"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
        className="text-teal-300/70"
      />
      <path
        d="M42 38L24 46"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-cyan-300/60"
      />
    </svg>
  );
}

export function SectionBadge({
  label,
  tone = "emerald",
  pill = false,
}: {
  label: string;
  tone?: "emerald" | "sky" | "teal" | "cyan" | "amber";
  pill?: boolean;
}) {
  const tones = {
    emerald: "border-emerald-400/45 bg-emerald-400/10 text-emerald-200",
    sky: "border-sky-400/45 bg-sky-400/10 text-sky-200",
    teal: "border-teal-400/45 bg-teal-400/10 text-teal-200",
    cyan: "border-cyan-400/45 bg-cyan-400/10 text-cyan-200",
    amber: "border-amber-400/45 bg-amber-400/10 text-amber-200",
  };

  return (
    <div className="relative inline-flex self-center">
      <span
        className={`${
          pill ? "rounded-full px-4 py-1.5" : "rounded-md px-3 py-1"
        } border font-mono text-[11px] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm ${tones[tone]}`}
      >
        {label}
      </span>
      <EmphasisSparkRight className={pill ? "-right-7 -top-3.5" : "-right-6 -top-3"} />
    </div>
  );
}

export function ExpandingDotButton({
  children,
  className = "",
  dotColor = "bg-emerald-300",
  hoverTextColor = "group-hover:text-zinc-950",
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  className?: string;
  dotColor?: string;
  hoverTextColor?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full border px-5 py-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-300 ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={`h-2 w-2 rounded-full transition-transform duration-500 ease-out group-hover:scale-[90] ${dotColor}`}
        />
        <span className="inline-block transition-all duration-300 group-hover:translate-x-10 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div
        className={`pointer-events-none absolute inset-0 z-10 flex translate-x-10 items-center justify-center gap-1.5 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 ${hoverTextColor}`}
      >
        <span>{children}</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </div>
    </button>
  );
}

