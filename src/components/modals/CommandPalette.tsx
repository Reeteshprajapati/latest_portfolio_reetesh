import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight, Mail, Phone, Globe, Code2, FileText, Code, User, Briefcase, GraduationCap } from 'lucide-react';
import { personalDetails } from '@/lib/data';
import { useToast } from '@/components/ui/Toast';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export function CommandPalette({ isOpen, onClose, onOpenResume }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or trigger
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'about',
      title: 'Go to About Me',
      category: 'Navigation',
      icon: User,
      perform: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'experience',
      title: 'Go to Experience',
      category: 'Navigation',
      icon: Briefcase,
      perform: () => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'skills',
      title: 'Go to Skills & Tech Stack',
      category: 'Navigation',
      icon: Code,
      perform: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'projects',
      title: 'Go to Projects',
      category: 'Navigation',
      icon: Code,
      perform: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'education',
      title: 'Go to Education & Certifications',
      category: 'Navigation',
      icon: GraduationCap,
      perform: () => {
        document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'resume',
      title: 'View Resume PDF',
      category: 'Actions',
      icon: FileText,
      perform: () => {
        onOpenResume();
        onClose();
      },
    },
    {
      id: 'copy-email',
      title: `Copy Email: ${personalDetails.email}`,
      category: 'Contact',
      icon: Mail,
      perform: () => {
        navigator.clipboard.writeText(personalDetails.email);
        showToast('Email address copied to clipboard!');
        onClose();
      },
    },
    {
      id: 'copy-phone',
      title: `Copy Phone: ${personalDetails.phone}`,
      category: 'Contact',
      icon: Phone,
      perform: () => {
        navigator.clipboard.writeText(personalDetails.phone);
        showToast('Phone number copied to clipboard!');
        onClose();
      },
    },
    {
      id: 'github',
      title: 'Open GitHub Profile',
      category: 'Social',
      icon: Code2,
      perform: () => {
        window.open(personalDetails.github, '_blank');
        onClose();
      },
    },
    {
      id: 'linkedin',
      title: 'Open LinkedIn Profile',
      category: 'Social',
      icon: Globe,
      perform: () => {
        window.open(personalDetails.linkedin, '_blank');
        onClose();
      },
    },
  ];

  const filtered = actions.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="w-full max-w-xl rounded-2xl bg-[#090D16] border border-slate-800 shadow-2xl overflow-hidden"
        >
          {/* Search Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-slate-950/50">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans"
              autoFocus
            />
            <span className="text-[10px] font-mono text-slate-500 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
              ESC
            </span>
          </div>

          {/* Command List */}
          <div className="max-h-80 overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 font-mono">
                No matching commands found.
              </div>
            ) : (
              filtered.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.perform}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-900/80 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-200 group-hover:text-white">
                          {item.title}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500">
                          {item.category}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-300 transition-colors" />
                  </button>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>Press <kbd className="px-1 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">↑</kbd> <kbd className="px-1 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">↓</kbd> to navigate</span>
            <span>Reetesh Prajapati Portfolio</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
