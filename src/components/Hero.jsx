import { Github, Linkedin } from 'lucide-react'
import profilePhoto from '../../design_docs/Images_web/image.png'

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-14 md:py-20">
      <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-12">

        {/* Text — top on mobile, left on desktop */}
        <div className="flex-1">
          <h1 className="font-black uppercase leading-none mb-6">
            <span className="block text-4xl md:text-5xl text-foreground tracking-wide">
              Hi, I am
            </span>
            <span className="block text-6xl md:text-8xl text-foreground tracking-tight">
              Robert Garcia.
            </span>
          </h1>

          <p className="text-muted text-sm md:text-base leading-relaxed mb-8 max-w-sm">
            A Sydney based front-end developer passionate about building
            accessible and user friendly websites.
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            {/* CONTACT ME */}
            <a
              href="#contact"
              className="inline-flex items-center gap-3 bg-primary text-black font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Contact Me
              <span className="w-2 h-2 rounded-full bg-black flex-shrink-0" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-foreground hover:bg-surface-dark transition-colors"
            >
              <Linkedin size={17} />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-foreground hover:bg-surface-dark transition-colors"
            >
              <Github size={17} />
            </a>
          </div>
        </div>

        {/* Photo — bottom on mobile, right on desktop */}
        <div className="w-full max-w-xs md:max-w-none md:w-72 lg:w-80 rounded-2xl overflow-hidden bg-surface flex-shrink-0 self-start md:self-auto">
          <img
            src={profilePhoto}
            alt="Robert Garcia — front-end developer"
            className="w-full h-72 md:h-96 object-cover object-top"
          />
        </div>

      </div>
    </section>
  )
}
