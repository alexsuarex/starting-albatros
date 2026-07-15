import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Google API Data Disclosure — Albatros Dev",
  description:
    "Declaración de uso limitado de datos de Google Workspace y Google Calendar en Albatros Dev.",
};

const calendarUses = [
  "Consultar disponibilidad en calendarios conectados.",
  "Crear, actualizar o cancelar citas solicitadas por usuarios autorizados.",
  "Enviar confirmaciones, recordatorios y cambios relacionados con una cita.",
  "Mostrar información de agenda dentro del dashboard de Albatros Dev.",
];

const restrictedUses = [
  "No vendemos datos de Google Workspace o Google Calendar.",
  "No usamos estos datos para publicidad, retargeting, perfiles publicitarios ni scoring crediticio.",
  "No transferimos datos de Google Calendar a brokers de datos ni revendedores de información.",
  "No usamos datos recibidos de Google Workspace APIs para crear, entrenar o mejorar modelos de IA/ML generalizados.",
  "No enviamos datos crudos, agregados, anonimizados o derivados de Google Calendar a servicios de IA de terceros para entrenamiento de modelos.",
];

const aiIntegrations = [
  {
    provider: "Google Gemini API (Google LLC)",
    status: "Active and fixed as the default provider",
    use: "Generación de respuestas conversacionales del asistente Albi en WhatsApp, Facebook Messenger e Instagram cuando el canal está conectado.",
    googleData:
      "No recibe datos crudos, agregados, anonimizados ni derivados de Google Calendar o Google Workspace APIs. La disponibilidad y las operaciones de calendario se manejan fuera del modelo de IA.",
    model: "gemini-3.1-flash-lite",
    serviceTier:
      "Paid Service through a Google Cloud project with active billing",
  },
];

const inactiveAiIntegrations = [
  {
    provider: "GroqCloud API (Groq, LLC)",
    status:
      "Inactive legacy fallback. It does not handle production responses or receive Google Workspace data.",
  },
  {
    provider: "OpenAI and Anthropic",
    status:
      "Declared only as unsupported provider options. They are not implemented and receive no application or Google Workspace data.",
  },
];

