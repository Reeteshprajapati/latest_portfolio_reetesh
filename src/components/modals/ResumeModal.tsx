import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, Mail, Phone, MapPin, Briefcase, GraduationCap, Code } from 'lucide-react';
import { personalDetails, education, experiences, technicalSkills, projects, certifications } from '@/lib/data';
import { useToast } from '@/components/ui/Toast';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadText = () => {
    const textContent = `
==================================================
${personalDetails.name}
${personalDetails.title} | ${personalDetails.location}
Phone: ${personalDetails.phone} | Email: ${personalDetails.email}
GitHub: ${personalDetails.github} | LinkedIn: ${personalDetails.linkedin}
==================================================

OBJECTIVE
${personalDetails.objective}

EDUCATION
${education.map(e => `- ${e.institution} | ${e.degree} (${e.score}) [${e.period}]`).join('\n')}

TECHNICAL SKILLS
- Languages: ${technicalSkills.languages.join(', ')}
- Frameworks: ${technicalSkills.frameworks.join(', ')}
- Databases: ${technicalSkills.databases.join(', ')}
- Tools: ${technicalSkills.tools.join(', ')}

EXPERIENCE
${experiences.map(e => `
* ${e.role} @ ${e.company} (${e.period})
  ${e.points.map(p => `  - ${p}`).join('\n')}
`).join('\n')}

PROJECTS
${projects.map(p => `
* ${p.name} (${p.category} | ${p.period})
  - ${p.description}
  - Tech: ${p.tech.join(', ')}
`).join('\n')}

CERTIFICATIONS
${certifications.map(c => `- ${c.name} (${c.provider})`).join('\n')}
`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Reetesh_Prajapati_Resume.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Resume downloaded!');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-4xl max-h-[90vh] bg-[#090D16] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto"
        >
          {/* Header Action Bar */}
          <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
                Resume Overview & Download
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadText}
                className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-200 flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>Download TXT</span>
              </button>
              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-200 flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-slate-400" />
                <span>Print</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Resume Printable Sheet */}
          <div className="p-6 sm:p-10 overflow-y-auto font-sans space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
            {/* Header section */}
            <div className="border-b border-slate-800 pb-6 text-center space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                {personalDetails.name}
              </h1>
              <p className="text-sm font-semibold text-slate-400">
                {personalDetails.title} &bull; {personalDetails.subtitle}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {personalDetails.location}</span>
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {personalDetails.email}</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {personalDetails.phone}</span>
              </div>
            </div>

            {/* Objective */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold border-b border-slate-800/80 pb-1">
                Objective
              </h2>
              <p className="text-slate-300">{personalDetails.objective}</p>
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold border-b border-slate-800/80 pb-1">
                Technical Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                <div><strong className="text-slate-200">Languages:</strong> {technicalSkills.languages.join(', ')}</div>
                <div><strong className="text-slate-200">Frameworks:</strong> {technicalSkills.frameworks.join(', ')}</div>
                <div><strong className="text-slate-200">Databases:</strong> {technicalSkills.databases.join(', ')}</div>
                <div><strong className="text-slate-200">Tools:</strong> {technicalSkills.tools.join(', ')}</div>
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold border-b border-slate-800/80 pb-1">
                Work Experience
              </h2>
              {experiences.map((exp) => (
                <div key={exp.company} className="space-y-1.5">
                  <div className="flex justify-between items-start font-semibold text-slate-200">
                    <div>{exp.role} — <span className="text-slate-400">{exp.company}</span></div>
                    <span className="text-[11px] font-mono text-slate-500">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-400 text-xs pl-2">
                    {exp.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Projects */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold border-b border-slate-800/80 pb-1">
                Key Projects
              </h2>
              {projects.map((p) => (
                <div key={p.name} className="space-y-1">
                  <div className="flex justify-between items-start font-semibold text-slate-200">
                    <div>{p.name} <span className="text-xs font-mono text-slate-500">({p.tech.join(', ')})</span></div>
                    <span className="text-[11px] font-mono text-slate-500">{p.period}</span>
                  </div>
                  <p className="text-slate-400 text-xs">{p.description}</p>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold border-b border-slate-800/80 pb-1">
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.institution} className="flex justify-between items-start text-xs">
                  <div>
                    <div className="font-semibold text-slate-200">{edu.institution}</div>
                    <div className="text-slate-400">{edu.degree} &bull; <span className="text-slate-300 font-mono font-bold">{edu.score}</span></div>
                  </div>
                  <span className="font-mono text-slate-500 text-[11px]">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
