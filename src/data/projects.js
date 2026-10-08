// Datos de los proyectos mostrados en el portafolio.
// demoUrl: una ruta interna (ej. "/proyectos/gastroapp") abre una página embebida del propio
// portafolio; una URL externa abre en pestaña nueva; null muestra el estado "Demo próximamente"
// (o "demoPlaceholder" si se define) en vez de un botón.
// accent: gradiente [desde, hasta] usado en el encabezado de la tarjeta. icon: nombre de ícono (ver ProjectCard).
// githubLabel: texto alternativo para el botón de código (ej. "Imágenes" cuando el repo no tiene código fuente).

export const projects = [
  {
    id: 'epicanimes-django',
    title: 'EpicAnimes',
    subtitle: 'Mi Proyecto de Título — Plataforma E-commerce con roles y panel de administración',
    description:
      'Marketplace para la venta de productos de anime, con tres roles de usuario (Comprador, Vendedor y Administrador), proceso de postulación y aprobación de vendedores, verificación de identidad en el acceso, y paneles de control con métricas para administradores.',
    stack: ['Python', 'Django', 'SQL'],
    githubUrl: 'https://github.com/Miguel-Neira/EpicAnimes',
    demoUrl: null,
    badge: 'Proyecto de Título',
    showDemoSlot: false,
    icon: 'store',
    accent: ['#6d4aff', '#db2777'],
  },
  {
    id: 'gastroapp-django',
    title: 'GastroApp',
    subtitle: 'Carta digital para restaurantes',
    description:
      'Aplicación Django para gestionar la carta de un restaurante: categorías, platos con imágenes, precios y perfiles de usuario. Pensada para que un local pueda actualizar su menú digital sin tocar código.',
    stack: ['Python', 'Django', 'SQL', 'Gestión de media'],
    githubUrl: 'https://github.com/Miguel-Neira/GASTROAPP-Imagenes',
    githubLabel: 'Imágenes',
    demoUrl: '/proyectos/gastroapp',
    badge: null,
    icon: 'utensils',
    accent: ['#f59e0b', '#ef4444'],
  },
  {
    id: 'epicanimes-ecommerce-react',
    title: 'EpicAnimes E-commerce (React)',
    subtitle: 'Tienda online en construcción — React + Node + Webpay',
    description:
      'Reconstrucción del e-commerce de EpicAnimes con stack moderno: React + Vite en el frontend, Express/Node en el backend, MySQL como base de datos, Cloudinary para imágenes y la integración de pagos Webpay (Transbank) para el mercado chileno. Proyecto activo, aún no terminado.',
    stack: ['React', 'Vite', 'Node.js', 'Express', 'MySQL', 'Transbank/Webpay'],
    githubUrl: null,
    demoUrl: null,
    badge: 'En desarrollo',
    icon: 'cart',
    accent: ['#06b6d4', '#2563eb'],
  },
  {
    id: 'sb-proyecto',
    title: 'Proyecto San Bernardo',
    subtitle: 'Mi Práctica Profesional — Deportes San Bernardo',
    description:
      'Durante mi práctica profesional (30 de julio – 5 de octubre de 2026) estuve a cargo de crear una plataforma completa sobre deportes en la cual hice el desarrollo, diseño, ciberseguridad y testing, con acreditación formal de mi participación. El código no se puede compartir, pero puedes ver el resultado funcionando en el sitio oficial.',
    stack: ['Python', 'Django', 'Ciberseguridad', 'Testing', 'SQL'],
    githubUrl: null,
    demoUrl: 'https://deportes.sanbernardo.cl',
    badge: 'Práctica Profesional',
    demoPlaceholder: 'Deportes San Bernardo',
    icon: 'shield',
    accent: ['#475569', '#1e293b'],
  },
]
