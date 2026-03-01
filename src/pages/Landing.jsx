import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import TerminalDemo from '../components/TerminalDemo.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import FeaturesGrid from '../components/FeaturesGrid.jsx'
import InstallSection from '../components/InstallSection.jsx'
import Footer from '../components/Footer.jsx'

export default function Landing() {
  return (
    <div className="landing">
      <Navbar />
      <Hero />
      <TerminalDemo />
      <HowItWorks />
      <FeaturesGrid />
      <InstallSection />
      <Footer />
    </div>
  )
}
