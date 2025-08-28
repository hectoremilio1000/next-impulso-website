import React, { useState } from "react";
import NavBar from "../../components/NavBarBlack/NavBarEs";
import styles from "../../components/SwiperPrueba/Banner.module.css"; // Ajusta la ruta si corresponde
import axios from "axios";
import Link from "next/link";

function ImpulsarVentar() {
  // URL de tu backend
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // Datos ficticios de ejemplo. Ajusta según la info real de “El Huequito”.
  const info = [
    {
      titulo1:
        "De los mejores tacos al pastor de la CDMX, ahora multiplicando sus ventas en línea",
      parrafo1:
        "Con ayuda de Impulso Restaurantero, El Huequito pasó de ser un lugar tradicional de tacos a un fenómeno digital con millones de ventas mensuales. Adaptamos estrategias de marketing que dispararon sus pedidos a domicilio y reservas.",
      imagen1:
        "https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/casosexito/tacos-deliciosos-impulso-restaurantero.jpg",
      titulo2: "Auténtica Tradición, Enfoque Innovador",
      parrafo2:
        "Creamos una experiencia digital para mostrar la calidad de la carne y el sabor único de El Huequito. Con un enfoque que une tradición y tecnología, los clientes descubren sus tacos favoritos por internet y los reciben en minutos.",
      imagen2:
        "https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/casosexito/ricos-tacos-comida-impulso.jpg",
      titulorazones:
        "3 CLAVES QUE HICIERON DE EL HUEQUITO UNA SENSACIÓN EN EL MUNDO DIGITAL",
      razon1: "Campañas segmentadas en Google Ads",
      parraforazon1:
        "Implementamos una estrategia de Google Ads altamente segmentada, de forma que cuando los usuarios buscan 'tacos al pastor' o 'taquería en CDMX', El Huequito aparezca de inmediato en los primeros resultados. Con anuncios dirigidos a palabras clave específicas y horarios de mayor demanda, se lograron incrementar las ventas en un 80% en apenas 3 meses.",
      razon2: "Cocina “Instagrameable” que Atrae a Turistas y Locales",
      parraforazon2:
        "Capacitamos al equipo para presentar los tacos de forma visualmente atractiva. Las publicaciones en redes sociales generaron un efecto viral, atrayendo clientes de todos los rincones de la ciudad.",
      razon3: "Integración con Plataformas de Envío y Redes Sociales",
      parraforazon3:
        "Conectamos la taquería con aplicaciones de entrega a domicilio y sincronizamos sus redes sociales. Así, la clientela siempre está al tanto de promociones, horarios especiales y nuevos lanzamientos.",
      titulo3: "Del Mapa Local a la Conquista Mundial de Tacos",
      parrafo3:
        "Con innovaciones digitales y una estrategia efectiva de marketing, El Huequito sigue expandiéndose en la CDMX y más allá. Es un referente obligado para todos los amantes de los tacos tradicionales, ahora con una presencia global en internet.",
      imagen3:
        "https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/casosexito/tacos-ricos-impulso-crecer.jpg",
      titulo4:
        "¿Quieres que tu restaurante sea la próxima historia de éxito? Descubre cómo Impulso Restaurantero puede duplicar o triplicar tus ventas en pocas semanas.",
    },
  ];

  // --- ESTADOS para el modal y formulario de “Demo Gratis” ---
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

    if (!validateForm(data)) {
      setAlertMessage("Por favor, corrige los errores en el formulario.");
      setAlertType("error");
      return;
    }

    try {
      setLoading(true);
      // Ajusta la URL según tu backend
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
      <div className="bg-gray-50 flex flex-col items-center px-4 py-8 md:px-16 pt-24 md:pt-36">
        {/* Encabezado */}
        <div className="text-center max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {info[0].titulo1}
          </h1>
          <p className="text-gray-600 text-xl md:text-2xl">
            {info[0].parrafo1}
          </p>
        </div>

        {/* Imagen destacada */}
        <div className="w-full flex flex-col items-center gap-4 justify-start p-2 bg-[#fbfbfad9] border-[#e5e5e5] max-w-2xl">
          <img
            className="w-full object-contain rounded-[1.2em]"
            src={info[0].imagen1}
            alt="El Huequito fachada"
          />
        </div>
        <div className="mt-6 mb-4">
          {/* Botón que ABRE el nuevo modal de Demo Gratis */}
          <Link href="/prueba">
            <button className="button-small">Prueba sin costo ¡YA!</button>
          </Link>
        </div>
        {/* Sección 2-col */}
        <div className="content grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-36 px-[20px] items-center">
          <div className="flex flex-col items-center text-center max-w-2xl mt-2">
            <h2 className="md:text-5xl font-bold text-gray-900 mb-2 leading-tight text-2xl">
              {info[0].titulo2}
            </h2>
            <p className="text-gray-600 text-xl md:text-2xl">
              {info[0].parrafo2}
            </p>
          </div>
          <div className="w-full flex flex-col items-center gap-4 justify-start p-2 bg-[#fbfbfad9] border-[#e5e5e5] max-w-xl">
            <img
              className="w-full object-contain rounded-[1.2em]"
              src={info[0].imagen2}
              alt="Tacos El Huequito"
            />
          </div>
        </div>

        {/* Razones de éxito */}
        <div className="flex flex-col items-center justify-center py-6 px-2">
          <div className="heading-block flex flex-col justify-center items-center mb-16">
            <h2 className="title2-tw text-center uppercase">
              {info[0].titulorazones}
            </h2>
          </div>
          <div className="max-w-[1050px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Razón 1 */}
              <div className="bg-gray-100 flex flex-col gap-3 items-start p-6 md:p-8">
                <span className="inline-block p-4 rounded text-white bg-principal">
                  1
                </span>
                <h5 className="text-[16px] md:text-[18px] font-bold">
                  {info[0].razon1}
                </h5>
                <p className="parrafo-tw paragraph-feature">
                  {info[0].parraforazon1}
                </p>
              </div>
              {/* Razón 2 */}
              <div className="bg-gray-100 flex flex-col gap-3 items-start p-6 md:p-8">
                <span className="inline-block p-4 rounded text-white bg-principal">
                  2
                </span>
                <h1 className="text-[16px] md:text-[18px] font-bold">
                  {info[0].razon2}
                </h1>
                <p className="parrafo-tw paragraph-feature">
                  {info[0].parraforazon2}
                </p>
              </div>
              {/* Razón 3 */}
              <div className="bg-gray-100 flex flex-col gap-3 items-start p-6 md:p-8">
                <span className="inline-block p-4 rounded text-white bg-principal">
                  3
                </span>
                <h1 className="text-[16px] md:text-[18px] font-bold">
                  {info[0].razon3}
                </h1>
                <p className="parrafo-tw paragraph-feature">
                  {info[0].parraforazon3}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Otra Sección 2-col */}
        <div className="content grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-36 px-[20px] items-center">
          <div className="w-full flex flex-col items-center gap-4 justify-start p-2 bg-[#fbfbfad9] border-[#e5e5e5] max-w-xl">
            <img
              className="w-full object-contain rounded-[1.2em]"
              src={info[0].imagen3}
              alt="Interior El Huequito"
            />
          </div>
          <div className="w-full flex flex-col items-center gap-4 justify-center p-2 bg-[#fbfbfad9] border-[#e5e5e5] rounded-[1.2em] max-w-2xl">
            <h2 className="text-2xl md:text-5xl font-bold text-gray-900 leading-tight text-center">
              {info[0].titulo3}
            </h2>
            <p className="text-gray-600 text-xl md:text-2xl text-center">
              {info[0].parrafo3}
            </p>
          </div>
        </div>

        {/* CTA final */}
        <div className="bg-gray-50 flex flex-col items-center px-4 py-2 md:px-16 pt-6 md:pt-12">
          <div className="text-center max-w-4xl">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight text-center">
              {info[0].titulo4}
            </h1>
          </div>
          <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden h-64 md:h-96">
            {/* Imagen de fondo */}
            <img
              src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/casosexito/tacos-deliciosos-impulso-restaurantero.jpg"
              alt="delicioso"
              className="absolute top-0 left-0 w-full h-full object-cover z-0"
            />
            {/* Gradiente superpuesto */}
            <div className="absolute top-0 left-0 w-full h-full bg-opacity-75 bg-black"></div>
            {/* Contenido */}
            <div className="relative z-20 flex flex-col justify-center items-center h-full p-8 text-white">
              <div>
                <div className="mb-8 text-center">
                  <p className="text-3xl md:text-4xl font-bold text-white">
                    15 días sin costo
                  </p>
                  <p className="text-lg text-gray-300">Sin compromisos</p>
                </div>
                <div className="text-center"></div>
              </div>
              {/* Botón que abre el modal */}
              <button className="button-small" onClick={toggleModal}>
                Demo sin costo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL con Formulario de “Demo Gratis” */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Obtén Tu Demo sin costo Ahora</h2>
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
                      value="impulsarventardemogratis"
                    />
                    <input type="hidden" name="status" value="creado" />
                  </div>
                  <div>
                    <button type="submit" className={styles.hsSubmit}>
                      Sí, quiero mi demo sin costo
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

export default ImpulsarVentar;
