import { useInView } from 'react-intersection-observer';

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F8FAFC]" aria-labelledby="contact-heading">
      <div className="section-container">
        <div
          ref={ref}
          className={`max-w-2xl mb-12 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-xs font-bold tracking-widest text-[#2563EB] uppercase mb-3">Contact</p>
          <h2
            id="contact-heading"
            className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-5 tracking-tight"
          >
            Let's work together.
          </h2>
          <p className="text-lg text-[#64748B] leading-relaxed">
            Have a project in mind or just want to say hi? Fill out the form below and I'll get back
            to you as soon as I can.
          </p>
        </div>

        <div
          className={`w-full transition-all duration-700 delay-100 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm bg-white">
            <iframe
              src="https://fruitask.com/form/853c0e671e43e1b1"
              width="100%"
              height="600"
              frameBorder="0"
              title="Contact form"
              style={{ border: 'none', display: 'block' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
