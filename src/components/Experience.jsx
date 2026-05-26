import { motion } from 'framer-motion'

const EXPERIENCE = [
  {
    role: 'Freelance Developer',
    description:
      'Designing and developing custom web applications with a focus on clean code, responsive design, and optimal performance. Delivering tailored solutions that meet client requirements and enhance user engagement.',
  },
  {
    role: 'UI/UX Designer',
    description:
      'Creating intuitive and visually appealing user interfaces. Conducting user research and designing wireframes and prototypes to ensure seamless and engaging user experiences across digital platforms.',
  },
]

export default function Experience() {
  return (
    <section className="border-t border-surface">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-8 md:gap-20">

          {/* Left: heading */}
          <div className="md:w-2/5 flex-shrink-0">
            <h2 className="text-foreground font-black uppercase text-4xl md:text-5xl tracking-tight">
              My Experience
            </h2>
          </div>

          {/* Right: experience items */}
          <div className="flex-1 space-y-10">
            {EXPERIENCE.map((item, i) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                  <h3 className="text-foreground font-bold text-base">{item.role}</h3>
                </div>
                {item.company && (
                  <p className="text-primary text-sm font-semibold mb-2">{item.company}</p>
                )}
                <p className="text-muted text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
