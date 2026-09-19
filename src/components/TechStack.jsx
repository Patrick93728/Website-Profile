import { useInView } from 'react-intersection-observer';
import { techStack } from '../data/techStack';

export default function TechStack() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section id="tech" className="py-20 md:py-32 relative z-10" aria-labelledby="tech-heading">
      <div className="section-container">
        <div
          ref={ref}
          className={`max-w-2xl mb-16 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-4">Tech Stack</p>
          <h2 id="tech-heading" className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 dark:text-zinc-50 tracking-tight mb-6">
            Tools I work with.
          </h2>
          <p className="text-lg text-slate-500 dark:text-zinc-400 leading-relaxed font-light">
            A growing collection of languages, frameworks, and tools I use to deliver quality work.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {techStack.map((group, gi) => (
            <div
              key={group.group}
              className={`transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${gi * 100}ms` }}
            >
              <div className="glass-panel rounded-[28px]">
                <div className="p-8 md:p-10">
                  <p className="text-sm font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
                    {group.group}
                  </p>
                  <ul className="flex flex-wrap gap-3" role="list" aria-label={group.group}>
                    {group.items.map((item) => (
                      <li key={item.name} role="listitem">
                        <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/60 dark:bg-white/5 border border-white dark:border-white/10 text-sm font-medium text-slate-600 dark:text-zinc-300 shadow-sm hover:bg-white/90 dark:hover:bg-white/10 hover:text-slate-800 dark:hover:text-white transition-colors">
                          <span className="text-slate-500 dark:text-slate-400" aria-hidden="true">{item.icon}</span>
                          {item.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
