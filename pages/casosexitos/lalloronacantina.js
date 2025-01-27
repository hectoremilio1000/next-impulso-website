import React, { useState } from "react";
import NavBar from "../../components/NavBarBlack/NavBarEs";
import styles from "../../components/SwiperPrueba/Banner.module.css"; // Ajusta la ruta si cambia
import axios from "axios";
import Link from "next/link";

function Lalloronacantina() {
  const head = [
    {
      title: "Destaca en Internet | Impulso Restaurantero",
      content: "Impulsa tu restaurante en línea con tecnología avanzada",
      description:
        "Te ayudamos a destacar en internet con páginas optimizadas, técnicas avanzadas de SEO y estrategias digitales efectivas.",
      url: "https://www.impulsorestaurantero.com/",
      image:
        "https://imagenesrutalab.s3.amazonaws.com/impulsoRestaurantero/logo/logoSoloImpulsoRestaurantero.png",
    },
  ];

  const info = [
    {
      titulo1: "Empezamos en cero y crecimos a ventas de 3 millones mensuales",
      parrafo1:
        "Transformamos nuestra visión en realidad con una estrategia integral que combinó marketing digital, optimización de redes sociales y una oferta gastronómica única. Logramos que Cantina La Llorona se posicionara como el lugar favorito en Roma Condesa",

      imagen1:
        "https://imagenesrutalab.s3.us-east-1.amazonaws.com/llorona/nextImage/fotosBanner/cantina%2Bllorona%2Bafuera%2Blugar.jpg",
      titulo2: "Un Modelo Innovador de Cantina que Enamora",
      parrafo2:
        "Transformamos el concepto tradicional de una cantina en una experiencia vibrante y moderna, logrando que nuestros clientes se enamoren del nuevo enfoque. Con un diseño auténtico y una propuesta gastronómica única.",
      imagen2:
        "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/inicio/chicharron%2Bpork%2Bbelly%2Bguacamole%2Bcantina%2Bllorona.jpg",
      titulorazones:
        "3 CLAVES QUE CONVIRTIERON A CANTINA LA LLORONA EN EL NUEVO HOTSPOT DE LA ROMA CONDESA",
      razon1:
        "Cocina Innovadora que Reinventa Tradiciones que se adapta al mercado",
      parraforazon1:
        "Con técnicas modernas y una cuidadosa selección de ingredientes, nuestra propuesta reinterpreta la cocina mexicana para cautivar a un público contemporáneo que busca lo auténtico con un toque innovador.",
      razon2: "Automatización y Remarketing Personalizado",
      parraforazon2:
        "Implementamos estrategias de remarketing basadas en el historial de navegación y comportamientos previos. Por ejemplo, si alguien visita tu menú en línea, recibirá un anuncio específico destacando tus platillos más populares",
      razon3: "Recursos Humanos con Inteligencia Artificial",
      parraforazon3:
        "Implementamos un modelo de gestión de recursos humanos que combina inteligencia artificial con estrategias personalizadas para capacitar a nuestro equipo.",
      titulo3: "Adaptándonos al Futuro de las Cantinas",
      parrafo3:
        "Descubre cómo transformamos Cantina La Llorona en un referente innovador, adaptando su concepto y mixología a las tendencias actuales del mercado. Con un enfoque en la creatividad y la personalización.",
      imagen3:
        "https://imagenesrutalab.s3.us-east-1.amazonaws.com/llorona/nextImage/inicio/amigastomandoCantinaLlorona.JPG",
      titulo4:
        "¿Sabías que podrías duplicar tus ventas con las estrategias correctas? En Impulso Restaurantero, hicimos que Cantina La Llorona se convirtiera en el lugar favorito de Roma-Condesa. ",
    },
  ];

  // ESTADOS y LÓGICA DEL MODAL FORM
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Abrir/cerrar modal
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // Validaciones
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

  // Submit del formulario
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
      const response = await axios.post(
        "http://localhost:3333/api/prospectsmeeting",
        data
      );

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
        <div className="text-center max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {info[0].titulo1}
          </h1>
          <p className="text-gray-600 text-xl md:text-2xl">
            {info[0].parrafo1}
          </p>
        </div>

        <div className="w-full flex flex-col items-center gap-4 justify-start p-2 bg-[#fbfbfad9] border-[#e5e5e5] max-w-2xl">
          <img
            className="w-full object-contain rounded-[1.2em]"
            src={info[0].imagen1}
            alt=""
          />
        </div>
        <div className="mt-6 mb-4">
          {/* Botón que ABRE el nuevo modal de Demo Gratis */}
          <Link href="/prueba">
            <button className="button-small">Prueba Gratis ¡YA!</button>
          </Link>
        </div>
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
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-6 px-2">
          <div className="heading-block flex flex-col justify-center items-center mb-16">
            <h2 className="title2-tw text-center uppercase">
              {info[0].titulorazones}
            </h2>
          </div>
          <div className="max-w-[1050px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        <div className="content grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-36 px-[20px] items-center">
          <div className="w-full flex flex-col items-center gap-4 justify-start p-2 bg-[#fbfbfad9] border-[#e5e5e5] max-w-xl">
            <img
              className="w-full object-contain rounded-[1.2em]"
              src={info[0].imagen3}
              alt=""
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
        <div className="bg-gray-50 flex flex-col items-center px-4 py-2 md:px-16 pt-6 md:pt-12">
          <div className="text-center max-w-4xl">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight text-center">
              {info[0].titulo4}
            </h1>
          </div>
          <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden h-64 md:h-96">
            {/* Imagen de fondo */}
            <img
              src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/llorona/nextImage/inicio/llorona%2Bson%2Bgrupo%2Bcuano%2Bcantina%2Bweb.jpg"
              alt="Background"
              className="absolute top-0 left-0 w-full h-full object-cover z-0"
            />
            {/* Gradiente superpuesto */}
            <div className="absolute top-0 left-0 w-full h-full bg-opacity-75 bg-black"></div>
            {/* Contenido */}
            <div className="relative z-20 flex flex-col justify-center items-center h-full p-8 text-white">
              <div>
                <div className="mb-8 text-center">
                  <p className="text-3xl md:text-4xl font-bold text-white">
                    15 días gratis
                  </p>
                  <p className="text-lg text-gray-300">Sin compromisos</p>
                </div>
                <div className="text-center"></div>
              </div>
              {/* Botón que abre el modal para “Demo Gratis” */}
              <button className="button-small" onClick={toggleModal}>
                Demo Gratis ya
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Demo Gratis */}
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
                      value="LalloronaDemoGratis"
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

export default Lalloronacantina;
