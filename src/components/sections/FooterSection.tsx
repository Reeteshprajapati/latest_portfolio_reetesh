import { FadeIn } from '@/components/ui/FadeIn';
import { personalDetails } from '@/lib/data';
import { Mail, Phone, MapPin, Globe, Code2 } from 'lucide-react';

const navLinks = ['About', 'Experience', 'Skills', 'Projects', 'Education', 'Contact'];

export function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#030712] text-slate-100 px-6 md:px-10 pt-16 md:pt-24 pb-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0} y={15}>
          <div className="border border-slate-800 rounded-2xl p-8 sm:p-10 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8 bg-[#090D16] shadow-xl">
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
                Get In Touch
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Let&apos;s Work Together
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xl leading-relaxed">
                Open for Full-Stack, Java & React.js Software Engineering opportunities, freelance projects, and technical roles.
              </p>

              <div className="flex flex-wrap gap-2.5 mt-2">
                <a
                  href={`mailto:${personalDetails.email}`}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono hover:border-slate-700 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {personalDetails.email}
                </a>
                <a
                  href={`tel:${personalDetails.phone}`}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono hover:border-slate-700 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {personalDetails.phone}
                </a>
              </div>
            </div>

            <div className="flex-shrink-0">
              <a
                href={`mailto:${personalDetails.email}`}
                className="px-6 py-3 rounded-xl bg-white hover:bg-slate-200 text-slate-950 text-xs font-semibold tracking-wide transition-all shadow-md inline-block"
              >
                Send Email
              </a>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} y={15}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-14 py-8 border-t border-slate-800/80 text-xs">
            <div className="flex flex-col gap-2.5">
              <p className="font-bold tracking-tight text-white font-mono">
                {personalDetails.name}
              </p>
              <p className="text-slate-400 leading-relaxed">
                Full-Stack Developer skilled in Java, Spring Boot & React.js.
              </p>
              <div className="flex items-center gap-1.5 text-slate-500 font-mono">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{personalDetails.location}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <p className="font-mono text-slate-400 font-semibold uppercase tracking-wider">
                Navigation
              </p>
              <nav className="flex flex-col gap-1.5">
                {navLinks.map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-2.5">
              <p className="font-mono text-slate-400 font-semibold uppercase tracking-wider">
                Core Stack
              </p>
              <div className="flex flex-col gap-1.5 text-slate-400 font-mono">
                <span>Java & Spring Boot</span>
                <span>React.js & Single Page Apps</span>
                <span>MySQL & REST APIs</span>
                <span>Git & GitHub</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <p className="font-mono text-slate-400 font-semibold uppercase tracking-wider">
                Connect
              </p>
              <div className="flex flex-col gap-2 font-mono">
                <a
                  href={personalDetails.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  LinkedIn Profile
                </a>
                <a
                  href={personalDetails.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5 text-slate-400" />
                  GitHub Repositories
                </a>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15} y={10}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800/80 text-xs font-mono text-slate-500">
            <p>&copy; {new Date().getFullYear()} {personalDetails.name}. All rights reserved.</p>
            <button
              onClick={scrollToTop}
              className="px-3.5 py-1 rounded-md border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors text-[11px]"
            >
              Back to Top ↑
            </button>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
