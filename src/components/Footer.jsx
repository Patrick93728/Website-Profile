import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { siteConfig } from '../data/siteConfig';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0F172A] text-[#94A3B8]" aria-label="Site footer">
      <div className="section-container py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand with photo */}
          <div className="flex items-center gap-3">
            <img
              src="/profile.jpg"
              alt="Patrick Tomol"
              className="w-10 h-10 rounded-full object-cover border border-[#1E293B]"
            />
            <div>
              <p className="font-bold text-white text-sm">Patrick Tomol</p>
              <p className="text-xs text-[#64748B] mt-0.5">Software Developer</p>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {siteConfig.github && (
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="w-9 h-9 rounded-lg border border-[#1E293B] flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#334155] transition-colors"
              >
                <FaGithub size={16} aria-hidden="true" />
              </a>
            )}
            {siteConfig.linkedin && (
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="w-9 h-9 rounded-lg border border-[#1E293B] flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#334155] transition-colors"
              >
                <FaLinkedin size={16} aria-hidden="true" />
              </a>
            )}
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Send an email"
              className="w-9 h-9 rounded-lg border border-[#1E293B] flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#334155] transition-colors"
            >
              <Mail size={16} aria-hidden="true" />
            </a>
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-center md:items-end gap-1">
            <p className="text-xs text-[#475569]">© {year} Patrick Tomol. All rights reserved.</p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xs text-[#64748B] hover:text-white transition-colors"
            >
              ↑ Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
