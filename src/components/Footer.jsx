import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { siteConfig } from '../data/siteConfig';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 pt-10 pb-8" aria-label="Site footer">
      <div className="section-container">
        <div className="glass-panel rounded-[32px]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-10">
            {/* Brand with photo */}
            <div className="flex items-center gap-5">
              <img
                src="/profile.jpg"
                alt="Patrick Tomol"
                className="w-14 h-14 rounded-full object-cover border-2 border-white/40 dark:border-white/20 shadow-sm dark:shadow-lg"
              />
              <div>
                <p className="font-bold text-slate-800 dark:text-zinc-100 text-lg tracking-wide">Patrick Tomol</p>
                <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">Software Developer</p>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {siteConfig.github && (
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="w-12 h-12 rounded-2xl bg-white/60 dark:bg-white/5 border border-white dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-white hover:bg-white/90 dark:hover:bg-white/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 shadow-sm dark:shadow-none"
                >
                  <FaGithub size={20} aria-hidden="true" />
                </a>
              )}
              {siteConfig.linkedin && (
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="w-12 h-12 rounded-2xl bg-white/60 dark:bg-white/5 border border-white dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-white hover:bg-white/90 dark:hover:bg-white/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 shadow-sm dark:shadow-none"
                >
                  <FaLinkedin size={20} aria-hidden="true" />
                </a>
              )}
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Send an email"
                className="w-12 h-12 rounded-2xl bg-white/60 dark:bg-white/5 border border-white dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-white hover:bg-white/90 dark:hover:bg-white/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 shadow-sm dark:shadow-none"
              >
                <Mail size={20} aria-hidden="true" />
              </a>
            </div>

            {/* Copyright */}
            <div className="flex flex-col items-center md:items-end gap-2">
              <p className="text-sm text-slate-500 dark:text-zinc-500">© {year} Patrick Tomol. All rights reserved.</p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-sm font-medium text-slate-400 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-zinc-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 rounded px-2"
              >
                ↑ Back to top
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
