import { Linkedin, Github, Twitter, Instagram } from 'lucide-react'

const SOCIAL_LINKS = [
  { icon: Linkedin, href: 'https://linkedin.com',  label: 'LinkedIn'  },
  { icon: Github,   href: 'https://github.com',    label: 'GitHub'    },
  { icon: Twitter,  href: 'https://twitter.com',   label: 'X'         },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
]

const inputCls =
  'w-full bg-surface text-foreground text-sm px-4 py-3 rounded-sm ' +
  'border border-surface focus:border-muted focus:outline-none ' +
  'transition-colors placeholder:text-muted'

export default function Contact() {
  return (
    <section id="contact" className="border-t border-surface">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

          {/* Left: info */}
          <div>
            <h2 className="text-foreground font-black uppercase text-4xl md:text-5xl tracking-tight mb-10">
              Let's Connect
            </h2>

            <div className="space-y-2 mb-8">
              <p className="text-muted text-sm">
                Say hello at{' '}
                <a
                  href="mailto:robertgarcia@gmail.com"
                  className="text-foreground underline decoration-surface hover:text-primary hover:decoration-primary transition-colors"
                >
                  robertgarcia@gmail.com
                </a>
              </p>
              <p className="text-muted text-sm">
                For more info, here's my{' '}
                <a
                  href="#"
                  className="text-foreground underline decoration-surface hover:text-primary hover:decoration-primary transition-colors"
                >
                  resume
                </a>
              </p>
            </div>

            <div className="flex items-center gap-5">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <form className="flex flex-col gap-5" onSubmit={e => e.preventDefault()}>
            <div className="flex flex-col gap-1.5">
              <label className="text-muted text-xs uppercase tracking-widest">Name</label>
              <input type="text" placeholder="John Doe" className={inputCls} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-muted text-xs uppercase tracking-widest">Email</label>
              <input type="email" className={inputCls} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-muted text-xs uppercase tracking-widest">Subject</label>
              <input type="text" className={inputCls} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-muted text-xs uppercase tracking-widest">Message</label>
              <textarea rows={5} className={`${inputCls} resize-none`} />
            </div>

            <button
              type="submit"
              className="self-start bg-primary text-black font-bold text-xs uppercase tracking-widest px-8 py-3 rounded-full hover:opacity-90 transition-opacity mt-1"
            >
              Submit
            </button>
          </form>

        </div>
      </div>
    </section>
  )
}
