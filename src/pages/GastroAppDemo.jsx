import { useEffect, useMemo, useState } from 'react'
import {
  FaArrowLeft,
  FaChevronDown,
  FaFish,
  FaGithub,
  FaIceCream,
  FaInstagram,
  FaLinkedin,
  FaMotorcycle,
  FaPhone,
  FaPizzaSlice,
  FaShoppingBasket,
  FaTimes,
  FaUtensils,
  FaWhatsapp,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import CartDrawer from '../components/gastroapp/CartDrawer'
import PlatoCard from '../components/gastroapp/PlatoCard'
import { allPlatos, menu } from '../data/gastroappMenu'

const CATEGORY_ICONS = {
  Pizzas: FaPizzaSlice,
  Acompañamientos: FaUtensils,
  Postres: FaIceCream,
  Sushi: FaFish,
}

const STORAGE_KEY = 'gastroapp_demo_cart'

// Mismo horario y zona horaria (America/Santiago) que usa el backend real de
// GASTROAPP en carta/utils.py (is_restaurant_open): Lun-Vie 10:00-19:00,
// Sáb 10:00-18:00, Dom cerrado.
function getEstadoLocal() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Santiago',
    hour12: false,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).formatToParts(new Date())
  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]))
  const diaSemana = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 }[map.weekday]
  const minutosAhora = Number(map.hour) * 60 + Number(map.minute)

  if (diaSemana >= 0 && diaSemana <= 4) {
    return {
      horario: '10:00 - 19:00',
      abierto: minutosAhora >= 600 && minutosAhora < 1140,
      horaCierre: '19:00',
    }
  }
  if (diaSemana === 5) {
    return {
      horario: '10:00 - 18:00',
      abierto: minutosAhora >= 600 && minutosAhora < 1080,
      horaCierre: '18:00',
    }
  }
  return { horario: 'Cerrado', abierto: false, horaCierre: null }
}

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function GastroAppDemo() {
  const [cart, setCart] = useState(loadCart)
  const [cartOpen, setCartOpen] = useState(false)
  const [modo, setModo] = useState('mesa')
  const [search, setSearch] = useState('')
  const [showHorario, setShowHorario] = useState(false)
  const [estado, setEstado] = useState(getEstadoLocal)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (!toast) return undefined
    const id = setTimeout(() => setToast(null), 4000)
    return () => clearTimeout(id)
  }, [toast])

  useEffect(() => {
    const id = setInterval(() => setEstado(getEstadoLocal()), 30000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    } catch {
      // localStorage no disponible (modo privado, etc.) — el carrito sigue funcionando en memoria.
    }
  }, [cart])

  const add = (plato) => {
    if (!estado.abierto) {
      setToast('Lo sentimos, el local está cerrado y no recibe pedidos en este momento')
      return
    }
    setCart((prev) => ({ ...prev, [plato.id]: (prev[plato.id] || 0) + 1 }))
  }

  const remove = (platoId) => {
    setCart((prev) => {
      const next = { ...prev }
      if (!next[platoId]) return prev
      if (next[platoId] <= 1) delete next[platoId]
      else next[platoId] -= 1
      return next
    })
  }

  const deleteItem = (platoId) => {
    setCart((prev) => {
      const next = { ...prev }
      delete next[platoId]
      return next
    })
  }

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({
          plato: allPlatos.find((p) => p.id === Number(id)),
          qty,
        }))
        .filter((item) => item.plato),
    [cart],
  )

  const totalQty = cartItems.reduce((acc, i) => acc + i.qty, 0)
  const totalPrice = cartItems.reduce((acc, i) => acc + i.qty * i.plato.precio, 0)

  const term = search.trim().toLowerCase()
  const menuFiltrado = useMemo(() => {
    if (!term) return menu
    return menu
      .map((cat) => ({
        ...cat,
        platos: cat.platos.filter(
          (p) =>
            p.nombre.toLowerCase().includes(term) || cat.categoria.toLowerCase().includes(term),
        ),
      }))
      .filter((cat) => cat.platos.length > 0)
  }, [term])

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: 'radial-gradient(circle at center, #1e1e1e 0%, #121212 100%)' }}
    >
      <style>{`
        @keyframes gastroGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .gastro-dynamic-banner {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d3436 50%, #ff6b00 100%);
          background-size: 200% 200%;
          animation: gastroGradient 10s ease infinite;
        }
        .gastro-text-shadow {
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
        }
      `}</style>
      {/* Barra superior del portafolio (no de GastroApp) */}
      <div className="border-b border-white/10 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            to="/proyectos"
            className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors"
          >
            <FaArrowLeft /> Volver a proyectos
          </Link>
          <a
            href="https://github.com/Miguel-Neira/GASTROAPP"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors"
          >
            <FaGithub /> Ver código en GitHub
          </a>
        </div>
      </div>

      {/* Header real de GastroApp */}
      <header className="sticky top-0 z-30 bg-white/5 backdrop-blur-md border-b border-white/10 shadow-lg p-4 mb-6">
        <div className="max-w-6xl mx-auto relative flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaUtensils className="text-2xl text-orange-500" />
            <h1 className="text-xl font-bold tracking-wider text-white">
              GASTRO<span className="text-orange-500">APP</span>
            </h1>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 px-4">
            <div
              className={`bg-black/60 border rounded-full px-3 py-1 flex items-center gap-2 ${
                estado.abierto ? 'border-emerald-500/30 text-emerald-400' : 'border-red-500/30 text-red-400'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${estado.abierto ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}
              />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-tight">
                {estado.abierto ? `Abierto hasta las ${estado.horaCierre}` : 'Cerrado hasta las 10:00 AM'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero de marca */}
      <section className="gastro-dynamic-banner relative text-center py-16 px-6 overflow-hidden">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-white gastro-text-shadow">
          GASTRO<span className="text-orange-300">APP</span>
        </h2>
        <p className="text-base md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Sabores auténticos de Chile en el corazón de Puente Alto.
        </p>

        <div className="flex justify-center mb-10">
          <div className="bg-black/40 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md inline-flex gap-2">
            <button
              type="button"
              onClick={() => setModo('mesa')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                modo === 'mesa'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FaUtensils /> Pedir en Mesa
            </button>
            <button
              type="button"
              onClick={() => setModo('domicilio')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                modo === 'domicilio'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FaMotorcycle /> Pedido a Domicilio
            </button>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-xl max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-left md:text-center">
          <div className="relative flex flex-col items-center justify-center">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-sm font-medium text-gray-300">
                Hoy: <span className="text-white">{estado.horario}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-black/20 px-2 py-0.5 rounded-full border border-white/5">
                <span
                  className={`w-2 h-2 rounded-full ${estado.abierto ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}
                />
                <span
                  className={`text-[10px] uppercase tracking-wider font-bold ${estado.abierto ? 'text-green-400' : 'text-red-400'}`}
                >
                  {estado.abierto ? 'Abierto' : 'Cerrado'}
                </span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowHorario((v) => !v)}
              className="text-xs text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1"
            >
              Ver disponibilidad
              <FaChevronDown
                className={`text-[10px] transition-transform duration-300 ${showHorario ? 'rotate-180' : ''}`}
              />
            </button>
            {showHorario && (
              <div className="absolute top-full mt-3 w-56 bg-[#1a1a1a] border border-white/10 rounded-xl p-4 z-20 shadow-2xl">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-gray-400">Lun - Vie</span>
                    <span className="font-medium text-white">10:00 - 19:00</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-gray-400">Sáb</span>
                    <span className="font-medium text-white">10:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Dom</span>
                    <span className="font-medium text-white">CERRADO</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 justify-center">
            <a
              href="https://wa.me/56931204159"
              target="_blank"
              rel="noreferrer"
              className="flex-1 max-w-[140px] bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              <FaWhatsapp /> WhatsApp
            </a>
            <a
              href="tel:+56931204159"
              className="flex-1 max-w-[140px] bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              <FaPhone /> Llamar
            </a>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-lg font-semibold mb-2">Encuéntranos</p>
            <a
              href="https://maps.app.goo.gl/TjeuRR9bagQmvcA3A"
              target="_blank"
              rel="noreferrer"
              className="relative w-full max-w-xs mx-auto block group rounded-2xl overflow-hidden border border-white/10 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              style={{ paddingBottom: '75%' }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.960244795779!2d-70.5815886236683!3d-33.618600100000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662d7110901e17b%3A0x33441a1532824316!2sPlaza%20de%20Puente%20Alto!5e0!3m2!1ses-419!2scl!4v1701800000000!5m2!1ses-419!2scl"
                title="Ubicación en Puente Alto"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full border-0"
                style={{
                  filter: 'grayscale(100%) invert(90%) sepia(50%) hue-rotate(180deg) saturate(200%)',
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </a>
            <a
              href="https://maps.app.goo.gl/TjeuRR9bagQmvcA3A"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-gray-400 mt-3 w-full hover:text-orange-500 transition-colors"
            >
              Plaza de Puente Alto, Chile
            </a>
          </div>
        </div>
      </section>

      {/* Hero de búsqueda */}
      <section className="text-center py-10 px-6">
        <h2 className="text-2xl sm:text-4xl font-black mb-3 tracking-tighter text-white">
          SABORES QUE <span className="text-orange-500 italic">ENAMORAN.</span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto mb-6">
          Explora nuestra selección exclusiva de platos artesanales.
        </p>
        <div className="max-w-md mx-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar plato..."
            className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl py-3 px-5 text-center focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white placeholder-gray-500"
          />
        </div>
      </section>

      {/* Nav de categorías */}
      {!term && (
        <nav className="flex overflow-x-auto gap-3 px-6 pb-6 max-w-6xl mx-auto no-scrollbar">
          {menu.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.categoria] ?? FaUtensils
            return (
              <a
                key={cat.categoria}
                href={`#cat-${cat.categoria}`}
                className="flex-none flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:bg-orange-500 hover:border-orange-500 transition-colors text-sm font-medium"
              >
                <Icon /> {cat.categoria}
              </a>
            )
          })}
        </nav>
      )}

      {/* Menú */}
      <main className="max-w-6xl mx-auto px-6 pb-20 pt-4">
        {menuFiltrado.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No encontramos platos para "{search}".
          </p>
        )}
        {menuFiltrado.map((cat) => (
          <section key={cat.categoria} id={`cat-${cat.categoria}`} className="mb-12 scroll-mt-24">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-3 text-white">
              <span className="w-8 h-1 bg-orange-500 rounded-full" />
              {cat.categoria}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {cat.platos.map((plato) => (
                <PlatoCard
                  key={plato.id}
                  plato={plato}
                  qty={cart[plato.id] || 0}
                  onAdd={() => add(plato)}
                  onRemove={() => remove(plato.id)}
                  modoMesa={modo === 'mesa'}
                />
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Footer real de GastroApp */}
      <footer className="bg-[#121212] border-t-2 border-[#FF6B00] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
          <div className="space-y-4">
            <p className="text-sm font-bold text-white">
              © 2026 GASTROAPP | Desarrollado por <br className="md:hidden" />
              <span className="text-orange-500">Miguel Neira Nadal</span>
              <br />
              <span className="block text-center md:text-left mt-1">
                <Link
                  to="/proyectos"
                  className="text-gray-500 hover:text-orange-500 transition-colors text-[10px] font-bold uppercase tracking-widest"
                >
                  Volver a proyectos
                </Link>
              </span>
            </p>
            <a
              href="https://wa.me/56931204159"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-black py-2.5 px-6 rounded-full transition-all transform hover:-translate-y-1 shadow-lg shadow-orange-500/20 uppercase tracking-widest"
            >
              <FaWhatsapp className="text-sm" /> ¿Buscas una web? Contáctame
            </a>
          </div>

          <div className="flex flex-col items-center gap-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
              Conectemos
            </p>
            <div className="flex gap-8">
              <a
                href="https://www.linkedin.com/in/miguel-neira-nadal-906274332/"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors text-xl"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/Miguel-Neira"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors text-xl"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.instagram.com/migueeliiiinn/"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors text-xl"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className="text-center md:text-right space-y-2">
            <p className="text-xs font-black uppercase text-gray-500 tracking-widest">
              Visítanos en
            </p>
            <div className="flex items-center justify-center md:justify-end gap-2">
              <a
                href="https://www.instagram.com/_epic_animes/"
                target="_blank"
                rel="noreferrer"
                className="text-lg font-bold text-white hover:text-orange-500 transition-colors"
              >
                Epic Animes
              </a>
              <a
                href="https://www.instagram.com/_epic_animes/"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <FaInstagram className="text-sm" />
              </a>
            </div>
            <a
              href="https://maps.app.goo.gl/TjeuRR9bagQmvcA3A"
              target="_blank"
              rel="noreferrer"
              className="text-[10px] text-gray-500 hover:text-white transition-colors block italic"
            >
              Paseo Concha y Toro, Av. Concha y Toro 93, Local 5, Puente Alto (Plaza de Puente Alto)
            </a>
          </div>
        </div>
      </footer>

      {/* Toast de aviso (igual al showNotification() de la app real) */}
      {toast && (
        <div className="fixed bottom-6 left-6 z-[100] w-72 md:w-80">
          <div className="p-3 rounded-xl shadow-[0_20px_50px_rgba(249,115,22,0.4)] border border-orange-500/30 backdrop-blur-md border-l-4 border-l-orange-500 bg-orange-500/20 text-white font-bold">
            <div className="flex items-center gap-3">
              <FaShoppingBasket className="mt-1 shrink-0" />
              <p className="text-sm flex-grow">{toast}</p>
              <button
                type="button"
                onClick={() => setToast(null)}
                aria-label="Cerrar aviso"
                className="text-gray-300 hover:text-white shrink-0"
              >
                <FaTimes className="text-xs" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botón flotante del carrito — oculto en modo "Pedir en Mesa", igual que en la app real */}
      {modo !== 'mesa' && (
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          aria-label="Abrir carrito"
          className="fixed bottom-6 right-6 z-50 bg-orange-500 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
        >
          <FaShoppingBasket className="text-2xl" />
          {totalQty > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-orange-600 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center">
              {totalQty}
            </span>
          )}
        </button>
      )}

      <CartDrawer
        open={cartOpen && modo !== 'mesa'}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        total={totalPrice}
        onAdd={add}
        onRemove={remove}
        onDelete={deleteItem}
        onCheckoutDone={() => setCart({})}
      />
    </div>
  )
}

export default GastroAppDemo
