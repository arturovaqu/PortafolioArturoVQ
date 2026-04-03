import { motion } from 'framer-motion'

const SKILLS = [
  'HTML',
  'CSS',
  'JavaScript',
  'jQuery',
  'Accessibility',
  'Figma',
  'Tailwind CSS',
]

export default function Skills() {
  return (
    <section className="border-t border-surface">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-8 md:gap-20">

          {/* Left: heading */}
          <div className="md:w-2/5 flex-shrink-0">
            <h2 className="text-foreground font-black uppercase text-4xl md:text-5xl tracking-tight">
              My Capabilities
            </h2>
          </div>

          {/* Right: intro + skill tags */}
          <div className="flex-1">
            <p className="text-muted text-sm leading-relaxed mb-8">
              I am always looking to add more skills. Morbi egestas neque eu blandit fermentum.
              Nulla ac lobortis ligula. Pellentesque ac ex at purus faucibus tristique ut at dolor.
            </p>
            <div className="flex flex-wrap gap-3">
              {SKILLS.map((skill, i) => (
                <motion.span
                  key={skill}
                  className="border border-surface text-foreground text-xs uppercase tracking-widest px-5 py-2 rounded-full hover:border-primary hover:text-primary transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
