import { useState } from 'react'
import { Linkedin, Github, Twitter, Instagram } from 'lucide-react'
import { supabase } from '../lib/supabase'

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

const EMPTY = { name: '', email: '', subject: '', message: '' }
const RATE_LIMIT_MS = 60_000

export default function Contact() {
  const [fields, setFields] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')
  const [lastSubmitTime, setLastSubmitTime] = useState(null)

  function handleChange(e) {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    // Rate limit check
    if (lastSubmitTime && Date.now() - lastSubmitTime < RATE_LIMIT_MS) {
      const remaining = Math.ceil((RATE_LIMIT_MS - (Date.now() - lastSubmitTime)) / 1000)
      setStatus('error')
      setErrorMsg(`Por favor, espera ${remaining} segundos antes de enviar otro mensaje.`)
      return
    }

    setStatus('sending')
    setErrorMsg('')

    // Sanitize inputs
    const name    = fields.name.trim()
    const email   = fields.email.trim()
    const subject = fields.subject.trim()
    const message = fields.message.trim()

    // 1. Insert user — get back the generated id
    const { data: userData, error: userError } = await supabase
      .from('usuarios')
      .insert({ nombre: name, email })
      .select('id')
      .single()

    if (userError) {
      setStatus('error')
      setErrorMsg(userError.message)
      return
    }

    // 2. Insert message linked to the user
    const { error: msgError } = await supabase
      .from('mensajes')
      .insert({
        usuario_id: userData.id,
        concepto: subject,
        mensaje: message,
      })

    if (msgError) {
      setStatus('error')
      setErrorMsg(msgError.message)
      return
    }

    // 3. Email notification via FormSubmit
    await fetch('https://formsubmit.co/ajax/arturovaqu.06@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        Nombre: name,
        Email: email,
        Concepto: subject,
        Mensaje: message,
      }),
    })

    setLastSubmitTime(Date.now())
    setStatus('success')
    setFields(EMPTY)
  }

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
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5">
              <label className="text-muted text-xs uppercase tracking-widest">Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={fields.name}
                onChange={handleChange}
                required
                className={inputCls}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-muted text-xs uppercase tracking-widest">Email</label>
              <input
                type="email"
                name="email"
                value={fields.email}
                onChange={handleChange}
                required
                className={inputCls}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-muted text-xs uppercase tracking-widest">Subject</label>
              <input
                type="text"
                name="subject"
                value={fields.subject}
                onChange={handleChange}
                required
                className={inputCls}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-muted text-xs uppercase tracking-widest">Message</label>
              <textarea
                rows={5}
                name="message"
                value={fields.message}
                onChange={handleChange}
                required
                className={`${inputCls} resize-none`}
              />
            </div>

            {status === 'success' && (
              <p className="text-primary text-sm font-semibold">¡Mensaje enviado!</p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="self-start bg-primary text-black font-bold text-xs uppercase tracking-widest px-8 py-3 rounded-full hover:opacity-90 transition-opacity mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Enviando...' : 'Submit'}
            </button>
          </form>

        </div>
      </div>
    </section>
  )
}
