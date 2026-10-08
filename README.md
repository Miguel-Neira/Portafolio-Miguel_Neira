# Portafolio — Miguel Neira Nadal

Portafolio personal construido con **React + Vite + Tailwind CSS v4**, con animaciones ligeras
(`framer-motion`) y enrutamiento de página (`react-router-dom`). Incluye secciones de perfil
profesional (basadas en el CV), habilidades, certificaciones, contacto, y una página dedicada
de proyectos (`/proyectos`) donde se puede elegir cuál proyecto revisar.

## Estructura

```
src/
  components/   Navbar, Hero, About, Skills, ProjectCard, Certifications, Contact, Footer,
                SectionDivider (divisor diagonal entre secciones)
  pages/        Home.jsx (landing) y ProjectsPage.jsx (listado de proyectos, ruta /proyectos)
  data/
    projects.js  Datos de cada proyecto mostrado (título, descripción, stack, links, estado)
```

## Cómo correr en local

```bash
npm install
npm run dev
```

## Proyectos mostrados

Los datos de cada tarjeta están en [`src/data/projects.js`](src/data/projects.js). Campos clave:

- `demoUrl`: URL de la demo en vivo. Queda en `null` hasta desplegar cada proyecto — mientras
  tanto la tarjeta muestra "Demo próximamente" en vez de un enlace roto.
- `githubUrl`: enlace al repositorio. Se deja en `null` para el proyecto de San Bernardo
  (ver más abajo).
- `status`: controla el badge visual (`publico`, `en-desarrollo`, `privado`,
  `privado-en-progreso`).

### Sobre el proyecto de San Bernardo ("Deportes San Bernardo")

**Actualización 2026-10-06:** el usuario ya recibió la acreditación formal de su participación en
este proyecto (práctica profesional, 30 jul – 5 oct 2026). Por eso la tarjeta ya no depende de una
variable de entorno para mostrarse — es permanentemente visible. Lo que **sigue sin poder
reutilizarse** es el código/sistema en sí (es institucional), así que `githubUrl` se mantiene en
`null` a propósito (botón "Privado"). El campo `demoUrl` queda en `null` hasta que el usuario
entregue la URL real del sitio oficial — cuando la tenga, basta con setearla en
`src/data/projects.js` y el pill "Deportes San Bernardo" pasa a ser un enlace externo funcional
(la lógica en `ProjectCard.jsx` ya lo soporta, usando `demoPlaceholder` como texto del botón en
vez del genérico "Ver proyecto").

## Próximos pasos (pendiente de hacer por el usuario)

No pude crear cuentas en servicios de hosting (Vercel, Render, Railway, PythonAnywiere, etc.) ni
iniciar sesión en GitHub CLI — son acciones que debe hacer el propio usuario. Una vez creadas las
cuentas, los pasos de despliegue son:

