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
    <section id="about" className="py-20 md:py-28 bg-[#F8FAFC]" aria-labelledby="about-heading">
      <div className="section-container">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Photo */}
          <div className="flex justify-center lg:justify-start order-first lg:order-last">
            <div
              className={`relative transition-all duration-1000 delay-300 ${
                inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-sm">
                <img src="/profile.jpg" alt="Patrick Tomol" className="w-full h-full object-cover" />
              </div>
              {/* Accent decoration */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#EFF6FF] rounded-2xl -z-10 border border-[#DBEAFE]" aria-hidden="true" />
            </div>
          </div>

          {/* Text content */}
          <div
            className={`flex flex-col gap-6 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div>
              <p className="text-xs font-bold tracking-widest text-[#2563EB] uppercase mb-3">About Me</p>
              <h2 id="about-heading" className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-4">
                Hi, I'm Patrick
              </h2>
              <div className="space-y-3 text-[#64748B] leading-relaxed">
                <p>
                  A software developer helping businesses and individuals turn ideas into functional digital products. 
                  Whether you need a fresh application built from scratch or improvements to an existing system, 
                  I deliver practical, scalable solutions tailored to your goals.
                </p>
              </div>
            </div>

            <div>
              <p className="font-semibold text-[#0F172A] text-sm mb-3">How I Add Value:</p>
              <ul className="grid grid-cols-1 gap-3" aria-label="Professional skills">
                {skills.map((skill) => (
                  <li key={skill} className="flex items-start gap-2 text-sm text-[#475569]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-1.5 shrink-0" aria-hidden="true" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {siteConfig.resumeUrl && (
              <div>
                <a
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-sm font-semibold hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                >
                  <FileDown size={17} aria-hidden="true" />
                  Download Resume
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
