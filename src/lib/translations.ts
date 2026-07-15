// src/lib/translations.ts

export type Language = 'es' | 'en';

export type Currency = 'USD' | 'MXN' | 'CLP' | 'COP';

export const CURRENCIES: { code: Currency; symbol: string; label: string; flag: string }[] = [
  { code: 'USD', symbol: '$', label: 'USD', flag: '🇺🇸' },
  { code: 'MXN', symbol: '$', label: 'MXN', flag: '🇲🇽' },
  { code: 'CLP', symbol: '$', label: 'CLP', flag: '🇨🇱' },
  { code: 'COP', symbol: '$', label: 'COP', flag: '🇨🇴' },
];

export const PRICING_BY_CURRENCY = {
  USD: {
    symbol: '$',
    suffix: 'USD',
    paquetes: {
      whatsappIA: { setup: "$149", monthly: "$49" },
      multicanalIA: { setup: "$249", monthly: "$99" },
      negocioAutonomoIA: { setup: "$499", monthly: "$199" }
    },
    addons: {
      agendaInteligente: { setup: "", monthly: "$39" },
      sitioWebProfesional: { setup: "$249", monthly: "$25" }
    }
  },
  MXN: {
    symbol: '$',
    suffix: 'MXN',
    paquetes: {
      whatsappIA: { setup: "$2,990", monthly: "$990" },
      multicanalIA: { setup: "$4,990", monthly: "$1,990" },
      negocioAutonomoIA: { setup: "$9,990", monthly: "$3,990" }
    },
    addons: {
      agendaInteligente: { setup: "", monthly: "$790" },
      sitioWebProfesional: { setup: "$4,990", monthly: "$490" }
    }
  },
  CLP: {
    symbol: '$',
    suffix: 'CLP',
    paquetes: {
      whatsappIA: { setup: "$144,990", monthly: "$47,990" },
      multicanalIA: { setup: "$239,990", monthly: "$95,990" },
      negocioAutonomoIA: { setup: "$479,990", monthly: "$191,990" }
    },
    addons: {
      agendaInteligente: { setup: "", monthly: "$37,990" },
      sitioWebProfesional: { setup: "$239,990", monthly: "$23,990" }
    }
  },
  COP: {
    symbol: '$',
    suffix: 'COP',
    paquetes: {
      whatsappIA: { setup: "$599,000", monthly: "$199,000" },
      multicanalIA: { setup: "$999,000", monthly: "$399,000" },
      negocioAutonomoIA: { setup: "$1,990,000", monthly: "$799,000" }
    },
    addons: {
      agendaInteligente: { setup: "", monthly: "$159,000" },
      sitioWebProfesional: { setup: "$999,000", monthly: "$99,000" }
    }
  }
};

export const WA_LINKS = {
  es: {
    general: "https://wa.me/5216121670637?text=Hola%2C+me+interesa+saber+m%C3%A1s+sobre+Albatros+IA",
    whatsappIA: "https://wa.me/5216121670637?text=Hola%2C+me+interesa+el+paquete+WhatsApp+IA+de+Albatros+IA",
    multicanalIA: "https://wa.me/5216121670637?text=Hola%2C+me+interesa+el+paquete+Multicanal+IA+de+Albatros+IA",
    negocioAutonomoIA: "https://wa.me/5216121670637?text=Hola%2C+me+interesa+el+paquete+Negocio+Aut%C3%B3nomo+IA+de+Albatros+IA",
    agendaInteligente: "https://wa.me/5216121670637?text=Hola%2C+me+interesa+el+add-on+Agenda+Inteligente+de+Albatros+IA",
    sitioWebProfesional: "https://wa.me/5216121670637?text=Hola%2C+me+interesa+el+add-on+Sitio+Web+Profesional+de+Albatros+IA",
  },
  en: {
    general: "https://wa.me/5216121670637?text=Hi%2C+I%27d+like+to+know+more+about+Albatros+AI",
    whatsappIA: "https://wa.me/5216121670637?text=Hi%2C+I%27m+interested+in+the+WhatsApp+AI+package+from+Albatros+AI",
    multicanalIA: "https://wa.me/5216121670637?text=Hi%2C+I%27m+interested+in+the+Omnichannel+AI+package+from+Albatros+AI",
    negocioAutonomoIA: "https://wa.me/5216121670637?text=Hi%2C+I%27m+interested+in+the+Autonomous+Business+AI+package+from+Albatros+AI",
    agendaInteligente: "https://wa.me/5216121670637?text=Hi%2C+I%27m+interested+in+the+Smart+Scheduling+add-on+from+Albatros+AI",
    sitioWebProfesional: "https://wa.me/5216121670637?text=Hi%2C+I%27m+interested+in+the+Professional+Website+add-on+from+Albatros+AI",
  }
};

