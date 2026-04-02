import Navbar from '../components/Navbar.jsx'
import FeaturedProjects from '../components/FeaturedProjects.jsx'
import Footer from '../components/Footer.jsx'

export default function WorkPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <FeaturedProjects />
      <Footer />
    </div>
  )
}
