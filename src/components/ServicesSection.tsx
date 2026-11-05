"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SERVICES, PROFILE } from "@/data/portfolio";
import {
  SectionGridBackground,
  SectionBadge,
  ExpandingDotButton,
} from "@/components/ui/Primitives";

// Interactive 3D Dot-Matrix Globe highlighting Umair's Global App Reach
function InteractiveGlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let rotation = 0.7;
    let isDragging = false;
    let lastX = 0;

    // Generate Fibonacci sphere points
    const numPoints = 420;
    const points: { lat: number; lon: number }[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2;
      const lat = Math.asin(y);
      const lon = goldenAngle * i;
      points.push({ lat, lon });
    }

    // Key global hubs where Umair's apps & teams operate
    const hubs = [
      { name: "Pakistan HQ (GCart / POS)", lat: 0.56, lon: 1.29, color: "#34d399" },
      { name: "Africa (Ohana 20k+)", lat: 0.11, lon: 0.06, color: "#22d3ee" },
      { name: "Philippines (Salveowell)", lat: 0.25, lon: 2.11, color: "#38bdf8" },
      { name: "Saudi Arabia (Boshna)", lat: 0.43, lon: 0.81, color: "#fcd34d" },
      { name: "UK (LofuFood)", lat: 0.90, lon: -0.02, color: "#a7f3d0" },
      { name: "Canada & Americas", lat: 0.72, lon: -1.35, color: "#67e8f9" },
    ];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const project = (lat: number, lon: number, cx: number, cy: number, r: number) => {
      const phi = lon + rotation;
      const x = Math.cos(lat) * Math.sin(phi);
      const y = -Math.sin(lat);
      const z = Math.cos(lat) * Math.cos(phi);
      return { sx: cx + x * r, sy: cy + y * r, z };
    };

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h * 0.44;
      const radius = Math.min(w, h) * 0.36;

      // Subtle atmospheric halo
      const grad = ctx.createRadialGradient(cx, cy, radius * 0.4, cx, cy, radius * 1.22);
      grad.addColorStop(0, "rgba(6, 182, 212, 0.12)");
      grad.addColorStop(0.7, "rgba(16, 185, 129, 0.06)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.22, 0, Math.PI * 2);
      ctx.fill();

      // Globe rim
      ctx.strokeStyle = "rgba(34, 211, 238, 0.22)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Draw sphere dots
      for (const p of points) {
        const { sx, sy, z } = project(p.lat, p.lon, cx, cy, radius);
        if (z > -0.15) {
          const alpha = Math.max(0.08, (z + 0.2) * 0.65);
          ctx.fillStyle = `rgba(103, 232, 249, ${alpha.toFixed(2)})`;
          ctx.beginPath();
          ctx.arc(sx, sy, z > 0.4 ? 1.5 : 1.05, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw arcs from Pakistan HQ to global app markets
      const hq = project(hubs[0].lat, hubs[0].lon, cx, cy, radius);
      for (let i = 1; i < hubs.length; i++) {
        const target = project(hubs[i].lat, hubs[i].lon, cx, cy, radius);
        if (hq.z > -0.25 && target.z > -0.25) {
          const midX = (hq.sx + target.sx) / 2;
          const midY = (hq.sy + target.sy) / 2 - 28;
          ctx.strokeStyle = "rgba(52, 211, 153, 0.42)";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(hq.sx, hq.sy);
          ctx.quadraticCurveTo(midX, midY, target.sx, target.sy);
          ctx.stroke();
        }
      }

      // Draw hub beacons & labels
      for (const hub of hubs) {
        const { sx, sy, z } = project(hub.lat, hub.lon, cx, cy, radius);
        if (z > 0.05) {
          ctx.fillStyle = hub.color;
          ctx.beginPath();
          ctx.arc(sx, sy, 3.3, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = hub.color;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.arc(sx, sy, 7, 0, Math.PI * 2);
          ctx.stroke();

          if (z > 0.35) {
            ctx.font = "600 9px ui-monospace, SFMono-Regular, monospace";
            ctx.fillStyle = "rgba(228, 228, 231, 0.88)";
            ctx.fillText(hub.name, sx + 9, sy + 3);
          }
        }
      }

      if (!isDragging) {
        rotation += 0.0042;
      }
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    const onDown = (clientX: number) => {
      isDragging = true;
      lastX = clientX;
    };
    const onMove = (clientX: number) => {
      if (!isDragging) return;
      const dx = clientX - lastX;
      lastX = clientX;
      rotation += dx * 0.008;
    };
    const onUp = () => {
      isDragging = false;
    };

    const handleMouseDown = (e: MouseEvent) => onDown(e.clientX);
    const handleMouseMove = (e: MouseEvent) => onMove(e.clientX);
    const handleTouchStart = (e: TouchEvent) => onDown(e.touches[0].clientX);
    const handleTouchMove = (e: TouchEvent) => onMove(e.touches[0].clientX);

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", onUp);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", onUp);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-label="Interactive global product delivery globe"
      className="h-full w-full cursor-grab active:cursor-grabbing"
    />
  );
}

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-black py-20 text-white sm:py-24"
    >
      <SectionGridBackground rgb="20, 184, 166" />

      {/* Horizontal Scanline */}
      <div className="pointer-events-none absolute inset-0 z-[12] overflow-hidden">
        <span className="animate-services-scanline absolute left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent shadow-[0_0_14px_rgba(34,211,238,0.45)]" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-black via-black/60 to-transparent" />

      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)] md:gap-10">
          {/* Left Column: What I Can Offer */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.6 }}
            className="p-2 sm:p-4"
          >
            <div className="mb-5">
              <SectionBadge label="Services" tone="teal" />
            </div>

            <h2 className="mb-3 font-serif text-4xl font-extrabold tracking-tight text-zinc-100 sm:text-5xl">
              What I Can Offer
            </h2>
            <p className="mb-6 font-mono text-[12px] leading-relaxed text-zinc-400 sm:text-sm">
              Senior product-minded mobile engineering for startups, fintechs, and global teams who need resilient apps shipped cleanly to both stores.
            </p>

            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
              services.index.ts
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {SERVICES.map((srv, idx) => (
                <div
                  key={srv.index}
                  className="group relative rounded-xl border border-teal-500/20 bg-black/50 p-4 transition hover:border-teal-300/45 hover:bg-black/70"
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <span className="font-mono text-lg font-bold text-zinc-200">
                      {srv.index}
                    </span>
                    <span className="font-mono text-[10px] text-teal-300/75">
                      [{srv.index}]
                    </span>
                  </div>

                  <div className="relative mb-2 pr-8">
                    <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-100">
                      {srv.title}
                    </h3>
                    <span
                      style={{ animationDelay: `${idx * 0.3}s` }}
                      className="animate-dot-blink pointer-events-none absolute right-2 top-1 h-1.5 w-1.5 rounded-full bg-teal-300 shadow-[0_0_7px_rgba(45,212,191,0.9)]"
                    />
                    <span
                      style={{ animationDelay: `${idx * 0.3 + 0.9}s` }}
                      className="animate-dot-blink pointer-events-none absolute right-5 top-3 h-1 w-1 rounded-full bg-cyan-300 shadow-[0_0_7px_rgba(34,211,238,0.85)]"
                    />
                  </div>

                  <p className="font-mono text-[11px] leading-relaxed text-zinc-400">
                    <span className="text-teal-300">&gt;_ </span>
                    {srv.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Global Reach + Interactive 3D Globe */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.6 }}
            className="p-2 sm:p-4"
          >
            <div className="mb-5">
              <SectionBadge label="Global Reach" tone="cyan" />
            </div>

            <h2 className="mb-3 font-serif text-4xl font-extrabold tracking-tight text-zinc-100 sm:text-5xl">
              Let&apos;s Ship Mobile
            </h2>
            <p className="mb-6 font-mono text-[12px] leading-relaxed text-zinc-400 sm:text-sm">
              Shipping production apps used across Africa, Southeast Asia, and global markets — available for remote roles &amp; international contracts.
            </p>

            <div className="relative h-[430px] overflow-hidden rounded-2xl border border-cyan-500/25 bg-zinc-950/75 shadow-[0_0_45px_rgba(6,182,212,0.08)]">
              <div className="absolute inset-0">
                <InteractiveGlobeCanvas />
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent" />

              <div className="absolute inset-x-4 bottom-4 rounded-xl border border-cyan-500/20 bg-black/65 p-4 backdrop-blur-md">
                <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.14em] text-cyan-200">
                  Want to Work Together?
                </h3>
                <p className="mt-1.5 font-mono text-xs leading-relaxed text-zinc-300">
                  Available for Senior Flutter/Mobile roles, remote contracts, and end-to-end app builds.
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <a href={`mailto:${PROFILE.email}`} className="inline-block">
                    <ExpandingDotButton
                      className="border-cyan-400/40 bg-cyan-400/10 text-cyan-100"
                      dotColor="bg-cyan-300"
                    >
                      Connect
                    </ExpandingDotButton>
                  </a>
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block"
                  >
                    <ExpandingDotButton
                      className="border-zinc-600/60 bg-zinc-900/75 text-zinc-200"
                      dotColor="bg-emerald-300"
                    >
                      LinkedIn
                    </ExpandingDotButton>
                  </a>
                  <a
                    href={PROFILE.gitlab}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block"
                  >
                    <ExpandingDotButton
                      className="border-zinc-600/60 bg-zinc-900/75 text-zinc-200"
                      dotColor="bg-amber-300"
                    >
                      GitLab
                    </ExpandingDotButton>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

