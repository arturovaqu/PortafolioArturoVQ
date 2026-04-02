import ProjectCard from './ProjectCard.jsx'

const PROJECTS = [
  {
    id: 1,
    category: 'Conceptual Work',
    title: 'Promotional landing page for our favorite show',
    description:
      'Teamed up with a designer to breathe life into a promotional webpage for our beloved television show. Delivered a fully responsive design with dynamic content capabilities, seamlessly integrating a newsletter feature to keep fans updated with the latest adventures.',
    year: '2023',
    role: 'Front-end Developer',
    liveDemo: '#',
    github: '#',
  },
  {
    id: 2,
    title: 'Blog site for World News',
    description:
      'Mastered CSS Grid complexities in building an innovative news homepage, navigating intricate design decisions for a seamless user experience. Leveraged the challenge to enhance skills in front-end development.',
    client: 'World News',
    year: '2022',
    role: 'Front-end Developer',
    viewProject: '#',
  },
  {
    id: 3,
    category: 'Challenge',
    title: 'E-commerce product page',
    description:
      'Successfully crafted an engaging product page featuring a dynamic lightbox gallery and seamless cart functionality, showcasing proficiency in JavaScript development.',
    year: '2022',
    role: 'Front-end Developer',
    liveDemo: '#',
    github: '#',
  },
]

export default function FeaturedProjects() {
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
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

    </section>
  )
}
