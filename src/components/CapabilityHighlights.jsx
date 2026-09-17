import { useInView } from 'react-intersection-observer';
import { Code2, Palette, Plug, Wrench } from 'lucide-react';

const highlights = [
  {
    icon: Code2,
    label: 'Build',
    description: 'Websites, dashboards, and mobile applications from scratch.',
  },
  {
    icon: Palette,
    label: 'Design',
    description: 'Clear, intuitive user interfaces and experiences.',
  },
  {
    icon: Plug,
    label: 'Integrate',
    description: 'APIs, databases, and third-party services.',
  },
  {
    icon: Wrench,
    label: 'Improve',
    description: 'Bug fixes, maintenance, and continuous enhancements.',
  },
];

export default function CapabilityHighlights() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section ref={ref} className="py-12 bg-white border-y border-[#E2E8F0]" aria-label="Core capabilities">
      <div className="section-container">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-6" role="list">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <li
                key={item.label}
                role="listitem"
                className={`flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] transition-all duration-700 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center">
                  <Icon size={24} className="text-[#2563EB]" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-[#0F172A] mb-1">{item.label}</p>
                  <p className="text-sm text-[#64748B] leading-relaxed">{item.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
