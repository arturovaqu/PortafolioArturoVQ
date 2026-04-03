import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Small delay so React Router finishes rendering the new page
    // before we force the scroll position.
    const id = setTimeout(() => {
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      window.scrollTo(0, 0)
    }, 10)

    return () => clearTimeout(id)
  }, [pathname])

  return null
}
