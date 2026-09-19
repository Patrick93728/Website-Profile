import { useInView } from 'react-intersection-observer';
import { FileDown } from 'lucide-react';

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="contact" className="py-20 md:py-32 relative z-10" aria-labelledby="contact-heading">
      <div className="section-container">
        <div
          ref={ref}
          className={`max-w-2xl mb-16 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-4">Contact</p>
          <h2
            id="contact-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 dark:text-zinc-50 mb-6 tracking-tight"
          >
            Let's work together.
          </h2>
          <p className="text-lg text-slate-500 dark:text-zinc-400 leading-relaxed font-light mb-8">
            Have a project in mind or just want to say hi? Fill out the form below and I'll get back
            to you as soon as I can.
          </p>
          <a
            href="https://fileko.fruitask.com/files/e91e802a-a7c2-4c30-b8ac-caaf9a7a1c1d"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-base hover:bg-slate-700 dark:hover:bg-zinc-200 transition-colors shadow-[0_4px_14px_rgba(0,0,0,0.1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950"
          >
            <FileDown size={18} aria-hidden="true" />
            Download Resume
          </a>
        </div>

        <div
          className={`w-full transition-all duration-700 delay-100 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="glass-panel rounded-[32px] overflow-hidden p-2 md:p-4">
            <div className="rounded-[24px] overflow-hidden bg-white">
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
      </div>
    </section>
  );
}
