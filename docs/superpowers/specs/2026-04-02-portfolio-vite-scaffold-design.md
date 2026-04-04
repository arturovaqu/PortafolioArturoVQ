# Design Spec: Portfolio Vite + React Scaffold

**Date:** 2026-04-02
**Status:** Approved
**Project:** Portfolio Clone — ARTURO VALENCIA

---

## Objetivo

Inicializar el proyecto base de Vite + React (JavaScript/JSX) con Tailwind CSS v3, React Router v6, Framer Motion y Lucide React. Configurar design tokens de paleta, estructura de carpetas y archivos vacíos listos para desarrollo de componentes.

---

## Stack

| Paquete | Rol |
|---|---|
| Vite 5 | Bundler / dev server |
| React 18 + react-dom | Framework UI |
| react-router-dom v6 | Navegación SPA (Home / About) |
| Tailwind CSS v3 | Estilos utilitarios |
| postcss + autoprefixer | Pipeline CSS |
| framer-motion | Animaciones |
| lucide-react | Iconos |

---

## Design Tokens (tailwind.config.js)

Extraídos de `design_docs/paleta_colores.png` y `claude.md`:

| Token | Valor | Uso |
|---|---|---|
| `primary` | `#D4F27A` | Verde lima — botones CTA, acentos |
| `background` | `#000000` | Fondo de página |
| `surface` | `#1A1A1A` | Cards, inputs, navegación |
| `surface-dark` | `#111111` | Variante más oscura de surface |
| `foreground` | `#FFFFFF` | Texto primario |
| `muted` | `#94a3b8` | Texto secundario (slate-400) |

Tipografía: Inter (Google Fonts), fallback system-ui.

---

## Estructura de Carpetas

```
portfolio/                     ← raíz = C:\Users\artur\OneDrive\Desktop\Portafolio
├── public/
├── docs/superpowers/specs/    ← este archivo
├── design_docs/               ← assets Figma (no modificar)
├── src/
│   ├── assets/                ← imágenes copiadas de design_docs/Images_web/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── FeaturedProjects.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── AboutPreview.jsx
│   │   ├── Skills.jsx
│   │   ├── Experience.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   └── AboutPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## Páginas

- **HomePage** → Navbar + Hero + FeaturedProjects + AboutPreview + Contact + Footer
- **AboutPage** → Navbar + AboutHero + Skills + Experience + Contact + Footer

---

## Reglas de Desarrollo (de claude.md)

1. Analizar `HomePage.png` y `HomePageMovil.png` antes de construir cada sección
2. Mobile First — perfecto en móvil antes de escalar a desktop
3. Sin Lorem Ipsum — texto real extraído de las imágenes de design_docs
4. Fidelidad visual idéntica al Figma
