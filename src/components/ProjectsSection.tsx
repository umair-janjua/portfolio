"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  X,
  CheckCircle2,
  Sparkles,
  Apple,
  Play,
  Globe,
  Search,
  Copy,
  Check,
  MapPin,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import {
  PROJECTS,
  ALL_APP_LINKS,
  ProjectItem,
  AppStoreLink,
} from "@/data/portfolio";
import { SectionGridBackground, SectionBadge } from "@/components/ui/Primitives";
import { TechIcon } from "@/components/ui/TechIcons";

type FilterTab = "featured" | "all" | "android" | "ios" | "links";

function PlatformIcon({ platform }: { platform: AppStoreLink["platform"] }) {
  if (platform === "ios") return <Apple className="h-3 w-3" />;
  if (platform === "android") return <Play className="h-2.5 w-2.5 fill-current" />;
  return <Globe className="h-3 w-3" />;
}

function platformBadgeStyle(platform: AppStoreLink["platform"]) {
  if (platform === "ios") {
    return "border-sky-400/35 bg-sky-400/10 text-sky-200 hover:border-sky-300/70";
  }
  if (platform === "android") {
    return "border-emerald-400/35 bg-emerald-400/10 text-emerald-200 hover:border-emerald-300/70";
  }
  return "border-amber-400/35 bg-amber-400/10 text-amber-200 hover:border-amber-300/70";
}

function shortLinkLabel(link: AppStoreLink): string {
  if (link.label === "Google Play") return "Play Store";
  if (link.label === "App Store") return "App Store";
  return link.label
    .replace(/\s*\((Android|Play|iOS|App Store)\)/gi, "")
    .trim();
}

