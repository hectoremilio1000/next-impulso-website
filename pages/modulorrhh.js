import Head from "next/head";
import Image from "next/image";
import React from "react";
import { InlineWidget } from "react-calendly";
import NavBar from "../components/NavBarBlack/NavBarEs";

// --------- Utilidad: contador animado súper ligero ---------
const AnimatedNumber = ({ value }) => {
  const [display, setDisplay] = React.useState(0);
  React.useEffect(() => {
    const step = value / 60; // 60 frames ≈ 1 s
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

export default function RecursosHumanos() {
  /* ------------------  Métricas demo ------------------ */
  const kpi = {
    candidatos: 1_523,
    exámenes: 8_412,
    manuales: 237,
    checklist: 12_497,
  };

  return (
    <>
      <Head>
        <title>GrowthSuite · Recursos Humanos Inteligentes</title>
        <meta
          name="description"
          content="Encuentra, evalúa y capacita al mejor talento para tu restaurante — todo desde una sola plataforma con IA."
        />
      </Head>

      <NavBar />

      <main className="bg-[#1E1E1E] text-white">
        {/* HERO */}
        <section className="relative flex flex-col items-center justify-center h-[80vh] text-center overflow-hidden">
          <Image
            src="/images/frontsistema.jpg" // coloca la imagen en /public/images
            alt="Mesero usando GrowthSuite feliz con la facilidad de uso"
            fill
            priority
            className="object-cover object-center opacity-20"
          />
          <div className="relative z-10 px-6 md:px-0">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl mx-auto">
              Recluta, evalúa y <span className="text-[#A78B20]">eleva</span> a
              tu equipo sin salir de{" "}
              <span className="text-[#A78B20]">GrowthSuite</span>
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-lg opacity-80">
              Deja que la IA filtre candidatos, genere exámenes psicométricos y
              entregue manuales de entrenamiento listos para tu menú.
            </p>
            <a
              href="https://wa.me/5215531491808?text=Hola%20quiero%20un%20restaurante%20exitoso"
              className="mx-auto inline-block text-white bg-[#25D366] font-bold py-4 px-8 rounded-2xl shadow-lg hover:scale-105 transition-transform mt-2"
            >
              Ver demo
            </a>
          </div>
          <div className="absolute inset-0 bg-[url('/hero-llorona.jpg')] bg-cover opacity-20 -z-10" />
        </section>

        {/* VIDEO DEMO */}
        <section
          id="demo"
          className="py-20 px-6 md:px-24 bg-[#121212] flex flex-col items-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
            Cómo funciona el módulo de RRHH
          </h2>
          <div className="w-full aspect-video max-w-5xl ring-1 ring-[#333] rounded-lg overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/yoHqlZ6dKyE"
              title="GrowthSuite Recursos Humanos"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-[450px]"
            />
          </div>
        </section>

        {/* MÉTRICAS */}
        <section className="py-20 px-6 md:px-24 bg-[#1E1E1E]">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
            Resultados que hablan por sí solos
          </h2>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                label: "Candidatos analizados",
                value: kpi.candidatos,
              },
              {
                label: "Exámenes completados",
                value: kpi.exámenes,
              },
              {
                label: "Manuales personalizados",
                value: kpi.manuales,
              },
              {
                label: "Checklist ejecutados",
                value: kpi.checklist,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-lg bg-[#1E1E1E] ring-1 ring-[#333] text-center"
              >
                <p className="text-3xl font-bold mb-2">
                  <AnimatedNumber value={item.value} />+
                </p>
                <p className="opacity-80 text-sm uppercase tracking-wide">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-20 px-6 md:px-24 bg-[#121212]">
          <h2 className="text-3xl md:text-4xl font-semibold mb-16 text-center max-w-3xl mx-auto">
            Todo lo que tu equipo necesita, en una sola plataforma
          </h2>

          <div className="grid gap-16 md:grid-cols-2">
            {/* Feature 1 – Reclutamiento IA */}
            <div className="space-y-6 text-lg leading-relaxed">
              <h3 className="text-2xl font-semibold text-[#A78B20] flex items-center gap-2">
                <span>1.</span> Encuentra al candidato perfecto
              </h3>
              <p>
                Publica tu vacante y deja que nuestro algoritmo pre‑filtre a los
                aspirantes. Analizamos CV, experiencia y soft‑skills para
                presentarte solo a los mejores.
              </p>
              <Image
                src="/images/aplicacionimpulso.jpg" // screenshot aplicación candidatos
                alt="Aplicación de candidatos en GrowthSuite"
                width={600}
                height={400}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>

            {/* Feature 2 – Exámenes y Radar */}
            <div className="space-y-6 text-lg leading-relaxed">
              <h3 className="text-2xl font-semibold text-[#A78B20] flex items-center gap-2">
                <span>2.</span> Evalúa con exámenes psicométricos y de
                conocimiento
              </h3>
              <p>
                Cada puesto tiene un test personalizado que mide ética, bondad,
                curiosidad y conocimiento técnico. Visualiza el match con tu
                perfil ideal en segundos.
              </p>
              <Image
                src="/images/examenespsicometricosrrhh.jpg" // radar chart screenshot
                alt="Radar comparando candidato vs perfil ideal"
                width={600}
                height={400}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>

            {/* Feature 3 – Manuales y Training */}
            <div className="space-y-6 text-lg leading-relaxed">
              <h3 className="text-2xl font-semibold text-[#A78B20] flex items-center gap-2">
                <span>3.</span> Capacita con manuales y cursos a la medida
              </h3>
              <p>
                Los meseros reciben módulos, videos y quizzes sobre tu menú,
                filosofía y protocolos. Progreso y calificaciones se registran
                automáticamente.
              </p>
              <Image
                src="/images/manualcocinero.jpg" // imagen referencial manuales
                alt="Manual de capacitación en GrowthSuite"
                width={600}
                height={400}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>

            {/* Feature 4 – Checklist operativos */}
            <div className="space-y-6 text-lg leading-relaxed">
              <h3 className="text-2xl font-semibold text-[#A78B20] flex items-center gap-2">
                <span>4.</span> Controla rutina y calidad con checklist
              </h3>
              <p>
                Apertura, cierre y mise en place: todo se valida desde el móvil.
                Notificaciones, evidencia fotográfica y reportes en tiempo real.
              </p>
              <Image
                src="/images/examenpsicometrico.jpg" // imagen referencial checklist
                alt="Checklist en dispositivo"
                width={600}
                height={400}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </section>

        {/* CTA Calendly */}
        <section className="py-20 bg-[#1E1E1E] text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8">
            ¿Listo para conocer GrowthSuite?
          </h2>
          <p className="max-w-xl mx-auto mb-6 opacity-80">
            Agenda una llamada de 30 minutos con nuestro equipo y descubre cómo
            podemos elevar tu operación de inmediato.
          </p>
          <InlineWidget url="https://calendly.com/clientes-impulsorestaurantero/30min" />
        </section>
      </main>
    </>
  );
}
