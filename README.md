# 🚀 Arturo Vaquero - Full-Stack Developer Portfolio

[![Netlify Status](https://api.netlify.com/api/v1/badges/7475b11e-885a-4135-af15-faa453da3e30/deploy-status)](https://app.netlify.com/projects/portfolioarturovq/deploys)
> **🌐 Live Demo:** [Visita el portafolio en vivo aquí](https://portfolioarturovq.netlify.app)

Portafolio personal Full-Stack diseñado para mostrar mis proyectos, experiencia y habilidades técnicas. Construido con un enfoque en rendimiento, animaciones fluidas (UI/UX) y una arquitectura de base de datos segura para gestionar los contactos.

---

## ✨ Características Principales

* **Diseño Moderno y Responsivo:** Interfaz limpia construida con Tailwind CSS, adaptable a cualquier dispositivo móvil o de escritorio.
* **Animaciones Avanzadas:** Transiciones suaves de página y elementos controlados por el scroll utilizando Framer Motion.
* **Formulario de Contacto Funcional:** Conectado directamente a una base de datos PostgreSQL (Supabase) con notificaciones por correo electrónico en tiempo real (FormSubmit API).
* **Panel de Administración Protegido:** Ruta `/admin` privada que funciona como un dashboard. Incluye métricas de usuarios únicos, filtros por fecha, barra de búsqueda y opciones de ordenación.
* **Seguridad de Nivel de Producción:** Implementación de RLS (Row Level Security) en Supabase para proteger los datos, junto con rate-limiting en el frontend y saneamiento de inputs.

---

## 🛠️ Tecnologías y Herramientas

### Frontend
* **Core:** React 18 + Vite (SPA rápida y optimizada)
* **Estilos:** Tailwind CSS
* **Animaciones:** Framer Motion
* **Iconografía:** Lucide React
* **Enrutamiento:** React Router Dom (con manejo personalizado de Scroll)

### Backend & BaaS
* **Base de Datos:** Supabase (PostgreSQL)
* **Notificaciones:** FormSubmit API
* **Seguridad:** Supabase RLS (Row Level Security)

### Despliegue y Control de Versiones
* **Hosting:** Netlify (CI/CD configurado con redirecciones para SPA)
* **Control de Versiones:** Git & GitHub

---

## 🔒 Arquitectura de Seguridad (Destacado)

Para asegurar la integridad del sistema de contacto, se han implementado las siguientes medidas:
1. **Row Level Security (RLS):** Las tablas de `usuarios` y `mensajes` permiten inserciones anónimas pero bloquean completamente las lecturas, actualizaciones y borrados a usuarios no autorizados.
2. **Rate Limiting (Frontend):** Prevención de spam bloqueando envíos múltiples en intervalos menores a 60 segundos.
3. **Saneamiento:** Limpieza de inputs mediante `trim()` para evitar registros vacíos o malformados.
4. **Protección de Variables de Entorno:** Claves de API gestionadas de forma segura a través del panel de Netlify, fuera del código fuente público.

---

## 💻 Instalación Local

Si deseas correr este proyecto en tu máquina local:

1. Clona el repositorio:
   ```bash
   git clone [https://github.com/arturovaqu/PortafolioArturoVQ.git](https://github.com/arturovaqu/PortafolioArturoVQ.git)