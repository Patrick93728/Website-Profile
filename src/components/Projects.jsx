import { useInView } from 'react-intersection-observer';
import { ExternalLink, ImageOff, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useState, useEffect, useCallback } from 'react';
import { fetchProjectsFromFruitask } from '../services/fruitask';
import { projects as fallbackProjects } from '../data/projects';

const statusColors = {
  Completed: 'bg-green-50 text-green-700 border-green-200',
  'In Progress': 'bg-amber-50 text-amber-700 border-amber-200',
};

// ── Lightbox Carousel ─────────────────────────────────────────────
function Lightbox({ images, startIndex, title, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next, onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Image gallery for ${title}`}
    >
      {/* Panel — stop clicks propagating to backdrop */}
      <div
        className="relative flex flex-col items-center max-w-4xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors focus:outline-none"
          aria-label="Close gallery"
        >
          <X size={28} />
        </button>

        {/* Main image */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-[#0F172A] shadow-2xl">
          <img
            key={current}
            src={images[current]}
            alt={`${title} – image ${current + 1} of ${images.length}`}
            className="w-full max-h-[70vh] object-contain animate-fadeIn"
          />

          {/* Prev / Next arrows (only when more than 1 image) */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-colors focus:outline-none"
                aria-label="Previous image"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-colors focus:outline-none"
                aria-label="Next image"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
        </div>

        {/* Dot indicators + counter */}
        {images.length > 1 && (
          <div className="flex items-center gap-3 mt-4">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all focus:outline-none ${
                  i === current ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}

        <p className="text-white/50 text-xs mt-2">
          {current + 1} / {images.length}
        </p>
      </div>
    </div>
  );
}

// ── Project Card ──────────────────────────────────────────────────
function ProjectCard({ project, delay, onImageClick }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  // clickable if there's at least one image — either from the images array or the single image field
  const allImages = project.images && project.images.length > 0
    ? project.images
    : project.image ? [project.image] : [];
  const hasImages = allImages.length > 0;

  return (
    <article
      ref={ref}
      className={`flex flex-col rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden hover:shadow-md hover:border-[#CBD5E1] h-full transition-all duration-300 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms, box-shadow 0.3s, border-color 0.3s`,
      }}
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Clickable image area */}
      <div
        className={`aspect-video bg-[#F1F5F9] flex items-center justify-center overflow-hidden relative group ${hasImages ? 'cursor-zoom-in' : ''}`}
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
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Hover overlay */}
            {hasImages && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-semibold bg-black/60 px-4 py-2 rounded-full backdrop-blur-sm">
                  {allImages.length > 1 ? `View ${allImages.length} images` : 'View image'}
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-[#CBD5E1]">
            <ImageOff size={32} aria-hidden="true" />
            <span className="text-xs font-semibold tracking-widest uppercase">Coming soon</span>
          </div>
        )}
      </div>


      {/* Content */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">{project.category}</span>
          {(project.role || project.status) && (
            <>
              <span className="text-[#E2E8F0]">·</span>
              <span className="text-xs font-bold uppercase tracking-wider border px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border-blue-200">
                {project.role || project.status}
              </span>
            </>
          )}
        </div>

        <div>
          <h3 id={`project-title-${project.id}`} className="font-bold text-[#0F172A] text-xl mb-2">
            {project.title}
          </h3>
          <p className="text-sm text-[#64748B] leading-relaxed">{project.summary}</p>
        </div>

        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span key={tech} className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F1F5F9] text-[#475569]">
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-4 mt-auto pt-4 border-t border-[#F1F5F9]">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
            >
              <ExternalLink size={15} aria-hidden="true" />
              Live Demo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors ml-auto"
            >
              <FaGithub size={15} aria-hidden="true" />
              Repo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// ── Main Section ──────────────────────────────────────────────────
export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null); // { images, title }

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
      <section id="projects" className="py-20 md:py-28 bg-white" aria-labelledby="projects-heading">
        <div className="section-container">
          <div
            ref={ref}
            className={`max-w-2xl mb-12 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-xs font-bold tracking-widest text-[#2563EB] uppercase mb-3">Work</p>
            <h2 id="projects-heading" className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-5 tracking-tight">
              From ideas to working solutions.
            </h2>
            <p className="text-lg text-[#64748B] leading-relaxed">
              Selected projects demonstrating my approach to development, design, and problem-solving.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2563EB]" />
              <span className="ml-3 text-[#64748B]">Loading projects...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

      {/* Lightbox Portal */}
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
