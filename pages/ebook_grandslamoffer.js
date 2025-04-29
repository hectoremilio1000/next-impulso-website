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

export default function EbookGrandSlamOffer() {
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
        <title>Estrategia Secreta para Llenar tu Restaurante hoy</title>
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
            Descubre la Estrategia Secreta que Llenará tu Restaurante Hoy
          </h1>
          <h2 className="text-xl md:text-2xl text-white mb-8 max-w-2xl">
            La Oferta Irresistible – Caso de Estudio Taquería El Campeón
          </h2>
          <a
            href="https://wa.me/5215531491808?text=Hola%20quiero%20un%20restaurante%20exitoso"
            className="inline-block text-white bg-[#25D366] font-bold py-4 px-8 rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            Quiero la primer parte del ebook
          </a>
        </div>
      </header>

      {/* Sección 2 — Problema & Promesa */}
      <section className="bg-gray-50 py-6 px-4 md:px-20 text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-8 text-[#1E1E1E]">
          ¿Frustrado porque tu restaurante no vende?
        </h3>
        <p className="text-lg md:text-2xl max-w-3xl mx-auto mb-8 text-gray-700">
          La Oferta Irresistible que Llenó una Taquería Chilanga
          <br />
          Te entendemos: diseñamos esta guía para dueños de restaurantes en
          México que necesitan resultados reales, no humo.
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
              Taquería “El Campeón” CDMX
            </h3>
            <p>
              En enero de 2024, El Campeón apenas llenaba 40 % de sus mesas de
              lunes a jueves. Aplicó la fórmula “Grand Slam Offer” de Alex
              Hormozi y en 6 semanas alcanzó 95 % de ocupación entre semana y
              aumentó su ticket promedio 38 %.
            </p>

            <h4 className="font-semibold text-xl text-[#1E1E1E]">
              1. Dolor específico + Sueño claro
            </h4>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Dolor:</strong> “Tacos caros & mal servidos”.
              </li>
              <li>
                <strong>Sueño:</strong> “Taco brutal, rápido y barato”.
              </li>
            </ul>

            <h4 className="font-semibold text-xl text-[#1E1E1E]">
              2. Promesa 4 × Sí
            </h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Sí al precio accesible</li>
              <li>Sí a la experiencia WOW</li>
              <li>Sí a la rapidez (&lt; 5 min)</li>
              <li>Sí a la garantía “no‑me‑gustó → postre gratis”</li>
            </ul>

            <h4 className="font-semibold text-xl text-[#1E1E1E]">
              3. Valor percibido 10 × precio
            </h4>
            <p>
              3 tacos de sirloin + cerveza + salsa de la casa + foto‑spot
              instagramable → $159 (valor real $235).{" "}
              <b>Costo $50 para la casa</b>
            </p>

            <h4 className="font-semibold text-xl text-[#1E1E1E]">4. Escasez</h4>
            <p>Solo 25 combos diarios, lunes–jueves antes de las 7 pm.</p>

            <h4 className="font-semibold text-xl text-[#1E1E1E]">
              5. Garantía antiriesgo
            </h4>
            <p>“Si no te chupas los dedos, te regalamos un flan casero.”</p>

            <h4 className="font-semibold text-xl text-[#1E1E1E]">
              Resultados en 45 días
            </h4>
            <ul className="list-disc list-inside space-y-1">
              <li>↑ Ticket promedio 38 %</li>
              <li>↑ Ventas netas 52 %</li>
              <li>↑ Seguidores TikTok +14 000 con un video POV</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="bg-gray-50 py-6 px-4 md:px-20">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[#1E1E1E]">
          Cómo volvimos esto viral (sin meterle dinero a los anuncios)
        </h3>

        <ol className="max-w-3xl mx-auto space-y-4 text-left text-gray-700 list-decimal list-inside">
          <li>
            Grabamos un video para TIK TOK armando los tacos — 10 seg, con la
            rola que estaba de moda.
          </li>
          <li>Texto grandote: “✨3 tacos + chela SOLO $159 (25 al día)✨”.</li>
          <li>
            Forzamos comentarios: “Escribe ‘QUIERO TACO MIS CHULOS’ y te mando
            el cupón por mensaje”.
          </li>
          <li>
            Contestamos cada comentario en menos de 15 segundos; TikTok nos
            empujó y sacamos +10 k vistas en 2 días.
          </li>
          <li className="space-y-4 text-center">
            <strong>¿Te late saber más?</strong> Baja la primera parte de
            nuestro ebook y pon tu taquería a reventar hoy mismo.
            <a
              href="https://wa.me/5215531491808?text=Hola%20quiero%20un%20restaurante%20exitoso"
              className="mx-auto inline-block text-white bg-[#25D366] font-bold py-4 px-8 rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              Quiero la primera parte del ebook
            </a>
          </li>
        </ol>
      </section>

      {/* Sección 6 — FAQ */}
      <section className="bg-gray-50 py-4 px-4 md:px-20">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#1E1E1E]">
          Preguntas Frecuentes
        </h3>
        <div className="max-w-3xl mx-auto divide-y divide-gray-200">
          {[
            {
              q: "¿Cuánto cuesta la primer parte de la guía?",
              a: "Nada – es 100% gratuita. Solo deja mándanos whats y te la enviamos al instante.",
            },
            {
              q: "¿Necesito experiencia previa en marketing?",
              a: "No. Explicamos cada paso con ejemplos sencillos y plantillas.",
            },
            {
              q: "¿En cuánto tiempo veré más clientes?",
              a: "Depende de tu ejecución, pero muchos usuarios reportan cambios el mismo día.",
            },
            {
              q: "¿Sirve para cualquier tipo de restaurante?",
              a: "Sí: desde taquerías hasta fine‑dining. Las estrategias se adaptan al concepto y presupuesto.",
            },
            {
              q: "¿Cómo funciona Impulso Restaurantero?",
              a: "Somos una plataforma con módulos para cada problema que padece un restaurantero",
            },
          ].map(({ q, a }) => (
            <details key={q} className="py-4 group">
              <summary className="cursor-pointer flex justify-between items-center font-medium text-[#1E1E1E]">
                {q}
                <span className="ml-2 text-[#E8D6A3] group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-2 text-gray-700">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Sección 7 — Footer */}
    </>
  );
}
