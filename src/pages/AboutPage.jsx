import Navbar from '../components/Navbar.jsx'
import Skills from '../components/Skills.jsx'
import Experience from '../components/Experience.jsx'
import Contact from '../components/Contact.jsx'
import Footer from '../components/Footer.jsx'

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </div>
  )
}
