import { useInView } from 'react-intersection-observer';
import { ExternalLink, ImageOff, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useState, useEffect, useCallback } from 'react';
import { fetchProjectsFromFruitask } from '../services/fruitask';
import { projects as fallbackProjects } from '../data/projects';

// ── Lightbox Carousel ─────────────────────────────────────────────
function Lightbox({ images, startIndex, title, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next, onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Image gallery for ${title}`}
    >
      <div
        className="relative flex flex-col items-center max-w-5xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-14 right-0 text-white/50 hover:text-white transition-colors focus:outline-none"
          aria-label="Close gallery"
        >
          <X size={32} />
        </button>

        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl">
          <img
            key={current}
            src={images[current]}
            alt={`${title} – image ${current + 1} of ${images.length}`}
            className="w-full max-h-[75vh] object-contain animate-fadeIn rounded-2xl border border-white/10"
          />

          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors focus:outline-none border border-white/10"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors focus:outline-none border border-white/10"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex items-center gap-4 mt-6">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all focus:outline-none ${
                  i === current ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Project Card ──────────────────────────────────────────────────
function ProjectCard({ project, delay, onImageClick }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  const allImages = project.images && project.images.length > 0
    ? project.images
    : project.image ? [project.image] : [];
  const hasImages = allImages.length > 0;

  return (
    <div
      ref={ref}
      className={`h-full transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="glass-panel glass-panel-hover rounded-[28px] h-full overflow-hidden flex flex-col group/card">
        {/* Clickable image area */}
        <div
          className={`aspect-video bg-slate-100/50 dark:bg-white/5 flex items-center justify-center overflow-hidden relative group/img ${hasImages ? 'cursor-zoom-in' : ''}`}
          onClick={() => hasImages && onImageClick(allImages, project.title)}
          role={hasImages ? 'button' : undefined}
          tabIndex={hasImages ? 0 : undefined}
          aria-label={hasImages ? `View images for ${project.title}` : undefined}
          onKeyDown={(e) => { if (hasImages && (e.key === 'Enter' || e.key === ' ')) onImageClick(allImages, project.title); }}
        >
          {project.image || allImages[0] ? (
            <>
              <img
                src={project.image || allImages[0]}
                alt={`Screenshot of ${project.title}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-[1.03] opacity-95 group-hover/card:opacity-100"
                loading="lazy"
              />
              {hasImages && (
                <div className="absolute inset-0 bg-slate-900/0 group-hover/img:bg-slate-900/20 dark:group-hover/img:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 text-slate-800 dark:text-white text-sm font-semibold bg-white/90 dark:bg-white/20 border border-white dark:border-white/30 px-6 py-2.5 rounded-full shadow-lg dark:backdrop-blur-md translate-y-4 group-hover/img:translate-y-0">
                    {allImages.length > 1 ? `View ${allImages.length} images` : 'View image'}
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 text-slate-400 dark:text-white/30">
              <ImageOff size={36} aria-hidden="true" />
              <span className="text-xs font-semibold tracking-widest uppercase">Coming soon</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col gap-5 flex-1 border-t border-slate-200/50 dark:border-white/5">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-widest">{project.category}</span>
            {(project.role || project.status) && (
              <>
                <span className="text-slate-300 dark:text-white/20">·</span>
                <span className="text-xs font-bold uppercase tracking-wider border px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-100 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-200 shadow-sm dark:shadow-inner">
                  {project.role || project.status}
                </span>
              </>
            )}
          </div>

          <div>
            <h3 id={`project-title-${project.id}`} className="font-bold text-slate-800 dark:text-zinc-100 text-2xl mb-3">
              {project.title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed font-light">{project.summary}</p>
          </div>

          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white/60 dark:bg-white/5 border border-white dark:border-white/10 text-slate-500 dark:text-zinc-300 shadow-sm dark:shadow-none">
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-5 mt-auto pt-6 border-t border-slate-200/50 dark:border-white/5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                <ExternalLink size={16} aria-hidden="true" />
                Live Demo
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-zinc-100 transition-colors ml-auto"
              >
                <FaGithub size={16} aria-hidden="true" />
                Repository
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────────
export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const liveProjects = await fetchProjectsFromFruitask();
        setProjects(liveProjects && liveProjects.length > 0 ? liveProjects : fallbackProjects);
      } catch {
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const openLightbox = (images, title) => {
    if (images && images.length > 0) setLightbox({ images, title });
  };

  const closeLightbox = () => setLightbox(null);

  return (
    <>
      <section id="projects" className="py-20 md:py-32 relative z-10" aria-labelledby="projects-heading">
        <div className="section-container">
          <div
            ref={ref}
            className={`max-w-2xl mb-16 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-4">Work</p>
            <h2 id="projects-heading" className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 dark:text-zinc-50 mb-6 tracking-tight">
              My Projects.
            </h2>
            <p className="text-lg hidden text-slate-500 dark:text-zinc-400 leading-relaxed font-light">
              Selected projects demonstrating my approach to development, design, and problem-solving.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-400" />
              <span className="ml-4 text-slate-500 dark:text-zinc-400 font-medium tracking-wide">Loading projects from Fruitask...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  delay={i * 100}
                  onImageClick={openLightbox}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={0}
          title={lightbox.title}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}
