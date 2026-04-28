import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Cuánto tiempo tarda en estar listo mi sitio?",
    answer:
      "Entre 5 y 14 días dependiendo del paquete. Presencia en 5–7 días, Turismo Pro en 10–14 días.",
  },
  {
    question: "¿Necesito saber de tecnología para usar esto?",
    answer:
      "No. Nosotros configuramos todo. Tú solo apruebas el resultado y usas el producto final.",
  },
  {
    question: "¿El chatbot puede atender en inglés a turistas?",
    answer:
      "Sí. Albi detecta el idioma del cliente y responde en español o inglés automáticamente.",
  },
  {
    question: "¿Qué pasa si quiero cancelar el servicio mensual?",
    answer:
      "Puedes cancelar en cualquier momento con 15 días de aviso. El sitio web sigue siendo tuyo.",
  },
  {
    question: "¿Los precios son en pesos o dólares?",
    answer:
      "En dólares USD. Aceptamos transferencia, tarjeta o pago en efectivo en La Paz.",
  },
  {
    question: "¿Qué es el precio beta?",
    answer:
      "Es el precio de lanzamiento para nuestros primeros 5 clientes. Una vez completados los lugares, los precios suben al precio regular.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="px-6 py-24 md:py-32 bg-[#F5F5F5]">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-[#0A0A0A] mb-12 leading-[1.15]">
          Preguntas frecuentes
        </h2>

        <Accordion className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-b border-[#E0E0E0]"
            >
              <AccordionTrigger className="text-left text-[16px] font-semibold text-[#0A0A0A] py-6 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#555555] text-[15px] leading-[1.8] pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
