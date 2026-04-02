import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'

export default function ProjectCard({ project, index }) {
  const isReversed = index % 2 !== 0
  const { category, title, description, year, role, client, liveDemo, github, viewProject } = project

  return (
    <article className="border-t border-surface py-10 md:py-14">
      <div
        className={`flex flex-col gap-8 md:gap-12 ${
          isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
        }`}
      >

        {/* Screenshot — top on mobile (always), left/right on desktop (alternating) */}
        <div className="w-full md:w-2/5 flex-shrink-0">
          {category && (
            <p className="text-muted text-xs uppercase tracking-widest mb-3">
              {category}
            </p>
          )}
          {/* Placeholder: swap src prop for actual screenshot once available */}
          <div className="bg-surface rounded-xl aspect-[4/3] flex items-center justify-center">
            <span className="text-muted text-xs tracking-wide uppercase">
              Project screenshot
            </span>
          </div>
        </div>

        {/* Text content */}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-foreground font-bold text-xl md:text-2xl leading-snug mb-4">
            {title}
          </h3>

          <p className="text-muted text-sm leading-relaxed mb-8 max-w-md">
            {description}
          </p>

          {/* Project info table */}
          <div className="mb-8">
            <p className="text-muted text-xs uppercase tracking-widest mb-3">
              Project Info
            </p>
            <div className="divide-y divide-surface">
              {client && (
                <div className="flex py-2">
                  <span className="text-muted text-xs w-24 flex-shrink-0">Client</span>
                  <span className="text-foreground text-xs">{client}</span>
                </div>
              )}
              <div className="flex py-2">
                <span className="text-muted text-xs w-24 flex-shrink-0">Year</span>
                <span className="text-foreground text-xs">{year}</span>
              </div>
              <div className="flex py-2">
                <span className="text-muted text-xs w-24 flex-shrink-0">Role</span>
                <span className="text-foreground text-xs">{role}</span>
              </div>
            </div>
          </div>

          {/* Action links */}
          <div className="flex items-center gap-6 flex-wrap">
            {liveDemo && (
              <a
                href={liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-foreground text-xs uppercase tracking-widest border-b border-transparent hover:text-primary hover:border-primary transition-colors pb-0.5"
              >
                Live Demo <ExternalLink size={11} />
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-foreground text-xs uppercase tracking-widest border-b border-transparent hover:text-primary hover:border-primary transition-colors pb-0.5"
              >
                See on GitHub <Github size={11} />
              </a>
            )}
            {viewProject && (
              <a
                href={viewProject}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-foreground text-xs uppercase tracking-widest border-b border-transparent hover:text-primary hover:border-primary transition-colors pb-0.5"
              >
                View Project <ArrowUpRight size={11} />
              </a>
            )}
          </div>
        </div>

      </div>
    </article>
  )
}
