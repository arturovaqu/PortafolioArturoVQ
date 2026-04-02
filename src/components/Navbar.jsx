import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Work',    href: '/#projects', isRoute: false },
  { label: 'About',  href: '/about',      isRoute: true  },
  { label: 'Contact', href: '/#contact',  isRoute: false },
]

function NavLink({ label, href, isRoute, onClick }) {
  const cls = 'text-foreground text-sm hover:text-primary transition-colors duration-200'
  if (isRoute) {
    return <Link to={href} className={cls} onClick={onClick}>{label}</Link>
  }
  return <a href={href} className={cls} onClick={onClick}>{label}</a>
}

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 bg-background transition-colors duration-300 ${
        scrolled ? 'border-b border-surface' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-foreground font-bold uppercase tracking-widest text-sm"
        >
          Robert Garcia
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
          {NAV_LINKS.map(({ label, href, isRoute }) => (
            <NavLink key={label} label={label} href={href} isRoute={isRoute} />
          ))}
        </nav>

        {/* Hamburger button — visible solo en móvil */}
        <button
          className="md:hidden text-foreground p-1"
          onClick={() => setIsOpen(prev => !prev)}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile menu — animated with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-surface border-t border-surface"
            aria-label="Mobile navigation"
          >
            <div className="px-6 py-4 flex flex-col gap-5">
              {NAV_LINKS.map(({ label, href, isRoute }) => (
                <NavLink key={label} label={label} href={href} isRoute={isRoute} onClick={() => setIsOpen(false)} />
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
