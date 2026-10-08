import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import About from '../components/About'
import Certifications from '../components/Certifications'
import Contact from '../components/Contact'
import Hero from '../components/Hero'
import SectionDivider from '../components/SectionDivider'
import Skills from '../components/Skills'

function Home() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50)
      }
    }
  }, [location.hash])

  return (
    <>
      <Hero />
      <About />
      <SectionDivider color="#edf0f9" />
      <Skills />
      <Certifications />
      <SectionDivider color="#f7f8fc" flip />
      <Contact />
      <SectionDivider color="#ffffff" />
    </>
  )
}

export default Home
