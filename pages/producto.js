import React from 'react';
import NavBar from '../components/NavBarBlack/NavBarEs';
import styles from "../components/Demo/Demo.module.css" // Importa los estilos CSS
import Link from 'next/link';

function Producto({ backgroundImage }) {
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  }
  return (
    <>
      <NavBar />
      <div className="bg-gray-50 flex flex-col items-center px-4 py-8 md:px-16 pt-24 md:pt-36">
        <div className="text-center max-w-4xl mb-4">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Podrías estar obteniendo MUCHAS más ventas en línea.
          </h1>
          <p className="text-gray-600 text-sm md:text-2xl">
            Impulso Restaurantero es la manera más sencilla de CONSEGUIR MÁS reservas en línea y ofrecer la mejor experiencia a tus clientes. Descubre cómo lo hacemos.
          </p>
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
                <p className="text-4xl font-bold text-white">$9,999</p>
                <p className="text-lg text-gray-300">Facturado mensualmente</p>
              </div>
              <div className="text-center">
                
              </div>
            </div>
            <Link href="/demogratis">
            <button className="button-small">Demo Gratis</button>
            </Link>
          </div>
        </div>

        <div className="text-center max-w-4xl mb-4 mt-4">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Obtén una demostración
          </h1>
          <p className="text-gray-600 text-sm md:text-2xl mb-4">
          Contáctanos a continuación y te responderemos lo antes posible
          </p>
       
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Recibe la información única de restaurantes exitosos</h2>
              
            </div>
           
            <div className={styles.modalBody}>
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
                  <label htmlFor="restaurant_name"></label>
                  <input
                    type="text"
                    id="restaurant_name"
                    name="restaurant_name"
                    placeholder="Nombre del restaurante"
                    required
                    className={styles.hsInput}
                  />
                </div>

                <div>
  {/* <label htmlFor="how_did_you_find_us" className="sr-only">
    ¿Cómo te enteraste de nosotros?
  </label> */}
  <select
    id="how_did_you_find_us"
    name="how_did_you_find_us"
    required
    className={styles.hsInput}
  >
    <option value="" disabled selected className='text-gray-500'>
      ¿Cómo te enteraste de nosotros?
    </option>
    <option value="facebook">Facebook</option>
    <option value="google">Google</option>
    <option value="tiktok">Tik Tok</option>
    <option value="tiktok">Instagram</option>
    <option value="email">Email</option>
    <option value="youtube">Youtube</option>
    <option value="podcast">Podcast</option>
    <option value="amigo">Amigo o referencia</option>
    <option value="otro">Youtube</option>
    


  </select>
</div>

                <div>
                  <button type="submit" className={styles.hsSubmit}>
                    Sí! Quiero el Demo GRATIS
                  </button>
                </div>
              </form>
            </div>
       
          </div>
      
        </div>

      </div>
    </>
  );
}

export default Producto;