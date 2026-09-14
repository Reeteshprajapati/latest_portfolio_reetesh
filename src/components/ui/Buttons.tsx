export function ContactButton() {
  return (
    <button
      className="
        rounded-xl px-7 py-3
        text-xs sm:text-sm font-semibold tracking-wide
        text-slate-900 bg-white
        hover:bg-slate-200
        shadow-lg shadow-white/10
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-[#030712]
        flex items-center justify-center gap-2
      "
    >
      <span>Contact Me</span>
      <span className="text-slate-900 text-xs">→</span>
    </button>
  );
}

export function LiveProjectButton() {
  return (
    <button
      className="
        rounded-xl px-5 py-2.5
        text-xs font-semibold tracking-wide
        text-slate-200 bg-slate-900/90
        border border-slate-800 hover:border-slate-700 hover:text-white hover:bg-slate-800
        transition-all duration-200 shadow-sm
        focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-[#030712]
      "
    >
      View Code / Live
    </button>
  );
}