export default function GoogleApiDisclosure() {
  return (
    <>
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

      <main className="pt-16 min-h-screen">
        <section className="py-16 px-6 border-b border-zinc-100">
          <div className="max-w-3xl mx-auto">
            <p className="font-mono-custom text-xs text-zinc-400 mb-4 tracking-widest uppercase">
              Legal · Google API
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-zinc-900 mb-4 leading-tight">
              Google API
              <br />
              Data Disclosure
            </h1>
            <p className="text-zinc-500 text-base leading-relaxed max-w-xl">
              This page explains how Albatros Dev uses data received from Google
              Workspace APIs, including Google Calendar, and how we comply with
              Google&apos;s Limited Use requirements.
            </p>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto space-y-12">
            <div>
              <h2 className="font-display text-xl font-semibold text-zinc-900 mb-3">
                Limited Use Compliance Statement
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed">
                The use of information received from Google Workspace scopes
                will adhere to the{" "}
                <a
                  href="https://developers.google.com/terms/api-services-user-data-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-900 underline underline-offset-2"
                >
                  Google User Data Policy
                </a>
                , including the{" "}
                <a
                  href="https://developers.google.com/workspace/workspace-api-user-data-developer-policy#limited_use_of_user_data"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-900 underline underline-offset-2"
                >
                  Limited Use requirements
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-zinc-900 mb-3">
                Google Calendar data we access
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed">
                When a customer connects Google Calendar, Albatros Dev may
                process calendar identifiers, availability, event metadata,
                date and time, attendees, location, event notes when required,
                and OAuth tokens needed to keep the authorized integration
                working.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-zinc-900 mb-4">
                Permitted use
              </h2>
              <ul className="space-y-3">
                {calendarUses.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm text-zinc-500 leading-relaxed"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-900 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-zinc-900 mb-4">
                Restrictions
              </h2>
              <ul className="space-y-3">
                {restrictedUses.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm text-zinc-500 leading-relaxed"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-900 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-zinc-900 mb-4">
                Third-party AI integrations
              </h2>
              <div className="space-y-4">
                {aiIntegrations.map((integration) => (
                  <div
                    key={integration.provider}
                    className="border border-zinc-200 rounded-lg p-6 bg-zinc-50"
                  >
                    <h3 className="font-display text-base font-semibold text-zinc-900 mb-2">
                      {integration.provider}
                    </h3>
                    <dl className="space-y-3 text-sm">
                      <div>
                        <dt className="font-mono-custom text-xs text-zinc-400 uppercase tracking-widest">
                          Status
                        </dt>
                        <dd className="text-zinc-500 leading-relaxed mt-1">
                          {integration.status}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-mono-custom text-xs text-zinc-400 uppercase tracking-widest">
                          Purpose
                        </dt>
                        <dd className="text-zinc-500 leading-relaxed mt-1">
                          {integration.use}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-mono-custom text-xs text-zinc-400 uppercase tracking-widest">
                          Model
                        </dt>
                        <dd className="text-zinc-500 leading-relaxed mt-1">
                          {integration.model}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-mono-custom text-xs text-zinc-400 uppercase tracking-widest">
                          Service tier
                        </dt>
                        <dd className="text-zinc-500 leading-relaxed mt-1">
                          {integration.serviceTier}. See the{" "}
                          <a
                            href="https://ai.google.dev/gemini-api/terms#paid-services"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-900 underline underline-offset-2"
                          >
                            Gemini API Paid Services terms
                          </a>
                          .
                        </dd>
                      </div>
                      <div>
                        <dt className="font-mono-custom text-xs text-zinc-400 uppercase tracking-widest">
                          Google Workspace data
                        </dt>
                        <dd className="text-zinc-500 leading-relaxed mt-1">
                          {integration.googleData}
                        </dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <h3 className="font-display text-base font-semibold text-zinc-900 mb-3">
                  Inactive or unimplemented providers
                </h3>
                <ul className="space-y-3">
                  {inactiveAiIntegrations.map((integration) => (
                    <li
                      key={integration.provider}
                      className="text-sm text-zinc-500 leading-relaxed"
                    >
                      <span className="font-medium text-zinc-700">
                        {integration.provider}:
                      </span>{" "}
                      {integration.status}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed mt-4">
                Albatros Dev does not currently operate a self-hosted or
                offline AI model that processes Google Calendar or Google
                Workspace user data.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-zinc-900 mb-3">
                User control and deletion
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Users may revoke Albatros Dev&apos;s Google access from their
                Google Account security settings at any time. Users may also
                request deletion of data handled by Albatros Dev through our{" "}
                <Link
                  href="/data-deletion"
                  className="text-zinc-900 underline underline-offset-2"
                >
                  data deletion page
                </Link>
                .
              </p>
            </div>

            <div className="border border-zinc-200 rounded-lg p-8 bg-zinc-50">
              <h2 className="font-display text-xl font-semibold text-zinc-900 mb-3">
                Questions
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                For questions about Google API data handling, contact Albatros
                Dev at hola@albatrosia.com.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/privacy-policy"
                  className="inline-flex items-center gap-2 bg-zinc-900 text-white text-sm px-5 py-2.5 rounded-full hover:bg-zinc-700 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/data-deletion"
                  className="inline-flex items-center gap-2 border border-zinc-200 text-zinc-700 text-sm px-5 py-2.5 rounded-full hover:border-zinc-400 transition-colors"
                >
                  Data Deletion
                </Link>
              </div>
            </div>

            <p className="font-mono-custom text-xs text-zinc-400">
              Last updated: July 15, 2026.
            </p>
          </div>
        </section>
      </main>

      <footer className="py-16 px-6 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-display text-base font-semibold text-zinc-900">
                  Albatros Dev
                </span>
                <span className="font-mono-custom text-xs text-zinc-400 border border-zinc-200 px-1.5 py-0.5 rounded">
                  beta
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Agencia digital en La Paz, BCS. Sitios web, Google Maps y
                chatbots con IA para negocios locales.
              </p>
            </div>
            <div>
              <p className="font-mono-custom text-xs text-zinc-400 uppercase tracking-widest mb-4">
                Menú
              </p>
              <ul className="space-y-2.5 text-sm text-zinc-500">
                <li>
                  <Link
                    href="/#servicios"
                    className="hover:text-zinc-900 transition-colors"
                  >
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#precios"
                    className="hover:text-zinc-900 transition-colors"
                  >
                    Precios
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#faq"
                    className="hover:text-zinc-900 transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-mono-custom text-xs text-zinc-400 uppercase tracking-widest mb-4">
                Legal
              </p>
              <ul className="space-y-2.5 text-sm text-zinc-500">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="hover:text-zinc-900 transition-colors"
                  >
                    Aviso de Privacidad
                  </Link>
                </li>
                <li>
                  <Link
                    href="/google-api-disclosure"
                    className="text-zinc-900 font-medium"
                  >
                    Datos de Google API
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-zinc-900 transition-colors"
                  >
                    Términos y Condiciones
                  </Link>
                </li>
                <li>
                  <Link
                    href="/data-deletion"
                    className="hover:text-zinc-900 transition-colors"
                  >
                    Eliminación de Datos
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-mono-custom text-xs text-zinc-400 uppercase tracking-widest mb-4">
                Contacto
              </p>
              <ul className="space-y-2.5 text-sm text-zinc-500">
                <li>
                  <a
                    href="https://wa.me/5216121670637?text=Hola%2C+me+interesa+saber+m%C3%A1s+sobre+Albatros+Dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-zinc-900 transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hola@albatrosia.com"
                    className="hover:text-zinc-900 transition-colors"
                  >
                    hola@albatrosia.com
                  </a>
                </li>
                <li className="text-zinc-400 text-xs pt-1">
                  La Paz, BCS, México
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <p className="font-mono-custom text-xs text-zinc-400">
              © 2026 Albatros Dev · La Paz, Baja California Sur, México
            </p>
            <p className="font-mono-custom text-xs text-zinc-300">
              Hecho en La Paz con mucho café ☕ y buen internet ⚡️
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
