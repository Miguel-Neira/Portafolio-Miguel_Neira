import { motion } from 'framer-motion'
import { FaGithub, FaLock, FaShieldAlt, FaShoppingCart, FaStore, FaUtensils } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { tagColor } from '../utils/tagColor'

const ICONS = {
  store: FaStore,
  utensils: FaUtensils,
  cart: FaShoppingCart,
  shield: FaShieldAlt,
}

function DemoSlot({ demoUrl, demoPlaceholder, from, to }) {
  if (!demoUrl) {
    return (
      <span
        className="px-4 py-2 rounded-full bg-[#edf0f9] text-[#6b7280] text-sm border border-[#e2e5f1] cursor-default"
        title="Aún no disponible"
      >
        {demoPlaceholder || 'Demo próximamente'}
      </span>
    )
  }

  const label = demoPlaceholder || 'Ver proyecto'
  const buttonClass =
    'px-4 py-2 rounded-full text-white text-sm font-semibold hover:opacity-90 transition-opacity'
  const style = { background: `linear-gradient(90deg, ${from}, ${to})` }

  if (demoUrl.startsWith('/')) {
    return (
      <Link to={demoUrl} className={buttonClass} style={style}>
        {label}
      </Link>
    )
  }

  return (
    <a href={demoUrl} target="_blank" rel="noreferrer" className={buttonClass} style={style}>
      {label}
    </a>
  )
}

function ProjectCard({ project }) {
  const {
    title,
    subtitle,
    description,
    stack,
    githubUrl,
    githubLabel,
    demoUrl,
    demoPlaceholder,
    badge,
    showDemoSlot = true,
    icon,
    accent,
  } = project
  const BannerIcon = ICONS[icon] ?? FaStore
  const [from, to] = accent ?? ['#6d4aff', '#06b6d4']

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-[#e2e5f1] rounded-2xl overflow-hidden flex flex-col h-full shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
    >
      <div
        className="relative h-28 flex items-center justify-between px-6"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      >
        <BannerIcon className="text-white/90 text-3xl" />
        {badge && (
          <span className="text-xs px-2.5 py-1 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-sm">
            {badge}
          </span>
        )}
        <div
          aria-hidden="true"
          className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/10"
        />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl text-[#14161f] font-semibold mb-1">{title}</h3>
        <p className="text-[#6b7280] text-sm mb-4">{subtitle}</p>
        <p className="text-[#4b5165] text-sm leading-relaxed mb-5 flex-1">{description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {stack.map((tech) => {
            const c = tagColor(tech)
            return (
              <span
                key={tech}
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
              >
                {tech}
              </span>
            )
          })}
        </div>

        <div className="flex items-center gap-3 mt-auto">
          {showDemoSlot && (
            <DemoSlot demoUrl={demoUrl} demoPlaceholder={demoPlaceholder} from={from} to={to} />
          )}

          {githubUrl ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#e2e5f1] text-[#14161f] text-sm hover:bg-black/5 transition-colors"
            >
              <FaGithub /> {githubLabel || 'Código'}
            </a>
          ) : (
            <span className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#e2e5f1] text-[#6b7280] text-sm">
              <FaLock /> Privado
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default ProjectCard
