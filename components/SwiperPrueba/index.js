import { Navigation, Pagination, Autoplay } from "swiper/modules";

import styles from "./Banner.module.css";
import { useState, useEffect } from "react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import axios from "axios";

const MySwiper = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});

  // ESTADO NUEVO: Maneja el spinner de carga
  const [loading, setLoading] = useState(false);

  // Abre/cierra modal
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // Bloquear scroll body si el modal está abierto
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [isModalOpen]);

  // Valida los campos
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
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Envío del formulario
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Limpia errores previos

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Valida datos
    if (!validateForm(data)) {
      alert("Por favor, corrige los errores en el formulario.");
      return;
    }

    try {
      setLoading(true);
      // Envío al backend

      const response = await axios.post(`${apiUrl}/prospectswebsite`, data);

      // const response = await axios.post("${apiUrl}//prospectswebsite", data);

      console.log("Respuesta del backend:", response);

      // Revisa el status real que te regresa tu backend
      if (response.status === 200) {
        alert("¡Email enviado!");
        e.target.reset();
        toggleModal(); // Cierra el modal
      } else {
        // Si NO es 200, pero sí un 201, 202, etc.
        // Quita esta condición si tu backend no retorna 200 exacto
        alert(`Email enviado`);
        e.target.reset();
        toggleModal();
      }
    } catch (error) {
      console.error("Error al enviar:", error.response?.data || error.message);
      alert("Hubo un error. Por favor, intenta de nuevo.");
    } finally {
      // OCULTAR SPINNER al terminar
      setLoading(false);
    }
  };

  return (
    <div
      className={`${styles.sectionHero} ${isModalOpen ? styles.dimmed : ""}`}
    >
      <div className={styles.content}>
        <div className={styles["block-hero"]}>
          <div className={styles.subtitle}>LÍDERES RESTAURANTEROS</div>
          <h1 className={`${styles["heading-13"]} ${styles.desktop}`}>
            ¿QUIERES MÁS <br /> CLIENTES? <br />
          </h1>
          <h1 className={`${styles["heading-13"]} ${styles.mobile} pt-4`}>
            ¿QUIERES MÁS <br /> CLIENTES? <br />
          </h1>
          <div className={`${styles.largeText} ${styles.mobile}`}>
            Conseguir más clientes puede ser difícil. Nosotros lo hacemos fácil.
            Accede a nuestra master class GRATUITA "Llena tu restaurante en 15
            días"
            <br />
          </div>
          <div className={`${styles.largeText} ${styles.desktop}`}>
            Descarga el estudio de 3 restaurantes que TRIUNFARON A LO GRANDE en
            2024 y <br />
            descubre los 3 Modelos de Éxito que siguieron para construirlos con
            Ganancias Impresionantes
            <br />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className={styles.button4} onClick={toggleModal}>
              ¡Sí! Muéstrame
            </button>
          </div>
        </div>
      </div>

      <div className={styles.blueGradientHero}></div>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Recibe la información única de restaurantes exitosos</h2>
              <button className={styles.closeModal} onClick={toggleModal}>
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              {loading ? (
                <div className="flex flex-col items-center justify-center space-y-4 my-4">
                  {/* SPINNER DORADO */}
                  <div className="animate-spin w-16 h-16 border-4 border-[#FFD700] border-t-transparent rounded-full"></div>
                  <p className="text-xl font-semibold text-yellow-300">
                    Enviando información, por favor espera...
                  </p>
                </div>
              ) : (
                <form id="customForm" noValidate onSubmit={handleFormSubmit}>
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
                    <input type="hidden" name="origin" value="pdfBanner" />
                    <input type="hidden" name="status" value="creado" />
                  </div>
                  <div>
                    <button type="submit" className={styles.hsSubmit}>
                      Sí! Quiero la información ya!
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySwiper;
