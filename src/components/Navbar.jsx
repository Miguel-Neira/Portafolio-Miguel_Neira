import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

const LINKS = [
  { href: '/#sobre-mi', label: 'Sobre mí' },
  { href: '/#habilidades', label: 'Habilidades' },
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/#certificaciones', label: 'Certificaciones' },
  { href: '/#contacto', label: 'Contacto' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors ${
        scrolled || open
          ? 'bg-white/95 backdrop-blur border-b border-[#e2e5f1]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="font-semibold text-lg text-[#14161f] z-10">
          Miguel Neira<span className="gradient-text">.</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm text-[#4b5165]">
          {LINKS.map((link) => {
            const isProjects = link.href === '/proyectos'
            const isActive = isProjects && location.pathname === '/proyectos'
            return (
              <li key={link.href}>
                {isProjects ? (
                  <Link
                    to={link.href}
                    className={`transition-colors hover:text-[#14161f] ${
                      isActive ? 'text-[#14161f] font-medium' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a className="hover:text-[#14161f] transition-colors" href={link.href}>
                    {link.label}
                  </a>
                )}
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          className="md:hidden relative z-10 text-[#14161f] text-xl w-10 h-10 flex items-center justify-center"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden fixed inset-x-0 top-[72px] h-[calc(100dvh-72px)] bg-white flex flex-col gap-1 px-6 pt-4 overflow-y-auto"
          >
            {LINKS.map((link) =>
              link.href === '/proyectos' ? (
                <li key={link.href} className="border-b border-[#edf0f9]">
                  <Link
                    onClick={() => setOpen(false)}
                    to={link.href}
                    className="block py-4 text-lg text-[#14161f] font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ) : (
                <li key={link.href} className="border-b border-[#edf0f9]">
                  <a
                    onClick={() => setOpen(false)}
                    href={link.href}
                    className="block py-4 text-lg text-[#14161f] font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ),
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
