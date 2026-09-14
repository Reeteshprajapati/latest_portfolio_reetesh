import { FadeIn } from '@/components/ui/FadeIn';
import { technicalSkills } from '@/lib/data';
import { Code, Cpu, Database, Wrench, Bot } from 'lucide-react';

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Languages",
      icon: Code,
      skills: technicalSkills.languages,
    },
    {
      title: "Frameworks & Libraries",
      icon: Cpu,
      skills: technicalSkills.frameworks,
    },
    {
      title: "Databases",
      icon: Database,
      skills: technicalSkills.databases,
    },
    {
      title: "Developer Tools",
      icon: Wrench,
      skills: technicalSkills.tools,
    },
    {
      title: "AI Tools",
      icon: Bot,
      skills: technicalSkills.aiTools,
    },
  ];

  return (
    <section id="skills" className="bg-[#030712] text-slate-100 px-6 md:px-10 py-20 md:py-28 relative border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0} y={15} className="mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-1.5">
            Technical Capabilities
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Skills & Stack
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <FadeIn
                key={cat.title}
                delay={idx * 0.08}
                y={15}
                className="p-6 rounded-2xl bg-[#090D16] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-white tracking-wide">
                      {cat.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
