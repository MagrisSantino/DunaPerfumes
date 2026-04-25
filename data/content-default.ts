import type { SiteContent } from '@/types';

const defaults: SiteContent = {
  announcement: {
    enabled: true,
    items: [
      '✦ Envío gratis en zonas seleccionadas de Córdoba',
      '✦ 10% OFF pagando en efectivo',
      '✦ Fragancias 100% originales con sello de autenticidad',
    ],
  },
  hero: {
    eyebrow: 'Perfumería árabe · Córdoba',
    title: 'Fragancias que dejan huella.',
    subtitle:
      'Seleccionamos lo mejor de la perfumería árabe para que cada uno de ustedes encuentre esa esencia que los haga sentir únicos.',
    ctaPrimary: { label: 'Explorar colección', href: '/tienda' },
    ctaSecondary: { label: 'Nuestra historia', href: '/nosotros' },
  },
  story: {
    eyebrow: 'Así nació DUNA',
    title: 'Somos Luz y Rodri.',
    paragraphs: [
      'Nuestra historia empezó con ganas de traer algo distinto a Córdoba. Lo que comenzó como una curiosidad por los aromas profundos y exóticos, se convirtió en DUNA Perfumes.',
      'Para nosotros, un perfume no es solo una fragancia: es una marca personal que te acompaña todo el día. Por eso seleccionamos fragancias árabes de alta persistencia, importadas especialmente para vos.',
      'Estamos en cada paso de tu compra asesorándote — para que elijas la esencia que te haga sentir único.',
    ],
    signature: '— Luz & Rodri',
  },
  features: {
    title: 'Por qué elegirnos',
    items: [
      {
        icon: 'shield-check',
        title: 'Sello de autenticidad',
        description: 'Todas nuestras fragancias originales llegan con su sello de autenticidad.',
      },
      {
        icon: 'truck',
        title: 'Envío gratis en Córdoba',
        description: 'Realizamos envíos gratis en zonas seleccionadas. Consultá por tu zona.',
      },
      {
        icon: 'sparkles',
        title: 'Asesoramiento personal',
        description: 'Te ayudamos a encontrar la fragancia perfecta para vos o para regalar.',
      },
      {
        icon: 'wallet',
        title: '10% OFF en efectivo',
        description: 'Descuento especial si pagás con transferencia o efectivo.',
      },
    ],
  },
  categories: {
    title: 'Nuestras colecciones',
    subtitle: 'Elegí el camino que te llame',
    items: [
      {
        label: 'Originales',
        href: '/tienda/originales',
        description: 'Fragancias 100% originales con sello de autenticidad',
      },
      {
        label: 'Alternativas',
        href: '/tienda/alternativas',
        description: 'Alta persistencia y gran calidad-precio',
      },
      {
        label: 'Femeninos',
        href: '/tienda?genero=FEMENINO',
        description: 'Florales, gourmand, vainilla, frutales',
      },
      {
        label: 'Masculinos',
        href: '/tienda?genero=MASCULINO',
        description: 'Amaderados, especiados, acuáticos, aromáticos',
      },
    ],
  },
  cta: {
    title: 'Prepárense para dejar huella.',
    subtitle: 'Descubrí el mundo de la perfumería árabe.',
    ctaLabel: 'Ver catálogo completo',
    ctaHref: '/tienda',
  },
  about: {
    title: 'La historia detrás de DUNA',
    subtitle: 'Dos personas, una pasión por los aromas que cuentan historias.',
    sections: [
      {
        title: 'Cómo empezó',
        body: 'DUNA nació en Córdoba de la curiosidad de Luz y Rodri por los perfumes árabes: aromas profundos, envolventes, con mucha personalidad. Lo que arrancó como un interés compartido se transformó en un proyecto para acercar esa perfumería de oriente a quienes, como nosotros, buscan una fragancia que los represente.',
      },
      {
        title: 'Qué nos mueve',
        body: 'Creemos que el perfume es una marca personal. Te acompaña todo el día y cuenta algo de vos sin que digas una palabra. Por eso trabajamos con curaduría: cada fragancia del catálogo la elegimos nosotros, la probamos y la recomendamos según lo que estás buscando.',
      },
      {
        title: 'Cómo trabajamos',
        body: 'Importamos directo de las casas perfumeras árabes más reconocidas — Lattafa, Armaf, Afnan, Al Haramain, Maison Alhambra, Xerjoff y más. Ofrecemos originales con sello de autenticidad y alternativas de alta persistencia con una gran relación calidad-precio.',
      },
    ],
    mission:
      'Queremos que cada persona encuentre la esencia que la haga sentir única. Que dejes huella.',
  },
  contact: {
    title: 'Hablemos',
    subtitle: 'Estamos en cada paso de tu compra.',
    email: 'hola@dunaperfumes.com.ar',
    whatsapp: '+54 9 351 000 0000',
    instagram: '@duna.oud',
    location: 'Córdoba, Argentina',
    hours: 'Lun a Sáb · 10:00 a 20:00',
  },
  shipping: {
    title: 'Envíos y retiros',
    subtitle: 'Recibí DUNA donde estés.',
    sections: [
      {
        title: 'Envío gratis en Córdoba',
        body: 'Realizamos envíos sin cargo en zonas seleccionadas de Córdoba Capital. Consultanos por tu zona para confirmar cobertura.',
      },
      {
        title: 'Envíos al interior',
        body: 'Enviamos a todo el país vía OCA, Andreani o Correo Argentino. El costo se calcula al confirmar el pedido según destino y forma de envío.',
      },
      {
        title: 'Retiro personalizado',
        body: 'Si vivís en Córdoba Capital podés coordinar el retiro sin cargo. Te avisamos apenas tu pedido esté listo.',
      },
      {
        title: 'Tiempos',
        body: 'Preparamos tus pedidos en 24–48hs hábiles. Los tiempos de entrega dependen del servicio elegido.',
      },
    ],
  },
  faq: [
    {
      q: '¿Los perfumes son originales?',
      a: 'Sí. Todas las fragancias etiquetadas como "Originales" vienen con su sello de autenticidad de la casa perfumera. También ofrecemos una línea de "Alternativas" con excelente performance y precio.',
    },
    {
      q: '¿Cuál es la diferencia entre Originales y Alternativas?',
      a: 'Los Originales son las fragancias tal cual se producen por las casas perfumeras árabes (Lattafa, Armaf, Afnan, etc). Las Alternativas son versiones accesibles que conservan la misma familia olfativa y alta persistencia a un precio significativamente menor.',
    },
    {
      q: '¿Qué medios de pago aceptan?',
      a: 'Transferencia bancaria y efectivo (ambos con 10% OFF). También podemos generar link de Mercado Pago si preferís tarjeta.',
    },
    {
      q: '¿Hacen envíos a todo el país?',
      a: 'Sí, enviamos a todo Argentina. En Córdoba Capital tenemos envío gratis en zonas seleccionadas. Al interior enviamos por OCA, Andreani o Correo Argentino.',
    },
    {
      q: '¿Puedo probar antes de comprar?',
      a: 'Si estás en Córdoba podemos coordinar una prueba previa en puntos específicos. Escribinos por WhatsApp y te asesoramos.',
    },
    {
      q: '¿Cuánto tarda un pedido en llegar?',
      a: 'Preparamos el pedido en 24–48hs hábiles. Dentro de Córdoba Capital la entrega es en el día o al día siguiente. Al interior, según el servicio elegido, 3–7 días hábiles.',
    },
    {
      q: '¿Cómo elijo mi fragancia?',
      a: 'Contanos qué tipo de aromas te gustan, para qué ocasión buscás, y nosotros te recomendamos. También podés navegar por familia olfativa en nuestra tienda.',
    },
  ],
};

export default defaults;
