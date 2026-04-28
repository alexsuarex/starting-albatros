export function About() {
  const stats = [
    { value: "80+", label: "propiedades vacacionales gestionadas con tecnología propia" },
    { value: "3", label: "servicios especializados para negocios locales" },
    { value: "24/7", label: "disponibilidad del chatbot una vez activo" },
    { value: "La Paz → Los Cabos → México", label: "ruta de expansión" },
  ];

  return (
    <section className="px-6 py-24 md:py-32 border-t border-[#E0E0E0]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-[#0A0A0A] mb-8 leading-[1.15]">
              Construido en La Paz, para La&nbsp;Paz.
            </h2>
            <div className="space-y-4 text-[#555555] text-[16px] leading-[1.8]">
              <p>
                Somos una agencia digital local. Conocemos el mercado turístico
                de Baja California Sur, entendemos los negocios de aquí y
                construimos soluciones que funcionan en este contexto.
              </p>
              <p>
                No somos una empresa de CDMX o del norte que llegó a vender.
                Somos de aquí.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`${i === 3 ? "col-span-2" : ""}`}
              >
                <p className="font-display text-2xl md:text-3xl font-bold text-[#0A0A0A] mb-1">
                  {stat.value}
                </p>
                <p className="text-[#999999] text-[13px] leading-relaxed">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
