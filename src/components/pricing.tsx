import { whatsappLinks } from "@/lib/constants";

const plans = [
  {
    name: "Presencia",
    description: "Para negocios que no existen online",
    setup: "$250 USD",
    monthly: "$60 USD/mes",
    features: [
      { name: "Sitio web (hasta 5 secciones)", included: true },
      { name: "Dominio + SSL incluido", included: true },
      { name: "Google Maps + SEO local básico", included: true },
      { name: "Chatbot WhatsApp IA", included: false },
      { name: "Reservaciones + pagos", included: false },
      { name: "Soporte prioritario", included: false },
    ],
    cta: whatsappLinks.presencia,
    recommended: false,
  },
  {
    name: "Negocio Activo",
    description: "El paquete completo para empezar a vender",
    setup: "$450 USD",
    monthly: "$120 USD/mes",
    features: [
      { name: "Todo lo del plan Presencia", included: true },
      { name: "Chatbot WhatsApp con IA (Albi)", included: true },
      { name: "Responde clientes 24/7", included: true },
      { name: "SEO local + ficha Google optimizada", included: true },
      { name: "Reservaciones + pagos", included: false },
      { name: "Soporte prioritario", included: false },
    ],
    cta: whatsappLinks.negocioActivo,
    recommended: true,
  },
  {
    name: "Turismo Pro",
    description: "Para tours, hospedaje y restaurantes con reservas",
    setup: "$700 USD",
    monthly: "$180 USD/mes",
    features: [
      { name: "Todo lo del plan Negocio Activo", included: true },
      { name: "Sistema de reservaciones online", included: true },
      { name: "Integración de pagos (Stripe/MercadoPago)", included: true },
      { name: "Bot que recibe y confirma reservas", included: true },
      { name: "2 ajustes mensuales incluidos", included: true },
      { name: "Soporte prioritario", included: true },
    ],
    cta: whatsappLinks.turismoPro,
    recommended: false,
  },
];

export function Pricing() {
  return (
    <section id="precios" className="px-6 py-24 md:py-32 border-t border-[#E0E0E0]">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-[#0A0A0A] mb-4 leading-[1.15]">
          Precios de fundador.
        </h2>
        <p className="text-[#555555] text-lg mb-16 max-w-xl">
          Solo para los primeros 5 clientes beta.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative border p-8 md:p-10 flex flex-col ${
                plan.recommended
                  ? "border-[#0A0A0A] border-2"
                  : "border-[#E0E0E0]"
              }`}
            >
              {/* Recommended tag */}
              {plan.recommended && (
                <span className="absolute -top-3 left-8 bg-[#0A0A0A] text-white text-[11px] font-mono font-medium px-3 py-1">
                  Recomendado
                </span>
              )}

              <h3 className="font-display font-bold text-xl text-[#0A0A0A] mb-1">
                {plan.name}
              </h3>
              <p className="text-[#555555] text-sm mb-6">{plan.description}</p>

              {/* Pricing */}
              <div className="mb-8">
                <p className="font-display text-3xl font-bold text-[#0A0A0A]">
                  {plan.setup}{" "}
                  <span className="text-sm font-sans font-normal text-[#999999]">
                    setup
                  </span>
                </p>
                <p className="text-[#555555] text-[15px] mt-1">
                  + {plan.monthly}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-10 flex-1">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-3 text-[14px] ${
                      feature.included ? "text-[#0A0A0A]" : "text-[#CCCCCC]"
                    }`}
                  >
                    <span className="mt-1 flex-shrink-0">
                      {feature.included ? "✓" : "—"}
                    </span>
                    {feature.name}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={plan.cta}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-center py-3.5 text-[14px] font-semibold transition-colors duration-200 block ${
                  plan.recommended
                    ? "bg-[#0A0A0A] text-white hover:bg-[#1A1A1A]"
                    : "border border-[#E0E0E0] text-[#0A0A0A] hover:border-[#0A0A0A]"
                }`}
              >
                Quiero este paquete
              </a>
            </div>
          ))}
        </div>

        <p className="text-[12px] text-[#999999] font-mono mt-10">
          *Precios en USD. Precio beta disponible para los primeros 5 clientes.
          Sujeto a cambio al lanzamiento oficial.
        </p>
      </div>
    </section>
  );
}
