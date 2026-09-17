import { useInView } from 'react-intersection-observer';
import { Check } from 'lucide-react';
import { services } from '../data/services';

function ServiceCard({ service, delay }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const Icon = service.icon;

  return (
    <article
      ref={ref}
      className={`flex flex-col gap-5 p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:shadow-md hover:border-[#CBD5E1] transition-all duration-300 h-full ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms`, transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms, box-shadow 0.3s, border-color 0.3s` }}
      aria-labelledby={`service-title-${service.id}`}
    >
      <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] flex items-center justify-center shrink-0">
        <Icon size={22} className="text-[#2563EB]" aria-hidden="true" />
      </div>
      <div>
        <h3 id={`service-title-${service.id}`} className="font-bold text-[#0F172A] text-lg mb-2">
          {service.title}
        </h3>
        <p className="text-sm text-[#64748B] leading-relaxed">{service.description}</p>
      </div>
      <ul className="flex flex-col gap-1.5 mt-auto pt-4 border-t border-[#F1F5F9]">
        {service.deliverables.slice(0, 5).map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-[#475569]">
            <Check size={14} className="text-[#16A34A] mt-0.5 shrink-0" aria-hidden="true" />
            {item}
          </li>
        ))}
        {service.deliverables.length > 5 && (
          <li className="text-xs text-[#94A3B8] pl-5">+{service.deliverables.length - 5} more</li>
        )}
      </ul>
    </article>
  );
}

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="services" className="py-20 md:py-28 bg-[#F8FAFC]" aria-labelledby="services-heading">
      <div className="section-container">
        <div
          ref={ref}
          className={`max-w-2xl mb-12 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-xs font-bold tracking-widest text-[#2563EB] uppercase mb-3">Services</p>
          <h2 id="services-heading" className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-5 tracking-tight">
            What I can help you build.
          </h2>
          <p className="text-lg text-[#64748B] leading-relaxed">
            From initial ideas to working products — practical development and design services
            tailored to your project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} delay={i * 70} />
          ))}
        </div>
      </div>
    </section>
  );
}
