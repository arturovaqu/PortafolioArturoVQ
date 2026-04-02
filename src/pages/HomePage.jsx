import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import AboutPreview from '../components/AboutPreview.jsx'
import Contact from '../components/Contact.jsx'
import Footer from '../components/Footer.jsx'

export default function HomePage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <Hero />
      <AboutPreview />
      <Contact />
      <Footer />
    </div>
  )
}
