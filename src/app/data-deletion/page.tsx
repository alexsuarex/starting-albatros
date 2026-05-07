import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Eliminación de Datos — Albatros Dev",
  description:
    "Instrucciones para solicitar la eliminación de tus datos personales de los sistemas de Albatros Dev conforme a la LFPDPPP.",
};

const steps = [
  {
    num: "01",
    title: "Envíanos tu solicitud",
    desc: 'Escríbenos por WhatsApp al +1 (555) 629-1595 o por correo a hola@albatrosia.com con el asunto "Solicitud de eliminación de datos". Incluye el nombre completo o nombre del negocio con el que nos contactaste.',
  },
  {
    num: "02",
    title: "Verificamos tu identidad",
    desc: "Para proteger tus datos, te pediremos una identificación oficial o que confirmes información que solo tú conoces (como el número de WhatsApp registrado o correo usado). Este paso es obligatorio y toma menos de 24 horas.",
  },
  {
    num: "03",
    title: "Confirmamos y ejecutamos",
    desc: "Una vez verificada tu identidad, eliminamos o anonimizamos tus datos en un plazo máximo de 20 días hábiles conforme a la LFPDPPP. Te enviamos una confirmación por escrito cuando el proceso esté completo.",
  },
];

const dataTypes = [
  {
    label: "Datos de contacto",
    detail: "Nombre, teléfono, correo electrónico",
    deleted: true,
  },
  {
    label: "Información del negocio",
    detail: "Servicios, precios, horarios compartidos para configurar el chatbot",
    deleted: true,
  },
  {
    label: "Historial de conversaciones",
    detail: "Mensajes intercambiados con Albi por WhatsApp",
    deleted: true,
  },
  {
    label: "Registros de facturación",
    detail: "Comprobantes y datos de pago",
    deleted: false,
    exception: "Retenidos 5 años por obligación fiscal (SAT)",
  },
  {
    label: "Registros de acceso",
    detail: "Logs técnicos de seguridad",
    deleted: false,
    exception: "Retenidos 90 días por requisito de seguridad",
  },
];

export default function DataDeletion() {
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
              Legal · Datos personales
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-zinc-900 mb-4 leading-tight">
              Eliminación
              <br />
              de Datos
            </h1>
            <p className="text-zinc-500 text-base leading-relaxed max-w-xl">
              Tienes derecho a solicitar la eliminación de tus datos personales
              en cualquier momento. Aquí te explicamos cómo hacerlo y qué
              ocurre con cada tipo de dato.
            </p>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto space-y-16">

            {/* Steps */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-zinc-900 mb-8">
                Cómo solicitar la eliminación
              </h2>
              <div className="space-y-6">
                {steps.map((s) => (
                  <div
                    key={s.num}
                    className="relative border border-zinc-200 rounded-lg p-6 overflow-hidden"
                  >
                    <span className="absolute top-4 right-4 font-mono-custom text-5xl font-bold text-zinc-100 select-none leading-none">
                      {s.num}
                    </span>
                    <h3 className="font-display text-base font-semibold text-zinc-900 mb-2 relative z-10">
                      {s.title}
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed relative z-10">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* What gets deleted */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-zinc-900 mb-2">
                Qué se elimina y qué no
              </h2>
              <p className="text-zinc-500 text-sm mb-6">
                Algunos datos deben conservarse por obligación legal aunque
                solicites la eliminación.
              </p>
              <div className="border border-zinc-200 rounded-lg overflow-hidden">
                {dataTypes.map((d, i) => (
                  <div
                    key={d.label}
                    className={`flex items-start gap-4 px-6 py-4 ${
                      i < dataTypes.length - 1 ? "border-b border-zinc-100" : ""
                    }`}
                  >
                    <span
                      className={`mt-0.5 text-sm font-medium shrink-0 ${
                        d.deleted ? "text-zinc-900" : "text-zinc-300"
                      }`}
                    >
                      {d.deleted ? "✓" : "—"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-medium ${
                          d.deleted ? "text-zinc-700" : "text-zinc-400"
                        }`}
                      >
                        {d.label}
                      </p>
                      <p className="text-xs text-zinc-400 mt-0.5">{d.detail}</p>
                      {d.exception && (
                        <p className="text-xs text-zinc-400 font-mono-custom mt-1">
                          * {d.exception}
                        </p>
                      )}
                    </div>
                    <span
                      className={`shrink-0 text-xs font-mono-custom px-2 py-1 rounded ${
                        d.deleted
                          ? "bg-zinc-100 text-zinc-500"
                          : "bg-zinc-50 text-zinc-300"
                      }`}
                    >
                      {d.deleted ? "Se elimina" : "Se retiene"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Plazo */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-zinc-900 mb-3">
                Plazos y confirmación
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Respondemos tu solicitud dentro de los{" "}
                <span className="text-zinc-900 font-medium">
                  20 días hábiles
                </span>{" "}
                siguientes a la verificación de identidad, conforme al artículo
                32 de la LFPDPPP. Al completar la eliminación recibirás una
                confirmación escrita por el mismo canal en que enviaste la
                solicitud (WhatsApp o correo).
              </p>
              <p className="text-zinc-500 text-sm leading-relaxed mt-3">
                Si tienes alguna inconformidad con nuestra respuesta, puedes
                presentar una queja ante el{" "}
                <span className="text-zinc-700 font-medium">
                  INAI (Instituto Nacional de Transparencia, Acceso a la
                  Información y Protección de Datos Personales)
                </span>{" "}
                en{" "}
                <a
                  href="https://home.inai.org.mx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-zinc-900 transition-colors"
                >
                  home.inai.org.mx
                </a>
                .
              </p>
            </div>

            {/* CTA */}
            <div className="border border-zinc-200 rounded-lg p-8 bg-zinc-50">
              <h2 className="font-display text-xl font-semibold text-zinc-900 mb-3">
                Solicitar eliminación ahora
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                Escríbenos directamente y gestionamos tu solicitud de
                inmediato.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://wa.me/15556291595?text=Solicitud+de+eliminaci%C3%B3n+de+datos+%E2%80%94+Albatros+Dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-zinc-900 text-white text-sm px-5 py-2.5 rounded-full hover:bg-zinc-700 transition-colors"
                >
                  Solicitar por WhatsApp
                </a>
                <a
                  href="mailto:hola@albatrosia.com?subject=Solicitud%20de%20eliminaci%C3%B3n%20de%20datos"
                  className="inline-flex items-center gap-2 border border-zinc-200 text-zinc-700 text-sm px-5 py-2.5 rounded-full hover:border-zinc-400 transition-colors"
                >
                  Solicitar por correo
                </a>
              </div>
            </div>

            {/* Related */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-zinc-100">
              <Link
                href="/privacy-policy"
                className="text-sm text-zinc-400 hover:text-zinc-900 transition-colors"
              >
                → Aviso de Privacidad
              </Link>
              <Link
                href="/terms"
                className="text-sm text-zinc-400 hover:text-zinc-900 transition-colors"
              >
                → Términos y Condiciones
              </Link>
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
                <li><Link href="/terms" className="hover:text-zinc-900 transition-colors">Términos y Condiciones</Link></li>
                <li><Link href="/data-deletion" className="text-zinc-900 font-medium">Eliminación de Datos</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-mono-custom text-xs text-zinc-400 uppercase tracking-widest mb-4">Contacto</p>
              <ul className="space-y-2.5 text-sm text-zinc-500">
                <li><a href="https://wa.me/15556291595?text=Hola%2C+me+interesa+saber+m%C3%A1s+sobre+Albatros+Dev" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 transition-colors">WhatsApp</a></li>
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
