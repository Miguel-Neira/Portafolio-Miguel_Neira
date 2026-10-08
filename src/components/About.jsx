import { motion } from 'framer-motion'

const EXPERIENCE = [
  {
    role: 'Práctica Profesional — Proyecto Deportes San Bernardo',
    place: 'Acreditado formalmente por la institución',
    period: 'Jul 2026 - Oct 2026',
    points: [
      'Responsable del desarrollo completo de la plataforma: diseño, programación backend/frontend, ciberseguridad y testing funcional, de principio a fin.',
      'Implementación de prácticas de ciberseguridad (control de accesos, autenticación) en un sistema de uso institucional.',
      'Testing funcional y validación de la plataforma antes de su puesta en producción.',
      'Diseño de interfaz y experiencia de usuario de la plataforma completa.',
    ],
  },
  {
    role: 'Analista de Datos y Desarrollador de Proyectos',
    place: 'Proyectos Independientes (EpicAnimes / GastroApp)',
    period: '2024 - 2026',
    points: [
      'Implementación de procesos de minería de datos y modelos analíticos para la toma de decisiones estratégicas.',
      'Diseño y optimización de bases de datos relacionales para el manejo eficiente de grandes volúmenes de transacciones.',
      'Desarrollo de paneles de control (dashboards) para la gestión de administradores y usuarios clave.',
      'Automatización de flujos de trabajo e infraestructura lógica para mejorar la eficiencia y escalabilidad de los sistemas.',
    ],
  },
]

function About() {
  return (
    <section id="sobre-mi" className="section-pad max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[#6b7280] uppercase tracking-wide text-sm mb-2">Sobre mí</p>
        <h2 className="text-3xl md:text-4xl mb-6">Perfil profesional</h2>
        <p className="text-[#4b5165] text-lg leading-relaxed max-w-3xl mb-14">
          Ingeniero en Informática egresado de INACAP, especializado en el análisis de datos, la
          optimización de procesos y la automatización. Capaz de transformar grandes volúmenes de
          datos en información estratégica que facilita la toma de decisiones, con experiencia en
          proyectos técnicos de análisis predictivo y en el desarrollo completo de plataformas web,
          incluyendo diseño, ciberseguridad y testing.
        </p>

        <h3 className="text-2xl mb-8">Experiencia</h3>
        <div className="space-y-10">
          {EXPERIENCE.map((exp) => (
            <div key={exp.role} className="border-l-2 border-[#6d4aff]/30 pl-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <h4 className="text-xl text-[#14161f] font-medium">{exp.role}</h4>
                <span className="text-sm text-[#6b7280]">{exp.period}</span>
              </div>
              <p className="text-[#6b7280] mb-3">{exp.place}</p>
              <ul className="space-y-2 text-[#4b5165]">
                {exp.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="text-[#6d4aff] mt-1.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-l-2 border-[#06b6d4]/30 pl-6">
          <h3 className="text-2xl mb-3">Formación académica</h3>
          <p className="text-[#14161f] font-medium">Ingeniería en Informática (Egresado)</p>
          <p className="text-[#6b7280] mb-2">INACAP, Sede Puente Alto</p>
          <p className="text-[#4b5165] mb-4">
            Áreas de enfoque: Big Data, Inteligencia Artificial, Desarrollo Web, Cloud Computing y
            Gestión de Proyectos TI.
          </p>
          <p className="text-[#14161f] font-medium">Analista Programador (Título Técnico)</p>
          <p className="text-[#6b7280]">INACAP, Sede Puente Alto</p>
        </div>
      </motion.div>
    </section>
  )
}

export default About
