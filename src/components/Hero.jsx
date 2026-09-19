import { ArrowRight, ChevronDown } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

const trustPoints = [
  'Responsive Web Experiences',
  'Mobile App Development',
  'User-Centered UI/UX',
  'API & Database Integration',
];

export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="section-container relative z-10 py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-slate-400 dark:text-zinc-500 uppercase mb-6">
            Digital Solutions&nbsp;&nbsp;·&nbsp;&nbsp;Development&nbsp;&nbsp;·&nbsp;&nbsp;Design
          </p>

          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-zinc-50 leading-[1.08] tracking-tight mb-6"
          >
            You know your business.{' '}
            <span className="text-slate-600 dark:text-zinc-300">
              I know the code. Let's build something real.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 dark:text-zinc-400 leading-relaxed mb-10 max-w-2xl font-light">
            {siteConfig.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 relative z-20">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-base hover:bg-slate-700 dark:hover:bg-zinc-200 transition-colors shadow-[0_4px_14px_rgba(0,0,0,0.1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950"
            >
              Contact Me
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            
            <button
              onClick={() => scrollTo('projects')}
              className="glass-panel hover:bg-white/80 dark:hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-slate-700 dark:text-zinc-100 font-semibold text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950"
            >
              View My Work
            </button>
          </div>

          <div className="flex flex-wrap gap-3" role="list" aria-label="Key capabilities">
            {trustPoints.map((point) => (
              <span
                key={point}
                role="listitem"
                className="glass-panel inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-slate-500 dark:text-zinc-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-zinc-500" aria-hidden="true" />
                {point}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-300 dark:text-zinc-600">
        <span className="text-xs font-semibold tracking-widest uppercase">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" aria-hidden="true" />
      </div>
    </section>
  );
}
