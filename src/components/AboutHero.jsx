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
            I am a front-end developer based in Sydney. Has Mechanical Engineering background.
          </p>
          <p className="text-muted text-sm leading-relaxed mb-6">
            I am a front-end developer based in Sydney looking for exciting opportunities. Has
            Mechanical Engineering background. I like to focus on accessibility when developing.
            Passionate and curious about solving problems. Currently, I'm exploring React, Flexbox
            and a bit of Designing. While I am not programming, I enjoy playing football,
            photography and playing Valorant. Learning more to improve skill.
          </p>

          <div className="flex items-center gap-4">
            <motion.a
              href="#"
              className="inline-flex items-center gap-2 bg-primary text-black text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.a>
            <motion.a
              href="https://linkedin.com"
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
              href="https://github.com"
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
        alt="Robert Garcia"
        className="w-full h-80 md:h-[500px] object-cover rounded-3xl shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />

    </section>
  )
}
