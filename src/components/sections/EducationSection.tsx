import { FadeIn } from '@/components/ui/FadeIn';
import { education, certifications } from '@/lib/data';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export function EducationSection() {
  return (
    <section id="education" className="bg-[#030712] text-slate-100 px-6 md:px-10 py-20 md:py-28 relative border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0} y={15} className="mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-1.5">
            Academic & Credentials
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Education & Certifications
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <FadeIn delay={0.1} y={15} className="flex items-center gap-2.5 mb-1">
              <div className="p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base text-white tracking-wide">
                Academic Background
              </h3>
            </FadeIn>

            {education.map((edu, idx) => (
              <FadeIn
                key={edu.institution}
                delay={idx * 0.1 + 0.1}
                y={15}
                className="p-6 rounded-2xl bg-[#090D16] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2.5">
                    <span className="px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono font-semibold">
                      {edu.score}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {edu.period}
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-white mb-1">
                    {edu.institution}
                  </h4>
                  <p className="text-xs font-semibold text-slate-400 mb-2">
                    {edu.degree}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {edu.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono pt-3 border-t border-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{edu.location}</span>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="lg:col-span-5 flex flex-col gap-5">
            <FadeIn delay={0.1} y={15} className="flex items-center gap-2.5 mb-1">
              <div className="p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base text-white tracking-wide">
                Certifications
              </h3>
            </FadeIn>

            <div className="flex flex-col gap-3">
              {certifications.map((cert, idx) => (
                <FadeIn
                  key={cert.name}
                  delay={idx * 0.08 + 0.2}
                  y={15}
                  className="p-4 rounded-xl bg-[#090D16] border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-white">
                        {cert.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {cert.provider}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                    Verified
                  </span>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
