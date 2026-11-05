"use client";

import React, { useState } from "react";
import { BootLoader } from "@/components/BootLoader";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { TechStackSection } from "@/components/TechStackSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ReleaseTelemetrySection } from "@/components/ReleaseTelemetrySection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { MilestonesSection } from "@/components/MilestonesSection";
import { TerminalAndNotesSection } from "@/components/TerminalAndNotesSection";
import { PortfolioFooter, FloatingAiAssistant } from "@/components/FooterAndAiBot";

export default function PortfolioPage() {
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <div id="root" className="relative min-h-screen bg-black text-white">
      <BootLoader />
      <Navbar onOpenAi={() => setAiOpen(true)} />

      <main id="main">
        <HeroSection />
        <TechStackSection />
        <ExperienceSection />
        <ReleaseTelemetrySection />
        <ServicesSection />
        <ProjectsSection />
        <MilestonesSection />
        <TerminalAndNotesSection />
      </main>

      <PortfolioFooter />
      <FloatingAiAssistant open={aiOpen} setOpen={setAiOpen} />
    </div>
  );
}

