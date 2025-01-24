import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Banner.module.css"; // Importa los estilos CSS
import { useState, useEffect } from "react";
// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";
import axios from "axios";

const MySwiper = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(""); // Para el mensaje de alerta global
  const [alertType, setAlertType] = useState(""); // Tipo de alerta (error o success)
  const [errors, setErrors] = useState({}); // Para errores en campos específicos

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState); // Cambia el estado entre abierto y cerrado
  };

  useEffect(() => {
    if (isModalOpen) {
      // Bloquear el scroll del body cuando el modal está abierto
      document.body.style.overflow = "hidden";

      // Cleanup al cerrar el modal
      return () => {
        document.body.style.overflow = "auto"; // Restaurar el scroll cuando el modal se cierra
      };
    }
  }, [isModalOpen]);

  const validateForm = (data) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valida el formato del correo
    const whatsappRegex = /^[0-9]{10}$/; // Valida que el WhatsApp tenga 10 dígitos
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (!validateForm(data)) {
      setAlertMessage("Por favor, corrige los errores en el formulario.");
      setAlertType("error");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3333/api/prospectswebsite",
        data
      );

      if (response.status === 200) {
        setAlertMessage(
          "¡Gracias! Hemos enviado la información a tu correo electrónico."
        );
        setAlertType("success");
        e.target.reset(); // Limpia el formulario después del envío
        toggleModal(); // Cierra el modal
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
    }
  };

  return (
    <div
      className={`${styles.sectionHero} ${isModalOpen ? styles.dimmed : ""}`}
    >
      <div className={styles.content}>
        <div className={styles["block-hero"]}>
          <div className={styles.subtitle}>DUEÑOS RESTAURANTEROS</div>
          <h1 className={`${styles["heading-13"]} ${styles.desktop}`}>
            ¿QUIERES MÁS <br /> CLIENTES? <br />
          </h1>
          <h1 className={`${styles["heading-13"]} ${styles.mobile}`}>
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
            {/* Cambiamos a toggleModal en lugar de openModal */}
            <button className={styles.button4} onClick={toggleModal}>
              Si! Muéstrame!
            </button>
          </div>
        </div>
      </div>
      <div className={styles.blueGradientHero}></div>

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
              {/* Aquí va el formulario personalizado */}
              <form id="customForm" onSubmit={handleFormSubmit}>
                <div>
                  <label htmlFor="first_name"></label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    placeholder="Nombre(s) completo"
                    required
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
                    required
                    className={styles.hsInput}
                  />
                  {errors.last_name && (
                    <span className={styles.errorText}>{errors.last_name}</span>
                  )}
                </div>
                <div>
                  <label htmlFor="email"></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Correo electrónico"
                    required
                    className={styles.hsInput}
                  />
                  {errors.email && (
                    <span className={styles.errorText}>{errors.email}</span>
                  )}
                </div>
                <div>
                  <label htmlFor="whatsapp"></label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    placeholder="Número de WhatsApp"
                    pattern="[0-9]{10}" // Valida automáticamente 10 dígitos
                    required
                    className={styles.hsInput}
                  />
                  {errors.whatsapp && (
                    <span className={styles.errorText}>{errors.whatsapp}</span>
                  )}
                  <input type="hidden" name="origin" value="pdfBanner" />
                  <input type="hidden" name="status" value="creado" />
                </div>
                <div>
                  <button type="submit" className={styles.hsSubmit}>
                    Sí! Quiero la información ya!
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySwiper;
