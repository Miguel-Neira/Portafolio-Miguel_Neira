import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaCheck, FaCopy, FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'

const EMAIL = 'miguel.neira0513@gmail.com'

const CONTACT_ITEMS = [
  {
    Icon: FaEnvelope,
    label: EMAIL,
    href: `mailto:${EMAIL}`,
    color: '#6d4aff',
    copyValue: EMAIL,
  },
  {
    Icon: FaPhone,
    label: '+56 9 3120 4159',
    href: 'tel:+56931204159',
    color: '#06b6d4',
  },
  {
    Icon: FaMapMarkerAlt,
    label: 'Puente Alto, Región Metropolitana',
    href: null,
    color: '#15803d',
  },
  {
    Icon: FaLinkedin,
    label: 'linkedin.com/in/miguel-neira-nadal-906274332',
    href: 'https://www.linkedin.com/in/miguel-neira-nadal-906274332/',
    color: '#0a66c2',
  },
  {
    Icon: FaGithub,
    label: 'github.com/Miguel-Neira',
    href: 'https://github.com/Miguel-Neira',
    color: '#14161f',
  },
]

function CopyButton({ value, light }) {
  const [copied, setCopied] = useState(false)

  const copy = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full border transition-colors shrink-0 ${
        light
          ? 'border-white/40 text-white hover:bg-white/10'
          : 'border-[#e2e5f1] text-[#6b7280] hover:bg-[#edf0f9]'
      }`}
      title="Copiar correo"
    >
      {copied ? <FaCheck /> : <FaCopy />}
      {copied ? 'Copiado' : 'Copiar'}
    </button>
  )
}

function Contact() {
  return (
    <section id="contacto" className="section-pad max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-3xl overflow-hidden bg-white border border-[#e2e5f1] shadow-sm grid md:grid-cols-[1fr_1.2fr]"
      >
        <div className="relative bg-gradient-to-br from-[#6d4aff] to-[#06b6d4] text-white p-10 flex flex-col justify-center overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/10"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 right-0 w-56 h-56 rounded-full bg-white/10 translate-x-1/3 translate-y-1/3"
          />
          <p className="relative uppercase tracking-wide text-sm text-white/80 mb-2">Contacto</p>
          <h2 className="relative text-3xl md:text-4xl mb-4 text-white">Conversemos</h2>
          <p className="relative text-white/90 max-w-sm">
            ¿Tienes un proyecto en mente o una oportunidad laboral? Escríbeme directamente, estoy
            disponible para nuevos desafíos.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex w-fit items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#6d4aff] font-semibold text-sm hover:bg-white/90 transition-colors"
            >
              <FaEnvelope /> Escríbeme un correo
            </a>
            <CopyButton value={EMAIL} light />
          </div>
          <p className="relative text-xs text-white/70 mt-3">
            ¿El botón no abre tu correo? Usa "Copiar" y pégalo donde prefieras escribirme.
          </p>
        </div>

        <div className="p-8 sm:p-10">
          <div className="flex flex-col gap-3">
            {CONTACT_ITEMS.map(({ Icon, label, href, color, copyValue }) => {
              const content = (
                <>
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg shrink-0"
                    style={{ background: color }}
                  >
                    <Icon />
                  </span>
                  <span className="text-sm text-[#4b5165] group-hover:text-[#14161f] break-all">
                    {label}
                  </span>
                </>
              )

              return (
                <div
                  key={label}
                  className="group flex items-center justify-between gap-3 rounded-xl px-3 py-3 hover:bg-[#edf0f9] transition-colors"
                >
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noreferrer' : undefined}
                      className="flex items-center gap-4 flex-1 min-w-0"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 flex-1 min-w-0">{content}</div>
                  )}
                  {copyValue && <CopyButton value={copyValue} />}
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Contact
