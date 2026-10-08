import { FaMinus, FaPlus } from 'react-icons/fa'
import { formatCLP } from '../../data/gastroappMenu'

function PlatoCard({ plato, qty, onAdd, onRemove, modoMesa }) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] overflow-hidden group hover:scale-[1.02] transition-all duration-500 hover:shadow-orange-500/10 hover:shadow-2xl">
      <div className="h-44 sm:h-48 overflow-hidden">
        <img
          src={plato.imagen}
          alt={plato.nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-bold text-white text-base sm:text-lg leading-tight">
            {plato.nombre}
          </h3>
          <span className="text-orange-500 font-black text-sm sm:text-base shrink-0">
            ${formatCLP(plato.precio)}
          </span>
        </div>
        <p className="text-gray-400 text-xs sm:text-sm mb-4 line-clamp-2">{plato.descripcion}</p>

        {modoMesa ? null : qty > 0 ? (
          <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl px-2 py-2">
            <button
              type="button"
              onClick={onRemove}
              aria-label="Quitar uno"
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 text-white hover:bg-orange-500 transition-colors"
            >
              <FaMinus className="text-xs" />
            </button>
            <span className="font-bold text-white">{qty}</span>
            <button
              type="button"
              onClick={onAdd}
              aria-label="Agregar uno"
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition-colors"
            >
              <FaPlus className="text-xs" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onAdd}
            className="w-full py-3 bg-white/5 border border-white/10 hover:bg-orange-500 hover:border-orange-500 text-white rounded-2xl transition-all font-bold flex items-center justify-center gap-2"
          >
            <FaPlus className="text-xs" /> Agregar
          </button>
        )}
      </div>
    </div>
  )
}

export default PlatoCard
