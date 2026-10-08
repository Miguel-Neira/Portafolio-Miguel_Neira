import { motion } from 'framer-motion'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import SectionDivider from '../components/SectionDivider'
import { projects } from '../data/projects'

function ProjectsPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 px-6 bg-[#edf0f9] overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#6d4aff]/10 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-5xl mx-auto"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#14161f] mb-6 transition-colors"
          >
            <FaArrowLeft /> Volver al inicio
          </Link>
          <p className="text-[#6b7280] uppercase tracking-wide text-sm mb-2">Proyectos</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-[#14161f]">
            Elige qué proyecto quieres ver
          </h1>
          <p className="text-[#4b5165] max-w-2xl">
            Cada tarjeta incluye el stack usado y accesos directos a la demo (cuando ya está
            desplegada) y al repositorio en GitHub. El proyecto de San Bernardo mantiene su código
            privado mientras está en proceso de acreditación.
          </p>
        </motion.div>
      </section>

      <SectionDivider color="#f7f8fc" flip />

      <section className="section-pad max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </>
  )
}

export default ProjectsPage
