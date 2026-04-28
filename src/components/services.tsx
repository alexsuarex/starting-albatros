export function Services() {
  const services = [
    {
      number: "01",
      title: "Sitio web que vende",
      features: [
        "Sitio React moderno y rápido",
        "Sistema de reservaciones online",
        "Integración de pagos (Stripe / MercadoPago)",
        "Responsive, SSL, dominio incluido",
      ],
    },
    {
      number: "02",
      title: "Google Maps + SEO local",
      features: [
        "Ficha Google Business optimizada",
        "Palabras clave para tu ciudad y giro",
        "Fotos, horarios, reseñas gestionadas",
        "Reporte mensual de visibilidad",
      ],
    },
    {
      number: "03",
      title: "Atención con IA 24/7",
      features: [
        "Chatbot en WhatsApp que responde solo",
        "Conoce tus servicios, precios y horarios",
        "Captura leads mientras duermes",
        "Escala a humano cuando es necesario",
      ],
    },
  ];

  return (
    <section id="servicios" className="px-6 py-24 md:py-32 bg-[#F5F5F5]">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-[#0A0A0A] mb-4 leading-[1.15]">
          Tres problemas. Tres soluciones.
        </h2>
        <p className="text-[#555555] text-lg mb-16 max-w-xl">
          Todo lo que un negocio local necesita para crecer online, en un solo
          lugar.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.number}
              className="relative bg-white border border-[#E0E0E0] p-8 md:p-10 group hover:border-[#0A0A0A] transition-colors duration-200"
            >
              {/* Big decorative number */}
              <span className="absolute top-6 right-8 font-display text-[5rem] font-bold text-[#F5F5F5] leading-none select-none pointer-events-none group-hover:text-[#E0E0E0] transition-colors duration-200">
                {service.number}
              </span>

              <div className="relative z-10">
                <h3 className="font-display font-bold text-xl text-[#0A0A0A] mb-6">
                  {service.title}
                </h3>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[15px] text-[#555555]"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#999999] mt-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
