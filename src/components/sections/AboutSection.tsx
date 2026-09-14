import { FadeIn } from '@/components/ui/FadeIn';
import { personalDetails } from '@/lib/data';
import { Award, Briefcase, GraduationCap, Code } from 'lucide-react';

export function AboutSection() {
  const highlights = [
    {
      icon: GraduationCap,
      title: 'B.Tech (CGPA: 8.0)',
      subtitle: 'Rajiv Gandhi Proudyogiki Vishwavidyalay (2022 - 2026)',
    },
    {
      icon: Briefcase,
      title: '3+ Internships',
      subtitle: 'VidyaGxp Pvt Ltd, UDM Techno Solution, Learning Education Hub',
    },
    {
      icon: Code,
      title: '3 Full-Stack Builds',
      subtitle: 'Weather App, Employee Admin System & Flight Reservation',
    },
    {
      icon: Award,
      title: 'Industry Certifications',
      subtitle: 'Java Standard Edition & TCS iON Career Edge Certified',
    },
  ];

  return (
    <section id="about" className="bg-[#030712] text-slate-100 px-6 md:px-10 py-20 md:py-28 relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        <FadeIn delay={0} y={15} className="mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-1.5">
            Overview
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-outfit">
            About Me
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <FadeIn delay={0.15} y={15} className="lg:col-span-7 flex">
            <div className="p-8 rounded-2xl bg-[#090D16] border border-slate-800 shadow-xl space-y-5 w-full flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-4 border-b border-slate-800/80">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-400 p-[2.5px] shadow-lg flex-shrink-0 relative overflow-hidden group">
                  <img
                    src="/avatar.jpg"
                    alt="Reetesh Prajapati"
                    className="w-full h-full rounded-[14px] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight font-outfit">
                    Reetesh Prajapati
                  </h3>
                  <p className="text-xs text-indigo-400 font-mono font-semibold mt-1">
                    Full-Stack Software Engineer &bull; Indore, India
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Specializing in Java, Spring Boot, React 19 & WebGL
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-base font-bold text-white tracking-tight font-outfit">
                  Career Objective & Professional Summary
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed font-sans">
                  {personalDetails.objective}
                </p>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
                  Adept at executing end-to-end web workflows, designing structured database schemas in <strong className="text-slate-200">MySQL</strong>, implementing clean REST APIs with <strong className="text-slate-200">Spring Boot</strong>, and developing modular front-end interfaces using <strong className="text-slate-200">React.js</strong>.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
                <span>📍 Based in Indore, MP</span>
                <span>🎓 B.Tech Candidate (2026)</span>
              </div>
            </div>
          </FadeIn>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <FadeIn
                  key={item.title}
                  delay={idx * 0.1 + 0.2}
                  y={15}
                  className="p-5 rounded-2xl bg-[#090D16] border border-slate-800 hover:border-slate-700 transition-all flex items-start gap-4"
                >
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-normal">
                      {item.subtitle}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
