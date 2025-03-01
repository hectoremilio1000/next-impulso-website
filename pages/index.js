import React, { useState } from "react";
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
import { InlineWidget } from "react-calendly";
import WhatsappButton from "../components/WhatsappButton";

const MySwiper = dynamic(() => import("../components/SwiperPrueba"), {
  ssr: false,
});

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const router = useRouter();

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
            <div className="max-w-[90%] mx-auto flex-col md:flex-row flex overflow-hidden items-center">
              <div className="justify-center max-w-[100%] md:justify-start flex self-center items-center mx-auto">
                <h1 className="title3-tw text-principal mt-[4px] text-center md:text-start">
                  <span className="title3-tw">
                    QUINCE DÍAS PARA CAMBIAR TU RESTAURANTE PARA SIEMPRE
                  </span>{" "}
                  <br />
                  <span className="title3-tw text-[#fff]">TALLER EN LÍNEA</span>
                  <br />
                  <span className="span4-tw">
                    NO TE LO PIERDAS. PRIMEROS 15 DUEÑOS RESTAURANTEROS.
                  </span>
                </h1>
              </div>
              <div className="justify-center max-w-[100%] md:justify-start flex self-center items-center mx-auto py-2">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {/* Cambiamos a toggleModal en lugar de openModal */}
                  <button className={styles.button4} onClick={toggleModal}>
                    DARME UNA CITA ¡YA GRATIS!
                  </button>
                  {isModalOpen && (
                    <div className={styles.modalOverlay}>
                      <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                          <h2>RECOMENDACIONES EN VIVO</h2>
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
          <div className="w-full">
            <InlineWidget url="https://calendly.com/clientes-impulsorestaurantero/reservas-impulsorestaurantero" />
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
            className="relative flex flex-col items-center justify-center md:pt-[240px] pb-[58px] md:pb-[126px] px-2"
          >
            {/* Aquí se agrega el overlay para la opacidad */}
            <div className="absolute inset-0 bg-black opacity-80"></div>

            {/* Contenido */}
            <div className="relative z-10 max-w-[500px] mx-auto heading-block flex flex-col justify-center items-center mb-16 mt-16 md:mt-0">
              <img
                className="flex hidden"
                src="https://cdn.prod.website-files.com/63e6c1e86653498b2e3849c1/63e7ec27bc6a9ab674a69fa1_Mobile_Gym_Owners.webp"
                loading="lazy"
                alt=""
              />
              <h2 className="title2-tw text-center uppercase mb-4 text-white">
                RESULTADOS REALES <br /> DE DUEÑOS DE <br /> RESTAURANTES REALES
              </h2>
              <p
                className="parrafo-tw text-center mb-4 paragraph cn"
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
                CONVIÉRTETE EN EL 1% MÁS EXCLUSIVO
              </span>
              <h2 className="title2-tw text-center uppercase">
                6 RAZONES POR QUÉ <br />
                NUESTROS RESTAURANTEROS TRIUNFAN
              </h2>
            </div>
            <div className="max-w-[1050px] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-100 flex flex-col gap-3 items-start p-6 md:p-8">
                  <span className="inline-block p-4 rounded text-white bg-principal">
                    1
                  </span>
                  <h5 className="text-[12px] md:text-[18px] font-bold">
                    Maestros de la Ejecución
                  </h5>
                  <p className="parrafo-tw paragraph-feature">
                    Los dueños exitosos de restaurantes saben que no tomar una
                    decisión también es una decisión. Actúan de inmediato sobre
                    sus objetivos con metodologías probadas.
                  </p>
                </div>
                <div className="bg-gray-100 flex flex-col gap-3 items-start p-6 md:p-8">
                  <span className="inline-block p-4 rounded text-white bg-principal">
                    2
                  </span>
                  <h1 className="text-[12px] md:text-[18px] font-bold">
                    El Héroe de Su Propia Historia
                  </h1>
                  <p className="parrafo-tw paragraph-feature">
                    Saben que nadie vendrá a salvarlos y que su destino está en
                    sus propias manos. Asumen total responsabilidad en definir
                    sus valores, reconocer sus debilidades y superar obstáculos.
                  </p>
                </div>
                <div className="bg-gray-100 flex flex-col gap-3 items-start p-6 md:p-8">
                  <span className="inline-block p-4 rounded text-white bg-principal">
                    3
                  </span>
                  <h1 className="text-[12px] md:text-[18px] font-bold">
                    Dedicados a Servir a Su Comunidad
                  </h1>
                  <p className="parrafo-tw paragraph-feature">
                    En el fondo, están en este negocio para cambiar vidas,
                    ayudar a las personas y ser maestros de la transformación.
                    El éxito de sus clientes es también su propio éxito.
                  </p>
                </div>
                <div className="bg-gray-100 flex flex-col gap-3 items-start p-6 md:p-8">
                  <span className="inline-block p-4 rounded text-white bg-principal">
                    4
                  </span>
                  <h1 className="text-[12px] md:text-[18px] font-bold">
                    Aprendices de por Vida
                  </h1>
                  <p className="parrafo-tw paragraph-feature">
                    No hay espacio para el ego en el camino de un restaurantero
                    exitoso. Para mantenerse al día con las tendencias y mejores
                    prácticas de la industria, están en constante crecimiento,
                    aceptan retroalimentación y confían en sus mentores, tal
                    como sus clientes confían en ellos.
                  </p>
                </div>
                <div className="bg-gray-100 flex flex-col gap-3 items-start p-6 md:p-8">
                  <span className="inline-block p-4 rounded text-white bg-principal">
                    5
                  </span>
                  <h1 className="text-[12px] md:text-[18px] font-bold">
                    Amantes del Crecimiento
                  </h1>
                  <p className="parrafo-tw paragraph-feature">
                    Los dueños exitosos de restaurantes están orgullosos pero
                    nunca satisfechos. Cuando alcanzan una meta, ya están
                    mirando hacia el siguiente objetivo y siempre con tecnología
                    de punta.
                  </p>
                </div>
                <div className="bg-gray-100 flex flex-col gap-3 items-start p-6 md:p-8">
                  <span className="inline-block p-4 rounded text-white bg-principal">
                    6
                  </span>
                  <h1 className="text-[12px] md:text-[18px] font-bold">
                    Expertos Comunicadores
                  </h1>
                  <p className="parrafo-tw paragraph-feature">
                    Las conversaciones difíciles son algo natural para los
                    restauranteros exitosos. Dicen lo que se necesita decir sin
                    endulzarlo. Saben que guardar comentarios valiosos perjudica
                    a todos.
                  </p>
                </div>
              </div>
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
                    QUIERO ACCESO YA
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <WhatsappButton />
    </div>
  );
}
