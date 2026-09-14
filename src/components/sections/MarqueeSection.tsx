import { motion } from 'framer-motion';

const techBadges = [
  { name: 'Java', role: 'Core & OOP' },
  { name: 'Spring Boot', role: 'REST APIs' },
  { name: 'React.js', role: 'Frontend UI' },
  { name: 'MySQL', role: 'Database' },
  { name: 'JavaScript', role: 'ES6+ Logic' },
  { name: 'TailwindCSS', role: 'Styling' },
  { name: 'Java Servlets', role: 'Backend Processing' },
  { name: 'Git & GitHub', role: 'Version Control' },
  { name: 'Gson', role: 'JSON Parsing' },
  { name: 'IntelliJ IDEA', role: 'Java IDE' },
  { name: 'VS Code', role: 'Web Development' },
];

export function MarqueeSection() {
  const doubled = [...techBadges, ...techBadges];

  return (
    <section className="bg-[#030712] py-8 border-y border-slate-800/80 overflow-hidden relative">
      <div className="flex overflow-hidden select-none">
        <motion.div
          className="flex gap-3 min-w-full flex-shrink-0"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 35,
            repeat: Infinity,
          }}
        >
          {doubled.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex-shrink-0 hover:border-slate-700 transition-colors"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              <div>
                <div className="text-xs font-semibold text-slate-200">
                  {item.name}
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  {item.role}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
