import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import NavBar from "../components/NavBarBlack/NavBarEs";
import { motion, useMotionValue, useTransform } from "framer-motion";

/**
 * Landing – GrowthSuite POS (interactivo) – Versión JS
 * Ajustes: medios con tamaño uniforme y tipografía legible en todos los dispositivos.
 */

/* -------------------------------------------------- */
/*  TiltCard utility                                  */
/* -------------------------------------------------- */
const TiltCard = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-120, 120], [15, -15]);
  const rotateY = useTransform(x, [-120, 120], [-15, 15]);

  return (
    <motion.article
      className="rounded-2xl shadow-lg overflow-hidden bg-white"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.article>
  );
};

export default function GrowthSuitePOS() {
  const [form, setForm] = useState({ name: "", email: "", restaurant: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errs = {};
    if (!form.name) errs.name = "Ingresa tu nombre";
    if (!emailRegex.test(form.email)) errs.email = "Correo inválido";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Payload:", form);
    setSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>GrowthSuite POS – Control total 24/7</title>
        <meta
          name="description"
          content="El POS que sincroniza cocina, salón y finanzas en tiempo real, visible desde cualquier dispositivo."
        />
      </Head>

      <NavBar />

      {/* Hero */}
      <header className="relative bg-white overflow-hidden">
        <Image
          src="/images/escritorioGrowthsuite.jpg"
          alt="Dashboard GrowthSuite POS"
          fill
          priority
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-center py-28 md:py-40 px-4 bg-black/60 backdrop-blur-sm">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            GrowthSuite POS
          </h1>
          <h2 className="text-lg md:text-2xl text-white mb-8 max-w-2xl">
            Toma pedidos, revisa tus ventas al instante en tu móvil.
          </h2>
          <a
            href="https://calendly.com/clientes-impulsorestaurantero/30min"
            className="inline-block text-white bg-principal font-bold py-4 px-8 rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            Agenda tu demo gratis
          </a>
        </div>
      </header>

      {/* Dispositivos */}

      <section className="bg-gray-50 py-12 px-4 md:px-20 text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-8 text-[#1E1E1E]">
          ¿Aún usas un POS desconectado que te da reportes al final del día?
        </h3>
        <p className="text-lg md:text-2xl max-w-4xl mx-auto text-gray-700">
          Con GrowthSuite POS ves cada venta en segundos, reduces tiempos de
          espera y controlas costos de inmediato. Sin licencias complicadas ni
          hardware propietario.
        </p>
      </section>

      {/* Características clave */}
      <section className="py-6 px-4 md:px-20 bg-white">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1E1E1E]">
          Qué hace único a GrowthSuite POS
        </h3>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-gray-800">
          {[
            {
              icon: "🖥️",
              title: "Monitor de producción integrado",
              desc: "Órdenes enviadas directamente a cocina con estatus en vivo (sin correr papel).",
            },
            {
              icon: "📱",
              title: "Tabletas para meseros",
              desc: "Toma de pedidos y cobro sin regresar a la caja — más comensales atendidos por turno.",
            },
            {
              icon: "🖨️",
              title: "Compatibilidad con impresoras estándar",
              desc: "Conecta tu Epson/Thermal ya existente; configuración en menos de 5 minutos.",
            },
            {
              icon: "☁️",
              title: "Reportes en la nube",
              desc: "Ventas, propinas y costos accesibles desde cualquier teléfono o laptop.",
            },
            {
              icon: "📶",
              title: "Modo offline inteligente",
              desc: "Sigue vendiendo incluso si se corta internet; los datos se sincronizan al volver la conexión.",
            },
            {
              icon: "🔐",
              title: "Seguridad y respaldo",
              desc: "Tus cifras se cifran y almacenan en servidores ISO 27001; backup automático diario.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="p-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h4 className="font-bold text-xl mb-2">{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 md:px-20 bg-white">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#1E1E1E]">
          Control total, 24/7 y desde donde estés
        </h3>
        <p className="text-lg md:text-2xl text-gray-700 max-w-3xl mx-auto mb-12 text-center">
          GrowthSuite POS se adapta a tu flujo de trabajo: escritorio para la
          administración, tablets para meseros, monitores en cocina y reportes
          en tu celular.
        </p>

        <div className="grid gap-10 md:grid-cols-2 max-w-6xl mx-auto">
          {[
            {
              src: "/images/escritorioGrowthsuite.jpg",
              alt: "Panel de administración en escritorio",
              caption:
                "Admin Dashboard: controla inventarios, costos y ventas en gran detalle.",
            },
            {
              src: "/images/appandroidgrowthsuite2.jpg",
              alt: "Tablet robusta con POS",
              caption:
                "Tabletas para meseros: toma pedidos al instante y evita filas en caja.",
            },
            {
              src: "/images/appandroidgrowthsuite.jpg",
              alt: "Interfaz Android de GrowthSuite",
              caption:
                "Mapa de mesas en vivo: disponibilidad y tiempos de servicio al instante.",
            },
          ].map((card, i) => (
            <TiltCard key={i}>
              <figure>
                <Image
                  src={card.src}
                  alt={card.alt}
                  width={800}
                  height={500}
                  className="w-full h-60 sm:h-72 md:h-80 lg:h-96 object-cover"
                />
                <figcaption className="p-4 text-center text-sm md:text-base text-gray-700 bg-white">
                  {card.caption}
                </figcaption>
              </figure>
            </TiltCard>
          ))}

          {/* Video demo */}
          <TiltCard>
            <figure>
              <div className="relative w-full h-60 sm:h-72 md:h-80 lg:h-96">
                <iframe
                  src="https://www.youtube.com/embed/OxvCv8NAeVQ"
                  title="Demo GrowthSuite POS"
                  className="absolute inset-0 w-full h-full rounded-2xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <figcaption className="p-4 text-center text-sm md:text-base text-gray-700 bg-white">
                Video 60 s: descubre cómo todos los dispositivos trabajan en
                conjunto.
              </figcaption>
            </figure>
          </TiltCard>
        </div>
      </section>

      {/* CTA */}
      <header className="relative bg-white overflow-hidden">
        {/* Vídeo 8 s (lazy) */}
        <Image
          src="/images/fotomeserogrwothsuite.jpg"
          alt="Taquero preparando tacos en la Ciudad de México"
          fill
          priority
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-center py-32 px-4 bg-black/50 backdrop-blur-sm">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            Pídelo ya
          </h1>
          <h2 className="text-xl md:text-2xl text-white mb-8 max-w-2xl">
            Un punto de venta que te transforma la vida
          </h2>
          <a
            href="https://wa.me/5215531491808?text=Hola%20quiero%20un%20restaurante%20exitoso"
            className="inline-block text-white bg-[#25D366] font-bold py-4 px-8 rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            Dame mi muestra gratis
          </a>
        </div>
      </header>
    </>
  );
}
