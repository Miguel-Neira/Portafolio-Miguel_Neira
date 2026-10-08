import { motion } from 'framer-motion'
import { FaBrain, FaGitAlt, FaHandshake, FaToolbox } from 'react-icons/fa'
import { SiDjango, SiDocker, SiMysql, SiPython, SiReact, SiTailwindcss } from 'react-icons/si'
import { tagColor } from '../utils/tagColor'

const SKILL_GROUPS = [
  {
    title: 'Análisis y Datos',
    Icon: FaBrain,
    color: '#6d4aff',
    items: ['Python (Django, DRF)', 'SQL', 'NoSQL', 'Minería de Datos', 'Machine Learning'],
  },
  {
    title: 'Herramientas',
    Icon: FaToolbox,
    color: '#06b6d4',
    items: ['Git', 'Docker', 'Cloud Computing', 'Modelado de bases de datos'],
  },
  {
    title: 'Metodologías',
    Icon: FaGitAlt,
    color: '#f59e0b',
    items: ['Scrum / Gestión ágil', 'Optimización de procesos', 'Automatización'],
  },
  {
    title: 'Habilidades blandas',
    Icon: FaHandshake,
    color: '#db2777',
    items: [
      'Pensamiento crítico',
      'Resolución de problemas complejos',
      'Orientación al cliente',
      'Trabajo en equipo',
    ],
  },
]

const STACK_ICONS = [
  { Icon: SiPython, label: 'Python', color: '#3776ab' },
  { Icon: SiDjango, label: 'Django', color: '#0c4b33' },
  { Icon: SiReact, label: 'React', color: '#149eca' },
  { Icon: SiMysql, label: 'MySQL', color: '#00758f' },
  { Icon: SiDocker, label: 'Docker', color: '#2496ed' },
  { Icon: SiTailwindcss, label: 'Tailwind CSS', color: '#06b6d4' },
]

function Skills() {
  return (
    <section id="habilidades" className="section-pad bg-[#edf0f9]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[#6b7280] uppercase tracking-wide text-sm mb-2">Habilidades</p>
          <h2 className="text-3xl md:text-4xl mb-10">Stack y competencias</h2>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-14">
            {STACK_ICONS.map(({ Icon, label, color }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 bg-white border border-[#e2e5f1] rounded-xl py-4"
                title={label}
              >
                <Icon className="text-3xl" style={{ color }} />
                <span className="text-xs text-center text-[#6b7280]">{label}</span>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {SKILL_GROUPS.map((group) => (
              <div
                key={group.title}
                className="bg-white border border-[#e2e5f1] rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg text-white shrink-0"
                    style={{ background: group.color }}
                  >
                    <group.Icon />
                  </span>
                  <h3 className="text-lg text-[#14161f] font-medium">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => {
                    const c = tagColor(item)
                    return (
                      <span
                        key={item}
                        className="text-sm px-3 py-1.5 rounded-full font-medium"
                        style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
                      >
                        {item}
                      </span>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
