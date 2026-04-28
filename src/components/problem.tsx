export function Problem() {
  const painPoints = [
    {
      number: "01",
      title: "Sin presencia online",
      description:
        "Un turista te busca en Google a las 11pm. No te encuentra. Reserva con tu competencia.",
    },
    {
      number: "02",
      title: "WhatsApp saturado",
      description:
        "Respondes cuando puedes. Cuando puedes ya es tarde. El cliente ya se fue.",
    },
    {
      number: "03",
      title: "Google Maps abandonado",
      description:
        "Tu ficha desactualizada, sin fotos, con horario incorrecto. Primera impresión: mala.",
    },
  ];

  return (
    <section className="px-6 py-24 md:py-32 border-t border-[#E0E0E0]">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-[#0A0A0A] mb-16 max-w-2xl leading-[1.15]">
          ¿Cuántos clientes perdiste hoy por no contestar WhatsApp?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {painPoints.map((point) => (
            <div
              key={point.number}
              className="relative border border-[#E0E0E0] p-8 md:p-10 group hover:border-[#0A0A0A] transition-colors duration-200"
            >
              {/* Big decorative number */}
              <span className="absolute top-6 right-8 font-display text-[5rem] font-bold text-[#F5F5F5] leading-none select-none pointer-events-none group-hover:text-[#E0E0E0] transition-colors duration-200">
                {point.number}
              </span>

              <div className="relative z-10">
                <h3 className="font-semibold text-lg text-[#0A0A0A] mb-3">
                  {point.title}
                </h3>
                <p className="text-[#555555] text-[15px] leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
