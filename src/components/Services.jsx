import { useInView } from 'react-intersection-observer';
import { Check } from 'lucide-react';
import { services } from '../data/services';

function ServiceCard({ service, delay }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const Icon = service.icon;

  return (
    <div
      ref={ref}
      className={`h-full transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="glass-panel glass-panel-hover rounded-[28px] h-full overflow-hidden">
        <article
          className="flex flex-col gap-5 p-8 h-full"
          aria-labelledby={`service-title-${service.id}`}
        >
          <div className="w-14 h-14 rounded-2xl bg-white/80 dark:bg-white/5 border border-white dark:border-white/10 flex items-center justify-center shrink-0 shadow-sm dark:shadow-none">
            <Icon size={26} className="text-slate-500 dark:text-slate-400" aria-hidden="true" />
          </div>
          <div>
            <h3 id={`service-title-${service.id}`} className="font-bold text-slate-800 dark:text-zinc-100 text-xl mb-3">
              {service.title}
            </h3>
            <p className="text-sm hidden text-slate-500 dark:text-zinc-400 leading-relaxed font-light">{service.description}</p>
          </div>
          <ul className="flex flex-col gap-3 dark:border-white/5">
            {service.deliverables.slice(0, 5).map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-600 dark:text-zinc-300">
                <Check size={18} className="text-emerald-500 dark:text-emerald-400 mt-0.5 shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
            {service.deliverables.length > 5 && (
              <li className="text-xs text-slate-400 dark:text-zinc-500 font-medium pl-7 mt-1">+{service.deliverables.length - 5} more</li>
            )}
          </ul>
        </article>
      </div>
    </div>
  );
}

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="services" className="py-20 md:py-32 relative z-10" aria-labelledby="services-heading">
      <div className="section-container">
        <div
          ref={ref}
          className={`max-w-2xl mb-16 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-4">Services</p>
          <h2 id="services-heading" className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 dark:text-zinc-50 mb-6 tracking-tight">
            What I can help you build.
          </h2>
          <p className="text-lg text-slate-500 dark:text-zinc-400 leading-relaxed font-light">
            From initial ideas to working products — practical development and design services
            tailored to your project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} delay={i * 70} />
          ))}
        </div>
      </div>
    </section>
  );
}
