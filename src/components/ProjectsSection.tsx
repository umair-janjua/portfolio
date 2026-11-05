"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  ExternalLink,
  X,
  CheckCircle2,
  Sparkles,
  Apple,
  Play,
  Globe,
  LayoutGrid,
  List,
  Search,
  Copy,
  Check,
  MapPin,
} from "lucide-react";
import {
  PROJECTS,
  ALL_APP_LINKS,
  ProjectItem,
  AppStoreLink,
} from "@/data/portfolio";
import { SectionGridBackground, SectionBadge } from "@/components/ui/Primitives";
import { TechIcon } from "@/components/ui/TechIcons";

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

export function ProjectsSection() {
  const [viewMode, setViewMode] = useState<"grid" | "directory">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPlatform, setSelectedPlatform] = useState<
    "all" | "android" | "ios" | "web"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))],
    []
  );

  const platformCounts = useMemo(() => {
    const android = ALL_APP_LINKS.filter((l) => l.platform === "android").length;
    const ios = ALL_APP_LINKS.filter((l) => l.platform === "ios").length;
    const web = ALL_APP_LINKS.filter((l) => l.platform === "web").length;
    return { total: ALL_APP_LINKS.length, android, ios, web };
  }, []);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchCat =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchPlat =
        selectedPlatform === "all" ||
        p.links.some((l) => l.platform === selectedPlatform);
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.region.toLowerCase().includes(q) ||
        p.links.some(
          (l) =>
            l.label.toLowerCase().includes(q) ||
            (l.packageOrDomain ?? "").toLowerCase().includes(q)
        );
      return matchCat && matchPlat && matchSearch;
    });
  }, [selectedCategory, selectedPlatform, searchQuery]);

  const filteredDirectoryLinks = useMemo(() => {
    return ALL_APP_LINKS.filter((item) => {
      const matchPlat =
        selectedPlatform === "all" || item.platform === selectedPlatform;
      const matchCat =
        selectedCategory === "All" || item.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        item.label.toLowerCase().includes(q) ||
        item.projectTitle.toLowerCase().includes(q) ||
        item.region.toLowerCase().includes(q) ||
        (item.packageOrDomain ?? "").toLowerCase().includes(q);
      return matchPlat && matchCat && matchSearch;
    });
  }, [selectedPlatform, selectedCategory, searchQuery]);

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
      className="isolate relative overflow-hidden bg-black py-20 text-white sm:py-24"
    >
      <SectionGridBackground rgb="34, 197, 94" />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-black via-black/60 to-transparent sm:h-40" />

      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-8 flex max-w-4xl flex-col gap-4 text-center"
        >
          <SectionBadge label="Portfolio Apps" tone="emerald" />
          <h2 className="font-serif text-4xl font-extrabold tracking-tight text-zinc-100 sm:text-5xl md:text-6xl">
            Production Work
          </h2>
          <p className="font-mono text-[12px] leading-relaxed text-zinc-400 sm:text-sm">
            {platformCounts.total} live mobile &amp; web deployments managed across Google Play ({platformCounts.android}), Apple App Store ({platformCounts.ios}), and Web / Custom POS ({platformCounts.web}).
          </p>
        </motion.div>

        {/* Platform Filter Bar + View Switcher + Search */}
        <div className="mb-6 rounded-2xl border border-emerald-500/20 bg-zinc-950/80 p-3.5 backdrop-blur-md sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Platform Segmented Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {(
                [
                  { id: "all", label: `All (${platformCounts.total})` },
                  { id: "android", label: `Google Play (${platformCounts.android})` },
                  { id: "ios", label: `App Store (${platformCounts.ios})` },
                  { id: "web", label: `Web & POS (${platformCounts.web})` },
                ] as const
              ).map((tab) => {
                const active = selectedPlatform === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedPlatform(tab.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition ${
                      active
                        ? "border-emerald-400/75 bg-emerald-400/15 text-emerald-200 shadow-[0_0_16px_rgba(16,185,129,0.18)]"
                        : "border-zinc-800 bg-black/50 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                    }`}
                  >
                    {tab.id !== "all" && <PlatformIcon platform={tab.id} />}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search + View Toggle (Showcase Cards vs All Links Registry) */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative flex-1 sm:w-56 sm:flex-initial">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-500" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search app, region, id..."
                  aria-label="Search portfolio apps"
                  className="w-full rounded-full border border-zinc-800 bg-black/65 py-1.5 pl-8 pr-3 font-mono text-xs text-zinc-200 outline-none transition focus:border-emerald-400/50 placeholder:text-zinc-600"
                />
              </div>

              <div className="inline-flex rounded-full border border-zinc-800 bg-black/70 p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition ${
                    viewMode === "grid"
                      ? "bg-emerald-400/20 text-emerald-200"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <LayoutGrid className="h-3 w-3" />
                  <span>Ecosystems</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("directory")}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition ${
                    viewMode === "directory"
                      ? "bg-emerald-400/20 text-emerald-200"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <List className="h-3 w-3" />
                  <span>All Links ({platformCounts.total})</span>
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-zinc-800/80 pt-3">
            {categories.map((cat) => {
              const active = cat === selectedCategory;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] transition ${
                    active
                      ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-200"
                      : "border-zinc-800/90 bg-black/35 text-zinc-400 hover:border-emerald-400/35 hover:text-emerald-200"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* VIEW MODE 1: Curated Product & Multi-App Ecosystem Grid */}
        {viewMode === "grid" ? (
          <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const visibleLinks = project.links.slice(0, 2);
              const extraCount = project.links.length - visibleLinks.length;

              return (
                <motion.div
                  layout
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  className="group relative -ml-px -mt-px flex cursor-pointer flex-col justify-between border border-emerald-500/20 bg-zinc-950/90 p-5 transition duration-300 hover:z-10 hover:border-emerald-400/45 hover:bg-emerald-500/[0.06]"
                >
                  <div>
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span className="rounded border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-emerald-200">
                        {project.category}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-zinc-500">
                        <MapPin className="h-3 w-3 text-emerald-400/70" />
                        {project.region}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-zinc-100 transition group-hover:text-emerald-200">
                      {project.title}
                    </h3>
                    <p className="mt-0.5 font-mono text-[11px] text-emerald-300/80">
                      {project.subtitle}
                    </p>

                    <p className="mt-2.5 text-xs leading-relaxed text-zinc-400">
                      {project.description}
                    </p>

                    {/* Direct Quick-Launch Store Pills */}
                    <div
                      className="mt-3.5 flex flex-wrap items-center gap-1.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {visibleLinks.map((link) => (
                        <a
                          key={link.url + link.label}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[10px] font-medium transition ${platformBadgeStyle(
                            link.platform
                          )}`}
                        >
                          <PlatformIcon platform={link.platform} />
                          <span>{link.label}</span>
                          <ExternalLink className="h-2.5 w-2.5 opacity-75" />
                        </a>
                      ))}
                      {extraCount > 0 && (
                        <button
                          type="button"
                          onClick={() => setActiveProject(project)}
                          className="rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 font-mono text-[10px] text-zinc-300 transition hover:border-emerald-400/50 hover:text-emerald-200"
                        >
                          +{extraCount} more apps
                        </button>
                      )}
                    </div>

                    {/* Impact Metric Chips */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.metrics.map((m) => (
                        <span
                          key={m}
                          className="rounded bg-zinc-900/90 px-2 py-0.5 font-mono text-[10px] text-zinc-400"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between pt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-200/75">
                    <div className="flex items-center gap-2">
                      <span>Inspect all {project.links.length} links</span>
                      <span className="h-px w-5 bg-emerald-300/50 transition-all duration-300 group-hover:w-9" />
                    </div>
                    <Smartphone className="h-3.5 w-3.5 text-emerald-400/70" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* VIEW MODE 2: Complete Store & Web Links Registry (apps.registry.ts) */
          <div className="overflow-hidden rounded-2xl border border-emerald-500/25 bg-zinc-950/90">
            <div className="flex items-center justify-between border-b border-zinc-800 bg-black/60 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400">
              <span>apps.registry.ts — Direct Store &amp; Web Directory</span>
              <span className="text-emerald-300">
                Showing {filteredDirectoryLinks.length} of {platformCounts.total} links
              </span>
            </div>

            <div className="divide-y divide-zinc-800/80">
              {filteredDirectoryLinks.map((item, idx) => (
                <div
                  key={item.url + item.label + idx}
                  className="flex flex-col gap-3 p-4 transition hover:bg-emerald-500/[0.05] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 font-mono text-[10px] uppercase ${platformBadgeStyle(
                          item.platform
                        )}`}
                      >
                        <PlatformIcon platform={item.platform} />
                        <span>
                          {item.platform === "android"
                            ? "Android Play"
                            : item.platform === "ios"
                            ? "iOS App Store"
                            : "Web / POS"}
                        </span>
                      </span>
                      <span className="font-mono text-sm font-semibold text-zinc-100">
                        {item.projectTitle}
                      </span>
                      <span className="font-mono text-xs text-emerald-300/85">
                        — {item.label}
                      </span>
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-3 font-mono text-[11px] text-zinc-500">
                      <span>{item.category}</span>
                      <span>•</span>
                      <span>{item.region}</span>
                      {item.packageOrDomain && (
                        <>
                          <span>•</span>
                          <span className="truncate text-zinc-400">
                            {item.packageOrDomain}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => copyLink(item.url)}
                      aria-label="Copy link"
                      className="inline-flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-900 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-300 transition hover:border-zinc-500 hover:text-white"
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
                      className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-200 transition hover:border-emerald-300 hover:bg-emerald-400/20"
                    >
                      <span>Open</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}

              {filteredDirectoryLinks.length === 0 && (
                <p className="p-8 text-center font-mono text-xs text-zinc-500">
                  No apps matched your current filter. Try clearing the search or selecting &quot;All&quot;.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Expandable Case-Study & Multi-App Links Modal */}
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
              transition={{ duration: 0.25 }}
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

              <p className="mt-4 font-mono text-xs leading-relaxed text-zinc-300 sm:text-[13px]">
                {activeProject.longDescription}
              </p>

              {/* All Live Store & Web Links in this Ecosystem */}
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
                      className={`flex items-center justify-between rounded-lg border px-3 py-2.5 font-mono text-xs transition ${platformBadgeStyle(
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
              <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {activeProject.metrics.map((metric) => (
                  <div
                    key={metric}
                    className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-2.5 text-center font-mono text-xs font-semibold text-emerald-200"
                  >
                    {metric}
                  </div>
                ))}
              </div>

              {/* Architectural Highlights */}
              <div className="mt-6">
                <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-200/85">
                  Engineering &amp; Architecture Highlights
                </p>
                <ul className="space-y-2.5">
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
              <div className="mt-6">
                <p className="mb-2 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-200/85">
                  <Sparkles className="h-3 w-3" />
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tech.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-900/90 px-3 py-1 font-mono text-[11px] text-zinc-200"
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
