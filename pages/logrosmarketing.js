// pages/logros.tsx
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { InlineWidget } from "react-calendly";
import NavBar from "../components/NavBarBlack/NavBarEs";

// Counter animado súper ligero
const AnimatedNumber = ({ value }) => {
  const [display, setDisplay] = React.useState(0);
  React.useEffect(() => {
    const step = value / 60; // 60 frames ≈ 1 s
    let current = 0;
    const id = setInterval(() => {
      current += step;
      if (current >= value) {
        current = value;
        clearInterval(id);
      }
      setDisplay(Number(current.toFixed(0)));
    }, 16);
    return () => clearInterval(id);
  }, [value]);
  return <span>{display.toLocaleString("es-MX")}</span>;
};

export default function Logros() {
  /* ------------------  KPIs que ya tenemos  ------------------ */
  const kpi = {
    ingresosInicial: 200_000,
    ingresosActual: 3_000_000,
    ticketInicial: 100,
    ticketActual: 750,
    igViews: 89_602,
    igReach: 47_393,
    tiktokClicks: 2_473,
    tiktokConversions: 23_047,
    tiktokCost: 523_043.41,
    tiktokCostPerConv: 22.71,
    reservasFromSocial: 1_201,
    roiPerPeso: 204.5, // calculado arriba
  };

  return (
    <>
      <Head>
        <title>Impulso Restaurantero · Nuestros logros</title>
        <meta
          name="description"
          content="Así pasamos de 200 k a 3 M MXN al mes con TikTok, influencers y una estrategia de datos."
        />
      </Head>
      <NavBar />

      <main className="bg-[#1E1E1E] text-white">
        {/* HERO */}
        <section className="relative flex flex-col items-center justify-center h-[80vh] text-center overflow-hidden">
          <Image
            src="/images/logrosMarketing.jpeg" // ruta relativa a /public
            alt="Cantina La Llorona celebrando"
            fill // hace que ocupe todo el section
            priority // precarga para que no parpadee
            className="object-cover object-center opacity-10" // opacidad ↓ para que el texto resalte
          />
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              ¡De&nbsp;
              <span className="text-[#A78B20]">
                $<AnimatedNumber value={kpi.ingresosInicial} /> MXN
              </span>
              &nbsp;a&nbsp;
              <span className="text-[#A78B20]">
                $<AnimatedNumber value={kpi.ingresosActual} /> MXN
              </span>
              &nbsp;mensuales!
            </h1>
            <p className="mt-4 max-w-xl text-lg opacity-80">
              La estrategia de contenido + data-driven ads que revolucionó
              Cantina La Llorona.
            </p>
          </div>
          <div className="absolute inset-0 bg-[url('/hero-llorona.jpg')] bg-cover opacity-20 -z-10" />
        </section>

        <div className="w-full">
          <InlineWidget url="https://calendly.com/clientes-impulsorestaurantero/30min" />
        </div>

        {/* KPIs GRID */}
        <section className="py-20 px-6 md:px-16 bg-[#121212]">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
            Métricas que hablan por sí solas
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {/* IG + TikTok reach */}
            <div className="p-6 rounded-lg bg-[#1E1E1E] ring-1 ring-[#333]">
              <h3 className="text-sm uppercase tracking-wide text-[#A78B20] mb-2">
                Alcance Instagram
              </h3>
              <p className="text-3xl font-bold">
                <AnimatedNumber value={kpi.igReach} />+
              </p>
              <p className="opacity-60 text-sm">Cuentas en 30 días</p>
            </div>

            <div className="p-6 rounded-lg bg-[#1E1E1E] ring-1 ring-[#333]">
              <h3 className="text-sm uppercase tracking-wide text-[#A78B20] mb-2">
                Vistas TikTok virales
              </h3>
              <p className="text-3xl font-bold">
                1.8&nbsp;M&nbsp;+ 1.7&nbsp;M&nbsp;+ 1.5&nbsp;M
              </p>
              <p className="opacity-60 text-sm">Top 3 videos</p>
            </div>

            <div className="p-6 rounded-lg bg-[#1E1E1E] ring-1 ring-[#333]">
              <h3 className="text-sm uppercase tracking-wide text-[#A78B20] mb-2">
                Clicks a la web
              </h3>
              <p className="text-3xl font-bold">
                <AnimatedNumber value={kpi.tiktokClicks} />
              </p>
              <p className="opacity-60 text-sm">+430 % vs periodo anterior</p>
            </div>

            {/* Conversions */}
            <div className="p-6 rounded-lg bg-[#1E1E1E] ring-1 ring-[#333]">
              <h3 className="text-sm uppercase tracking-wide text-[#A78B20] mb-2">
                Conversiones totales
              </h3>
              <p className="text-3xl font-bold">
                <AnimatedNumber value={kpi.tiktokConversions} />
              </p>
              <p className="opacity-60 text-sm">Desde TikTok Ads</p>
            </div>

            <div className="p-6 rounded-lg bg-[#1E1E1E] ring-1 ring-[#333]">
              <h3 className="text-sm uppercase tracking-wide text-[#A78B20] mb-2">
                Reservas generadas
              </h3>
              <p className="text-3xl font-bold">
                <AnimatedNumber value={kpi.reservasFromSocial} />
              </p>
              <p className="opacity-60 text-sm">Atribuidas a redes</p>
            </div>

            <div className="p-6 rounded-lg bg-[#1E1E1E] ring-1 ring-[#333]">
              <h3 className="text-sm uppercase tracking-wide text-[#A78B20] mb-2">
                ROI por peso invertido
              </h3>
              <p className="text-3xl font-bold">
                $<AnimatedNumber value={kpi.roiPerPeso} /> MXN
              </p>
              <p className="opacity-60 text-sm">Ingreso ↑ / Costo ↓</p>
            </div>
          </div>
        </section>

        {/* ROI BREAKDOWN */}
        <section className="py-20 px-6 md:px-24 bg-[#1E1E1E]">
          <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-center">
            Así convertimos 1 peso en 204 pesos
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Explicación en lenguaje sencillo */}
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                • <strong>Costo por cliente:</strong> Gastamos{" "}
                <span className="text-[#A78B20]">22 MXN</span> en anuncios de
                TikTok para que una persona reserve.
              </p>

              <p>
                • <strong>Ingreso de esa reserva:</strong> Una mesa de
                cumpleaños (6&nbsp;personas) deja{" "}
                <span className="text-[#A78B20]">4 500 MXN</span>.
              </p>

              <p>
                • <strong>Resultado final:</strong> 4 500 ÷ 22 ≈{" "}
                <span className="text-[#A78B20]">204 veces</span> lo invertido.
              </p>

              <p className="italic opacity-80">
                En pocas palabras, por cada peso que inviertes, regresas 204
                pesos en ventas.
              </p>
            </div>

            {/* Imagen de fondo/ilustración */}
            <Image
              src="/images/tiktokfondo.jpg"
              alt="Celebración de cumpleaños gracias a TikTok"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </section>

        <div className="w-full">
          <InlineWidget url="https://calendly.com/clientes-impulsorestaurantero/30min" />
        </div>
        {/* VIDEOS DESTACADOS */}
        <section className="py-20 px-6 md:px-24 bg-[#121212]">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
            Nuestros hits virales
          </h2>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                src: "/images/impulso1.jpg",
                views: "1.8 M",
                href: "https://vt.tiktok.com/ZShMAPeXf/",
              },
              {
                src: "/images/impulso2.jpg",
                views: "1.7 M",
                href: "https://vt.tiktok.com/ZShMAWCME/",
              },
              {
                src: "/images/impulso3.jpg",
                views: "1.5 M",
                href: "https://vt.tiktok.com/ZShMA1jrP/",
              },
              {
                src: "/images/impulso4.jpg",
                views: "942 k",
                href: "https://vt.tiktok.com/ZShMARHar/",
              },
            ].map((v, i) => (
              <a
                key={i}
                href={v.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden rounded-lg ring-1 ring-[#333] block"
              >
                <Image
                  src={v.src}
                  alt={`Video con ${v.views} de vistas`}
                  width={400}
                  height={500}
                  className="object-cover h-full w-full"
                />
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-1 text-xs rounded">
                  {v.views}
                </span>
              </a>
            ))}
          </div>
        </section>

        <div className="w-full">
          <InlineWidget url="https://calendly.com/clientes-impulsorestaurantero/30min" />
        </div>

        {/* FOOTER */}
        {/* <footer className="py-10 text-center bg-[#1E1E1E] text-sm opacity-60">
          © {new Date().getFullYear()} · Impulso Restaurantero
        </footer> */}
      </main>
    </>
  );
}
