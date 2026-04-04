import { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard.jsx'
import { supabase } from '../lib/supabase'

export default function FeaturedProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('works')
        .select('*')
        .order('creado_en', { ascending: true })

      if (error) {
        console.error('Error fetching projects:', error)
      } else {
        // Normalize DB column names to what ProjectCard expects
        setProjects(
          data.map((p) => ({
            ...p,
            liveDemo: p.demo_link ?? null,
            github: p.github_link ?? null,
          }))
        )
      }
      setLoading(false)
    }

    fetchProjects()
  }, [])

  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-16 md:py-24">

      {/* Section heading */}
      <div className="mb-10 md:mb-12">
        <h2 className="text-foreground font-black uppercase text-4xl md:text-5xl tracking-tight mb-4">
          Featured Projects
        </h2>
        <p className="text-muted text-sm max-w-xs leading-relaxed">
          Here are some of the selected projects that showcase my passion for
          front-end development.
        </p>
      </div>

      {/* Cards — last card has no bottom border */}
      <div>
        {loading ? (
          <div className="animate-pulse flex flex-col gap-10 py-10">
            {[0, 1, 2].map((i) => (
              <div key={i} className="border-t border-surface py-10">
                <div className="h-4 bg-surface rounded w-1/3 mb-4" />
                <div className="h-3 bg-surface rounded w-2/3 mb-2" />
                <div className="h-3 bg-surface rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))
        )}
      </div>

    </section>
  )
}
