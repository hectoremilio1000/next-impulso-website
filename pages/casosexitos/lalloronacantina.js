import React from "react";
import NavBar from "../../components/NavBarBlack/NavBarEs";
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
        "Transformamos nuestra visión en realidad con una estrategia integral que combinó marketing digital, optimización de redes sociales y una oferta gastronómica única. Logramos que Cantina La Llorona se posicionara como el lugar favorito en Roma-Condesa, atrayendo tanto a locales como a turistas gracias a nuestra presencia destacada en Google, TikTok e Instagram",

      imagen1:
        "https://imagenesrutalab.s3.us-east-1.amazonaws.com/llorona/nextImage/fotosBanner/cantina%2Bllorona%2Bafuera%2Blugar.jpg",
      titulo2: "Un Modelo Innovador de Cantina que Enamora",
      parrafo2:
        "Transformamos el concepto tradicional de una cantina en una experiencia vibrante y moderna, logrando que nuestros clientes se enamoren del nuevo enfoque. Con un diseño auténtico y una propuesta gastronómica única, conquistamos a quienes buscan lo mejor de la tradición con un toque fresco y actual.",
      imagen2:
        "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/inicio/chicharron%2Bpork%2Bbelly%2Bguacamole%2Bcantina%2Bllorona.jpg",
      titulorazones:
        "3 CLAVES QUE CONVIRTIERON A CANTINA LA LLORONA EN EL NUEVO HOTSPOT DE LA ROMA-CONDESA",
      razon1:
        "Cocina Innovadora que Reinventa Tradiciones que se adapta al mercado",
      parraforazon1:
        "Transformamos los platillos tradicionales mexicanos en experiencias gastronómicas únicas. Con técnicas modernas y una cuidadosa selección de ingredientes, nuestra propuesta reinterpreta la cocina mexicana para cautivar a un público contemporáneo que busca lo auténtico con un toque innovador.",
      razon2: "Automatización y Remarketing Personalizado",
      parraforazon2:
        "Implementamos estrategias de remarketing basadas en el historial de navegación y comportamientos previos. Por ejemplo, si alguien visita tu menú en línea, recibirá un anuncio específico destacando tus platillos más populares con un botón directo para reservar o pedir.",

      razon3: "Recursos Humanos con Inteligencia Artificial",
      parraforazon3:
        "mplementamos un modelo de gestión que combina inteligencia artificial con estrategias personalizadas para capacitar a nuestro equipo. Desde la creación de manuales digitales hasta evaluaciones en tiempo real, aseguramos un servicio impecable que eleva cada visita a un estándar superior.",

      titulo3: "Adaptándonos al Futuro de las Cantinas",
      parrafo3:
        "Descubre cómo transformamos Cantina La Llorona en un referente innovador, adaptando su concepto y mixología a las tendencias actuales del mercado. Con un enfoque en la creatividad y la personalización, logramos conectar con una audiencia moderna, ofreciendo experiencias que combinan tradición y vanguardia.",
      imagen3:
        "https://imagenesrutalab.s3.us-east-1.amazonaws.com/llorona/nextImage/inicio/amigastomandoCantinaLlorona.JPG",

      titulo4:
        "¿Sabías que podrías duplicar tus ventas con las estrategias correctas? En Impulso Restaurantero, hicimos que Cantina La Llorona se convirtiera en el lugar favorito de Roma-Condesa. ",
    },
  ];
  return (
    <>
      <NavBar />
      <div className="bg-gray-50 flex flex-col items-center px-4 py-8 md:px-16 pt-24 md:pt-36">
        <div className="text-center max-w-4xl">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {info[0].titulo1}
          </h1>
          <p className="text-gray-600 text-sm md:text-2xl">
            {info[0].parrafo1}
          </p>
        </div>
        <div className="mt-6 mb-4"></div>
        <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[#e5e5e5] max-w-2xl">
          <img
            className=" w-full object-contain rounded-[1.2em]"
            src={info[0].imagen1}
            alt=""
          />
        </div>
        <div className="content grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-36 px-[20px] items-center">
          <div className="flex flex-col items-center text-center max-w-2xl">
            <h2 className="title3-tw">{info[0].titulo2}</h2>
            <p className="text-gray-600 text-sm md:text-2xl">
              {info[0].parrafo2}
            </p>
          </div>
          <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[#e5e5e5] max-w-xl">
            <img
              className="w-full object-contain rounded-[1.2em]"
              src={info[0].imagen2}
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-16 px-2">
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
                <h5 className="text-[12px] md:text-[18px] font-bold">
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
                <h1 className="text-[12px] md:text-[18px] font-bold">
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
                <h1 className="text-[12px] md:text-[18px] font-bold">
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
          <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[#e5e5e5] max-w-xl">
            <img
              className="w-full object-contain rounded-[1.2em]"
              src={info[0].imagen3}
              alt=""
            />
          </div>
          <div className="w-full flex flex-col items-center gap-4 justify-center p-8 bg-[#fbfbfad9] border-[#e5e5e5] rounded-[1.2em] max-w-2xl">
            <h2 className="title3-tw text-center">{info[0].titulo3}</h2>
            <p className="text-gray-600 text-sm md:text-2xl text-center">
              {info[0].parrafo3}
            </p>
          </div>
        </div>
        <div className="bg-gray-50 flex flex-col items-center px-4 py-8 md:px-16 pt-24 md:pt-36">
          <div className="text-center max-w-4xl mb-4">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight text-center">
              {info[0].titulo4}
            </h1>
            <p className="text-gray-600 text-sm md:text-2xl text-center">
              Obten tu demo gratis ya
            </p>
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
                  <p className="text-4xl font-bold text-white">
                    15 días gratis
                  </p>
                  <p className="text-lg text-gray-300">Sin compromisos</p>
                </div>
                <div className="text-center"></div>
              </div>
              <Link href="/demogratis">
                <button className="button-small">Demo Gratis ya</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Lalloronacantina;
