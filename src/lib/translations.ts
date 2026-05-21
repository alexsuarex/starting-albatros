// src/lib/translations.ts

export type Language = 'es' | 'en';

export const WA_LINKS = {
  es: {
    general: "https://wa.me/5216121670637?text=Hola%2C+me+interesa+saber+m%C3%A1s+sobre+Albatros+Dev",
    presencia: "https://wa.me/5216121670637?text=Hola%2C+me+interesa+el+paquete+Presencia+de+Albatros+Dev",
    negocioActivo: "https://wa.me/5216121670637?text=Hola%2C+me+interesa+el+paquete+Negocio+Activo+de+Albatros+Dev",
    turismoPro: "https://wa.me/5216121670637?text=Hola%2C+me+interesa+el+paquete+Turismo+Pro+de+Albatros+Dev",
  },
  en: {
    general: "https://wa.me/5216121670637?text=Hi%2C+I%27d+like+to+know+more+about+Albatros+Dev",
    presencia: "https://wa.me/5216121670637?text=Hi%2C+I%27m+interested+in+the+Presence+package+from+Albatros+Dev",
    negocioActivo: "https://wa.me/5216121670637?text=Hi%2C+I%27m+interested+in+the+Active+Business+package+from+Albatros+Dev",
    turismoPro: "https://wa.me/5216121670637?text=Hi%2C+I%27m+interested+in+the+Turismo+Pro+package+from+Albatros+Dev",
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
      title: "Precios de fundador.",
      subtitle: "Solo para los primeros 5 clientes beta. Después suben.",
      setup: "setup",
      monthly: "mes",
      recommended: "Recomendado",
      cta: "Quiero este paquete",
      note: "* Precios en USD. Precio beta disponible para los primeros 5 clientes. Sujeto a cambio al lanzamiento oficial.",
      paquetes: [
        {
          name: "Presencia",
          setup: "$250",
          monthly: "$60",
          featured: false,
          features: [
            { label: "Sitio web React (5 secciones)", included: true },
            { label: "Dominio + SSL incluido", included: true },
            { label: "Google Maps optimizado", included: true },
            { label: "SEO local básico", included: true },
            { label: "Chatbot WhatsApp con IA", included: false },
            { label: "Sistema de reservaciones", included: false },
            { label: "Integración de pagos", included: false },
          ],
        },
        {
          name: "Negocio Activo",
          setup: "$450",
          monthly: "$120",
          featured: true,
          features: [
            { label: "Sitio web React (5 secciones)", included: true },
            { label: "Dominio + SSL incluido", included: true },
            { label: "Google Maps optimizado", included: true },
            { label: "SEO local básico", included: true },
            { label: "Chatbot WhatsApp con IA", included: true },
            { label: "Sistema de reservaciones", included: false },
            { label: "Integración de pagos", included: false },
          ],
        },
        {
          name: "Turismo Pro",
          setup: "$700",
          monthly: "$180",
          featured: false,
          features: [
            { label: "Sitio web React (5 secciones)", included: true },
            { label: "Dominio + SSL incluido", included: true },
            { label: "Google Maps optimizado", included: true },
            { label: "SEO local básico", included: true },
            { label: "Chatbot WhatsApp con IA", included: true },
            { label: "Sistema de reservaciones", included: true },
            { label: "Integración de pagos", included: true },
          ],
        },
      ]
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
        { num: "80+", label: "propiedades y clientes gestionados con tecnología propia" },
        { num: "3", label: "servicios digitales especializados para tu negocio" },
        { num: "24/7", label: "disponibilidad de tu chatbot una vez activo" },
        { num: "Global", label: "Alcance y soporte en toda América" },
      ]
    },
    faq: {
      title: "Preguntas frecuentes",
      items: [
        {
          q: "¿Cuánto tiempo tarda en estar listo mi sitio?",
          a: "Entre 5 y 14 días dependiendo del paquete. Presencia en 5–7 días, Turismo Pro en 10–14 días."
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
      title: "Founder's pricing.",
      subtitle: "Only for the first 5 beta clients. Prices will increase afterward.",
      setup: "setup",
      monthly: "month",
      recommended: "Recommended",
      cta: "I want this package",
      note: "* Prices in USD. Beta pricing available for the first 5 clients. Subject to change upon official launch.",
      paquetes: [
        {
          name: "Presence",
          setup: "$250",
          monthly: "$60",
          featured: false,
          features: [
            { label: "React website (5 sections)", included: true },
            { label: "Domain + SSL included", included: true },
            { label: "Optimized Google Maps", included: true },
            { label: "Basic local SEO", included: true },
            { label: "AI WhatsApp Chatbot", included: false },
            { label: "Booking system", included: false },
            { label: "Payment integration", included: false },
          ],
        },
        {
          name: "Active Business",
          setup: "$450",
          monthly: "$120",
          featured: true,
          features: [
            { label: "React website (5 sections)", included: true },
            { label: "Domain + SSL included", included: true },
            { label: "Optimized Google Maps", included: true },
            { label: "Basic local SEO", included: true },
            { label: "AI WhatsApp Chatbot", included: true },
            { label: "Booking system", included: false },
            { label: "Payment integration", included: false },
          ],
        },
        {
          name: "Turismo Pro",
          setup: "$700",
          monthly: "$180",
          featured: false,
          features: [
            { label: "React website (5 sections)", included: true },
            { label: "Domain + SSL included", included: true },
            { label: "Optimized Google Maps", included: true },
            { label: "Basic local SEO", included: true },
            { label: "AI WhatsApp Chatbot", included: true },
            { label: "Booking system", included: true },
            { label: "Payment integration", included: true },
          ],
        },
      ]
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
        { num: "80+", label: "properties and clients managed with our own technology" },
        { num: "3", label: "specialized digital services for your business" },
        { num: "24/7", label: "chatbot availability once active" },
        { num: "Global", label: "Reach and support throughout the Americas" },
      ]
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          q: "How long does it take for my site to be ready?",
          a: "Between 5 and 14 days depending on the package. Presence in 5–7 days, Turismo Pro in 10–14 days."
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
      terms: "Terms & Conditions",
      dataDeletion: "Data Deletion",
      address: "La Paz, BCS, Mexico · Global Support",
      bottomLeft: "© 2026 Albatros Dev · Global Reach",
      bottomRight: "Made with lots of coffee ☕ and good internet ⚡"
    }
  }
};
