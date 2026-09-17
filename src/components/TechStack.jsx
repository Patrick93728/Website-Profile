import { useInView } from 'react-intersection-observer';
import { techStack } from '../data/techStack';

export default function TechStack() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section id="tech" className="py-20 md:py-28 bg-white" aria-labelledby="tech-heading">
      <div className="section-container">
        <div
          ref={ref}
          className={`max-w-2xl mb-12 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-xs font-bold tracking-widest text-[#2563EB] uppercase mb-3">Tech Stack</p>
          <h2 id="tech-heading" className="text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-5">
            Tools I work with.
          </h2>
          <p className="text-lg text-[#64748B] leading-relaxed">
            A growing collection of languages, frameworks, and tools I use to deliver quality work.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {techStack.map((group, gi) => (
            <div
              key={group.group}
              className={`p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${gi * 80}ms` }}
            >
              <p className="text-xs font-bold text-[#64748B] uppercase tracking-widest mb-4">
                {group.group}
              </p>
              <ul className="flex flex-wrap gap-2" role="list" aria-label={group.group}>
                {group.items.map((item) => (
                  <li key={item.name} role="listitem">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-sm font-semibold text-[#475569] shadow-sm">
                      <span aria-hidden="true">{item.icon}</span>
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
