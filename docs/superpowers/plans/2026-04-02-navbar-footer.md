# Navbar + Footer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar el componente `Navbar` (sticky, desktop + hamburguesa móvil) y el componente `Footer` (copyright) con fidelidad visual exacta al diseño Figma.

**Architecture:** Navbar gestiona su propio estado de apertura del menú móvil (`useState`) y detecta scroll con `useEffect` para añadir borde inferior. Footer es un componente puramente presentacional sin estado. Ambos usan exclusivamente clases Tailwind de la paleta configurada.

**Tech Stack:** React 18 (JSX), React Router DOM v6, Tailwind CSS v3, Lucide React (iconos `Menu` / `X`), Framer Motion (animación menú móvil)

---

## Referencia visual

- Desktop nav: `Navigation.png`, `Navigation-1.png`, `Navigation-2.png`
- Mobile nav: `HomePageMovil.png` (parte superior)
- Footer: `HomePage.png` (parte inferior — texto `© 2023 Robert Garcia`, izquierda, color muted)

## Paleta usada

| Clase Tailwind | Valor hex | Uso |
|---|---|---|
| `bg-background` | `#000000` | Fondo navbar y footer |
| `bg-surface` | `#1A1A1A` | Fondo menú móvil abierto |
| `text-foreground` | `#FFFFFF` | Logo, enlaces, copyright |
| `text-muted` | `#94a3b8` | Texto copyright footer |
| `text-primary` | `#D4F27A` | Hover en enlaces de navegación |
| `border-surface` | `#1A1A1A` | Línea divisoria al hacer scroll |

---

## File Map

| Archivo | Acción | Responsabilidad |
|---|---|---|
| `src/components/Navbar.jsx` | Modificar | Sticky header, logo, links desktop, hamburguesa móvil |
| `src/components/Footer.jsx` | Modificar | Copyright © 2023 Robert Garcia |
| `src/pages/HomePage.jsx` | Sin cambios | Ya importa Navbar y Footer |
| `src/pages/AboutPage.jsx` | Sin cambios | Ya importa Navbar y Footer |

---

## Task 1: Navbar — estructura desktop sticky

**Files:**
- Modify: `src/components/Navbar.jsx`

- [ ] **Step 1: Reemplazar el contenido de Navbar.jsx con la estructura desktop**

```jsx
// src/components/Navbar.jsx
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
```

- [ ] **Step 2: Levantar el servidor de desarrollo y verificar visualmente**

```bash
npm run dev
```

Verificar en `http://localhost:5173`:
- Logo `ROBERT GARCIA` aparece a la izquierda en mayúsculas
- Links `Work · About · Contact` aparecen a la derecha
- Al reducir la ventana a < 768 px, los links desaparecen y aparece el ícono de hamburguesa
- Al hacer click en hamburguesa, aparecen los 3 enlaces apilados verticalmente
- Al hacer scroll, aparece una línea inferior sutil en el navbar

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: add sticky Navbar with desktop links and mobile hamburger"
```

---

## Task 2: Navbar — animación del menú móvil con Framer Motion

**Files:**
- Modify: `src/components/Navbar.jsx`

- [ ] **Step 1: Reemplazar el bloque `{isOpen && ...}` por una versión animada**

Localizar en `Navbar.jsx` el bloque del mobile menu (al final del `<header>`) y reemplazarlo:

```jsx
      {/* Reemplaza el bloque anterior {isOpen && <nav>...</nav>} con: */}
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
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
```

- [ ] **Step 2: Agregar los imports de Framer Motion al inicio del archivo**

Añadir después de la línea `import { Menu, X } from 'lucide-react'`:

```jsx
import { motion, AnimatePresence } from 'framer-motion'
```

- [ ] **Step 3: Verificar animación**

```bash
# El servidor ya está corriendo, simplemente revisar en el navegador
```

Verificar en móvil (< 768 px):
- Al abrir el menú, se expande suavemente hacia abajo (0.25 s)
- Al cerrar, se contrae suavemente hacia arriba
- Los 3 links son visibles durante la animación

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: animate mobile menu with Framer Motion AnimatePresence"
```

---

## Task 3: Footer — copyright

**Files:**
- Modify: `src/components/Footer.jsx`

- [ ] **Step 1: Reemplazar el contenido de Footer.jsx**

```jsx
// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-background border-t border-surface">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <p className="text-muted text-sm">© 2023 Robert Garcia</p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Verificar visualmente**

En `http://localhost:5173` hacer scroll hasta el final de la página:
- El texto `© 2023 Robert Garcia` aparece en color muted (`#94a3b8`)
- Tamaño pequeño (`text-sm`)
- Alineado a la izquierda dentro del contenedor de 6xl
- Línea divisoria sutil en la parte superior del footer

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "feat: add Footer with copyright text"
```

---

## Self-Review

### Spec coverage
- [x] Navbar sticky → `sticky top-0 z-50`
- [x] Logo izquierda → `ROBERT GARCIA` uppercase, tracking-widest
- [x] Links derecha → Work / About / Contact, desktop
- [x] Menú hamburguesa móvil → `Menu` / `X` de lucide-react
- [x] Animación menú móvil → Framer Motion `AnimatePresence`
- [x] Colores de paleta → `bg-background`, `bg-surface`, `text-foreground`, `text-primary`, `text-muted`
- [x] Footer copyright → `© 2023 Robert Garcia`, texto muted, izquierda
- [x] Mobile First → clases `md:` para escalar de móvil a desktop

### Placeholders
- Ninguno. Todos los pasos tienen código completo.

### Type consistency
- `NAV_LINKS` definido en Task 1 y referenciado igual en Task 2 → consistente.
- Prop de animación usa `height: 'auto'` + `overflow-hidden` → patrón correcto de Framer Motion.
