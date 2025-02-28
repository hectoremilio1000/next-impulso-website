import React, { useState } from "react";
import NavBar from "../../components/NavBarBlack/NavBarEs";
import Link from "next/link";
import styles from "../../components/SwiperPrueba/Banner.module.css"; // Ajusta la ruta si es necesario
import axios from "axios";
import { InlineWidget } from "react-calendly";

function Casosexito() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // --- ESTADOS para el modal y el formulario de “Demo Gratis” ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Función para abrir/cerrar el modal
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // Validaciones del formulario
  const validateForm = (data) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const whatsappRegex = /^[0-9]{10}$/;
    const fieldErrors = {};

    if (!data.first_name) {
      fieldErrors.first_name = "Por favor, ingresa tu nombre.";
    }
    if (!data.last_name) {
      fieldErrors.last_name = "Por favor, ingresa tu apellido.";
    }
    if (!data.email || !emailRegex.test(data.email)) {
      fieldErrors.email = "Por favor, ingresa un correo electrónico válido.";
    }
    if (!data.whatsapp || !whatsappRegex.test(data.whatsapp)) {
      fieldErrors.whatsapp =
        "Por favor, ingresa un número de WhatsApp válido (10 dígitos).";
    }
    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  // Manejo del submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setAlertMessage("");
    setAlertType("");
    setErrors({});

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Validar datos
    if (!validateForm(data)) {
      setAlertMessage("Por favor, corrige los errores en el formulario.");
      setAlertType("error");
      return;
    }

    try {
      setLoading(true);
      // Ajusta la URL si tu backend está en otro lugar
      const response = await axios.post(`${apiUrl}/prospectsmeeting`, data);

      if (response.status === 200) {
        alert("¡Email enviado!");
        e.target.reset();
        toggleModal();
      } else {
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
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center px-4 py-8 md:px-16 pt-24 md:pt-36">
        {/* Header */}
        <div className="text-center max-w-4xl">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Impulso Restaurantero: La herramienta confiable para aumentar tus
            ventas y llevar tu restaurante al éxito.
          </h1>
          <p className="text-gray-600 text-sm md:text-2xl">
            Descubre cómo los dueños de restaurantes han utilizado Impulso
            Restaurantero para maximizar su éxito en línea. Conoce los números
            reales de restaurantes reales, antes y después de unirse a nuestra
            plataforma
          </p>
        </div>
        <div className="mt-6 mb-4">
          {/* Botón que ABRE el nuevo modal de Demo Gratis */}
          <Link href="/prueba">
            <button className="button-small">Prueba Gratis ¡YA!</button>
          </Link>
        </div>
      </div>

      <>
        <div className="content grid grid-cols-1 md:grid-cols-2 gap-8 px-[20px] items-start mb-4">
          <div className="w-full flex flex-col items-center gap-4 p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
            <Link href="/casosexitos/lalloronacantina">
              <img
                className=" w-full object-contain"
                src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/festejo+cantina+llorona+salsa+baile.jpg"
                alt=""
              />
            </Link>
            <h2 className="title3-tw text-center">Historias Inspiradoras</h2>
            <p className="parrafo-tw paragraph-feature text-center">
              Impulso Restaurantero nos permitió transformar a La Llorona
              Cantina en un verdadero generador de éxito con una plataforma
              integral que nos permitió destacar en todas las áreas clave
            </p>
            <Link href="/casosexitos/lalloronacantina">
              <button className="button-small">Ver Historia</button>
            </Link>
          </div>
          <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
            <img
              className=" w-full object-contain"
              src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/casosexito/tranajando-ayuda-impulso-restaurantero.jpg"
              alt=""
            />
            <h2 className="title3-tw text-center">
              Impulsamos ventas en 15 días
            </h2>
            <p className="parrafo-tw paragraph-feature text-center">
              Usamos inteligencia artificial para analizar el mercado,
              identificar tendencias emergentes y adaptar estrategias
              personalizadas para cada restaurante. Revisa esta historia de
              éxito
            </p>
            <Link href="/casosexitos/impulsarventas">
              <button className="button-small">Historia de Crecimiento</button>
            </Link>
          </div>
        </div>

        <div className="content grid grid-cols-1 md:grid-cols-2 gap-8 px-[20px] items-start mb-4">
          <div className="w-full flex flex-col items-center gap-4 p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
            <Link href="/123">
              <img
                className=" w-full object-contain"
                src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/casosexito/pizza-impulso-restaurantero.jpg"
                alt=""
              />
            </Link>
            <h2 className="title3-tw text-center">PRODUCTOS RENTABLES</h2>
            <p className="parrafo-tw paragraph-feature text-center">
              Inspírate con una colección de historias inspiradoras sobre
              restauranteros que superaron desafíos únicos y obstáculos para
              construir restaurantes generadores de dinero.
            </p>
            <Link href="/casosexitos/mejorarprocesos">
              <button className="button-small">
                TEN GANANCIAS EXTRAORDINARIAS
              </button>
            </Link>
          </div>
          <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
            <img
              className=" w-full object-contain"
              src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/casosexito/amigo-impulso-restaurantero.jpg"
              alt=""
            />
            <h2 className="title3-tw text-center">CRECIMIENTO SIN LÍMITES</h2>
            <p className="parrafo-tw paragraph-feature text-center">
              En menos de 1 año logré salir de mis deudas que tanto me tenían en
              depresión y logré recuperar a mi familia y a mi empresa.
            </p>
            <Link href="/casosexitos/ayudaestrategica">
              <button className="button-small">LEE COMO LO LOGRÉ</button>
            </Link>
          </div>
        </div>
      </>
      <div className="w-full">
        <InlineWidget url="https://calendly.com/clientes-impulsorestaurantero/reservas-impulsorestaurantero" />
      </div>
      <div className="bg-gray-50 flex flex-col items-center px-4 py-8 md:px-16 pt-24 md:pt-36">
        <div className="text-center max-w-4xl mb-4">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight text-center">
            Podrías estar obteniendo MUCHAS más ventas en línea.
          </h1>
          {/* <p className="text-gray-600 text-sm md:text-2xl text-center">
            Obten tu demo gratis ya
          </p> */}
        </div>
        <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden h-64 md:h-96">
          {/* Imagen de fondo */}
          <img
            src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/seccion1/restaurant-hall-with-round-table-some-chairs-fireplace-plants1.jpg"
            alt="Background"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
          {/* Gradiente superpuesto */}
          <div className="absolute top-0 left-0 w-full h-full bg-opacity-75 bg-black"></div>
          {/* Contenido */}
          <div className="relative z-20 flex flex-col justify-center items-center h-full p-8 text-white">
            <div>
              <div className="mb-8 text-center">
                {/* <p className="text-4xl font-bold text-white">$9,999</p> */}
                <p className="text-lg text-gray-300">Facturado mensualmente</p>
              </div>
              <div className="text-center"></div>
            </div>
            {/* Botón que abre el modal */}
            <button className="button-small" onClick={toggleModal}>
              Demo Gratis
            </button>
          </div>
        </div>
      </div>

      {/* MODAL con Formulario de “Demo Gratis” */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Obtén Tu Demo Gratis Ahora</h2>
              <button className={styles.closeModal} onClick={toggleModal}>
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
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Correo electrónico"
                      className={styles.hsInput}
                    />
                    {errors.email && (
                      <span className={styles.errorText}>{errors.email}</span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="whatsapp"></label>
                    <input
                      type="text"
                      id="whatsapp"
                      name="whatsapp"
                      placeholder="Número de WhatsApp (10 dígitos)"
                      className={styles.hsInput}
                    />
                    {errors.whatsapp && (
                      <span className={styles.errorText}>
                        {errors.whatsapp}
                      </span>
                    )}
                    {/* Campos ocultos */}
                    <input
                      type="hidden"
                      name="origin"
                      value="CasosExitoModaldemogratis"
                    />
                    <input type="hidden" name="status" value="creado" />
                  </div>
                  <div>
                    <button type="submit" className={styles.hsSubmit}>
                      Sí, quiero mi demo gratis
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Casosexito;
