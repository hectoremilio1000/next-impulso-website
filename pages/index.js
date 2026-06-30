import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";

import { useRouter } from "next/router";
import { useAppContext } from "../components/context/Context";
import * as fbq from "../lib/fpixel";

import NavBar from "../components/NavBarEs/NavBarEs";
import CasosEstudio from "../components/CasosEstudio";
import About from "../components/About";
import RestauranterosExitosos from "../components/RestauranterosExitosos";
import styles from "../components/SwiperPrueba/Banner.module.css"; // Importa los estilos CSS
import axios from "axios";

import dynamic from "next/dynamic";
import Link from "next/link";
import BookingWidget from "../components/BookingWidget";
import WhatsappButton from "../components/WhatsappButton";
import Image from "next/image";

const MySwiper = dynamic(() => import("../components/SwiperPrueba"), {
  ssr: false,
});

export default function Home() {
  // tu modal de formulario (ya lo usas)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEntryModal, setShowEntryModal] = useState(false);
  const entryCtaRef = useRef(null);
  const lastActiveElementRef = useRef(null);

  const [alertMessage, setAlertMessage] = useState(""); // Mensaje global de alerta
  const [alertType, setAlertType] = useState(""); // Tipo de alerta (error o success)
  const [errors, setErrors] = useState({}); // Para errores específicos de campos
  // NUEVO: Estado para mostrar spinner
  const [loading, setLoading] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const validateForm = (data) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validación de correo
    const whatsappRegex = /^[0-9]{10}$/; // Validación de WhatsApp
    const fieldErrors = {};

    if (!data.first_name) {
      fieldErrors.first_name = "Por favor, ingresa tu nombre.";
    }
    if (!data.last_name) {
      fieldErrors.last_name = "Por favor, ingresa tu apellido.";
    }
    if (!emailRegex.test(data.email)) {
      fieldErrors.email = "Por favor, ingresa un correo electrónico válido.";
    }
    if (!whatsappRegex.test(data.whatsapp)) {
      fieldErrors.whatsapp =
        "Por favor, ingresa un número de WhatsApp válido (10 dígitos).";
    }

    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };
  // URL de tu backend
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setAlertMessage("");
    setAlertType("");
    setErrors({});
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (!validateForm(data)) {
      setAlertMessage("Por favor, corrige los errores en el formulario.");
      setAlertType("error");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${apiUrl}/prospectsmeeting`, data);

      // const response = await axios.post("${apiUrl}/prospectsmeeting", data);

      if (response.status === 200) {
        // Aquí mostramos alerta de éxito y cerramos modal al darle "OK"
        alert("¡Email enviado!");
        e.target.reset();
        toggleModal();
      } else {
        // Si no es 200 exacto, asumimos éxito igual
        alert("¡Email enviado!");
        e.target.reset();
        toggleModal();
      }
    } catch (error) {
      console.error(
        "Error al enviar el formulario:",
        error.response?.data || error.message
      );
      setAlertMessage(
        "Hubo un error al enviar tu información. Por favor, intenta de nuevo."
      );
      setAlertType("error");
    } finally {
      // OCULTAR SPINNER
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("seenEntryModal");
    if (!seen) {
      setShowEntryModal(true);
      sessionStorage.setItem("seenEntryModal", "1");
    } else {
      setShowEntryModal(false);
    }
  }, []);

  // Cerrar con ESC y bloquear scroll cuando haya modal abierto
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (showEntryModal) setShowEntryModal(false);
      else if (isModalOpen) toggleModal();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow =
      showEntryModal || isModalOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [showEntryModal, isModalOpen]);

  useEffect(() => {
    if (!showEntryModal) {
      if (lastActiveElementRef.current?.focus) {
        lastActiveElementRef.current.focus();
      }
      return;
    }
    lastActiveElementRef.current = document.activeElement;
    const id = requestAnimationFrame(() => {
      entryCtaRef.current?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [showEntryModal]);

  // Al hacer clic en CTA del modal de bienvenida, abre tu formulario
  const openFormFromEntry = () => {
    setShowEntryModal(false);
    setIsModalOpen(true); // reutiliza tu modal existente del formulario
  };

  const { ingles, espa } = useAppContext();

  return (
    <div>
      {espa ? (
        <Head>
          <title>Impulso Restaurantero</title>
          <link rel="icon" href="../favicon.ico" />
          <meta name="of:title" content="Impulso Restaurantero" />
          <meta
            name="of:description"
            content="Crecemos las ventas de tu restaurante"
          />
          <meta
            name="og:description"
            content="Crecemos las ventas de tu restaurante"
          />
          <meta
            property="og:url"
            content="https://www.impulsorestaurantero.com/"
          />
          <meta name="og:title" content="Impulso Restaurantero" />
          <meta property="og:type" content="Impulso Restaurantero" />
          <meta
            property="og:image"
            content="https://imagenesrutalab.s3.amazonaws.com/impulsoRestaurantero/logo/logoSoloImpulsoRestaurantero.png"
          />
          <link rel="apple-touch-icon" href="../logo192.png" />
          <link rel="manifest" href="../manifest.json" />
        </Head>
      ) : (
        <Head>
          <title>Restaurant Boost</title>
          <link
            rel="alternate"
            hrefLang="en"
            href="https://www.impulsorestaurantero.com/"
          />
          <link
            rel="alternate"
            hrefLang="es"
            href="https://www.impulsorestaurantero.com/"
          />
          <link rel="icon" href="../favicon.ico" />
          <meta name="of:title" content="Restaurant Boost" />
          <meta
            name="of:description"
            content="We Grow Your Restaurant's Sales"
          />
          <meta
            name="og:description"
            content="We Grow Your Restaurant's Sales"
          />
          <meta
            property="og:url"
            content="https://www.impulsorestaurantero.com/"
          />
          <meta name="og:title" content="Restaurant Boost" />
          <meta property="og:type" content="Restaurant Boost" />
          <meta
            property="og:image"
            content="https://imagenesrutalab.s3.amazonaws.com/impulsoRestaurantero/logo/logoSoloImpulsoRestaurantero.png"
          />
          <link rel="apple-touch-icon" href="../logo192.png" />
          <link rel="manifest" href="../manifest.json" />
        </Head>
      )}
      <NavBar />
      {espa ? (
        <>
          <MySwiper />
          <div className="justify-center bg-black w-full section-info-banner">
            <div className="max-w-[90%] mx-auto flex-col md:flex-row flex overflow-hidden items-center px-6">
              <div className="justify-center max-w-[100%] md:justify-start flex self-center items-center mx-auto">
                <h1 className="title3-tw text-principal mt-[4px] text-center md:text-start">
                  <span className="title3-tw">
                    HAZ CRECER LAS VENTAS DE TU RESTAURANTE EN LOS PRÓXIMOS 30 DÍAS
                  </span>
                  <br />
                  <span className="span4-tw text-[#fff]">
                    Estrategia, marketing e influencers. Nosotros lo implementamos contigo.
                  </span>
                </h1>
              </div>
              <div className="justify-center max-w-[100%] md:justify-start flex self-center items-center mx-auto py-2">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {/* Cambiamos a toggleModal en lugar de openModal */}
                  <button className={styles.button4} onClick={toggleModal}>
                    Quiero hacer crecer mi restaurante
                  </button>
                  {isModalOpen && (
                    <div className={styles.modalOverlay}>
                      <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                          <h2>Agenda tu diagnóstico gratuito</h2>
                          <p className="text-sm text-gray-300 mt-1">
                            Te ayudamos a identificar cómo aumentar tus ventas y atraer más clientes en tu restaurante.
                          </p>
                          <button
                            className={styles.closeModal}
                            onClick={toggleModal}
                          >
                            &times;
                          </button>
                        </div>
                        <div className={styles.modalBody}>
                          {/* Alerta global si existe alertMessage */}
                          {alertMessage && (
                            <div
                              className={`${styles.alert} ${
                                alertType === "error"
                                  ? styles.alertError
                                  : styles.alertSuccess
                              }`}
                            >
                              {alertMessage}
                            </div>
                          )}
                          {loading ? (
                            <div className="flex flex-col items-center justify-center space-y-4 my-4">
                              <div className="animate-spin w-16 h-16 border-4 border-[#FFD700] border-t-transparent rounded-full"></div>
                              <p className="text-xl font-semibold text-yellow-300">
                                Enviando información, por favor espera...
                              </p>
                            </div>
                          ) : (
                            <form id="customForm" onSubmit={handleFormSubmit}>
                              <div>
                                <label htmlFor="first_name"></label>
                                <input
                                  type="text"
                                  id="first_name"
                                  name="first_name"
                                  placeholder="Nombre(s) completo"
                                  className={styles.hsInput}
                                />
                                {errors.first_name && (
                                  <span className={styles.errorText}>
                                    {errors.first_name}
                                  </span>
                                )}
                              </div>
                              <div>
                                <label htmlFor="last_name"></label>
                                <input
                                  type="text"
                                  id="last_name"
                                  name="last_name"
                                  placeholder="Apellido(s) completo"
                                  className={styles.hsInput}
                                />
                                {errors.last_name && (
                                  <span className={styles.errorText}>
                                    {errors.last_name}
                                  </span>
                                )}
                              </div>
                              <div>
                                <label htmlFor="email"></label>
                                <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  placeholder="Correo electrónico"
                                  className={styles.hsInput}
                                />
                                {errors.email && (
                                  <span className={styles.errorText}>
                                    {errors.email}
                                  </span>
                                )}
                              </div>
                              <div>
                                <label htmlFor="whatsapp"></label>
                                <input
                                  type="tel"
                                  id="whatsapp"
                                  name="whatsapp"
                                  placeholder="Número de WhatsApp"
                                  pattern="[0-9]{10}"
                                  className={styles.hsInput}
                                />
                                {errors.whatsapp && (
                                  <span className={styles.errorText}>
                                    {errors.whatsapp}
                                  </span>
                                )}
                              </div>
                              <input
                                type="hidden"
                                name="origin"
                                value="citaenvivo"
                              />
                              <input
                                type="hidden"
                                name="status"
                                value="creado"
                              />
                              <div>
                                <button
                                  type="submit"
                                  className={styles.hsSubmit}
                                >
                                  Sí, hazme una cita ya
                                </button>
                              </div>
                            </form>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Fin del modal */}
                </div>
              </div>
            </div>
          </div>
          <div id="section-clientes" className="overflow-hidden">
            <div className="max-w-[90%] mx-auto bg-black rounded-b-[25px] flex items-center pt-[13px] pb-[18px] px-[30px]">
              <div className="flex w-[95%] justify-between">
                <img
                  src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/mayta-logo-new.svg"
                  alt="Mayte"
                  className="h-6 md:h-10 px-2"
                />
                <img
                  src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/logoDonde.png"
                  alt="Donde Ir"
                  className="h-6 md:h-10"
                />
                <img
                  src="https://imagenesrutalab.s3.amazonaws.com/impulsoRestaurantero/logosEmpresasSocios/lalloronblanco.png"
                  alt="La Llorona"
                  className="h-8 md:h-10"
                />
                <img
                  src="https://www.trendmexico.com/wp-content/uploads/2023/03/bar-bunny-universidad-logo-300x300.jpg"
                  alt="Bar Bunny"
                  className="h-10 md:h-12"
                />
                <img
                  src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/mr+lucho.jpg"
                  alt="Mr lucho"
                  className="h-10 md:h-12"
                />
              </div>
            </div>
          </div>

          <CasosEstudio />
          <div className="w-full max-w-[900px] mx-auto px-4 py-8">
            <BookingWidget eventTypeSlug="agenda-demo" />
          </div>
          <About />
          <RestauranterosExitosos />
          <div
            style={{
              backgroundImage:
                "url('https://imagenesrutalab.s3.amazonaws.com/impulsoRestaurantero/seccion1/649c99bf1948a130a34f7abb_Wins+copy.png')",
              backgroundPosition: "50%",
              backgroundSize: "cover",
            }}
            className="relative flex flex-col items-center justify-center md:pt-[50px] pb-[58px] md:pb-[50px] px-2"
          >
            {/* Aquí se agrega el overlay para la opacidad */}
            <div className="absolute inset-0 bg-black opacity-80"></div>

            {/* Contenido */}
            <div className="relative z-10 max-w-[700px] mx-auto heading-block flex flex-col justify-center items-center mb-16 mt-16 md:mt-0">
              <Image
                src="/hombre-exitoso-impulso.jpg"
                width={400} // píxeles deseados (o height)
                height={400}
                alt="Hombre de negocios exitoso Impulso Restaurantero"
                priority={false} // deja que sea lazy-loaded
                className="rounded-xl shadow-lg" // Tailwind opcional
              />
              <h2 className="text-xl md:text-4xl text-center uppercase mb-2 mt-2 text-white">
                RESULTADOS REALES <br /> DE DUEÑOS DE <br /> RESTAURANTES REALES
              </h2>
              <p
                className="parrafo-tw text-center mb-4 mx-2 paragraph cn"
                style={{ color: "white" }}
              >
                Impulso Restaurantero ha ayudado a más de 1,000 dueños de
                restaurantes a construir negocios sumamente rentables. La única
                pregunta es, ¿será el tuyo el próximo?
              </p>
              <Link href="/comolohacemos">
                <button className="button4 font-bold mt-2">
                  DESCUBRE CÓMO LO HACEMOS
                </button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-16 px-2">
            <div className="heading-block flex flex-col justify-center items-center mb-16">
              <span className="rounded-full bg-secundario text-principal font-semibold px-4 py-2 mb-4">
                NUESTRO MÉTODO
              </span>
              <h2 className="title2-tw text-center uppercase">
                ¿Cómo hacemos crecer <br />
                tu restaurante?
              </h2>
            </div>
            <div className="max-w-[1050px] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-100 flex flex-col gap-4 items-start p-6 md:p-8 rounded-[1.2em]">
                  <span className="inline-block p-4 rounded text-white bg-principal text-xl font-bold">
                    1
                  </span>
                  <h3 className="text-[16px] md:text-[20px] font-bold">
                    Estrategia
                  </h3>
                  <p className="parrafo-tw paragraph-feature">
                    Hacemos un diagnóstico completo de tu restaurante: ventas,
                    costos, operación y clientes. Con eso, creamos un plan de
                    acción personalizado con metas claras a 30, 60 y 90 días.
                  </p>
                </div>
                <div className="bg-gray-100 flex flex-col gap-4 items-start p-6 md:p-8 rounded-[1.2em]">
                  <span className="inline-block p-4 rounded text-white bg-principal text-xl font-bold">
                    2
                  </span>
                  <h3 className="text-[16px] md:text-[20px] font-bold">
                    Marketing
                  </h3>
                  <p className="parrafo-tw paragraph-feature">
                    Diseñamos y ejecutamos campañas en Facebook, Instagram,
                    TikTok y Google que atraen clientes reales a tu restaurante.
                    SEO, anuncios pagados y contenido que convierte.
                  </p>
                </div>
                <div className="bg-gray-100 flex flex-col gap-4 items-start p-6 md:p-8 rounded-[1.2em]">
                  <span className="inline-block p-4 rounded text-white bg-principal text-xl font-bold">
                    3
                  </span>
                  <h3 className="text-[16px] md:text-[20px] font-bold">
                    Influencers
                  </h3>
                  <p className="parrafo-tw paragraph-feature">
                    Te conectamos con creadores de contenido que llenan
                    restaurantes. Gestionamos las colaboraciones, medimos
                    resultados y escalamos lo que funciona.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sección GrowthSuite cross-sell */}
          <div
            className="relative flex flex-col items-center justify-center py-16 px-4"
            style={{ backgroundColor: "#0b0b0b" }}
          >
            <div className="max-w-[700px] mx-auto text-center">
              <h2 className="text-xl md:text-3xl font-bold text-white mb-4 uppercase">
                No solo te asesoramos. <br />
                <span className="text-principal">También lo operamos contigo.</span>
              </h2>
              <p className="parrafo-tw text-gray-300 mb-6">
                Usamos nuestro propio sistema con inteligencia artificial para
                controlar ventas, inventario y operación de tu restaurante en
                tiempo real. Tecnología que trabaja para ti las 24 horas.
              </p>
              <a
                href="/comolohacemos"
                className="inline-block"
              >
                <button className="button4 font-bold">
                  Conoce nuestro sistema
                </button>
              </a>
            </div>
          </div>
          <div className="bg-gray-50 flex flex-col items-center px-4 py-8 md:px-16">
            <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden h-64 md:h-96">
              {/* Imagen de fondo */}
              <img
                src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/seccion1/restaurant-hall-with-round-table-some-chairs-fireplace-plants1.jpg"
                alt="Background"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
              />
              {/* Gradiente superpuesto con z-10 */}
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 z-10"></div>

              {/* Contenedor del texto con z-20 */}
              <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-20 p-4">
                <span className="rounded-full bg-secundario text-white font-semibold px-4 py-2 mb-4 text-sm md:text-lg">
                  ¿QUIERES VER COMO FUNCIONAMOS?
                </span>

                <p className="my-2 text-white px-2 md:px-24 text-center text-base md:text-lg">
                  Da click aquí y logra que tu restaurante sea sumamente
                  rentable en este año
                </p>
                <Link href="/prueba">
                  <button className="button4 font-bold text-xs md:text-lg">
                    Quiero que mi restaurante venda más
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {showEntryModal && (
            <div
              className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
              role="presentation"
              onClick={() => setShowEntryModal(false)}
            >
              {/* Card (no cierra al hacer click dentro) */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="
        relative w-full max-w-[760px]
        rounded-[28px] overflow-hidden text-white
        shadow-[0_30px_120px_rgba(0,0,0,.45)]
        ring-1 ring-white/10
        bg-[#0b0b0b]
      "
                role="dialog"
                aria-modal="true"
                aria-labelledby="entry-modal-title"
              >
                {/* Borde/halo dorado sutil con pseudo-elementos */}
                <div
                  className="
        pointer-events-none absolute inset-0
        before:content-[''] before:absolute before:inset-[-2px]
        before:rounded-[32px]
        before:bg-[radial-gradient(1200px_300px_at_50%_120%,rgba(245,197,94,.18),transparent)]
        after:content-[''] after:absolute after:-inset-px after:rounded-[32px]
        after:ring-1 after:ring-white/10
      "
                />

                {/* Header con logo */}
                <div className="flex items-center gap-3 px-6 pt-5">
                  <img
                    src="https://imagenesrutalab.s3.amazonaws.com/impulsoRestaurantero/logo/logoSoloImpulsoRestaurantero.png"
                    alt="Impulso Restaurantero"
                    className="h-8 w-auto"
                  />
                  <span className="text-sm tracking-[.12em] text-amber-300/90 font-semibold">
                    IMPULSO <span className="text-white/90">RESTAURANTERO</span>
                  </span>
                </div>

                {/* Contenido */}
                <div className="px-6 md:px-14 pb-7 md:pb-10 pt-4 relative">
                  {/* flecha decorativa */}
                  {/* <div className="flex justify-center md:justify-end pr-0 md:pr-6">
                    <span className="text-amber-300/90 text-2xl md:text-3xl">
                      ↗
                    </span>
                  </div> */}

                  <h2
                    id="entry-modal-title"
                    className="text-center font-extrabold leading-[1.05] tracking-tight
                     text-[28px] md:text-[42px] lg:text-[48px]"
                  >
                    <span className="block">Si todo lo que ves</span>
                    <span className="block">te hace sentido,</span>
                    <span className="block">
                      <span className="text-amber-400">qué esperas</span>
                    </span>
                    <span className="block">para ser parte?</span>
                  </h2>

                  {/* CTA */}
                  <div className="mt-6 md:mt-7 flex justify-center">
                    <button
                      onClick={openFormFromEntry}
                      ref={entryCtaRef}
                      type="button"
                      className="
              inline-flex items-center justify-center
              rounded-xl px-6 py-3 md:px-8 md:py-4
              text-base md:text-lg font-semibold
              bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800
              shadow-[0_10px_30px_rgba(16,185,129,.35)]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-400
            "
                    >
                      ¡Quiero crecer mi negocio ya!
                    </button>
                  </div>

                  {/* Nota inferior */}
                  <div className="mt-4 md:mt-5 flex items-center justify-center gap-2 text-sm text-white/80">
                    <span className="text-amber-300">↪</span>
                    <span>No te quedes fuera</span>
                  </div>
                </div>

                {/* Botón cerrar (esquina) */}
                <button
                  onClick={() => setShowEntryModal(false)}
                  aria-label="Cerrar"
                  type="button"
                  className="
          absolute right-3 top-3 h-9 w-9 rounded-full
          bg-white/10 hover:bg-white/20
          flex items-center justify-center text-xl leading-none
          backdrop-blur-sm
        "
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <></>
      )}
      <WhatsappButton />
    </div>
  );
}
