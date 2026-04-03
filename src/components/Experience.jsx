import { motion } from 'framer-motion'

const EXPERIENCE = [
  {
    role: 'Freelance Developer',
    company: null,
    period: 'Nov 2023 – Present',
    description:
      'Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    role: 'Front-End Intern',
    company: 'Ross Tech',
    period: 'Sep 2023 – Nov 2023',
    description:
      'Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
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
                  <span className="text-muted text-xs uppercase tracking-widest whitespace-nowrap">
                    {item.period}
                  </span>
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
