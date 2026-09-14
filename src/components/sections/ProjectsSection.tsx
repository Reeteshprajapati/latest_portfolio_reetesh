import React, { useState } from 'react';
import { FadeIn } from '@/components/ui/FadeIn';
import { projects } from '@/lib/data';
import { CheckCircle2, Code2, Eye, Filter, ExternalLink, FileText } from 'lucide-react';
import { ProjectModal } from '@/components/modals/ProjectModal';

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const categories = ['All', 'React & Web3', 'Spring Boot & React', 'Full Stack Java', 'Backend Java'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="bg-[#030712] text-slate-100 px-6 md:px-10 py-20 md:py-28 relative border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeIn delay={0} y={15} className="mb-8">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-1.5">
            Software Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Featured Projects
          </h2>
        </FadeIn>

        {/* Filter Tabs */}
        <FadeIn delay={0.1} y={15} className="mb-10 flex flex-wrap items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-500 mr-2 hidden sm:inline" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-slate-950 font-bold shadow'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </FadeIn>

        {/* Projects List */}
        <div className="flex flex-col gap-10">
          {filteredProjects.map((project, idx) => (
            <FadeIn
              key={project.number}
              delay={idx * 0.1}
              y={15}
              className="p-6 sm:p-8 rounded-2xl bg-[#090D16] border border-slate-800 hover:border-slate-700 transition-all group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Text */}
                <div className="lg:col-span-7 flex flex-col items-start gap-3.5">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-bold text-slate-400">
                      {project.number}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {project.period}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {project.name}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-col gap-1.5 my-1">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-4 py-2 rounded-lg bg-white hover:bg-slate-200 text-slate-950 text-xs font-semibold tracking-wide transition-colors flex items-center gap-1.5 shadow"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </button>

                    {'liveLink' in project && project.liveLink && (
                      <a
                        href={project.liveLink as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-mono text-emerald-400 font-semibold transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}

                    {'swaggerLink' in project && project.swaggerLink && (
                      <a
                        href={project.swaggerLink as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-xs font-mono text-sky-400 font-semibold transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>API Docs</span>
                      </a>
                    )}

                    <a
                      href={('githubLink' in project && project.githubLink ? project.githubLink : project.link) as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-200 transition-colors"
                    >
                      <Code2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>

                {/* Right Image */}
                <div
                  onClick={() => setSelectedProject(project)}
                  className="lg:col-span-5 relative h-56 sm:h-72 w-full rounded-xl overflow-hidden border border-slate-800 cursor-pointer"
                >
                  <img
                    src={project.images.col2}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D16]/80 via-transparent to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/60 backdrop-blur-xs">
                    <span className="px-4 py-2 rounded-xl bg-white text-slate-950 font-semibold text-xs flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" /> Quick View
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
