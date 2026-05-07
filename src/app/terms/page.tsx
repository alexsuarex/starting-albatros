import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos y Condiciones — Albatros Dev",
  description:
    "Términos y condiciones de uso de los servicios de Albatros Dev: sitio web, Google Maps, chatbot con IA y atención al cliente.",
};

const sections = [
  {
    title: "1. Aceptación de los términos",
    content: `Al contratar los servicios de Albatros Dev, al usar nuestro sitio web o al comunicarte con nosotros a través de WhatsApp, aceptas quedar vinculado por estos Términos y Condiciones. Si no estás de acuerdo con alguna parte, te pedimos que no uses nuestros servicios.

Estos términos se rigen por las leyes de los Estados Unidos Mexicanos y aplican a todos los servicios prestados desde La Paz, Baja California Sur, México.`,
  },
  {
    title: "2. Descripción de los servicios",
    content: `Albatros Dev ofrece los siguientes servicios a negocios locales:

— Diseño y desarrollo de sitios web (React / Next.js)
— Optimización de Google Business Profile (Google Maps)
— Configuración y operación de chatbot con IA en WhatsApp
— SEO local y posicionamiento en buscadores
— Integración de sistemas de reservaciones y pagos en línea

Los detalles, alcance y precio de cada servicio se especifican en la propuesta o paquete acordado con el cliente antes del inicio del proyecto.`,
  },
  {
    title: "3. Proceso de contratación",
    content: `La relación comercial inicia cuando:

1. El cliente solicita un servicio por WhatsApp o correo electrónico
2. Albatros Dev envía una propuesta o confirma el paquete elegido
3. El cliente realiza el pago del setup (anticipo o totalidad según el caso)

El inicio formal del proyecto ocurre al confirmar la recepción del pago. Cualquier acuerdo verbal queda sujeto a confirmación escrita por WhatsApp o correo.`,
  },
  {
    title: "4. Precios y pagos",
    content: `Todos los precios se expresan en dólares estadounidenses (USD) salvo indicación contraria. Los precios incluyen:

— Un cargo único de setup (configuración inicial del servicio)
— Una mensualidad por mantenimiento, hosting y operación continua

Aceptamos pago por transferencia bancaria, tarjeta de crédito/débito, MercadoPago y efectivo en La Paz, BCS.

Los precios beta están disponibles exclusivamente para los primeros 5 clientes. Una vez ocupados esos lugares, los precios suben al precio regular sin previo aviso.

El pago de la mensualidad debe realizarse puntualmente. Pagos con más de 10 días de retraso pueden resultar en la suspensión temporal del servicio.`,
  },
  {
    title: "5. Derechos sobre el sitio web",
    content: `El sitio web desarrollado para el cliente es propiedad del cliente una vez cubierto el pago de setup en su totalidad. Albatros Dev retiene los derechos sobre:

— El código base reutilizable y librerías propias
— El diseño de sistema (componentes genéricos)
— Las herramientas internas de operación

El cliente puede solicitar en cualquier momento las credenciales de acceso a su dominio, hosting y repositorio de código.`,
  },
  {
    title: "6. Servicio de chatbot con IA",
    content: `El chatbot opera sobre la API de WhatsApp Business (Meta) y modelos de inteligencia artificial de terceros. El cliente entiende y acepta que:

— El chatbot responde basándose en la información que el cliente nos proporciona
— La precisión de las respuestas depende de la calidad de esa información
— Albatros Dev no se responsabiliza por respuestas incorrectas derivadas de datos desactualizados o incompletos provistos por el cliente
— El servicio puede presentar interrupciones breves por mantenimiento de terceros (Meta, proveedores de IA)
— El cliente debe notificarnos cualquier cambio en sus servicios, precios u horarios para mantener el chatbot actualizado`,
  },
  {
    title: "7. Obligaciones del cliente",
    content: `Para que podamos prestar el servicio correctamente, el cliente se compromete a:

— Proveer información veraz, completa y actualizada sobre su negocio
— Responder a nuestras solicitudes de información en un plazo razonable
— Realizar los pagos en tiempo y forma
— Notificarnos con al menos 48 horas de anticipación cualquier cambio urgente en la información del chatbot
— No usar los servicios para actividades ilegales, engañosas o que violen derechos de terceros`,
  },
  {
    title: "8. Cancelación del servicio",
    content: `El cliente puede cancelar los servicios mensuales en cualquier momento con un aviso mínimo de 15 días naturales antes del próximo periodo de facturación.

Al cancelar:
— El sitio web permanece activo hasta el fin del periodo pagado
— El cliente conserva su dominio y los archivos de su sitio
— El chatbot se desactiva al vencer el periodo pagado
— No se realizan reembolsos por periodos parciales ya facturados

Albatros Dev puede cancelar el servicio de forma inmediata en caso de incumplimiento de pago por más de 30 días o uso indebido del servicio.`,
  },
  {
    title: "9. Limitación de responsabilidad",
    content: `Albatros Dev no será responsable por:

— Pérdidas de negocio derivadas de interrupciones del servicio por causas de fuerza mayor o fallos de terceros (Meta, Google, proveedores cloud)
— Decisiones de compra tomadas por los clientes del negocio a través del chatbot
— Cambios en las políticas de Google, Meta o WhatsApp que afecten la funcionalidad de los servicios
— Penalizaciones de posicionamiento en Google derivadas de factores externos al SEO técnico que nosotros controlamos

En ningún caso la responsabilidad máxima de Albatros Dev excederá el importe pagado por el cliente en los últimos 3 meses de servicio.`,
  },
  {
    title: "10. Confidencialidad",
    content: `Albatros Dev trata como confidencial toda la información de negocio que el cliente comparte para configurar los servicios (precios, estrategias, datos operativos). No compartimos esta información con terceros salvo lo estrictamente necesario para la prestación del servicio o por requerimiento legal.`,
  },
  {
    title: "11. Modificaciones a los términos",
    content: `Podemos actualizar estos términos en cualquier momento. Los cambios significativos serán notificados por WhatsApp o correo electrónico con al menos 15 días de anticipación. El uso continuo de nuestros servicios después de esa fecha implica la aceptación de los nuevos términos.

La versión vigente siempre estará disponible en albatrosia.com/terms.

Última actualización: mayo de 2026.`,
  },
  {
    title: "12. Legislación y jurisdicción",
    content: `Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Para cualquier controversia, las partes se someten a la jurisdicción de los tribunales competentes de La Paz, Baja California Sur, renunciando a cualquier otro fuero que pudiera corresponderles por razón de sus domicilios presentes o futuros.`,
  },
];

