import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import GastroAppDemo from './pages/GastroAppDemo'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'

function App() {
  const location = useLocation()
  // La demo de GastroApp tiene su propio header/footer "de marca" — el chrome
  // del portafolio se oculta ahí para que se sienta como una página aparte.
  const isImmersivePage = location.pathname.startsWith('/proyectos/gastroapp')

  return (
    <>
      {!isImmersivePage && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos" element={<ProjectsPage />} />
          <Route path="/proyectos/gastroapp" element={<GastroAppDemo />} />
        </Routes>
      </main>
      {!isImmersivePage && <Footer />}
    </>
  )
}

export default App
