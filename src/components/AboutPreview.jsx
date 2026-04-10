import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function AboutPreview() {
  return (
    <section className="border-t border-surface">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-8 md:gap-20">

          {/* Left: heading */}
          <div className="md:w-2/5 flex-shrink-0">
            <h2 className="text-foreground font-black uppercase text-4xl md:text-5xl tracking-tight">
              About Me
            </h2>
          </div>

          {/* Right: bio + link */}
          <div className="flex-1">
            <p className="text-muted text-sm md:text-base leading-relaxed mb-6">
              I am a Full-Stack Developer and Software Engineering 
              student based in Sevilla. Fluent in English and actively 
              expanding my expertise through specialized courses in Artificial Intelligence. 
              I blend academic computer science foundations with hands-on experience
               in building modern, automated web applications.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 text-primary text-xs uppercase tracking-widest hover:opacity-75 transition-opacity"
            >
              More About Me <ArrowUpRight size={13} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
