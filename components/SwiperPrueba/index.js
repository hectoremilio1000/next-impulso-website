import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Banner.module.css" // Importa los estilos CSS
import { useState, useEffect } from "react";
// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";

const MySwiper = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState); // Cambia el estado entre abierto y cerrado
  };

  useEffect(() => {
    if (isModalOpen) {
      // Bloquear el scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';

      // Cleanup al cerrar el modal
      return () => {
        document.body.style.overflow = 'auto';  // Restaurar el scroll cuando el modal se cierra
      };
    }
  }, [isModalOpen]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Aquí puedes enviar los datos del formulario a tu backend si lo deseas
    console.log("Datos del formulario enviados:", Object.fromEntries(formData));
  };
  
  
  
  return (
    <div className={`${styles.sectionHero} ${isModalOpen ? styles.dimmed : ""}`}>
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
          Accede a nuestra master class GRATUITA "Llena tu restaurante en 90
          días"
          <br />
        </div>
        <div className={`${styles.largeText} ${styles.desktop}`}>
          Descarga el estudio de 3 restaurantes que están TRIUNFANDO A LO
          GRANDE en 2024 y <br />
          descubre los 3 Modelos de Éxito que siguieron para construir
          Restaurantes con Ganancias Descomunales
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
              {/* Aquí va el formulario personalizado */}
              <form id="customForm" onSubmit={handleFormSubmit}>
                <div>
                  <label htmlFor="nombre"></label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre(s) completo"
                    required
                    className={styles.hsInput}
                  />
                </div>
                <div>
                  <label htmlFor="apellido"></label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    placeholder="Apellido(s) completo"
                    required
                    className={styles.hsInput}
                  />
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
                </div>
                <div>
  <label htmlFor="whatsapp"></label>
  <input
    type="tel"  // Cambiado a "tel" para números de teléfono
    id="whatsapp"
    name="whatsapp"
    placeholder="Número de WhatsApp"
    pattern="[0-9]{10,15}"  // Esto es opcional, define un patrón de 10 a 15 dígitos
    required
    className={styles.hsInput}
  />
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
