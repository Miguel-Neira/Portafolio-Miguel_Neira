// Divisor diagonal entre secciones. `color` es el color de relleno (debe
// coincidir con el fondo de la sección que viene inmediatamente después).
// `flip` invierte la diagonal (de "/" a "\").
function SectionDivider({ color = '#ffffff', flip = false }) {
  return (
    <div className="diagonal-divider -mt-px -mb-px" aria-hidden="true">
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points={flip ? '0,0 1200,80 1200,0' : '0,80 1200,0 1200,80'}
          fill={color}
        />
      </svg>
    </div>
  )
}

export default SectionDivider
