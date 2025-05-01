import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import NavBar from "../components/NavBarBlack/NavBarEs";

/**
 * Página Landing – 7 Estrategias Secretas
 * Autor: Impulso Restaurantero
 * Notas:
 *  - Colores: #FFFFFF (bg), #E8D6A3 (accent), #1E1E1E (text)
 *  - Tipografía: League Spartan para títulos – Incluida vía Google Fonts en _document.tsx
 *  - SEO básico & tracking GTM
 */

export default function GrowthSuite() {
  /* -------------------------------------------------- */
  /* 1 · Estado del formulario                          */
  /* -------------------------------------------------- */
  const [form, setForm] = useState({
    name: "",
    email: "",
    restaurant: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  /* -------------------------------------------------- */
  /* 2 · Validación sencilla                            */
  /* -------------------------------------------------- */
  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {};
    if (!form.name) newErrors.name = "Ingresa tu nombre";
    if (!emailRegex.test(form.email)) newErrors.email = "Correo inválido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* -------------------------------------------------- */
  /* 3 · Envío (placeholder – reemplaza con tu API)     */
  /* -------------------------------------------------- */
  const handleSubmit = async () => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // TODO: reCAPTCHA + petición real
      console.log("Payload enviado:", form);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  /* -------------------------------------------------- */
  /* 4 · Render                                         */
  /* -------------------------------------------------- */
  return (
    <>
      <Head>
        <title>GrowthSuite</title>
        <meta
          name="description"
          content="Descubre la estrategia #1 gratis y aprende a llenar tu restaurante con tácticas que sí funcionan en México."
        />
      </Head>

      <NavBar />

      {/* Sección 1 — Hero */}
      <header className="relative bg-white overflow-hidden">
        {/* Vídeo 8 s (lazy) */}
        <Image
          src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/ebook/worth-it-first-mexican-taco-stand-to-get-one-michelin-star-v0-msjqcb32yn1d1.jpg"
          alt="Taquero preparando tacos en la Ciudad de México"
          fill
          priority
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        <div className="relative z-10 flex flex-col items-center justify-center text-center py-32 px-4 bg-black/50 backdrop-blur-sm">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            GrowthSuite
          </h1>
          <h2 className="text-xl md:text-2xl text-white mb-8 max-w-2xl">
            La plataforma inteligente que impulsa las ventas y la eficiencia de
            su restaurante
          </h2>
          <a
            href="https://calendly.com/clientes-impulsorestaurantero/30min"
            className="inline-block text-white bg-principal font-bold py-4 px-8 rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            Reserva aqui
          </a>
        </div>
      </header>

      {/* Sección 2 — Problema & Promesa */}
      <section className="bg-gray-50 py-12 px-4 md:px-20 text-center">
        <h3 className="text-sm md:text-xl font-bold mb-8 text-[#1E1E1E]">
          ¿Se pregunta por qué las mesas siguen vacías entre semana?
        </h3>
        <h3 className="text-3xl md:text-4xl font-bold mb-8 text-[#1E1E1E]">
          ¿Le preocupa el aumento de costos o la falta de coordinación en su
          equipo?
        </h3>
        <p className="text-lg md:text-2xl max-w-3xl mx-auto mb-8 text-gray-700">
          Growth Suite se diseñó para resolver esos retos y devolverle la
          tranquilidad de un negocio que crece con rumbo claro.
        </p>
      </section>

      {/* Sección 3 — Vista previa Estrategia #1 */}
      <section className="py-6 px-4 md:px-20 bg-white">
        <div className="grid md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
          <Image
            src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/ebook/Personal-de-la-taqueri%CC%81a-Tacos-1986.jpg"
            alt="Taquería El Campeón en CDMX"
            width={640}
            height={420}
            className="rounded-2xl shadow-lg"
          />

          <article className="space-y-6 text-gray-800">
            <h3 className="text-3xl md:text-4xl font-bold text-[#1E1E1E]">
              ¿Qué es Growth Suite?
            </h3>
            <p>
              Una solución SaaS en la nube que conecta ventas, marketing,
              inventarios y capacitación en un único tablero. Reúne los datos
              clave de su punto de venta, redes sociales y operaciones diarias;
              los transforma en acciones concretas que atraen clientes,
              optimizan costos y alinean a todo el personal.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-gray-50 py-6 px-4 md:px-20">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[#1E1E1E]">
          Principales problemas que resuelve
        </h3>

        <ol className="max-w-4xl mx-auto space-y-4 text-left text-gray-700 list-decimal list-inside grid grid-cols-1 md:grid-cols-3 gap-3">
          <li className="px-3 py-2 text-lg bg-gray-100 text-gray-800">
            Desafío habitual Cómo lo aborda Growth Suite Mesas vacías y poca
            afluencia
          </li>
          <li className="px-3 py-2 text-lg bg-gray-100 text-gray-800">
            Campañas automáticas (WhatsApp, correo, redes) basadas en
            comportamientos reales de sus clientes. Ticket promedio bajo
          </li>
          <li className="px-3 py-2 text-lg bg-gray-100 text-gray-800">
            Sugerencias de venta adicional en pantalla para meseros y
            recomendaciones personalizadas para el comensal.
          </li>
          <li className="px-3 py-2 text-lg bg-gray-100 text-gray-800">
            Costos de alimentos en alza Recetas estandarizadas, alertas de merma
            y comparativo costo teórico vs. real.
          </li>
          <li className="px-3 py-2 text-lg bg-gray-100 text-gray-800">
            Falta de procesos claros Check-lists de apertura y cierre, manuales
            interactivos y recordatorios automáticos.
          </li>
          <li className="px-3 py-2 text-lg bg-gray-100 text-gray-800">
            Tardanza en generar reportes Panel en tiempo real con ventas,
            inventario y métricas financieras—sin hojas de cálculo manuales.
          </li>
        </ol>
      </section>
      <section className="bg-gray-50 py-6 px-4 md:px-20">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[#1E1E1E]">
          Capacidades clave
        </h3>

        <ol className="max-w-3xl mx-auto space-y-4 text-left text-gray-700 list-decimal list-inside">
          <li>
            <b>Definición de concepto y menú</b>{" "}
            <p>
              Un breve cuestionario analiza su mercado y propone hasta tres
              conceptos viables con precios de referencia.
            </p>
          </li>
          <li>
            <b>Marketing orientado a resultados</b>
            <p>
              Plantillas preconfiguradas y seguimiento de píxeles (Meta, Google,
              TikTok) para medir cada campaña.
            </p>
          </li>
          <li>
            <b>Sincronización con el punto de venta</b>
            <p>
              Ventas en tiempo real, desglose por hora y alertas de productos
              estrella.
            </p>
          </li>
          <li>
            <b>Gestión de inventario y costos</b>
            <p>
              Escandallo automático, control de stock y proyecciones de compra
              ajustadas.
            </p>
          </li>
          <li>
            <b>Capacitación y recursos humanos</b>
            <p>
              Manuales y evaluaciones en línea con recompensas por avance; todos
              conocen sus funciones y estándares.
            </p>
          </li>
          <li>
            <b>Finanzas y cumplimiento</b>
            <p>
              Panel fiscal (IVA, ISR) con recordatorios de licencias y
              sugerencias de optimización tributaria en México.
            </p>
          </li>
          <li>
            <b>Beneficios que notará en los primeros 90 días</b>
            <p>
              Incremento estimado del 15 % en ventas gracias a campañas
              dirigidas y técnicas de upselling.
            </p>
          </li>
        </ol>
      </section>
      <section className="bg-gray-50 py-6 px-4 md:px-20">
        <h3 className="text-5xl md:text-4xl font-bold text-center mb-10 text-[#1E1E1E]">
          Beneficios que notará en los primeros 90 días
        </h3>

        <ol className="max-w-3xl mx-auto space-y-4 text-left text-gray-700 list-decimal list-inside">
          <li>
            Incremento estimado del 15 % en ventas gracias a campañas dirigidas
            y técnicas de upselling.
          </li>
          <li>
            Reducción aproximada del 10 % en costo de alimentos mediante control
            preciso de inventario.
          </li>
          <li>
            Ahorro significativo de tiempo administrativo: reportes automáticos
            y accesibles desde cualquier dispositivo.
          </li>
        </ol>
      </section>
      <section className="bg-gray-50 py-6 px-4 md:px-20">
        <h3 className="text-5xl md:text-4xl font-bold text-center mb-10 text-[#1E1E1E]">
          ¿Para quién está pensado?
        </h3>

        <ol className="max-w-3xl mx-auto space-y-4 text-left text-gray-700 list-decimal list-inside">
          <li>Restaurantes nuevos que buscan un arranque sólido.</li>
          <li>
            Negocios consolidados que desean elevar sus resultados entre semana
            y fines de semana.
          </li>
          <li>
            Grupos o cadenas que requieren uniformidad operativa en todas sus
            sucursales.
          </li>
          <li>
            Funciona igual de bien para cantinas, cafeterías, bares o
            restaurantes de especialidad.
          </li>
        </ol>
      </section>
      <section className="bg-gray-50 py-6 px-4 md:px-20 flex flex-col items-center">
        <h3 className="text-5xl md:text-4xl font-bold text-center mb-4 text-[#1E1E1E]">
          Próximo paso
        </h3>
        <h4 className="text-center text-lg mb-4">
          ¿Listo para profesionalizar la operación y aumentar las ventas?
          Reserve una videollamada de 15 minutos:
        </h4>
        <button className="bg-principal mb-3 text-white font-bold px-3 py-2 rounded-full">
          Solicitar una demo
        </button>
        <p className="text-center text-sm">
          Haga clic en «Solicitar demo» y descubra cómo Growth Suite puede
          adaptarse a sus objetivos.
        </p>
      </section>
    </>
  );
}
