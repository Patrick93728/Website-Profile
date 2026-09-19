import { useInView } from 'react-intersection-observer';
import { FileDown } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

const skills = [
  'Crafting user-centric web and mobile interfaces',
  'Connecting frontend applications to backend APIs and databases',
  'Improving app performance, SEO, and overall usability',
  'Debugging, maintaining, and scaling existing software',
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section id="about" className="py-20 md:py-32 relative z-10" aria-labelledby="about-heading">
      <div className="section-container">
        <div className="glass-panel rounded-[32px] overflow-hidden">
          <div
            ref={ref}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 md:p-14 lg:p-20"
          >
            {/* Photo */}
            <div className="flex justify-center lg:justify-start order-first lg:order-last">
              <div
                className={`relative transition-all duration-1000 delay-300 ${
                  inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                <div className="w-64 h-64 md:w-[22rem] md:h-[22rem] rounded-full overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.15)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/40 dark:border-white/10 relative z-10">
                  <img src="/profile.jpg" alt="Patrick Tomol" className="w-full h-full object-cover" />
                </div>
                {/* Accent decoration */}
                <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-slate-200/50 dark:bg-slate-200/50 rounded-full blur-2xl -z-10" aria-hidden="true" />
              </div>
            </div>

            {/* Text content */}
            <div
              className={`flex flex-col gap-8 transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div>
                <p className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-4">About Me</p>
                <h2 id="about-heading" className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 dark:text-zinc-50 tracking-tight mb-6">
                  Hi, I'm Patrick
                </h2>
                <div className="space-y-4 text-slate-500 dark:text-zinc-400 leading-relaxed text-lg font-light">
                  <p>
                    A software developer helping businesses and individuals turn ideas into functional digital products. 
                    Whether you need a fresh application built from scratch or improvements to an existing system, 
                    I deliver practical, scalable solutions tailored to your goals.
                  </p>
                </div>
              </div>

              <div className="bg-white/40 dark:bg-white/[0.02] rounded-2xl p-7 border border-white dark:border-white/5 shadow-sm dark:shadow-inner">
                <p className="font-bold text-slate-800 dark:text-zinc-200 text-base mb-5">How I Add Value:</p>
                <ul className="grid grid-cols-1 gap-4" aria-label="Professional skills">
                  {skills.map((skill) => (
                    <li key={skill} className="flex items-start gap-3 text-sm md:text-base text-slate-600 dark:text-zinc-300 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-800 dark:bg-sky-400 mt-2 shrink-0 shadow-none" aria-hidden="true" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {siteConfig.resumeUrl && (
                <div className="pt-2">
                  <a
                    href={siteConfig.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/80 dark:bg-white/5 border border-white dark:border-white/10 text-slate-700 dark:text-zinc-100 text-base font-semibold hover:bg-white dark:hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 shadow-sm dark:shadow-lg"
                  >
                    <FileDown size={18} aria-hidden="true" />
                    Download Resume
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
