import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { FaCheckCircle, FaCreditCard, FaMinus, FaMoneyBillWave, FaPlus, FaTimes, FaTrash } from 'react-icons/fa'
import { formatCLP } from '../../data/gastroappMenu'

function CartDrawer({ open, onClose, items, total, onAdd, onRemove, onDelete, onCheckoutDone }) {
  const [step, setStep] = useState('cart') // 'cart' | 'checkout' | 'success'
  const [metodoPago, setMetodoPago] = useState('tarjeta')

  const close = () => {
    onClose()
    setTimeout(() => setStep('cart'), 300)
  }

  const confirmar = (e) => {
    e.preventDefault()
    setStep('success')
  }

  const finalizarTodo = () => {
    onCheckoutDone()
    close()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-black/60 z-40"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-[#141414] border-l border-white/10 z-50 flex flex-col text-white"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <h2 className="font-bold text-lg text-white">
                {step === 'success' ? 'Pedido simulado' : 'Tu carrito'}
              </h2>
              <button
                type="button"
                onClick={close}
                aria-label="Cerrar carrito"
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {step === 'cart' && (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                  {items.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center mt-10">
                      Aún no has agregado platos.
                    </p>
                  ) : (
                    items.map(({ plato, qty }) => (
                      <div key={plato.id} className="flex gap-3 items-center">
                        <img
                          src={plato.imagen}
                          alt={plato.nombre}
                          className="w-16 h-16 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{plato.nombre}</p>
                          <p className="text-gray-400 text-xs">${formatCLP(plato.precio)}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <button
                              type="button"
                              onClick={() => onRemove(plato.id)}
                              className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/10 hover:bg-orange-500 transition-colors"
                            >
                              <FaMinus className="text-[10px]" />
                            </button>
                            <span className="text-sm w-5 text-center">{qty}</span>
                            <button
                              type="button"
                              onClick={() => onAdd(plato)}
                              className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/10 hover:bg-orange-500 transition-colors"
                            >
                              <FaPlus className="text-[10px]" />
                            </button>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => onDelete(plato.id)}
                          aria-label="Quitar del carrito"
                          className="text-gray-500 hover:text-red-500 transition-colors p-2"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
                <div className="border-t border-white/10 p-5">
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Total</span>
                    <span className="text-white font-bold text-lg">${formatCLP(total)}</span>
                  </div>
                  <button
                    type="button"
                    disabled={items.length === 0}
                    onClick={() => setStep('checkout')}
                    className="w-full mt-3 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed rounded-2xl font-bold transition-colors"
                  >
                    Finalizar pedido
                  </button>
                </div>
              </>
            )}

            {step === 'checkout' && (
              <form onSubmit={confirmar} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                    Nombre completo
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                    Dirección de entrega
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                    Método de pago
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setMetodoPago('tarjeta')}
                      className={`p-3 rounded-xl border flex items-center gap-2 justify-center text-sm font-bold transition-colors ${
                        metodoPago === 'tarjeta'
                          ? 'border-orange-500 bg-orange-500/10'
                          : 'border-white/10 bg-white/5'
                      }`}
                    >
                      <FaCreditCard /> Tarjeta
                    </button>
                    <button
                      type="button"
                      onClick={() => setMetodoPago('efectivo')}
                      className={`p-3 rounded-xl border flex items-center gap-2 justify-center text-sm font-bold transition-colors ${
                        metodoPago === 'efectivo'
                          ? 'border-orange-500 bg-orange-500/10'
                          : 'border-white/10 bg-white/5'
                      }`}
                    >
                      <FaMoneyBillWave /> Efectivo
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Esta es una demo de interfaz dentro del portafolio: no se procesan pedidos ni
                  pagos reales.
                </p>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-3">
                    <span>Total</span>
                    <span className="text-white font-bold text-lg">${formatCLP(total)}</span>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-orange-500 hover:bg-orange-600 rounded-2xl font-bold transition-colors"
                  >
                    Confirmar pedido
                  </button>
                </div>
              </form>
            )}

            {step === 'success' && (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
                <FaCheckCircle className="text-6xl text-orange-500 mb-5" />
                <h3 className="text-xl font-bold mb-2 text-white">¡Pedido simulado con éxito!</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Así se vería la confirmación. Como esta es una demo de portafolio, ningún pedido
                  real fue enviado ni cobrado.
                </p>
                <button
                  type="button"
                  onClick={finalizarTodo}
                  className="px-6 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 font-bold text-sm transition-colors"
                >
                  Volver al menú
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer
