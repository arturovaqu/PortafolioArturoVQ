import { Linkedin, Github } from 'lucide-react'
import { motion } from 'framer-motion'
import profilePhoto from '../../design_docs/Images_web/imageH.png'

export default function AboutHero() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">

      {/* Top: heading left + text right */}
      <motion.div
        className="flex flex-col md:flex-row gap-8 md:gap-20 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        {/* Left: heading */}
        <div className="md:w-2/5 flex-shrink-0">
          <h1 className="text-foreground font-black uppercase text-4xl md:text-5xl tracking-tight">
            About Me
          </h1>
        </div>

        {/* Right: headline + bio + CTA */}
        <div className="flex-1">
          <p className="text-foreground text-xl md:text-2xl font-semibold leading-snug mb-4">
            I am a Full-Stack Developer and Software Engineering student based in Sevilla. Fluent in English and actively expanding my expertise through specialized courses 
            in Artificial Intelligence. I blend academic computer science foundations with hands-on experience in building modern, automated web applications.
          </p>
          <div className="flex items-center gap-4">
            <motion.a
              href="https://www.linkedin.com/in/arturo-valencia-quintero-b07ab43bb/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={18} />
            </motion.a>
            <motion.a
              href="https://github.com/arturovaqu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={18} />
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Full-width photo */}
      <motion.img
        src={profilePhoto}
        alt="ARTURO VALENCIA"
        className="w-full h-80 md:h-[500px] object-cover rounded-3xl shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />

    </section>
  )
}
