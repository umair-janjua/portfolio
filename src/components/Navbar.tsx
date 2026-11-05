"use client";

import React, { useEffect, useState } from "react";
import { Gitlab, Github, Linkedin, Mail, Phone, FileDown, Terminal } from "lucide-react";
import { PROFILE } from "@/data/portfolio";

const NAV_ITEMS = [
  { label: "Home", href: "#introSec" },
  { label: "Portfolio", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#features" },
  { label: "Velocity", href: "#github-contribution" },
  { label: "Services", href: "#services" },
  { label: "Milestones", href: "#achievements" },
  { label: "Terminal", href: "#terminal" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({ onOpenAi }: { onOpenAi: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#introSec");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
      const offsets = NAV_ITEMS.map((item) => {
        const el = document.querySelector(item.href);
        if (!el) return { href: item.href, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { href: item.href, top: Math.abs(rect.top - 160) };
      });
      offsets.sort((a, b) => a.top - b.top);
      if (offsets[0]) setActiveSection(offsets[0].href);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop Floating Glass Command Dock */}
      <header
        className={`fixed inset-x-0 top-4 z-[150] mx-auto hidden w-fit max-w-[95vw] items-center gap-1 rounded-full border px-2.5 py-1.5 transition-all duration-300 lg:flex ${
          scrolled
            ? "border-emerald-400/30 bg-[#040809]/85 shadow-[0_10px_40px_rgba(0,0,0,0.65),0_0_25px_rgba(16,185,129,0.12)] backdrop-blur-xl"
            : "border-zinc-800/80 bg-black/55 backdrop-blur-md"
        }`}
      >
        <a
          href="#introSec"
          className="mr-2 flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 font-mono text-[11px] font-semibold tracking-[0.1em] text-emerald-200"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
          UMAIR.DEV
        </a>

        <nav className="flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => {
            const active = activeSection === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition ${
                  active
                    ? "bg-emerald-400/15 text-emerald-200"
                    : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="mx-1.5 h-4 w-px bg-zinc-800" />

        <button
          type="button"
          onClick={onOpenAi}
          className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-black/75 px-3 py-1 font-mono text-[11px] font-semibold tracking-[0.08em] text-emerald-200 transition hover:border-emerald-300/75 hover:bg-emerald-400/10 hover:text-emerald-100"
        >
          <Terminal className="h-3 w-3 text-emerald-300" />
          <span>Ask Umair</span>
          <kbd className="ml-1 rounded border border-zinc-700 bg-zinc-900 px-1 text-[9px] text-zinc-400">
            ⌘K
          </kbd>
        </button>
      </header>

      {/* Mobile Hamburger Toggle */}
      <div className="fixed right-4 top-4 z-[210] lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          className="group inline-flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/35 bg-black/75 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.15)] backdrop-blur-md transition hover:border-emerald-300/70"
        >
          <span className="relative h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-[2px] w-5 rounded-full bg-current transition-transform duration-300 ${
                mobileOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-[2px] w-5 rounded-full bg-current transition-opacity duration-200 ${
                mobileOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-[2px] w-5 rounded-full bg-current transition-transform duration-300 ${
                mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile Slide-Out Drawer (matching reference aesthetic) */}
      <div
        className={`fixed inset-0 z-[200] lg:hidden ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          type="button"
          aria-label="Close navigation backdrop"
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-[3px] transition-opacity duration-500 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`absolute right-0 top-0 flex h-full w-[min(86vw,360px)] flex-col border-l border-emerald-500/25 bg-[#030607]/95 px-6 pb-8 pt-6 text-emerald-50 shadow-[-20px_0_45px_rgba(16,185,129,0.12)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-emerald-300/80">
            Navigate
          </p>
          <div className="mt-4 h-px bg-emerald-500/20" />

          <nav className="mt-6 flex flex-col gap-3 overflow-y-auto">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="group flex items-end gap-3 rounded-xl border border-transparent px-2 py-1.5 transition hover:border-emerald-500/20 hover:bg-emerald-500/10"
              >
                <span className="text-[1.45rem] font-black uppercase leading-none tracking-tight text-emerald-50 transition-transform duration-300 group-active:scale-95">
                  {item.label}
                </span>
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-4">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-300/80">
              Direct Connect
            </p>
            <div className="mt-3 flex items-center gap-2.5 text-emerald-100">
              <a
                href={PROFILE.gitlab}
                target="_blank"
                rel="noreferrer"
                aria-label="GitLab"
                className="rounded-lg border border-emerald-500/25 bg-black/45 p-2.5 transition hover:border-emerald-300/55 hover:bg-emerald-500/10"
              >
                <Gitlab className="h-4 w-4" />
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="rounded-lg border border-emerald-500/25 bg-black/45 p-2.5 transition hover:border-emerald-300/55 hover:bg-emerald-500/10"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="rounded-lg border border-emerald-500/25 bg-black/45 p-2.5 transition hover:border-emerald-300/55 hover:bg-emerald-500/10"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${PROFILE.email}`}
                aria-label="Email Umair"
                className="rounded-lg border border-emerald-500/25 bg-black/45 p-2.5 transition hover:border-emerald-300/55 hover:bg-emerald-500/10"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href={`tel:${PROFILE.phone.replace(/\s+/g, "")}`}
                aria-label="Call Umair"
                className="rounded-lg border border-emerald-500/25 bg-black/45 p-2.5 transition hover:border-emerald-300/55 hover:bg-emerald-500/10"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href={PROFILE.resumeUrl}
                download
                aria-label="Download CV"
                className="rounded-lg border border-emerald-500/25 bg-black/45 p-2.5 transition hover:border-emerald-300/55 hover:bg-emerald-500/10"
              >
                <FileDown className="h-4 w-4" />
              </a>
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenAi();
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/45 bg-black/70 px-4 py-2 font-mono text-xs font-semibold tracking-[0.08em] text-emerald-200 transition hover:border-emerald-300/70 hover:text-emerald-100"
            >
              <span className="text-emerald-300">$</span> Ask Umair
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

