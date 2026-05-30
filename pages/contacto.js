import React from "react";
import Head from "next/head";
import NavBar from "../components/NavBarBlack/NavBarEs";
import BookingWidget from "../components/BookingWidget";
import WhatsappButton from "../components/WhatsappButton";

const beneficios = [
  "Diagnóstico gratuito y sin compromiso de tu restaurante.",
  "Una estrategia clara para crecer tus ventas este año.",
  "Te atiende un experto real de Impulso Restaurantero.",
];

function Contacto() {
  return (
    <>
      <Head>
        <title>Contacto — Impulso Restaurantero</title>
        <meta
          name="description"
          content="Agenda una sesión con el equipo de Impulso Restaurantero. Te ayudamos a impulsar tu restaurante."
        />
      </Head>

      <NavBar />

      <main className="w-full bg-white">
        {/* HERO oscuro al estilo del inicio */}
        <section className="relative w-full overflow-hidden bg-black pt-28 md:pt-32 pb-12 md:pb-16">
          {/* halo dorado sutil */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_320px_at_50%_0%,rgba(245,197,94,.14),transparent)]" />
          <div className="relative z-10 mx-auto max-w-[1100px] px-4 text-center">
            <span className="mb-5 inline-block rounded-full bg-secundario px-4 py-2 text-sm font-semibold uppercase tracking-wide text-principal md:text-base">
              Agenda sin costo
            </span>
            <h1 className="title2-tw uppercase text-white">
              Agenda tu <span className="text-principal">sesión</span>
            </h1>
            <p className="parrafo-tw mx-auto mt-4 max-w-[640px] text-white/70 md:!leading-[24px]">
              Elige el horario que más te convenga y un experto de Impulso
              Restaurantero te atenderá.
            </p>
          </div>
        </section>

        {/* CUERPO: dos columnas, el widget queda enmarcado */}
        <section className="mx-auto max-w-[1060px] px-4 pt-10 pb-16 md:pt-12 md:pb-24">
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,560px)] md:gap-8 lg:justify-center">
            {/* Columna izquierda: valor + contacto directo */}
            <aside className="rounded-2xl bg-black p-6 text-white shadow-[0_24px_70px_rgba(0,0,0,.25)] ring-1 ring-white/10 md:p-8">
              <h2 className="title3-tw text-principal">¿Por qué agendar?</h2>
              <ul className="mt-5 space-y-4">
                {beneficios.map((texto) => (
                  <li key={texto} className="flex items-start gap-3">
                    <span className="mt-[2px] flex h-6 w-6 flex-none items-center justify-center rounded-full bg-principal text-sm font-bold text-black">
                      ✓
                    </span>
                    <span className="parrafo-tw text-white/85 md:!leading-[22px]">
                      {texto}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="my-7 h-px w-full bg-white/10" />

              <p className="text-sm text-white/60">
                ¿Prefieres escribirnos directo?
              </p>
              <a
                href="https://wa.me/5215531491808?text=Hola%20quiero%20agendar%20una%20sesi%C3%B3n%20con%20Impulso%20Restaurantero"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-base font-semibold text-white shadow-[0_10px_30px_rgba(16,185,129,.35)] transition-colors hover:bg-emerald-700 active:bg-emerald-800"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-current"
                  aria-hidden="true"
                >
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.607z" />
                </svg>
                Escríbenos por WhatsApp
              </a>
            </aside>

            {/* Columna derecha: widget de agenda enmarcado y compacto */}
            <div className="rounded-2xl bg-white p-2 shadow-[0_24px_70px_rgba(0,0,0,.12)] ring-1 ring-gray-200 md:p-4">
              <BookingWidget eventTypeSlug="agenda-demo" maxWidth={520} />
            </div>
          </div>
        </section>
      </main>

      <WhatsappButton />
    </>
  );
}

export default Contacto;
