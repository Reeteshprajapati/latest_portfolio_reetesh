import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Code2, ExternalLink, FileText, Cpu, ShieldAlert, Layers } from 'lucide-react';
import { projects } from '@/lib/data';

interface ProjectModalProps {
  project: typeof projects[0] | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-3xl max-h-[90vh] bg-[#090D16] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-slate-400">
                {project.number}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono">
                {project.category}
              </span>
              <span className="text-xs font-mono text-slate-500">
                {project.period}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {/* Project Title */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {project.name}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mt-2">
                {project.description}
              </p>
            </div>

            {/* Main Preview Image */}
            <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-slate-800">
              <img
                src={project.images.col2}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Key Accomplishments & Metrics */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
                Key Accomplishments & Impact Metrics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.metrics.map((metric, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3 text-xs font-medium text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Case Study / Architecture if present */}
            {'caseStudy' in project && project.caseStudy && (
              <div className="space-y-4 pt-4 border-t border-slate-800/80">
                <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span>Architecture & Case Study</span>
                </h3>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
                  <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wide">
                    Problem Statement
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {(project.caseStudy as any).problem}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wide flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Key Architecture Decisions</span>
                  </h4>
                  <div className="space-y-2">
                    {((project.caseStudy as any).architecture as string[]).map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/70 text-xs text-slate-300 leading-relaxed">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Core Features & Portals</span>
                  </h4>
                  <div className="space-y-2">
                    {((project.caseStudy as any).features as string[]).map((feat, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/70 text-xs text-slate-300 leading-relaxed">
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-3">
              {'liveLink' in project && project.liveLink && (
                <a
                  href={project.liveLink as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-bold tracking-wide transition-all shadow-md inline-flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live Application</span>
                </a>
              )}

              {'swaggerLink' in project && project.swaggerLink && (
                <a
                  href={project.swaggerLink as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 text-xs font-bold tracking-wide transition-all inline-flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Swagger API Docs</span>
                </a>
              )}

              <a
                href={('githubLink' in project && project.githubLink ? project.githubLink : project.link) as string}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold tracking-wide transition-all inline-flex items-center gap-2"
              >
                <Code2 className="w-4 h-4 text-slate-400" />
                <span>View Source Code</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