export const translations = {
  es: {
    nav: {
      services: "Servicios",
      pricing: "Precios",
      faq: "FAQ",
      talkToAlbi: "Hablar con Albi",
    },
    hero: {
      kicker: "v0.1-beta · Alcance Global · Desde La Paz, BCS",
      title1: "Tu negocio con Sitio Web,",
      title2: "Google Maps y Atención con IA 24/7.",
      description: "En Albatros Dev construimos la presencia digital de tu negocio y automatizamos tu atención al cliente 24/7 para que no pierdas ninguna venta, estés donde estés (México, Chile, Argentina, Colombia, EE. UU. o Canadá).",
      viewPackages: "Ver paquetes",
      talkToAlbi: "Hablar con Albi",
      altHero: "Presencia digital para tu negocio"
    },
    problema: {
      title1: "¿Cuántos clientes perdiste",
      title2: "hoy por no contestar WhatsApp?",
      puntos: [
        {
          num: "01",
          title: "Sin presencia online",
          desc: "Un cliente te busca en Google a las 11pm. No te encuentra. Reserva o compra con tu competencia."
        },
        {
          num: "02",
          title: "WhatsApp saturado",
          desc: "Respondes cuando puedes. Cuando puedes ya es tarde. El cliente ya se fue con otro proveedor."
        },
        {
          num: "03",
          title: "Google Maps abandonado",
          desc: "Tu ficha desactualizada, sin fotos, con horario incorrecto. Primera impresión: mala."
        }
      ]
    },
    servicios: {
      title1: "Tres problemas.",
      title2: "Tres soluciones.",
      puntos: [
        {
          num: "01",
          title: "Sitio web que vende",
          items: [
            "Sitio React moderno y rápido",
            "Sistema de reservaciones online",
            "Integración de pagos (Stripe / MercadoPago)",
            "Responsive, SSL, dominio incluido"
          ]
        },
        {
          num: "02",
          title: "Google Maps + SEO local",
          items: [
            "Ficha Google Business optimizada",
            "Palabras clave para tu ciudad y giro",
            "Fotos, horarios, reseñas gestionadas",
            "Reporte mensual de visibilidad"
          ]
        },
        {
          num: "03",
          title: "Atención con IA 24/7",
          items: [
            "Chatbot en WhatsApp que responde solo",
            "Conoce tus servicios, precios y horarios",
            "Captura leads mientras duermes",
            "Escala a humano cuando es necesario"
          ]
        }
      ]
    },
    precios: {
      title: "Precios de Fundador",
      subtitle: "Solo para los primeros 5 clientes beta. Después subirán a precio comercial.",
      setup: "setup",
      monthly: "mes",
      recommended: "Recomendado",
      cta: "Quiero este paquete",
      addonsTitle: "Add-ons",
      addonsSubtitle: "Suma capacidades extra a cualquier plan.",
      addonsCta: "Agregar a mi plan",
      bottomNote: "Todos los planes incluyen configuración inicial, entrenamiento de IA y soporte durante la implementación.",
      note: "* Precios en USD. Precio beta disponible para los primeros 5 clientes. Sujeto a cambio al lanzamiento oficial.",
      paquetes: [
        {
          name: "WhatsApp IA",
          featured: false,
          features: [
            { label: "WhatsApp Business conectado", included: true },
            { label: "IA entrenada para tu negocio", included: true },
            { label: "Respuestas automáticas 24/7", included: true },
            { label: "Captura de prospectos", included: true },
            { label: "Preguntas frecuentes automatizadas", included: true },
            { label: "Transferencia a humano", included: true },
            { label: "Reporte básico mensual", included: true },
            { label: "Soporte básico", included: true },
            { label: "Facebook Messenger", included: false },
            { label: "Instagram", included: false },
            { label: "Google Business", included: false },
            { label: "Agenda automática", included: false },
          ],
        },
        {
          name: "Multicanal IA",
          featured: true,
          features: [
            { label: "WhatsApp IA", included: true },
            { label: "Facebook Messenger IA", included: true },
            { label: "Instagram IA", included: true },
            { label: "Google Business optimizado", included: true },
            { label: "Respuesta automática a reseñas", included: true },
            { label: "Captura de prospectos", included: true },
            { label: "IA entrenada para tu negocio", included: true },
            { label: "Reporte mensual", included: true },
            { label: "Soporte prioritario", included: true },
            { label: "Agenda automática", included: false },
            { label: "CRM", included: false },
          ],
        },
        {
          name: "Negocio Autónomo IA",
          featured: false,
          features: [
            { label: "WhatsApp IA", included: true },
            { label: "Facebook IA", included: true },
            { label: "Instagram IA", included: true },
            { label: "Google Business", included: true },
            { label: "Agenda Inteligente", included: true },
            { label: "Google Calendar conectado", included: true },
            { label: "Confirmaciones automáticas", included: true },
            { label: "Recordatorios automáticos", included: true },
            { label: "CRM integrado", included: true },
            { label: "Seguimiento de prospectos", included: true },
            { label: "Automatizaciones personalizadas", included: true },
            { label: "Dashboard de métricas", included: true },
            { label: "Soporte prioritario", included: true },
          ],
        },
      ],
      addons: [
        {
          name: "Agenda Inteligente",
          features: [
            "Agendamiento automático",
            "Google Calendar",
            "Reagendaciones",
            "Cancelaciones",
            "Recordatorios",
          ],
        },
        {
          name: "Sitio Web Profesional",
          features: [
            "Sitio web profesional",
            "Dominio",
            "SSL",
            "Hosting",
            "SEO básico",
          ],
        },
      ],
    },
    demoAlbi: {
      title1: "Tu futuro mejor empleado,",
      title2: "trabajando ahora mismo.",
      desc: "Escríbele a Albi por WhatsApp. Te responderá al instante, en español o inglés. Así de natural y rápida será la atención para tus clientes.",
      btn: "Hablar con Albi ahora",
      footer: "responde en segundos · disponible 24/7 · bilingüe"
    },
    sobre: {
      title1: "Construido para el mundo,",
      title2: "desde La Paz.",
      desc: "Somos una agencia digital con base en La Paz, Baja California Sur, pero con alcance global. Diseñamos soluciones que funcionan en cualquier mercado, ya sea en México, Chile, Argentina, Colombia o Norteamérica. Ayudamos a los negocios locales a capturar clientes internacionales usando tecnología de punta.",
      stats: [
        { num: "< 2s", label: "tiempo de respuesta promedio de la IA" },
        { num: "24/7", label: "captura de leads y operación continua" },
        { num: "2", label: "idiomas (ES/EN) con detección automática" },
        { num: "6", label: "países con soporte y cobertura activa" },
      ]
    },
    faq: {
      title: "Preguntas frecuentes",
      items: [
        {
          q: "¿Cuánto tiempo tarda en estar listo mi sitio?",
          a: "Entre 5 y 14 días dependiendo del paquete. Presencia Digital en 5–7 días, Reservas & Pagos en 10–14 días."
        },
        {
          q: "¿Necesito saber de tecnología para usar esto?",
          a: "No. Nosotros configuramos todo. Tú solo apruebas el resultado y usas el producto final."
        },
        {
          q: "¿El chatbot puede atender en inglés a turistas?",
          a: "Sí. Albi detecta el idioma del cliente y responde en español o inglés automáticamente."
        },
        {
          q: "¿Qué pasa si quiero cancelar el servicio mensual?",
          a: "Puedes cancelar en cualquier momento con 15 días de aviso. El sitio web sigue siendo tuyo."
        },
        {
          q: "¿Los precios son en pesos o dólares?",
          a: "En dólares USD. Aceptamos transferencia bancaria, tarjeta de crédito o métodos de pago locales en tu país."
        },
        {
          q: "¿Qué es el precio beta?",
          a: "Es el precio de lanzamiento para nuestros primeros 5 clientes de cada región. Una vez completados los lugares, los precios suben al precio regular."
        }
      ]
    },
    ctaFinal: {
      title1: "Tu negocio puede responder",
      title2: "WhatsApp aunque estés",
      title3: "en la playa.",
      desc: "Quedan lugares disponibles en la beta. Escríbenos hoy.",
      btn: "Hablar con Albi por WhatsApp",
      footer: "Sin compromiso. Te respondemos en minutos."
    },
    footer: {
      brandDesc: "Agencia digital con alcance global. Sitios web, Google Maps y chatbots con IA para negocios locales.",
      menu: "Menú",
      legal: "Legal",
      contact: "Contacto",
      privacy: "Aviso de Privacidad",
      googleApiDisclosure: "Datos de Google API",
      terms: "Términos y Condiciones",
      dataDeletion: "Eliminación de Datos",
      address: "La Paz, BCS, México · Soporte Global",
      bottomLeft: "© 2026 Albatros Dev · Alcance Global",
      bottomRight: "Hecho con mucho café ☕ y buen internet ⚡️"
    }
  },
  en: {
    nav: {
      services: "Services",
      pricing: "Pricing",
      faq: "FAQ",
      talkToAlbi: "Chat with Albi",
    },
    hero: {
      kicker: "v0.1-beta · Global Reach · From La Paz, BCS",
      title1: "Your Business with a Website,",
      title2: "Google Maps, and 24/7 AI Support.",
      description: "At Albatros Dev, we build your digital presence and automate your customer support 24/7 so you never miss a sale, wherever you are (Mexico, Chile, Argentina, Colombia, USA, or Canada).",
      viewPackages: "View packages",
      talkToAlbi: "Chat with Albi",
      altHero: "Digital presence for your business"
    },
    problema: {
      title1: "How many customers did you",
      title2: "lose today by not answering WhatsApp?",
      puntos: [
        {
          num: "01",
          title: "No online presence",
          desc: "A customer searches for you on Google at 11 PM. They can't find you. They book or buy from your competitor."
        },
        {
          num: "02",
          title: "Saturated WhatsApp",
          desc: "You reply when you can. By then, it's too late. The customer has already gone to another provider."
        },
        {
          num: "03",
          title: "Abandoned Google Maps",
          desc: "Your listing is outdated, missing photos, or has incorrect hours. First impression: bad."
        }
      ]
    },
    servicios: {
      title1: "Three problems.",
      title2: "Three solutions.",
      puntos: [
        {
          num: "01",
          title: "A website that sells",
          items: [
            "Modern and fast React website",
            "Online booking system",
            "Payment integration (Stripe / MercadoPago)",
            "Responsive, SSL, domain included"
          ]
        },
        {
          num: "02",
          title: "Google Maps + Local SEO",
          items: [
            "Optimized Google Business Profile",
            "Keywords tailored to your city and industry",
            "Photos, hours, and reviews managed",
            "Monthly visibility report"
          ]
        },
        {
          num: "03",
          title: "24/7 AI Support",
          items: [
            "WhatsApp chatbot that replies on its own",
            "Knows your services, pricing, and hours",
            "Captures leads while you sleep",
            "Escales to a human when necessary"
          ]
        }
      ]
    },
    precios: {
      title: "Founder Pricing",
      subtitle: "Only for the first 5 beta clients. Prices will rise to commercial rates after.",
      setup: "setup",
      monthly: "month",
      recommended: "Recommended",
      cta: "I want this package",
      addonsTitle: "Add-ons",
      addonsSubtitle: "Stack extra capabilities on top of any plan.",
      addonsCta: "Add to my plan",
      bottomNote: "Every plan includes initial setup, AI training, and support throughout implementation.",
      note: "* Prices in USD. Beta pricing available for the first 5 clients. Subject to change upon official launch.",
      paquetes: [
        {
          name: "WhatsApp AI",
          featured: false,
          features: [
            { label: "WhatsApp Business connected", included: true },
            { label: "AI trained for your business", included: true },
            { label: "Automatic 24/7 replies", included: true },
            { label: "Lead capture", included: true },
            { label: "Automated FAQs", included: true },
            { label: "Human handoff", included: true },
            { label: "Basic monthly report", included: true },
            { label: "Basic support", included: true },
            { label: "Facebook Messenger", included: false },
            { label: "Instagram", included: false },
            { label: "Google Business", included: false },
            { label: "Automatic scheduling", included: false },
          ],
        },
        {
          name: "Omnichannel AI",
          featured: true,
          features: [
            { label: "WhatsApp AI", included: true },
            { label: "Facebook Messenger AI", included: true },
            { label: "Instagram AI", included: true },
            { label: "Optimized Google Business", included: true },
            { label: "Automatic review replies", included: true },
            { label: "Lead capture", included: true },
            { label: "AI trained for your business", included: true },
            { label: "Monthly report", included: true },
            { label: "Priority support", included: true },
            { label: "Automatic scheduling", included: false },
            { label: "CRM", included: false },
          ],
        },
        {
          name: "Autonomous Business AI",
          featured: false,
          features: [
            { label: "WhatsApp AI", included: true },
            { label: "Facebook AI", included: true },
            { label: "Instagram AI", included: true },
            { label: "Google Business", included: true },
            { label: "Smart Scheduling", included: true },
            { label: "Google Calendar connected", included: true },
            { label: "Automatic confirmations", included: true },
            { label: "Automatic reminders", included: true },
            { label: "Integrated CRM", included: true },
            { label: "Lead tracking", included: true },
            { label: "Custom automations", included: true },
            { label: "Metrics dashboard", included: true },
            { label: "Priority support", included: true },
          ],
        },
      ],
      addons: [
        {
          name: "Smart Scheduling",
          features: [
            "Automatic booking",
            "Google Calendar",
            "Reschedules",
            "Cancellations",
            "Reminders",
          ],
        },
        {
          name: "Professional Website",
          features: [
            "Professional website",
            "Domain",
            "SSL",
            "Hosting",
            "Basic SEO",
          ],
        },
      ],
    },
    demoAlbi: {
      title1: "Your future best employee,",
      title2: "working right now.",
      desc: "Text Albi on WhatsApp. She will reply instantly in Spanish or English. That is how natural and fast support will be for your customers.",
      btn: "Chat with Albi now",
      footer: "replies in seconds · available 24/7 · bilingual"
    },
    sobre: {
      title1: "Built for the world,",
      title2: "from La Paz.",
      desc: "We are a digital agency based in La Paz, Baja California Sur, but with a global reach. We design modern solutions that work in any market—whether in Mexico, Chile, Argentina, Colombia, or North America. We help businesses capture international clients using cutting-edge technology.",
      stats: [
        { num: "< 2s", label: "average AI response time" },
        { num: "24/7", label: "continuous operation & lead capture" },
        { num: "2", label: "languages (ES/EN) with automatic detection" },
        { num: "6", label: "countries with active support & coverage" },
      ]
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          q: "How long does it take for my site to be ready?",
          a: "Between 5 and 14 days depending on the package. Digital Presence in 5–7 days, Bookings & Payments in 10–14 days."
        },
        {
          q: "Do I need technical knowledge to use this?",
          a: "No. We set up everything. You just approve the result and use the final product."
        },
        {
          q: "Can the chatbot serve clients in English?",
          a: "Yes. Albi detects the client's language and replies in Spanish or English automatically."
        },
        {
          q: "What if I want to cancel the monthly service?",
          a: "You can cancel at any time with a 15-day notice. The website remains yours."
        },
        {
          q: "Are prices in pesos or dollars?",
          a: "In USD. We accept bank transfers, credit cards, or local payment methods in your country."
        },
        {
          q: "What is the beta price?",
          a: "It is the launch price for our first 5 clients in each region. Once those spots are filled, prices rise to the regular rate."
        }
      ]
    },
    ctaFinal: {
      title1: "Your business can answer",
      title2: "WhatsApp even while",
      title3: "you are at the beach.",
      desc: "Spots are still available in the beta. Write to us today.",
      btn: "Chat with Albi on WhatsApp",
      footer: "No commitment. We'll reply in minutes."
    },
    footer: {
      brandDesc: "Digital agency with global reach. Websites, Google Maps, and AI chatbots for local businesses.",
      menu: "Menu",
      legal: "Legal",
      contact: "Contact",
      privacy: "Privacy Policy",
      googleApiDisclosure: "Google API Data",
      terms: "Terms & Conditions",
      dataDeletion: "Data Deletion",
      address: "La Paz, BCS, Mexico · Global Support",
      bottomLeft: "© 2026 Albatros Dev · Global Reach",
      bottomRight: "Made with lots of coffee ☕ and good internet ⚡"
    }
  }
};