1. **Portafolio (este proyecto)**: importar el repo en [vercel.com](https://vercel.com), framework
   detectado automáticamente (Vite). Ya incluye `vercel.json` con el rewrite necesario para que
   `/proyectos` funcione al recargar la página directamente.
2. **GastroApp / EpicAnimes (Django)**: necesitan un host que corra Python (Render, Railway,
   PythonAnywhere). Falta agregar `gunicorn`/`whitenoise` a `requirements.txt`, variables de
   entorno para `SECRET_KEY`/`DEBUG`/`ALLOWED_HOSTS`, y una base de datos (SQLite no persiste bien
   en la mayoría de estos hosts gratuitos, conviene Postgres gestionado).
3. **Ecommerce EpicAnimes (React + Node)**: el frontend puede ir a Vercel; el backend
   (Express + MySQL + Webpay) necesita un host que soporte Node + MySQL (Railway, Render).
4. Una vez cada demo esté arriba, actualizar `demoUrl` en `src/data/projects.js` con la URL real.

## Registro de errores y decisiones (sesión 2026-10-01)

### 1. `pdftoppm is not installed` al leer el CV en PDF
**Problema:** la herramienta de lectura de PDF por páginas necesita Poppler, que no está
instalado en este equipo.
**Solución:** se instaló `pypdf` (`python -m pip install pypdf`) y se extrajo el texto del CV
directamente con Python. El contenido del CV (perfil, experiencia, formación, certificaciones,
habilidades) se usó para llenar las secciones "Sobre mí", "Habilidades" y "Certificaciones".

### 2. La herramienta Bash no funciona en este entorno
**Problema:** cualquier comando con el tool de Bash fallaba con errores de Cygwin
(`dofork: child -1 ... died unexpectedly`, `Resource temporarily unavailable`).
**Solución:** se usó PowerShell para todos los comandos de instalación, scaffolding y git durante
toda la sesión.

### 3. `preview_start` no encontraba `.claude/launch.json`
**Problema:** se creó primero dentro de `portfolio-web/.claude/launch.json`, pero la herramienta
de preview lo busca relativo a la raíz del proyecto (`Portafolio-Miguel_Neira/`), no a la
subcarpeta del proyecto React.
**Solución:** se movió `launch.json` a la raíz y se usó `npm --prefix portfolio-web run dev` en
`runtimeArgs` para que corriera el servidor dentro de la subcarpeta correcta.

### 4. Pantalla en negro / contenido con opacidad 0 al tomar capturas
**Problema:** las primeras capturas de pantalla se veían negras o con texto invisible.
**Causa real:** no fue un bug — las secciones usan animaciones de entrada (`framer-motion`,
`opacity: 0 → 1`) que tardan una fracción de segundo en dispararse tras cargar o montar un
componente. Las capturas tomadas en el instante exacto de la navegación alcanzaban a pillar el
estado inicial.
**Solución:** se confirmó esperando ~1 segundo antes de recapturar; no se tocó el código de
animación.

### 5. Paleta demasiado oscura (feedback del usuario)
**Problema:** el diseño inicial usaba un tema oscuro (fondo casi negro). El usuario pidió algo
más claro.
**Solución:** se reemplazó toda la paleta por tonos claros (fondo `#f7f8fc` / `#edf0f9`,
superficies blancas, texto gris oscuro) manteniendo los mismos acentos morado/cian del degradado.

### 6. Sección de inicio (Hero) demasiado básica (feedback del usuario)
**Problema:** el Hero original era solo texto centrado, sin indicar visualmente que había más
contenido debajo.
**Solución:** se agregó una columna con una tarjeta "de código" decorativa, íconos de
tecnologías flotando con animación, una fila de métricas rápidas (años de experiencia, proyectos,
certificaciones) y una flecha animada al pie que invita a seguir bajando.

### 7. "Ver Proyectos" debía abrir una página dedicada, no solo hacer scroll (feedback del usuario)
**Problema:** el botón hacía scroll a una sección de la misma página en vez de permitir elegir
qué proyecto revisar.
**Solución:** se instaló `react-router-dom`, se dividió la app en `Home` (`/`) y
`ProjectsPage` (`/proyectos`), y se agregó `vercel.json` con un rewrite para que la ruta funcione
también al recargar directamente en producción.

### 8. Componente `Projects.jsx` quedó obsoleto tras el cambio de rutas
**Problema:** al mover la grilla de proyectos a `ProjectsPage.jsx`, el componente de sección
original quedó sin usarse.
**Solución:** se eliminó `src/components/Projects.jsx` (no quedó CSS ni código duplicado sin
usar).

## Registro de errores y decisiones (sesión 2026-10-01, segunda ronda de feedback)

### 9. Tarjetas de proyecto y "Habilidades" se veían planas/sin color (feedback del usuario)
**Solución:** se creó [`src/utils/tagColor.js`](src/utils/tagColor.js), que asigna un color
consistente (por hash del texto) a cada etiqueta de tecnología desde una paleta de 8 colores. Se
agregó un campo `icon` y `accent` (gradiente de 2 colores) a cada proyecto en
`src/data/projects.js`, usado como encabezado de color + ícono en `ProjectCard.jsx`. En
`Skills.jsx` se le dieron colores de marca reales a los íconos del stack (Python azul, MySQL
teal, Docker azul, etc.) y cada grupo de habilidades tiene su propio ícono con fondo de color.

### 10. Sección "Contacto" rediseñada + LinkedIn con URL incompleta en el texto visible
**Problema:** el `href` del enlace de LinkedIn ya apuntaba a la URL completa
(`.../miguel-neira-nadal-906274332/`), pero el **texto visible** mostraba una versión recortada
("linkedin.com/in/miguel-neira-nadal"), lo que daba la impresión de que el enlace estaba mal.
**Solución:** se corrigió el texto visible para mostrar el handle completo con los números, y se
rediseñó toda la sección como una tarjeta de dos columnas (panel degradado + lista de contacto
con íconos de color).
**Aclaración importante:** se probó el clic real en el navegador y el enlace **sí navega
correctamente** a LinkedIn — lo que aparece después es la pantalla de "Únete a LinkedIn" propia
de LinkedIn, no un error del portafolio. Eso ocurre cuando la configuración de "perfil público"
de la cuenta de LinkedIn restringe la vista a usuarios no conectados. Se puede ajustar en
LinkedIn → Configuración → Visibilidad → "Editar perfil público" (activar las secciones que se
quieran visibles para cualquier visitante).

### 11. Bug real de CSS: los `<h2>` blancos se veían negros en el panel de Contacto
**Problema:** al poner `text-white` en un `<h2>` dentro del nuevo panel con fondo degradado, el
texto seguía viéndose oscuro.
**Causa:** Tailwind CSS v4 (`@import "tailwindcss"`) define *cascade layers* (`@layer base,
components, utilities`). Cualquier CSS fuera de un `@layer` se considera "sin capa" y en la
especificación CSS **las reglas sin capa siempre ganan sobre las reglas con capa**, sin importar
especificidad — por eso la regla global `h1, h2, h3 { color: var(--text-h) }` le ganaba a la
utilidad `.text-white` de Tailwind, aunque esta última tuviera más especificidad aparente.
**Solución:** se movieron los estilos base (`body`, `h1/h2/h3`, `a`, reset de `box-sizing`, etc.)
dentro de `@layer base { ... }` en `index.css`, para que participen del mismo sistema de capas y
las utilidades de Tailwind puedan sobreescribirlos normalmente.

## Registro de errores y decisiones (sesión 2026-10-01, tercera ronda de feedback)

### 12. Menú móvil se veía "mal" — contenido de fondo se transparentaba
**Problema:** el `<ul>` del menú hamburguesa en móvil usaba `bg-white/95` (95% opacidad), dejando
ver el texto del Hero detrás, lo que lo hacía ver roto/sucio.
**Solución:** se cambió a `bg-white` sólido + `shadow-lg`, y la barra superior (`header`) ahora
también se pone sólida (`bg-white/95` + blur) mientras el menú está abierto, no solo al hacer
scroll.

### 13. "Miguel Neira Nadal" y el título de Proyectos
**Solución:** por pedido del usuario, el nombre en el Hero ahora es negro sólido (sin degradado
en "Nadal"). El título de `/proyectos` se agrandó y se le dio más peso (`text-4xl md:text-6xl
font-bold`) con la palabra "proyecto" resaltada en degradado, para que no se viera como texto
plano de párrafo.

### 14. Mini-tarjetas de íconos en "Stack y competencias" parecían botones sin serlo
**Problema:** tenían `hover:shadow-md hover:-translate-y-0.5`, dando la sensación de que eran
clicables cuando solo son decorativas.
**Solución:** se quitó el efecto hover de esas tarjetas específicas (siguen con sombra base fija,
sin reaccionar al pasar el mouse).

### 15. Botones de correo (`mailto:`) "no funcionan"
**Diagnóstico:** se probó el clic real en el navegador — el `href="mailto:..."` está bien armado
en ambos botones (Hero y "Escríbeme un correo"). Esto **no es un bug del código**: un enlace
`mailto:` solo abre un cliente de correo si el sistema operativo/navegador tiene uno configurado
por defecto (Outlook, o Gmail registrado como handler). Sin esa configuración, el navegador no
hace nada visible al hacer clic, lo cual es el comportamiento esperado, no un error.
**Solución aplicada:** se agregó un botón "Copiar" junto al correo (en el panel de Contacto y en
cada fila de contacto) que copia la dirección al portapapeles con `navigator.clipboard`, como
alternativa que siempre funciona sin depender de la configuración del sistema.

## Registro de errores y decisiones (sesión 2026-10-01, cuarta ronda)

### 16. Badges y slot de demo personalizados por proyecto
Por pedido del usuario: EpicAnimes ahora es "Proyecto de Título" (sin slot de demo, solo botón de
código); el Proyecto San Bernardo es "Práctica Profesional", con descripción menos técnica y
oculto por completo salvo que `VITE_SHOW_SB_PROJECT=True` en `portfolio-web/.env` (variable
"horneada" en el build — cambiarla requiere `npm run build` + redeploy). `ProjectCard.jsx` se
generalizó para soportar `badge` explícito, `showDemoSlot: false` y `demoPlaceholder` por
proyecto, en vez de un mapeo genérico por `status`.

### 17. De "iframe a un backend externo" a "recreación estática en React"
**Decisión del usuario:** en vez de embeber GASTROAPP real (que necesita hosting propio) en un
`<iframe>`, se reconstruyó su página de inicio (menú + carrito) directamente como componentes
React dentro del portafolio — sin backend, sin necesidad de desplegar nada aparte. Se reutilizaron
las imágenes reales de los platos (copiadas a `src/assets/gastroapp/`) y los mismos datos que la
fixture `demo_menu.json` del proyecto original. El carrito es 100% client-side (`useState` +
`localStorage`), y el checkout termina en una pantalla de "pedido simulado" que aclara
explícitamente que no se procesan pedidos ni pagos reales (para no confundir a un visitante real).
Se excluyó a propósito el login/registro ("sácalo del inicio de sesión", pidió el usuario) — solo
se replicó la experiencia pública de navegar el menú y comprar.
**Se eliminó** el enfoque anterior (`VITE_GASTROAPP_DEMO_URL` + iframe) por quedar obsoleto; los
cambios hechos en el backend real de GASTROAPP (middleware de `frame-ancestors`, cookies
`SameSite=None`) se dejaron igual, por si el usuario despliega esa app por su cuenta más adelante
por otro motivo — no estorban aunque el portafolio ya no los use.

### 18. Mismo bug de contraste (`h1`/`h2`/`h3`) reapareció en los componentes nuevos de GastroApp
**Problema:** el Hero ("SABORES QUE ENAMORAN"), los títulos de categoría ("Pizzas", etc.) y los
títulos del carrito ("Tu carrito", "¡Pedido simulado con éxito!") se veían casi invisibles —
texto casi negro (`#14161f`) sobre fondos oscuros, por la misma regla base `h1,h2,h3 { color:
var(--text-h) }` que ya se había corregido antes para la sección de Contacto, pero que no se
reaplicó al escribir estos componentes nuevos.
**Solución:** se agregó `text-white` explícito a cada encabezado afectado en `GastroAppDemo.jsx`
y `CartDrawer.jsx`. Se revisó con `grep` el resto de encabezados del proyecto para confirmar que
no quedó ningún otro caso (los demás están sobre fondos claros, donde el color oscuro por defecto
es el correcto).

### 19. Navbar global duplicado al entrar a la demo de GastroApp
**Problema:** al ocultar el header propio del iframe y reemplazarlo por la recreación en React, el
`<Navbar />` fijo del portafolio (transparente, pensado para ir sobre el Hero claro de la home)
quedó flotando encima del propio header oscuro de GastroApp, superponiéndose de forma confusa.
**Solución:** `App.jsx` ahora detecta la ruta `/proyectos/gastroapp` y oculta el `Navbar`/`Footer`
globales en ella, dejando que la página se sienta como una experiencia aparte con su propio
header y footer "de marca".

### 20. Footer: se reemplazó por el footer REAL (no uno genérico), menos el bloque de Epic Animes
**Corrección sobre la entrada anterior:** el primer intento reemplazó todo el footer por uno
genérico simplificado — el usuario pidió explícitamente lo contrario: "deja el footer que tengo en
gastroapp". Se volvió a `carta/templates/layouts/base.html` a copiar el footer real tal cual
(copyright + "Desarrollado por Miguel Neira Nadal", botón "¿Buscas una web? Contáctame" con el
WhatsApp real, bloque "Conectemos" con LinkedIn/GitHub/Instagram, borde superior en el color exacto
`#FF6B00`), quitando únicamente la columna "Visítanos en Epic Animes" (dirección física del local),
que es la única parte que no tenía sentido mostrar en una demo de portafolio.

### 21. Pase completo de fidelidad visual contra el código real (pedido explícito: "revisa bien el código")
Tras varias rondas de correcciones puntuales, se leyó `carta/templates/layouts/base.html` completo
de una sola vez (en vez de ir parcheando lo que el usuario iba encontrando) y se comparó contra
`GastroAppDemo.jsx` sección por sección. Se encontraron y corrigieron, en un solo pase:
- Faltaba toda la sección de marca superior (toggle "Pedir en Mesa/Domicilio", panel de horario,
  botones reales de WhatsApp/Llamar, mini-mapa de Google Maps con el filtro gris/sepia original) —
  solo se había recreado la mitad inferior de la página (buscador + menú).
- El botón del carrito estaba **dentro del header** en vez de ser un botón flotante
  `fixed bottom-6 right-6` de 64px como en el original.
- Faltaba el fondo real: `body` usa un `radial-gradient` sutil, y el banner de marca usa un
  degradado diagonal **animado** (`linear-gradient` + `@keyframes` cambiando `background-position`
  cada 10s) que da el brillo cálido naranja visible en las esquinas.
- El margen `mb-6` bajo el header (que deja ver un espacio oscuro antes del degradado) no estaba.
- El horario/estado "Abierto"/"Cerrado" era texto fijo; ahora se calcula con la hora real de Chile
  (`America/Santiago`, vía `Intl.DateTimeFormat`) replicando exactamente las reglas de
  `carta/utils.py` (`is_restaurant_open`): Lun-Vie 10:00-19:00, Sáb 10:00-18:00, Dom cerrado —
  se actualiza solo cada 30s.
- **Mismo bug de contraste (`text-white` faltante en `h1`/`h2`) reapareció 3 veces más** en esta
  ronda (el logo "GASTRO" del header, el "GASTRO" del banner de marca, y "SABORES QUE ENAMORAN")
  — cada vez que se escribía un encabezado nuevo se olvidaba la clase. Se corrigieron los tres y
  se volvió a barrer todo el archivo con `grep` para confirmar que no quedó ninguno más.
- Colores exactos ajustados: `text-orange-300` (no `orange-400`) en el título del banner, borde del
  footer en el hex real `#FF6B00` (no el `orange-500` de Tailwind, que es un naranja ligeramente
  distinto), y sombra de texto (`text-shadow: 2px 2px 8px rgba(0,0,0,.7)`) en el título del banner.
- **Hallazgo curioso:** el solapamiento entre el logo "GASTROAPP" y el badge de estado en el header
  en pantallas angostas (~375px) **también ocurre en la app real** (se verificó abriendo
  `localhost:8000` a ese ancho) — es un bug preexistente del diseño original, no introducido por
  esta recreación, así que se dejó igual para mantener fidelidad.

## Registro de errores y decisiones (sesión 2026-10-06)

### 22. Ajustes de modo "Pedir en Mesa" vs "Pedido a Domicilio" en la demo de GastroApp
**Hallazgo del usuario:** ambos modos se veían iguales en la recreación — solo cambiaba el estilo
del botón activo. En la app real, "Pedir en Mesa" oculta por completo los botones "Agregar" y el
carrito flotante (el JS original hace `querySelectorAll('button')` buscando texto "agregar" y los
oculta con `display:none`, y el botón/drawer del carrito están condicionados a
`not es_modo_mesa` en el template). Se replicó pasando un prop `modoMesa` a `PlatoCard` (oculta los
controles de cantidad/"Agregar") y condicionando el botón flotante + `CartDrawer` a
`modo !== 'mesa'`. También se cambió el modo inicial por defecto a `'mesa'` (pedido explícito del
usuario: "el principal es pedir en mesa").

### 23. Toast de "local cerrado", sin toast de éxito, mapa/WhatsApp/Llamar reordenados
Se agregó el toast `Lo sentimos, el local está cerrado...` (mismo estilo/posición que el
`showNotification()` real, esquina inferior izquierda) cuando se intenta agregar un plato fuera de
horario — y a propósito **no** se agregó un toast equivalente al agregar con éxito (pedido
explícito). Se quitó el ícono de perfil/login del header (no aplica a esta demo). Los botones
WhatsApp/Llamar pasaron de apilados a lado a lado (`flex-1`, máx. 140px c/u) porque apilados se
veían "raros" según el usuario; el contenedor del mapa se unificó visualmente con el resto de
tarjetas (`rounded-2xl`, borde, sombra en hover). El badge superior ahora dice literalmente
"CERRADO HASTA LAS 10:00 AM" / "ABIERTO HASTA LAS {hora de cierre real}" en vez del genérico
"Tomando pedidos" original.

### 24. Vaivén sobre "Visítanos en Epic Animes" en el footer de la demo
El usuario pidió primero quitar ese bloque (dirección real del local), luego — en un mensaje
posterior — pidió devolverlo con la ubicación exacta, además de actualizar el Instagram personal
del footer de `aleejooox` a `migueeliiiinn` (su handle nuevo). Se restauró tal cual el original
(nombre "Epic Animes" enlazando a `_epic_animes`, dirección completa) y se actualizó el Instagram
personal en la sección "Conectemos".

### 25. Datos de proyectos actualizados tras cambios reales en los repos del usuario
- **GastroApp**: el código fuente real dejó de ser público — solo quedó un repo
  `GASTROAPP-Imagenes` con las imágenes del proyecto, no el código. Se actualizó `githubUrl` a ese
  repo y se agregó soporte en `ProjectCard.jsx` para un `githubLabel` personalizado (dice
  "Imágenes" en vez de "Código", para no ser engañoso sobre qué contiene ese repositorio).
- **EpicAnimes E-commerce (React)**: su código ahora es privado → `githubUrl: null`, muestra
  "Privado" igual que San Bernardo.
- **Proyecto San Bernardo**: acreditación formal recibida (ver sección más arriba) — se quitó la
  variable de entorno `VITE_SHOW_SB_PROJECT` (ya no hacía falta ocultarlo) y se borraron
  `portfolio-web/.env` / `.env.example`, que quedaron sin ningún otro uso. La descripción se
  actualizó con el alcance real de lo hecho en la práctica (desarrollo, diseño, ciberseguridad y
  testing de la plataforma completa) y las fechas exactas (30 jul – 5 oct 2026).
- `DemoSlot` en `ProjectCard.jsx` ahora usa `demoPlaceholder` como texto del enlace cuando existe
  (en vez del genérico "Ver proyecto"), para que al activar la URL real de Deportes San Bernardo el
  botón siga diciendo "Deportes San Bernardo" en vez de un texto genérico.

### 26. CV actualizado e integrado al portafolio
Se generó `CV_Miguel_Neira_Analista_Datos.pdf` (con `reportlab`, ya que no existía ningún archivo
fuente editable — solo PDFs previos) agregando la práctica profesional de San Bernardo como primera
entrada de experiencia, manteniendo el resto del contenido del CV original. Se agregó un botón
"Descargar CV" en el Hero del portafolio, sirviendo el archivo desde
`portfolio-web/public/cv/CV_Miguel_Neira_Analista_Datos.pdf`.
**Bug encontrado y corregido:** el estilo del nombre (22pt) no tenía `leading` (interlineado)
definido explícitamente — ReportLab usa un valor por defecto de 12pt sin importar el tamaño de
fuente, así que el texto de contacto quedó dibujado encima del nombre en vez de debajo. Se corrigió
fijando `leading` en todos los estilos de texto grande. De paso, se ajustaron márgenes y espaciados
para que el CV completo entrara en **una sola página** (antes se derramaba una línea a una segunda
página casi vacía). Verificado renderizando el PDF a imagen con `PyMuPDF` (no había herramientas de
conversión de PDF a imagen disponibles en este equipo — se instaló `pymupdf` para poder revisarlo
visualmente sin depender de Poppler).

## Registro de errores y decisiones (sesión 2026-10-06, segunda ronda)

### 27. Faltaba la práctica de San Bernardo en la sección "Experiencia" del portafolio
**Hallazgo del usuario:** se había agregado al CV pero no a `About.jsx` (la sección "Sobre mí" del
sitio). Se agregó como primera entrada de `EXPERIENCE`, con los mismos puntos que el CV, para que
ambos documentos cuenten la misma historia.

### 28. Se quitó "Encargado de Ventas y Gestión Operativa" del CV y del portafolio
**Pedido del usuario:** ese rol (ventas/operaciones en la tienda física) no aporta a un perfil de
Analista de Datos. Se eliminó por completo de `About.jsx` y de `build_cv.py`, y se ajustó el párrafo
de "Perfil profesional" (en ambos lugares) para quitar la frase "en roles comerciales de alta
demanda", que solo tenía sentido por ese rol.
**Al regenerar el CV sin esa sección** el contenido se derramó a una segunda página con los
márgenes "relajados" que se habían puesto después de la ronda anterior — se tuvo que recalcular el
espaciado (a mano, iterando varias veces) para volver a entrar en una sola página sin que se viera
apretado. Quedó documentado por si hay que repetir el ejercicio: cada ajuste de `topMargin` /
`bottomMargin` en mm, `spaceBefore`/`spaceAfter` de cada estilo y el `spaceAfter` del `HRFlowable`
de `section_header()` cuentan para el total — ese último se había quedado hardcodeado en 5pt en una
ronda anterior y no se tocaba al ajustar `styles["section"]`.

### 29. EpicAnimes: se quitó la tecnología y las integraciones de la descripción
**Pedido del usuario:** "no menciones la tecnología que se utiliza ni tampoco las integraciones,
algo similar al de San Bernardo". Se reescribió la descripción quitando "Django" y "verificación
por OTP vía correo" (reemplazado por "verificación de identidad en el acceso", sin detalle de
mecanismo), y se recortaron las etiquetas de `stack` a solo `Python, Django, SQL` (se sacaron
`OTP / Seguridad` y `Dashboards`, que insinuaban detalles de arquitectura/funcionalidad).