export default function Terms() {
  return (
    <>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-lg font-semibold tracking-tight text-zinc-900">
              Albatros Dev
            </span>
            <span className="font-mono-custom text-xs text-zinc-400 border border-zinc-200 px-1.5 py-0.5 rounded">
              beta
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-16 min-h-screen">
        {/* Header */}
        <section className="py-16 px-6 border-b border-zinc-100">
          <div className="max-w-3xl mx-auto">
            <p className="font-mono-custom text-xs text-zinc-400 mb-4 tracking-widest uppercase">
              Legal · Contrato
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-zinc-900 mb-4 leading-tight">
              Términos y
              <br />
              Condiciones
            </h1>
            <p className="text-zinc-500 text-base leading-relaxed max-w-xl">
              Condiciones que rigen la contratación y uso de los servicios de
              Albatros Dev. Léelos antes de contratar.
            </p>
          </div>
        </section>

        {/* Sections */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto space-y-12">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="font-display text-xl font-semibold text-zinc-900 mb-3">
                  {s.title}
                </h2>
                <p className="text-zinc-500 text-sm leading-relaxed whitespace-pre-line">
                  {s.content}
                </p>
              </div>
            ))}

            {/* Related links */}
            <div className="border border-zinc-200 rounded-lg p-8 bg-zinc-50">
              <h2 className="font-display text-xl font-semibold text-zinc-900 mb-3">
                ¿Tienes preguntas?
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                Si tienes dudas sobre alguno de estos términos antes de
                contratar, con gusto las aclaramos por WhatsApp.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://wa.me/5216121670637?text=Hola%2C+tengo+una+pregunta+sobre+los+t%C3%A9rminos+y+condiciones+de+Albatros+Dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-zinc-900 text-white text-sm px-5 py-2.5 rounded-full hover:bg-zinc-700 transition-colors"
                >
                  Preguntar por WhatsApp
                </a>
                <Link
                  href="/privacy-policy"
                  className="inline-flex items-center gap-2 border border-zinc-200 text-zinc-700 text-sm px-5 py-2.5 rounded-full hover:border-zinc-400 transition-colors"
                >
                  Aviso de Privacidad →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-display text-base font-semibold text-zinc-900">Albatros Dev</span>
                <span className="font-mono-custom text-xs text-zinc-400 border border-zinc-200 px-1.5 py-0.5 rounded">beta</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Agencia digital en La Paz, BCS. Sitios web, Google Maps y chatbots con IA para negocios locales.
              </p>
            </div>
            <div>
              <p className="font-mono-custom text-xs text-zinc-400 uppercase tracking-widest mb-4">Menú</p>
              <ul className="space-y-2.5 text-sm text-zinc-500">
                <li><Link href="/#servicios" className="hover:text-zinc-900 transition-colors">Servicios</Link></li>
                <li><Link href="/#precios" className="hover:text-zinc-900 transition-colors">Precios</Link></li>
                <li><Link href="/#faq" className="hover:text-zinc-900 transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-mono-custom text-xs text-zinc-400 uppercase tracking-widest mb-4">Legal</p>
              <ul className="space-y-2.5 text-sm text-zinc-500">
                <li><Link href="/privacy-policy" className="hover:text-zinc-900 transition-colors">Aviso de Privacidad</Link></li>
                <li><Link href="/terms" className="text-zinc-900 font-medium">Términos y Condiciones</Link></li>
                <li><Link href="/data-deletion" className="hover:text-zinc-900 transition-colors">Eliminación de Datos</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-mono-custom text-xs text-zinc-400 uppercase tracking-widest mb-4">Contacto</p>
              <ul className="space-y-2.5 text-sm text-zinc-500">
                <li><a href="https://wa.me/5216121670637?text=Hola%2C+me+interesa+saber+m%C3%A1s+sobre+Albatros+Dev" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 transition-colors">WhatsApp</a></li>
                <li><a href="mailto:hola@albatrosia.com" className="hover:text-zinc-900 transition-colors">hola@albatrosia.com</a></li>
                <li className="text-zinc-400 text-xs pt-1">La Paz, BCS, México</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <p className="font-mono-custom text-xs text-zinc-400">© 2026 Albatros Dev · La Paz, Baja California Sur, México</p>
            <p className="font-mono-custom text-xs text-zinc-300">Hecho en La Paz con mucho café ☕ y buen internet ⚡️</p>
          </div>
        </div>
      </footer>
    </>
  );
}
