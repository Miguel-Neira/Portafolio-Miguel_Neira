import { motion } from 'framer-motion'
import { FaDownload, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'
import { SiDjango, SiPython, SiReact, SiMysql } from 'react-icons/si'
import { Link } from 'react-router-dom'

const STATS = [
  { value: '2+', label: 'Años construyendo proyectos' },
  { value: '4', label: 'Proyectos desarrollados' },
  { value: '4', label: 'Certificaciones' },
]

const FLOATING_ICONS = [
  { Icon: SiPython, pos: 'top-6 left-6', delay: 0, color: '#3776ab' },
  { Icon: SiDjango, pos: 'top-28 right-2', delay: 0.4, color: '#0c4b33' },
  { Icon: SiReact, pos: 'bottom-24 left-0', delay: 0.8, color: '#61dafb' },
  { Icon: SiMysql, pos: 'bottom-6 right-10', delay: 1.2, color: '#00758f' },
]

function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center px-6 pt-28 pb-16 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full bg-[#6d4aff]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-40 w-[480px] h-[480px] rounded-full bg-[#06b6d4]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'linear-gradient(#e2e5f1 1px, transparent 1px), linear-gradient(90deg, #e2e5f1 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(circle at 50% 30%, black, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 30%, black, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl w-full grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          <p className="text-[#6b7280] mb-4 tracking-wide uppercase text-sm">
            Análisis de Datos · Desarrollo Backend
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-[#14161f]">
            Miguel Neira Nadal
          </h1>
          <p className="text-lg text-[#4b5165] mb-10 max-w-2xl mx-auto lg:mx-0">
            Ingeniero en Informática especializado en análisis de datos, automatización de
            procesos y desarrollo de aplicaciones web con Django y React. Transformo datos en
            decisiones y construyo sistemas que resuelven problemas reales.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
            <Link
              to="/proyectos"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#6d4aff] to-[#06b6d4] text-white font-semibold shadow-lg shadow-[#6d4aff]/20 hover:opacity-90 transition-opacity"
            >
              Ver proyectos
            </Link>
            <a
              href="#contacto"
              className="px-6 py-3 rounded-full border-2 border-[#6d4aff] text-[#6d4aff] hover:bg-[#6d4aff]/10 transition-colors"
            >
              Contactar
            </a>
            <a
              href="/cv/CV_Miguel_Neira_Analista_Datos.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#06b6d4] text-[#0891b2] hover:bg-[#06b6d4]/10 transition-colors"
            >
              <FaDownload className="text-sm" /> Descargar CV
            </a>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-6 text-xl text-[#6b7280] mb-12">
            <a
              href="https://github.com/Miguel-Neira"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#14161f] transition-colors"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/miguel-neira-nadal-906274332/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#14161f] transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:miguel.neira0513@gmail.com"
              className="hover:text-[#14161f] transition-colors"
              aria-label="Correo"
            >
              <FaEnvelope />
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-white border border-[#e2e5f1] rounded-xl px-3 py-4 text-center shadow-sm"
              >
                <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                <p className="text-xs text-[#6b7280] mt-1 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative hidden lg:block h-[420px]"
        >
          <div className="absolute inset-10 rounded-3xl bg-gradient-to-br from-[#6d4aff]/15 to-[#06b6d4]/15 border border-[#e2e5f1]" />
          <div className="absolute inset-16 rounded-2xl bg-white border border-[#e2e5f1] shadow-xl flex flex-col gap-3 p-6 font-mono text-sm text-[#4b5165]">
            <div className="flex gap-1.5 mb-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <p>
              <span className="text-[#6d4aff]">class</span> Analista:
            </p>
            <p className="pl-4">
              datos = <span className="text-[#06b6d4]">"estrategia"</span>
            </p>
            <p className="pl-4">
              stack = [<span className="text-[#06b6d4]">"Django"</span>,{' '}
              <span className="text-[#06b6d4]">"React"</span>]
            </p>
            <p className="pl-4">
              <span className="text-[#6d4aff]">def</span> resolver(problema):
            </p>
            <p className="pl-8 text-[#6b7280]"># optimizar, automatizar, entregar</p>
            <p className="pl-8">
              <span className="text-[#6d4aff]">return</span> solución
            </p>
          </div>

          {FLOATING_ICONS.map(({ Icon, pos, delay, color }) => (
            <motion.div
              key={pos}
              className={`absolute ${pos} w-14 h-14 rounded-2xl bg-white border border-[#e2e5f1] shadow-md flex items-center justify-center text-2xl`}
              style={{ color }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay, ease: 'easeInOut' }}
            >
              <Icon />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#sobre-mi"
        aria-label="Bajar a la siguiente sección"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#6b7280] hover:text-[#14161f] transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 4v16m0 0l-6-6m6 6l6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.a>
    </section>
  )
}

export default Hero
