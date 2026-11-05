"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone } from "lucide-react";

const BOOT_STEPS = [
  "Initializing Clean Architecture...",
  "Mounting PowerSync Offline-First Engine...",
  "Verifying 12 App Store & Play Store Builds...",
  "99.4% Crash-Free Telemetry Verified.",
];

export function BootLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1250; // Crisp 1.25s launch

    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setVisible(false), 180);
      }
    };
    raf = requestAnimationFrame(tick);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        setVisible(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const stepIndex = Math.min(
    BOOT_STEPS.length - 1,
    Math.floor((progress / 100) * BOOT_STEPS.length)
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-[#05070a] text-[#dfffe2]"
        >
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at top, rgba(22, 185, 129, 0.2), transparent 52%), linear-gradient(180deg, #020304 0%, #060a0f 65%, #020304 100%)",
              }}
            />
            <div
              className="absolute inset-0 bg-[size:42px_42px]"
              style={{
                opacity: 0.3,
                backgroundImage:
                  "linear-gradient(rgba(22, 185, 129, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(22, 185, 129, 0.15) 1px, transparent 1px)",
              }}
            />
          </div>

          <div className="relative z-10 flex w-[92%] max-w-2xl flex-col gap-5 p-5 md:p-7">
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-[#8ef2b0] md:text-sm">
              <span>&gt; root@umair:~$ flutter run --release</span>
              <button
                type="button"
                onClick={() => setVisible(false)}
                className="rounded border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] tracking-[0.14em] text-emerald-200 transition hover:border-emerald-300/60"
              >
                Skip
              </button>
            </div>

            <div className="flex items-center justify-center py-2">
              <div className="relative grid h-28 w-28 place-items-center rounded-3xl border border-emerald-400/30 bg-emerald-500/[0.07] shadow-[0_0_50px_rgba(16,185,129,0.18)] md:h-36 md:w-36">
                <div className="absolute inset-2 rounded-2xl border border-dashed border-emerald-400/25 animate-[spin_12s_linear_infinite]" />
                <Smartphone className="h-11 w-11 text-emerald-300 md:h-14 md:w-14" />
                <span className="absolute -bottom-2 rounded-full border border-emerald-400/40 bg-[#050b08] px-2.5 py-0.5 font-mono text-[10px] text-emerald-300">
                  iOS · Android
                </span>
              </div>
            </div>

            <div className="mx-auto w-full max-w-xs md:max-w-sm">
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#103220]">
                <div
                  className="h-full bg-gradient-to-r from-[#1fa84d] via-[#7fff9a] to-[#c3ffd0] transition-[width] duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-[#7de89f] md:text-xs">
                <span>0%</span>
                <span className=" font-semibold text-emerald-200">
                  {String(progress).padStart(2, "0")}%
                </span>
                <span>100%</span>
              </div>
            </div>

            <p className="text-center font-mono text-xs tracking-[0.08em] text-emerald-200/85 md:text-sm">
              {BOOT_STEPS[stepIndex]}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

