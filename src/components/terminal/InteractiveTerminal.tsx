import React, { useState } from 'react';
import { Terminal, Copy, Check, Play, RefreshCw, FileCode, Cpu, Layers } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export function InteractiveTerminal() {
  const [activeTab, setActiveTab] = useState<'profile' | 'stack' | 'terminal'>('profile');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const { showToast } = useToast();

  const profileCode = `interface Developer {
  name: string;
  role: string;
  location: string;
  education: string;
  status: string;
}

const reetesh: Developer = {
  name: "Reetesh Prajapati",
  role: "Full-Stack Software Developer",
  location: "Indore, Madhya Pradesh, India",
  education: "B.Tech @ RGPV (CGPA: 8.0)",
  status: "SDE Intern @ VidyaGxp Pvt Ltd"
};`;

  const stackCode = `// Core Tech Stack Matrix
{
  "languages": ["Java", "Python", "JavaScript", "HTML", "CSS"],
  "frameworks": ["React.js", "Spring Boot", "Collections"],
  "databases": ["SQL", "MySQL"],
  "developerTools": ["VS Code", "IntelliJ IDEA", "Git", "GitHub"],
  "aiProductivity": ["Lovable AI", "Cursor AI", "Bolt AI"]
}`;

  const runCode = () => {
    setIsRunning(true);
    setTerminalOutput([
      '$ node reetesh_profile.js',
      '>> Initializing JVM & Spring Boot context...',
      '>> Connected to PostgreSQL & MySQL database [OK]',
      '>> React 19 Frontend & Vite Code-Splitting [OK]',
      '>> FastConnect WebRTC Mesh & AI Matchmaking engine online [OK]',
      '>> CampusGuard SOS Dispatch & Groq AI Triage online [OK]',
      '>> 200+ Cities OpenWeather API verified [OK]',
      '>> Employee Admin System: 5 CRUD routes active [OK]',
      '>> STATUS: Reetesh Prajapati ready for deployment! 🎉'
    ]);
    setTimeout(() => {
      setIsRunning(false);
      showToast('Live test suite executed successfully!');
    }, 1200);
  };

  const handleCopy = () => {
    const textToCopy = activeTab === 'profile' ? profileCode : stackCode;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    showToast('Code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl bg-[#090D16] border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs select-none">
      {/* Top Header Bar */}
      <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        {/* Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'profile'
                ? 'bg-slate-900 border border-slate-800 text-white font-semibold'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Profile.ts</span>
          </button>

          <button
            onClick={() => setActiveTab('stack')}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'stack'
                ? 'bg-slate-900 border border-slate-800 text-white font-semibold'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Stack.json</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('terminal');
              if (terminalOutput.length === 0) runCode();
            }}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'terminal'
                ? 'bg-slate-900 border border-slate-800 text-white font-semibold'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Live Output</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {activeTab !== 'terminal' && (
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Copy snippet"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          )}

          <button
            onClick={runCode}
            disabled={isRunning}
            className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-semibold flex items-center gap-1 transition-colors"
            title="Execute code test"
          >
            {isRunning ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">Run Test</span>
          </button>
        </div>
      </div>

      {/* Code Display Area */}
      <div className="p-5 leading-relaxed overflow-x-auto min-h-[260px] flex flex-col justify-between">
        {activeTab === 'profile' && (
          <pre className="text-slate-300">
            <code>
              <span className="text-sky-400">interface</span> <span className="text-slate-100">Developer</span> &#123;{'\n'}
              {'  '}<span className="text-slate-400">name:</span> <span className="text-emerald-400">string</span>;{'\n'}
              {'  '}<span className="text-slate-400">role:</span> <span className="text-emerald-400">string</span>;{'\n'}
              {'  '}<span className="text-slate-400">location:</span> <span className="text-emerald-400">string</span>;{'\n'}
              {'  '}<span className="text-slate-400">education:</span> <span className="text-emerald-400">string</span>;{'\n'}
              {'  '}<span className="text-slate-400">status:</span> <span className="text-emerald-400">string</span>;{'\n'}
              &#125;{'\n\n'}
              <span className="text-sky-400">const</span> <span className="text-amber-300">reetesh</span>: <span className="text-slate-100">Developer</span> = &#123;{'\n'}
              {'  '}<span className="text-slate-400">name:</span> <span className="text-amber-200">&quot;Reetesh Prajapati&quot;</span>,{'\n'}
              {'  '}<span className="text-slate-400">role:</span> <span className="text-amber-200">&quot;Full-Stack Software Developer&quot;</span>,{'\n'}
              {'  '}<span className="text-slate-400">location:</span> <span className="text-amber-200">&quot;Indore, Madhya Pradesh, India&quot;</span>,{'\n'}
              {'  '}<span className="text-slate-400">education:</span> <span className="text-amber-200">&quot;B.Tech @ RGPV (CGPA: 8.0)&quot;</span>,{'\n'}
              {'  '}<span className="text-slate-400">status:</span> <span className="text-amber-200">&quot;SDE Intern @ VidyaGxp Pvt Ltd&quot;</span>{'\n'}
              &#125;;
            </code>
          </pre>
        )}

        {activeTab === 'stack' && (
          <pre className="text-slate-300">
            <code>{stackCode}</code>
          </pre>
        )}

        {activeTab === 'terminal' && (
          <div className="space-y-1.5 text-slate-300">
            {terminalOutput.map((line, i) => (
              <div key={i} className={line.startsWith('$') ? 'text-sky-400 font-bold' : line.includes('🎉') ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                {line}
              </div>
            ))}
          </div>
        )}

        {/* Footer Stat Grid */}
        <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3 mt-4 font-sans select-text">
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-base font-bold text-white">8.0</span>
            <p className="text-[10px] text-slate-400 font-mono">B.Tech CGPA</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-base font-bold text-white">5+</span>
            <p className="text-[10px] text-slate-400 font-mono">Core Builds</p>
          </div>
        </div>
      </div>
    </div>
  );
}