### 30. San Bernardo: texto final del usuario + URL real activada
Se reemplazó la descripción por el texto exacto que entregó el usuario, y `demoUrl` pasó de `null`
a `https://deportes.sanbernardo.cl` — el botón "Deportes San Bernardo" ya no es un texto inerte,
es un link real que abre el sitio oficial en una pestaña nueva (gracias al soporte para
`demoPlaceholder` como texto del link, agregado en la ronda anterior).

## Registro de errores y decisiones (sesión 2026-10-06, tercera ronda)

### 31. Más espaciado antes de cada título de experiencia en el CV
El usuario encontró que los títulos de cada rol (ej. "Analista de Datos y Desarrollador de
Proyectos") quedaban muy pegados al bloque anterior. Se aumentó `spaceBefore` de los estilos
`role`/`roleRight` en `build_cv.py` (de 5 a 10pt) — deliberadamente **sin** tocar márgenes de
página para resolver esto, para no deshacer el ajuste; el espacio se recuperó en otro lado (ver
punto 33).

### 32. "Analista Programador" agregado como título técnico real
El usuario confirmó que sí posee formalmente el título técnico de Analista Programador (salida
intermedia de INACAP) y que "Ingeniero en Informática" está egresado con título en trámite — no se
asumió nada hasta confirmarlo, porque hubiera sido fácil inventar una credencial que no
corresponde. Se agregó como una segunda entrada en "Formación Académica" (CV y portafolio), debajo
de Ingeniería en Informática, con la etiqueta "(título en trámite)" en esta última para que quede
claro cuál está completo y cuál no.

### 33. Áreas de enfoque: se agregó "Desarrollo Web"
Pedido del usuario, tanto en el CV como en `About.jsx` del portafolio.

### 34. Enlace al portafolio en el CV: pendiente (no se inventó una URL)
El usuario pidió agregar el link del portafolio al CV, pero el sitio todavía no está desplegado a
un dominio público — no se inventó una URL de relleno. Cuando el portafolio tenga una URL real
(ej. `algo.vercel.app` o un dominio propio), agregar una línea más en el bloque de contacto de
`build_cv.py` (junto a LinkedIn) y regenerar.

### 35. Ajuste de espaciado fino para volver a 1 página tras agregar "Analista Programador"
Cada vez que se agrega contenido nuevo (la entrada de Analista Programador costó ~35-40pt), el CV
se derrama a una segunda página con solo 1-3 líneas. La forma más segura de recuperar espacio sin
deshacer el punto 31 es **recortar los márgenes de página** (`topMargin`/`bottomMargin` en
`SimpleDocTemplate`, terminaron en 7mm/6mm) en vez de los espaciados entre título y texto — reducir
márgenes no afecta la legibilidad interna, solo usa más del borde físico de la hoja. Como
referencia para la próxima vez que haya que ajustar esto: el flujo de trabajo que funciona es
generar → `PdfReader(...).pages` para contar páginas → si son 2, renderizar la página 2 a imagen
con `pymupdf` para ver exactamente cuánto contenido sobra → ajustar **márgenes primero**, y solo si
no alcanza, recortar `spaceAfter` de bullets/habilidades (nunca el `spaceBefore` de los títulos de
rol, que es justo lo que el usuario pidió agrandar).

### 36. Botones del Hero con colores distintos + se quitó "(título en trámite)"
**Pedido del usuario:** "Contactar" y "Descargar CV" se veían iguales (mismo borde gris genérico).
Se les dio identidad propia dentro de la paleta morado/cian del sitio: "Contactar" ahora es
`border-[#6d4aff] text-[#6d4aff]` (morado) y "Descargar CV" `border-[#06b6d4] text-[#0891b2]`
(cian), dejando "Ver proyectos" como el único botón sólido (degradado) — jerarquía visual clara:
1 acción primaria + 2 secundarias diferenciadas entre sí.
También, el usuario no recordaba con certeza los detalles de su título de Analista Programador —
para simplificar, se quitó la etiqueta "(título en trámite)" de "Ingeniería en Informática" en el
CV y el portafolio, dejando solo "(Egresado)" como ya decía el CV original.

## Advertencia pendiente para el usuario

No se detectó CSS duplicado sin usar dentro de este proyecto nuevo. Si en el futuro se reutilizan
clases o componentes de los otros proyectos (EpicAnimes, GastroApp, etc.) dentro de este
portafolio, se avisará antes de eliminar cualquier estilo que parezca no usarse, como se indicó.

**Pendiente de revisión:** `public/icons.svg` es un archivo que vino por defecto del scaffold
inicial de Vite y no se encontró ninguna referencia a él dentro de `src/` (se buscó con grep en
todo el proyecto). Parece no usarse, pero no se eliminó — queda a la espera de que el usuario lo
confirme, como se pidió.

## Registro de errores y decisiones (sesión 2026-10-08)

### 37. Portafolio subido a GitHub como repositorio privado
**Pedido del usuario:** subir el código del portafolio a `https://github.com/Miguel-Neira/Portafolio-Miguel_Neira.git`
como repositorio privado, sin que las carpetas de los demás proyectos (EpicAnimes, GASTROAPP,
SB-Proyect-DJANGO, Eccomerce-Epicanimes-NoTerminado) quedaran incluidas.

Como esas carpetas son **hermanas** de `portfolio-web/` (están al mismo nivel, no dentro de ella),
bastó con inicializar el repositorio de Git directamente dentro de `portfolio-web/` en vez de en la
carpeta raíz `Portafolio-Miguel_Neira/`. Así, Git nunca llega a "ver" el resto de las carpetas — ni
falta excluirlas a mano ni hay riesgo de subirlas por error.

Pasos realizados:
```bash
git init
git add -A
git commit -m "Initial commit: portafolio de Miguel Neira (React + Vite + Tailwind)"
git branch -M main
git remote add origin https://github.com/Miguel-Neira/Portafolio-Miguel_Neira.git
git push -u origin main
```

Se verificó con `git ls-tree -r HEAD --name-only` que el único contenido subido corresponde a
archivos dentro de `portfolio-web/` (incluyendo las imágenes y componentes de la recreación de
GastroApp, que sí son parte del portafolio) — ninguna carpeta de los otros proyectos quedó
incluida. El repositorio remoto ya existía vacío y configurado como privado por el usuario antes
del push.

### 38. Favicon nuevo (reemplaza el ícono por defecto de Vite)
**Pedido del usuario:** usar una imagen propia (avatar pixel-art) como favicon — hasta ahora se
había quedado el `favicon.svg` genérico que trae el scaffold de Vite por defecto.

La imagen llegó como `.webp` de 1254×1254. Se convirtió a **PNG de 512×512** (con Pillow) en vez de
usarla directamente como `.webp`, porque Safari (escritorio e iOS) todavía no soporta `.webp` como
favicon — PNG funciona en todos los navegadores sin excepción. Se guardó como
`public/favicon.png`, se actualizó el `<link rel="icon">` de `index.html` para apuntar a ella, y se
eliminó el `favicon.svg` anterior (quedaba sin uso, reemplazado). Verificado sirviendo
`http://localhost:5173/favicon.png` directamente en el navegador antes de subir el cambio.
