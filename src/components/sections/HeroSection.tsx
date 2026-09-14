import React, { useState } from 'react';
import { FadeIn } from '@/components/ui/FadeIn';
import { personalDetails } from '@/lib/data';
import { Code2, ArrowUpRight, MapPin, Globe, Search, FileText, Box, Cpu, Terminal, Sun, Moon } from 'lucide-react';
import { InteractiveTerminal } from '@/components/terminal/InteractiveTerminal';
import { ThreeCanvas } from '@/components/3d/ThreeCanvas';
import { useTheme } from '@/context/ThemeContext';

interface HeroSectionProps {
  onOpenSearch: () => void;
  onOpenResume: () => void;
  onOpen3D: () => void;
}

export function HeroSection({ onOpenSearch, onOpenResume, onOpen3D }: HeroSectionProps) {
  const [heroRightTab, setHeroRightTab] = useState<'terminal' | '3d'>('terminal');
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-sky-500/5 blur-[120px] pointer-events-none -z-0" />

      {/* Header Floating Glass Navbar */}
      <FadeIn delay={0} y={-10} className="w-full z-40 sticky top-3 px-3 sm:px-6">
        <header className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-2.5 rounded-2xl navbar-header-glass transition-all">
          {/* Brand Logo & Avatar Photo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-400 p-[2px] shadow-md flex-shrink-0 relative group">
              <img
                src="/avatar.jpg"
                alt={personalDetails.name}
                className="w-full h-full rounded-full object-cover border border-slate-900 group-hover:scale-105 transition-transform"
                onError={(e) => {
                  // Fallback to monogram if image fails
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                }}
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold tracking-tight navbar-brand-title font-outfit flex items-center gap-1.5">
                <span>{personalDetails.name}</span>
              </div>
              <p className="text-[10px] navbar-brand-sub font-mono hidden md:block">
                Full-Stack SDE &bull; Java &bull; Spring Boot &bull; React 19
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-xl navbar-pill-container text-xs font-mono">
            {['About', 'Experience', 'Skills', 'Projects', 'GitHub', 'Education', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-3.5 py-1.5 rounded-lg navbar-nav-link transition-all font-medium cursor-pointer"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Quick Control Badges */}
          <div className="flex items-center gap-2">
            {/* 3D Studio Trigger */}
            <button
              onClick={onOpen3D}
              className="px-3 py-1.5 rounded-xl navbar-studio-btn text-xs font-mono flex items-center gap-1.5 font-semibold cursor-pointer"
              title="Open Interactive 3D WebGL Studio"
            >
              <Box className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">3D Studio</span>
            </button>

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="px-2.5 py-1.5 rounded-xl navbar-badge-btn text-xs font-mono flex items-center gap-1.5 cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-indigo-600" />
              )}
              <span className="hidden sm:inline capitalize text-[11px] font-semibold">{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>

            {/* Search */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl navbar-badge-btn text-xs font-mono flex items-center gap-2 cursor-pointer"
              title="Command Palette (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">⌘K</span>
            </button>

            {/* Resume */}
            <button
              onClick={onOpenResume}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl navbar-primary-btn text-xs font-mono flex items-center gap-1.5 cursor-pointer font-semibold"
              title="View Resume PDF"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Resume</span>
            </button>
          </div>
        </header>
      </FadeIn>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-20 my-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Info */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
          <FadeIn delay={0.1} y={15}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for Full-Stack & Software Engineering Roles
            </div>
          </FadeIn>

          <FadeIn delay={0.2} y={15}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-outfit">
              Reetesh Prajapati
            </h1>
            <p className="text-xl sm:text-2xl font-semibold text-slate-400 mt-2 font-sans flex items-center gap-2 flex-wrap">
              <span>Full-Stack Developer &bull;</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-signature text-2xl sm:text-3xl">Java, Spring Boot & React.js</span>
            </p>
          </FadeIn>

          <FadeIn delay={0.3} y={15}>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
              Self-driven software developer specializing in building modern web applications, scalable backend APIs, and responsive front-end interfaces with clean architecture and maintainable code.
            </p>
          </FadeIn>

          <FadeIn delay={0.4} y={15}>
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {personalDetails.location}
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
                B.Tech CGPA: <strong className="text-white">8.0</strong>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
                SDE Intern @ <strong className="text-white">VidyaGxp Pvt Ltd</strong>
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.5} y={15}>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpen3D}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500/20 to-emerald-500/20 hover:from-sky-500/30 hover:to-emerald-500/30 border border-sky-500/40 text-sky-300 text-xs font-bold tracking-wide transition-all shadow-md flex items-center gap-2"
              >
                <Box className="w-4 h-4 text-sky-400 animate-pulse" />
                <span>3D View Studio</span>
              </button>

              <button
                onClick={() => scrollToSection('projects')}
                className="px-6 py-3 rounded-xl bg-white hover:bg-slate-200 text-slate-950 text-xs font-semibold tracking-wide transition-all shadow-md flex items-center gap-2"
              >
                <span>View Projects</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold tracking-wide transition-all"
              >
                Contact Me
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={0.6} y={15}>
            <div className="pt-4 border-t border-slate-800/80 w-full">
              <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2.5">
                Core Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {["Java", "Spring Boot", "React.js", "MySQL", "JavaScript", "REST APIs", "TailwindCSS", "Git"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-300 hover:border-slate-700 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right Terminal & 3D Interactive WebGL Sandbox */}
        <div className="lg:col-span-5 w-full space-y-3">
          <FadeIn delay={0.3} y={20}>
            {/* View Switcher Header */}
            <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-400 mb-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setHeroRightTab('terminal')}
                  className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
                    heroRightTab === 'terminal'
                      ? 'bg-slate-900 border border-slate-800 text-white font-bold'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Terminal</span>
                </button>

                <button
                  onClick={() => setHeroRightTab('3d')}
                  className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
                    heroRightTab === '3d'
                      ? 'bg-sky-500/10 border border-sky-500/30 text-sky-400 font-bold'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>3D View Canvas</span>
                </button>
              </div>

              <button
                onClick={onOpen3D}
                className="text-[11px] text-sky-400 hover:underline flex items-center gap-1"
              >
                <span>Full Studio &rarr;</span>
              </button>
            </div>

            {heroRightTab === 'terminal' ? (
              <InteractiveTerminal />
            ) : (
              <div className="w-full rounded-2xl bg-[#090D16] border border-slate-800 shadow-2xl overflow-hidden p-4 relative flex flex-col justify-between min-h-[380px]">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2 border-b border-slate-800 pb-2">
                  <span className="flex items-center gap-1.5 text-white font-bold">
                    <Cpu className="w-3.5 h-3.5 text-emerald-400" /> 3D WebGL Geodesic Matrix
                  </span>
                  <span className="text-[10px] text-slate-500">Move mouse to tilt</span>
                </div>
                <div className="relative flex-1 rounded-xl overflow-hidden border border-slate-800/80 bg-slate-950">
                  <ThreeCanvas className="w-full h-full" />
                </div>
              </div>
            )}
          </FadeIn>
        </div>
      </div>

      <div className="w-full text-center pb-6 z-10">
        <a href="#about" className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-500 hover:text-slate-300 transition-colors tracking-wider">
          <span>SCROLL DOWN</span>
          <span className="animate-bounce">↓</span>
        </a>
      </div>
    </section>
  );
}