function getAppMonogram(title: string): string {
  const words = title
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function getAppTileAccent(category: ProjectItem["category"]): string {
  switch (category) {
    case "Fintech":
      return "border-emerald-400/45 bg-gradient-to-br from-emerald-500/25 to-teal-500/5 text-emerald-200";
    case "BLE & Proximity":
      return "border-sky-400/45 bg-gradient-to-br from-sky-500/25 to-cyan-500/5 text-sky-200";
    case "Mobile Game":
      return "border-purple-400/45 bg-gradient-to-br from-purple-500/25 to-fuchsia-500/5 text-purple-200";
    case "Multi-App Suite":
      return "border-cyan-400/45 bg-gradient-to-br from-cyan-500/25 to-sky-500/5 text-cyan-200";
    case "Enterprise & EdTech":
      return "border-sky-400/45 bg-gradient-to-br from-sky-500/25 to-indigo-500/5 text-sky-200";
    case "Food & Delivery":
      return "border-amber-400/45 bg-gradient-to-br from-amber-500/25 to-orange-500/5 text-amber-200";
    case "Web & POS":
      return "border-teal-400/45 bg-gradient-to-br from-teal-500/25 to-emerald-500/5 text-teal-200";
    default:
      return "border-emerald-400/35 bg-gradient-to-br from-emerald-500/20 to-cyan-500/5 text-emerald-200";
  }
}

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<FilterTab>("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const counts = useMemo(() => {
    const featured = PROJECTS.filter((p) => p.featured).length;
    const android = ALL_APP_LINKS.filter((l) => l.platform === "android").length;
    const ios = ALL_APP_LINKS.filter((l) => l.platform === "ios").length;
    const web = ALL_APP_LINKS.filter((l) => l.platform === "web").length;
    return {
      featured,
      ecosystems: PROJECTS.length,
      totalLinks: ALL_APP_LINKS.length,
      android,
      ios,
      web,
    };
  }, []);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      if (activeTab === "featured" && !p.featured) return false;
      if (
        (activeTab === "android" || activeTab === "ios") &&
        !p.links.some((l) => l.platform === activeTab)
      ) {
        return false;
      }
      const q = searchQuery.trim().toLowerCase();
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.region.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [activeTab, searchQuery]);

  const filteredDirectoryLinks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ALL_APP_LINKS.filter((item) => {
      if (!q) return true;
      return (
        item.label.toLowerCase().includes(q) ||
        item.projectTitle.toLowerCase().includes(q) ||
        item.region.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.packageOrDomain ?? "").toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  useEffect(() => {
    if (!activeProject) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveProject(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeProject]);

  const copyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 1600);
  };

  return (
    <section
      id="projects"
      className="isolate relative overflow-hidden border-t border-zinc-900 bg-black py-16 text-white sm:py-20"
    >
      <SectionGridBackground rgb="34, 197, 94" />

      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Compact Executive Header + Single Streamlined Control Bar */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3">
              <SectionBadge label="Portfolio" tone="emerald" />
            </div>
            <h2 className="font-serif text-3xl font-extrabold tracking-tight text-zinc-100 sm:text-4xl md:text-5xl">
              Shipped Production Apps
            </h2>
            <p className="mt-2 font-mono text-xs text-zinc-400 sm:text-sm">
              <span className="font-semibold text-emerald-300">
                {counts.totalLinks} live builds
              </span>{" "}
              across Google Play ({counts.android}), App Store ({counts.ios}), and Web POS ({counts.web}).
            </p>
          </div>

          {/* Single Unified Filter & Search Strip */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex flex-wrap items-center gap-1 rounded-2xl border border-zinc-800/90 bg-zinc-950/90 p-1 backdrop-blur-md">
              {(
                [
                  { id: "featured", label: `Featured (${counts.featured})` },
                  { id: "all", label: `All (${counts.ecosystems})` },
                  { id: "android", label: `Play (${counts.android})` },
                  { id: "ios", label: `iOS (${counts.ios})` },
                  { id: "links", label: `${counts.totalLinks} Links` },
                ] as const
              ).map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-xl px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] transition ${
                      active
                        ? "bg-emerald-400/20 text-emerald-200 shadow-[inset_0_0_0_1px_rgba(52,211,153,0.45)]"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {activeTab === "links" && (
              <div className="relative w-full sm:w-48">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-500" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Filter ${counts.totalLinks} links...`}
                  aria-label="Filter app links"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950/90 py-1.5 pl-8 pr-3 font-mono text-xs text-zinc-200 outline-none transition focus:border-emerald-400/50 placeholder:text-zinc-600"
                />
              </div>
            )}
          </div>
        </div>

        {/* VIEW 1: Precise App Cards Grid */}
        {activeTab !== "links" ? (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => {
                const visibleLinks = project.links.slice(0, 2);
                const extraCount = project.links.length - visibleLinks.length;
                const primaryMetric = project.metrics[0];

                return (
                  <motion.article
                    layout
                    key={project.id}
                    onClick={() => setActiveProject(project)}
                    className="group relative flex cursor-pointer flex-col justify-between rounded-2xl border border-zinc-800/90 bg-zinc-950/85 p-4 backdrop-blur-sm transition duration-200 hover:border-emerald-400/45 hover:bg-zinc-950"
                  >
                    <div>
                      {/* Row 1: App Icon Monogram + Title/Region + Top Metric */}
                      <div className="flex items-start justify-between gap-2.5">
                        <div className="flex min-w-0 items-center gap-3">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border font-mono text-xs font-bold tracking-wider ${getAppTileAccent(
                              project.category
                            )}`}
                          >
                            {getAppMonogram(project.title)}
                          </div>
                          <div className="min-w-0">
                            <h3 className="truncate text-[15px] font-bold text-zinc-100 transition group-hover:text-emerald-200">
                              {project.title}
                            </h3>
                            <p className="truncate font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-500">
                              {project.category} · {project.region}
                            </p>
                          </div>
                        </div>

                        {primaryMetric && (
                          <span className="shrink-0 rounded-md border border-emerald-500/25 bg-emerald-500/[0.08] px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-300">
                            {primaryMetric.replace(" Active", "")}
                          </span>
                        )}
                      </div>

                      {/* Row 2: Crisp 2-Line Description */}
                      <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-zinc-400">
                        {project.description}
                      </p>

                      {/* Row 3: Top 3 Tech Icons */}
                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        {project.tech.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-1 rounded-md border border-zinc-800/90 bg-zinc-900/70 px-2 py-0.5 font-mono text-[10px] text-zinc-300"
                          >
                            <TechIcon name={t} className="h-3 w-3 shrink-0" />
                            <span>{t}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Row 4: Direct Store Launchers + Details Trigger */}
                    <div className="mt-4 flex items-center justify-between gap-2 border-t border-zinc-800/80 pt-3">
                      <div
                        className="flex flex-wrap items-center gap-1.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {visibleLinks.map((link) => (
                          <a
                            key={link.url + link.label}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 font-mono text-[10px] font-medium transition ${platformBadgeStyle(
                              link.platform
                            )}`}
                          >
                            <PlatformIcon platform={link.platform} />
                            <span className="max-w-[96px] truncate">
                              {shortLinkLabel(link)}
                            </span>
                          </a>
                        ))}
                        {extraCount > 0 && (
                          <button
                            type="button"
                            onClick={() => setActiveProject(project)}
                            className="rounded-md border border-zinc-700/80 bg-zinc-900 px-2 py-1 font-mono text-[10px] text-zinc-300 transition hover:border-emerald-400/50 hover:text-emerald-200"
                          >
                            +{extraCount}
                          </button>
                        )}
                      </div>

                      <span className="inline-flex shrink-0 items-center gap-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400 transition group-hover:text-emerald-300">
                        <span>Details</span>
                        <ArrowUpRight className="h-3 w-3 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            {/* Expand bar when viewing Featured (6) */}
            {activeTab === "featured" && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("all")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-200 transition hover:border-emerald-300/70 hover:bg-emerald-500/20"
                >
                  <span>View All {counts.ecosystems} Product Suites</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("links")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-950/90 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-300 transition hover:border-zinc-600 hover:text-white"
                >
                  <span>Browse All {counts.totalLinks} Store Links</span>
                </button>
              </div>
            )}
          </>
        ) : (
          /* VIEW 2: Compact Store & Web Links Registry */
          <div className="overflow-hidden rounded-2xl border border-emerald-500/25 bg-zinc-950/90">
            <div className="flex items-center justify-between border-b border-zinc-800 bg-black/60 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-400">
              <span>apps.registry.ts</span>
              <span className="text-emerald-300">
                {filteredDirectoryLinks.length} / {counts.totalLinks} builds
              </span>
            </div>

            <div className="max-h-[480px] divide-y divide-zinc-800/75 overflow-y-auto">
              {filteredDirectoryLinks.map((item, idx) => (
                <div
                  key={item.url + item.label + idx}
                  className="flex flex-col gap-2.5 px-4 py-3 transition hover:bg-emerald-500/[0.04] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 font-mono text-[10px] uppercase ${platformBadgeStyle(
                        item.platform
                      )}`}
                    >
                      <PlatformIcon platform={item.platform} />
                      <span>
                        {item.platform === "android"
                          ? "Play"
                          : item.platform === "ios"
                          ? "iOS"
                          : "Web"}
                      </span>
                    </span>
                    <span className="font-mono text-xs font-semibold text-zinc-100">
                      {item.projectTitle}
                    </span>
                    <span className="font-mono text-xs text-emerald-300/85">
                      · {item.label}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500">
                      ({item.region})
                    </span>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => copyLink(item.url)}
                      aria-label="Copy link"
                      className="inline-flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-300 transition hover:border-zinc-600 hover:text-white"
                    >
                      {copiedUrl === item.url ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-200 transition hover:border-emerald-300 hover:bg-emerald-400/20"
                    >
                      <span>Open</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Case-Study & Multi-App Links Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-emerald-400/35 bg-[#060a0d] p-6 text-white shadow-[0_25px_90px_rgba(0,0,0,0.9),0_0_50px_rgba(16,185,129,0.16)] sm:p-7"
            >
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Close project details"
                className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-zinc-300 transition hover:border-emerald-400/60 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-block rounded border border-emerald-400/35 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-emerald-200">
                  {activeProject.category}
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[11px] text-zinc-400">
                  <MapPin className="h-3 w-3 text-emerald-400" />
                  {activeProject.region}
                </span>
              </div>

              <h3 className="mt-3 font-serif text-3xl font-extrabold text-zinc-100">
                {activeProject.title}
              </h3>
              <p className="mt-1 font-mono text-xs text-emerald-300">
                {activeProject.subtitle}
              </p>

              <p className="mt-3.5 font-mono text-xs leading-relaxed text-zinc-300 sm:text-[13px]">
                {activeProject.longDescription}
              </p>

              {/* All Live Store & Web Links */}
              <div className="mt-5 rounded-xl border border-emerald-500/25 bg-black/60 p-4">
                <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-200">
                  Live Store &amp; Web Deployments ({activeProject.links.length})
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {activeProject.links.map((link) => (
                    <a
                      key={link.url + link.label}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center justify-between rounded-lg border px-3 py-2 font-mono text-xs transition ${platformBadgeStyle(
                        link.platform
                      )}`}
                    >
                      <span className="inline-flex items-center gap-2 truncate pr-2 font-semibold">
                        <PlatformIcon platform={link.platform} />
                        <span className="truncate">{link.label}</span>
                      </span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Key Metrics Row */}
              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {activeProject.metrics.map((metric) => (
                  <div
                    key={metric}
                    className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-2 text-center font-mono text-xs font-semibold text-emerald-200"
                  >
                    {metric}
                  </div>
                ))}
              </div>

              {/* Engineering Highlights */}
              <div className="mt-5">
                <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-200/85">
                  Architecture Highlights
                </p>
                <ul className="space-y-2">
                  {activeProject.features.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 font-mono text-xs leading-relaxed text-zinc-300"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="mt-5">
                <p className="mb-2 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-200/85">
                  <Sparkles className="h-3 w-3" />
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.tech.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-900/90 px-2.5 py-1 font-mono text-[11px] text-zinc-200"
                    >
                      <TechIcon name={t} className="h-3.5 w-3.5 shrink-0" />
                      <span>{t}</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
