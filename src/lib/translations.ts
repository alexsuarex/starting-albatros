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
      services: "Soluciones",
      pricing: "Planes",
      faq: "FAQ",
      talkToAlbi: "Probar Albi",
    },
    hero: {
      kicker: "AGENTES DE IA PARA WHATSAPP Y MESSENGER",
      title1: "Responde, vende y agenda",
      title2: "aunque tú no estés disponible.",
      description: "Albatros aprende tus servicios, precios y horarios para atender cada mensaje, calificar prospectos y reservar citas automáticamente, las 24 horas.",
      viewPackages: "Ver planes",
      talkToAlbi: "Probar a Albi por WhatsApp",
      altHero: "Persona trabajando con la asistencia de un robot de IA",
      pillars: ["Respuestas 24/7", "Prospectos organizados", "Citas automáticas"]
    },
    problema: {
      title1: "El cliente que espera,",
      title2: "compra en otro lugar.",
      puntos: [
        {
          num: "01",
          title: "No te encuentran",
          desc: "Buscan tus servicios en Google, pero tu sitio o tu ficha no les da una razón clara para contactarte."
        },
        {
          num: "02",
          title: "Te escriben y esperan",
          desc: "Preguntan por precio, disponibilidad o una cita. Si la respuesta tarda, la conversación se enfría."
        },
        {
          num: "03",
          title: "Todo depende de ti",
          desc: "Responder lo mismo, pedir datos y coordinar horarios consume tiempo que deberías dedicar a tu negocio."
        }
      ]
    },
    servicios: {
      title1: "De la búsqueda a la cita,",
      title2: "sin perder al cliente.",
      puntos: [
        {
          num: "01",
          title: "Convierte visitas en consultas",
          items: [
            "Un sitio rápido que explica por qué elegirte",
            "Reservas y pagos sin pasos innecesarios",
            "Experiencia clara en celular y computadora",
            "Dominio, SSL y publicación incluidos"
          ]
        },
        {
          num: "02",
          title: "Aparece cuando te buscan",
          items: [
            "Perfil de Google Business optimizado",
            "Búsquedas clave para tu ciudad y giro",
            "Fotos, horarios y reseñas al día",
            "Reporte mensual para medir visibilidad"
          ]
        },
        {
          num: "03",
          title: "Responde y agenda 24/7",
          items: [
            "Agente de IA en WhatsApp y Messenger",
            "Respuestas basadas en la información de tu negocio",
            "Captura de datos y citas automáticas",
            "Transferencia a tu equipo cuando hace falta"
          ]
        }
      ]
    },
    precios: {
      title: "Elige cuánto quieres automatizar",
      subtitle: "Empieza por WhatsApp o conecta toda tu atención, agenda y seguimiento.",
      setup: "configuración",
      monthly: "mes",
      recommended: "Recomendado",
      cta: "Elegir este plan",
      addonsTitle: "Completa tu operación",
      addonsSubtitle: "Añade agenda automática o una presencia web profesional al plan que elijas.",
      addonsCta: "Añadir a mi plan",
      bottomNote: "Todos los planes incluyen configuración inicial, entrenamiento del agente con la información de tu negocio y acompañamiento durante la implementación.",
      note: "* Precios mostrados en {currency}. Sujetos a cambio sin previo aviso.",
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
      title1: "Prueba la atención",
      title2: "antes de decidir.",
      desc: "Escríbele a Albi por WhatsApp y hazle las mismas preguntas que haría uno de tus clientes. Así puedes conocer la experiencia antes de llevarla a tu negocio.",
      btn: "Probar a Albi por WhatsApp",
      footer: "Disponible 24/7 · Español e inglés · Sin compromiso"
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
      title: "Antes de empezar",
      items: [
        {
          q: "¿Cuánto tiempo tarda en estar listo mi Agente de IA?",
          a: "Podemos dejarlo listo el mismo día una vez que recibimos la información de tu negocio y los accesos necesarios."
        },
        {
          q: "¿Cuánto tiempo tarda en estar listo mi sitio?",
          a: "Un sitio web suele estar listo entre 5 y 14 días, según el alcance y la rapidez con la que recibamos tus contenidos."
        },
        {
          q: "¿Necesito saber de tecnología para usarlo?",
          a: "No. Nosotros configuramos los canales, entrenamos al agente y hacemos las pruebas. Tú revisas la información y apruebas la experiencia."
        },
        {
          q: "¿Puede atender en español e inglés?",
          a: "Sí. El agente detecta el idioma del cliente y puede responder automáticamente en español o inglés."
        },
        {
          q: "¿Qué pasa cuando una conversación necesita a una persona?",
          a: "El agente puede transferir la conversación a tu equipo para que una persona continúe desde el contexto recibido."
        },
        {
          q: "¿Puedo cancelar el servicio mensual?",
          a: "Sí. Puedes cancelar el servicio con 15 días de aviso."
        },
        {
          q: "¿En qué moneda están los precios?",
          a: "La página muestra los precios en MXN. También ofrecemos alternativas de pago para clientes de otros países."
        },
      ]
    },
    ctaFinal: {
      title1: "Tu próximo cliente",
      title2: "ya está escribiendo.",
      title3: "Albatros puede responderle.",
      desc: "Cuéntanos cómo atiendes hoy y te mostraremos qué parte de la conversación puede automatizarse.",
      btn: "Quiero verlo en mi negocio",
      footer: "La demostración por WhatsApp es sin compromiso."
    },
    footer: {
      brandDesc: "Agentes de IA, sitios web y presencia local para convertir búsquedas y mensajes en oportunidades.",
      menu: "Menú",
      legal: "Legal",
      contact: "Contacto",
      privacy: "Aviso de Privacidad",
      googleApiDisclosure: "Datos de Google API",
      terms: "Términos y Condiciones",
      dataDeletion: "Eliminación de Datos",
      address: "La Paz, BCS, México · Soporte Global",
      bottomLeft: "© 2026 Albatros IA · La Paz, BCS",
      bottomRight: "Hecho con mucho café ☕ y buen internet ⚡️"
    }
  },
  en: {
    nav: {
      services: "Solutions",
      pricing: "Plans",
      faq: "FAQ",
      talkToAlbi: "Try Albi",
    },
    hero: {
      kicker: "AI AGENTS FOR WHATSAPP AND MESSENGER",
      title1: "Reply, sell, and book",
      title2: "even when you are unavailable.",
      description: "Albatros learns your services, pricing, and hours to answer every message, qualify leads, and book appointments automatically, around the clock.",
      viewPackages: "View plans",
      talkToAlbi: "Try Albi on WhatsApp",
      altHero: "Person working with the assistance of an AI robot",
      pillars: ["24/7 replies", "Organized leads", "Automatic booking"]
    },
    problema: {
      title1: "Customers who wait",
      title2: "buy somewhere else.",
      puntos: [
        {
          num: "01",
          title: "They cannot find you",
          desc: "They search Google for your services, but your website or listing gives them no clear reason to contact you."
        },
        {
          num: "02",
          title: "They message and wait",
          desc: "They ask about pricing, availability, or an appointment. When the answer is late, the conversation goes cold."
        },
        {
          num: "03",
          title: "Everything depends on you",
          desc: "Repeating answers, collecting details, and coordinating schedules takes time away from running your business."
        }
      ]
    },
    servicios: {
      title1: "From the first search to the booking,",
      title2: "without losing the customer.",
      puntos: [
        {
          num: "01",
          title: "Turn visits into inquiries",
          items: [
            "A fast website that explains why customers should choose you",
            "Bookings and payments without unnecessary steps",
            "A clear experience on mobile and desktop",
            "Domain, SSL, and publishing included"
          ]
        },
        {
          num: "02",
          title: "Show up when they search",
          items: [
            "Optimized Google Business Profile",
            "Search terms for your city and industry",
            "Up-to-date photos, hours, and reviews",
            "Monthly visibility reporting"
          ]
        },
        {
          num: "03",
          title: "Reply and book 24/7",
          items: [
            "AI agent for WhatsApp and Messenger",
            "Answers based on your business information",
            "Automatic lead capture and appointment booking",
            "Handoff to your team when needed"
          ]
        }
      ]
    },
    precios: {
      title: "Choose how much to automate",
      subtitle: "Start with WhatsApp or connect your entire customer service, booking, and follow-up flow.",
      setup: "one-time setup",
      monthly: "month",
      recommended: "Recommended",
      cta: "Choose this plan",
      addonsTitle: "Complete your workflow",
      addonsSubtitle: "Add automatic scheduling or a professional web presence to the plan you choose.",
      addonsCta: "Add to my plan",
      bottomNote: "Every plan includes initial setup, agent training with your business information, and guidance throughout implementation.",
      note: "* Prices shown in {currency}. Subject to change without notice.",
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
      title1: "Try the experience",
      title2: "before you decide.",
      desc: "Message Albi on WhatsApp and ask the same questions one of your customers would. See the experience for yourself before bringing it to your business.",
      btn: "Try Albi on WhatsApp",
      footer: "Available 24/7 · English and Spanish · No commitment"
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
      title: "Before you get started",
      items: [
        {
          q: "How long does it take to launch my AI agent?",
          a: "We can have it ready the same day once we receive your business information and the required access."
        },
        {
          q: "How long does it take for my site to be ready?",
          a: "A website is usually ready in 5 to 14 days, depending on the scope and how quickly we receive your content."
        },
        {
          q: "Do I need technical knowledge to use it?",
          a: "No. We connect the channels, train the agent, and run the tests. You review the information and approve the experience."
        },
        {
          q: "Can it serve customers in English and Spanish?",
          a: "Yes. The agent detects the customer's language and can reply automatically in English or Spanish."
        },
        {
          q: "What happens when a conversation needs a person?",
          a: "The agent can hand the conversation over to your team so a person can continue with the context already collected."
        },
        {
          q: "Can I cancel the monthly service?",
          a: "Yes. You can cancel the service with 15 days' notice."
        },
        {
          q: "Which currency are the prices shown in?",
          a: "The page currently shows prices in MXN. We also offer payment alternatives for customers in other countries."
        },
      ]
    },
    ctaFinal: {
      title1: "Your next customer",
      title2: "is already messaging.",
      title3: "Albatros can answer.",
      desc: "Tell us how you handle customers today and we will show you which parts of the conversation can be automated.",
      btn: "Show me how it works for my business",
      footer: "The WhatsApp demonstration comes with no commitment."
    },
    footer: {
      brandDesc: "AI agents, websites, and local presence that turn searches and messages into opportunities.",
      menu: "Menu",
      legal: "Legal",
      contact: "Contact",
      privacy: "Privacy Policy",
      googleApiDisclosure: "Google API Data",
      terms: "Terms & Conditions",
      dataDeletion: "Data Deletion",
      address: "La Paz, BCS, Mexico · Global Support",
      bottomLeft: "© 2026 Albatros AI · La Paz, BCS",
      bottomRight: "Made with lots of coffee ☕ and good internet ⚡"
    }
  }
};
