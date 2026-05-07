import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso de Privacidad — Albatros Dev",
  description:
    "Aviso de privacidad de Albatros Dev conforme a la LFPDPPP. Conoce cómo recopilamos, usamos y protegemos tus datos personales.",
};

const sections = [
  {
    title: "1. Responsable del tratamiento",
    content: `Albatros Dev ("nosotros", "la empresa") es responsable del tratamiento de tus datos personales. Operamos desde La Paz, Baja California Sur, México. Puedes contactarnos en cualquier momento a través de WhatsApp al +1 (555) 629-1595 o por correo electrónico a hola@albatrosia.com.`,
  },
  {
    title: "2. Datos personales que recopilamos",
    content: `Recopilamos los siguientes datos cuando interactúas con nosotros o contratas nuestros servicios:

— Nombre completo y nombre del negocio
— Número de teléfono (WhatsApp)
— Correo electrónico
— Dirección del negocio
— Información sobre tus servicios, precios y horarios (para configurar tu chatbot)
— Datos de facturación cuando aplica

No recopilamos datos sensibles como información financiera completa, datos biométricos ni información de salud.`,
  },
  {
    title: "3. Finalidades del tratamiento",
    content: `Usamos tus datos para las siguientes finalidades primarias:

— Prestación de los servicios contratados (sitio web, Google Maps, chatbot con IA)
— Configuración y operación de tu chatbot en WhatsApp
— Comunicación sobre el estado de tu proyecto
— Soporte técnico y mantenimiento
— Facturación y cobro de servicios

Finalidades secundarias (para las cuales puedes negarte sin afectar el servicio):

— Envío de actualizaciones sobre nuevos servicios o promociones
— Estudios de caso y testimonios con tu autorización expresa`,
  },
  {
    title: "4. Uso de WhatsApp e IA",
    content: `Nuestro servicio de chatbot opera a través de la API de WhatsApp Business (Meta Platforms). Al contratar el servicio de atención con IA, los mensajes de tus clientes son procesados por modelos de inteligencia artificial para generar respuestas automáticas.

Los mensajes están sujetos también a las políticas de privacidad de Meta (WhatsApp) y del proveedor de IA utilizado. No almacenamos el contenido de las conversaciones de tus clientes más allá del tiempo necesario para operar el servicio.`,
  },
  {
    title: "5. Transferencia de datos",
    content: `Tus datos pueden ser transferidos a los siguientes terceros estrictamente necesarios para la prestación del servicio:

— Proveedores de infraestructura cloud (Supabase, Vercel)
— Meta Platforms (para la integración de WhatsApp Business)
— Proveedores de modelos de IA para el procesamiento de respuestas
— Google (para la gestión de Google Business Profile)

No vendemos, rentamos ni cedemos tus datos personales a terceros con fines comerciales.`,
  },
  {
    title: "6. Derechos ARCO",
    content: `Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte (ARCO) al tratamiento de tus datos personales en cualquier momento. Para ejercer tus derechos:

1. Envíanos un mensaje por WhatsApp al +1 (555) 629-1595
2. O escríbenos a hola@albatrosia.com
3. Indícanos qué derecho deseas ejercer y adjunta una identificación oficial

Responderemos en un plazo máximo de 20 días hábiles conforme a la LFPDPPP.`,
  },
  {
    title: "7. Seguridad de los datos",
    content: `Implementamos medidas técnicas y organizativas para proteger tus datos: conexiones SSL/TLS, autenticación segura, acceso restringido por roles y almacenamiento cifrado. Sin embargo, ningún sistema es 100% seguro. En caso de una brecha de seguridad que afecte tus derechos, te notificaremos conforme a la ley.`,
  },
  {
    title: "8. Cookies y tecnologías de rastreo",
    content: `Nuestro sitio web utiliza cookies técnicas esenciales para su funcionamiento. Actualmente no usamos cookies de seguimiento publicitario de terceros. Si esto cambia, actualizaremos este aviso y te informaremos.`,
  },
  {
    title: "9. Conservación de datos",
    content: `Conservamos tus datos durante el tiempo que dure la relación comercial y el periodo legal requerido (generalmente 5 años para efectos fiscales). Al cancelar el servicio, eliminamos o anonimizamos tus datos en un plazo de 90 días, salvo obligación legal en contrario.`,
  },
  {
    title: "10. Cambios a este aviso",
    content: `Podemos actualizar este aviso en cualquier momento. Los cambios significativos serán notificados por WhatsApp o correo electrónico. La versión vigente siempre estará disponible en albatrosia.com/privacy-policy.

Última actualización: mayo de 2026.`,
  },
];

export default function PrivacyPolicy() {
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
              Legal · Privacidad
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-zinc-900 mb-4 leading-tight">
              Aviso de
              <br />
              Privacidad
            </h1>
            <p className="text-zinc-500 text-base leading-relaxed max-w-xl">
              Conforme a la Ley Federal de Protección de Datos Personales en
              Posesión de los Particulares (LFPDPPP) y su Reglamento.
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

            {/* Contact */}
            <div className="border border-zinc-200 rounded-lg p-8 bg-zinc-50">
              <h2 className="font-display text-xl font-semibold text-zinc-900 mb-3">
                ¿Tienes dudas?
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                Estamos aquí para resolver cualquier pregunta sobre el manejo de
                tus datos personales.
              </p>
              <a
                href="https://wa.me/5216121670637?text=Hola%2C+tengo+una+pregunta+sobre+el+aviso+de+privacidad+de+Albatros+Dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-zinc-900 text-white text-sm px-5 py-2.5 rounded-full hover:bg-zinc-700 transition-colors"
              >
                Contáctanos por WhatsApp
              </a>
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
                <li><Link href="/privacy-policy" className="text-zinc-900 font-medium">Aviso de Privacidad</Link></li>
                <li><Link href="/terms" className="hover:text-zinc-900 transition-colors">Términos y Condiciones</Link></li>
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
