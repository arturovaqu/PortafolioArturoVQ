import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Work',    href: '/#projects' },
  { label: 'About',  href: '/about'      },
  { label: 'Contact', href: '/#contact'  },
]

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
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-foreground text-sm hover:text-primary transition-colors duration-200"
            >
              {label}
            </a>
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

      {/* Mobile menu — placeholder, se anima en Task 2 */}
      {isOpen && (
        <nav
          className="md:hidden bg-surface border-t border-surface px-6 py-4 flex flex-col gap-5"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-foreground text-sm hover:text-primary transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
