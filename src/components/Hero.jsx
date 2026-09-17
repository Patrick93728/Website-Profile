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
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#F8FAFC]"
      aria-labelledby="hero-heading"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg, #0F172A 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10 py-24 md:py-32">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="text-xs font-bold tracking-widest text-[#64748B] uppercase mb-6">
            Digital Solutions&nbsp;&nbsp;·&nbsp;&nbsp;Development&nbsp;&nbsp;·&nbsp;&nbsp;Design
          </p>

          {/* Heading */}
          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0F172A] leading-[1.15] tracking-tight mb-6"
          >
            Build better digital experiences with{' '}
            <span className="text-[#2563EB]">practical software solutions.</span>
          </h1>

          {/* Supporting text */}
          <p className="text-lg md:text-xl text-[#64748B] leading-relaxed mb-10 max-w-2xl">
            {siteConfig.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#2563EB] text-white font-semibold text-base hover:bg-[#1D4ED8] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
            >
              Contact Us
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <button
              onClick={() => scrollTo('projects')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] font-semibold text-base hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
            >
              Explore My Work
            </button>
          </div>

          {/* Trust points */}
          <div className="flex flex-wrap gap-2" role="list" aria-label="Key capabilities">
            {trustPoints.map((point) => (
              <span
                key={point}
                role="listitem"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#E2E8F0] text-[#475569] shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" aria-hidden="true" />
                {point}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#94A3B8]">
        <span className="text-xs font-semibold tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" aria-hidden="true" />
      </div>
    </section>
  );
}
