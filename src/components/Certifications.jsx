import { motion } from 'framer-motion'
import { FaAward } from 'react-icons/fa'

const CERTS = [
  { name: 'Python for Data Science', issuer: 'IBM / Cognitive Class', year: '2026' },
  { name: 'Introduction to Cybersecurity', issuer: 'Cisco Networking Academy', year: '2025' },
  { name: 'CCNA: Introduction to Networks', issuer: 'Cisco Networking Academy', year: '2024' },
  { name: 'Scrum Foundation Professional Certification (SFPC)', issuer: 'CertiProf', year: null },
]

function Certifications() {
  return (
    <section id="certificaciones" className="section-pad bg-[#edf0f9]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[#6b7280] uppercase tracking-wide text-sm mb-2">Certificaciones</p>
          <h2 className="text-3xl md:text-4xl mb-10">Formación complementaria</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {CERTS.map((cert) => (
              <div
                key={cert.name}
                className="flex items-start gap-4 bg-white border border-[#e2e5f1] rounded-2xl p-5 shadow-sm"
              >
                <FaAward className="text-[#6d4aff] text-xl mt-1 shrink-0" />
                <div>
                  <p className="text-[#14161f] font-medium">{cert.name}</p>
                  <p className="text-sm text-[#6b7280]">
                    {cert.issuer}
                    {cert.year ? ` · ${cert.year}` : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Certifications
