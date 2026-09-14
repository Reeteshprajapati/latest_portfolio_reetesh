import { FadeIn } from '@/components/ui/FadeIn';
import { experiences } from '@/lib/data';
import { Calendar, MapPin } from 'lucide-react';

export function ExperienceSection() {
  return (
    <section id="experience" className="bg-[#030712] text-slate-100 px-6 md:px-10 py-20 md:py-28 relative border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0} y={15} className="mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-1.5">
            Work History
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Professional Experience
          </h2>
        </FadeIn>

        <div className="flex flex-col gap-6">
          {experiences.map((exp, idx) => (
            <FadeIn
              key={exp.company}
              delay={idx * 0.1}
              y={15}
              className="p-6 sm:p-8 rounded-2xl bg-[#090D16] border border-slate-800 hover:border-slate-700 transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5 border-b border-slate-800/80 pb-5">
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[11px] font-bold">
                      0{idx + 1}
                    </span>
                    <h3 className="font-bold text-lg sm:text-xl text-white">
                      {exp.role}
                    </h3>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-400">
                    {exp.company}
                  </h4>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-950 border border-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-950 border border-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{exp.type}</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-2.5 mb-5">
                {exp.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-2 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/60">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-950 border border-slate-800 text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
