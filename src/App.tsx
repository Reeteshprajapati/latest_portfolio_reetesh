import React, { useState } from 'react';
import {
  HeroSection,
  MarqueeSection,
  AboutSection,
  ExperienceSection,
  SkillsSection,
  ProjectsSection,
  EducationSection,
  FooterSection,
} from '@/components/sections';
import { ToastProvider, DynamicColumnBackground, CustomCursor } from '@/components/ui';
import { CommandPalette, ResumeModal } from '@/components/modals';
import { ThreeDModal } from '@/components/3d';
import { ThemeProvider } from '@/context/ThemeContext';

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [is3DOpen, setIs3DOpen] = useState(false);

  return (
    <ThemeProvider>
      <ToastProvider>
        <CustomCursor />
        <main className="overflow-x-clip bg-[#030712] text-slate-100 selection:bg-slate-800 selection:text-white relative">
          <DynamicColumnBackground />
          <HeroSection
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenResume={() => setIsResumeOpen(true)}
            onOpen3D={() => setIs3DOpen(true)}
          />
          <MarqueeSection />
          <AboutSection />
          <ExperienceSection />
          <SkillsSection />
          <ProjectsSection />
          <EducationSection />
          <FooterSection />

          {/* Stylish Interactive Modals */}
          <CommandPalette
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onOpenResume={() => setIsResumeOpen(true)}
          />

          <ResumeModal
            isOpen={isResumeOpen}
            onClose={() => setIsResumeOpen(false)}
          />

          <ThreeDModal
            isOpen={is3DOpen}
            onClose={() => setIs3DOpen(false)}
          />
        </main>
      </ToastProvider>
    </ThemeProvider>
  );
}
