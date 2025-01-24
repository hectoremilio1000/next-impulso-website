import React from "react";
import NavBar from "../../components/NavBarBlack/NavBarEs";
import Link from "next/link";
import FAQ from "../../components/FAQ/faq";
import Head from "next/head";

function Destacaeninternet() {
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
      titulo1: "Destaca en Internet",
      parrafo1:
        "Con técnicas avanzadas de SEO y estrategias de marketing digital, optimizamos tu presencia en línea para que tu restaurante aparezca en los primeros lugares de Google, Tik Tok, Facebook e Instagram.",

      imagen1:
        "https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/comolohacemos/googleSeo.png",
      titulo2: "Estrategias SEO Avanzadas",
      parrafo2:
        "Te ayudamos a posicionar tu restaurante en los primeros lugares de búsqueda en Google, utilizando técnicas avanzadas de SEO. Optimizamos tu página web para que atraiga más tráfico orgánico y conecte directamente con tus clientes potenciales.",
      imagen2:
        "https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/comolohacemos/guia-como-hacer-seo.jpg",
      titulorazones:
        "3 CLAVES PARA DESTACAR TU RESTAURANTE EN GOOGLE Y REDES SOCIALES CON NOSOTROS",
      razon1: "Datos como el Pilar Principal",
      parraforazon1:
        "Usamos herramientas avanzadas como Google Analytics, Tag Manager y Heatmaps para recopilar datos precisos sobre el comportamiento del cliente en línea. Esto nos permite entender qué buscan, cómo navegan y en qué momento están más propensos a tomar acción.",
      razon2: "Automatización y Remarketing Personalizado",
      parraforazon2:
        "Implementamos estrategias de remarketing basadas en el historial de navegación y comportamientos previos. Por ejemplo, si alguien visita tu menú en línea, recibirá un anuncio específico destacando tus platillos más populares con un botón directo para reservar o pedir.",

      razon3: "SEO y Contenido Basado en Intención de Búsqueda",
      parraforazon3:
        "Aplicamos un enfoque avanzado de SEO no solo para posicionar palabras clave genéricas como restaurante mexicano, sino también para capturar búsquedas de intención específica, como mejor brunch en la Roma o cantina mexicana para grupos. Creamos contenido optimizado, como blogs, reseñas y videos, que responden a estas búsquedas.",

      titulo3: "Éxitos que Transforman Restaurantes",
      parrafo3:
        "Conoce cómo hemos ayudado a restauranteros a convertir sus desafíos en historias de éxito, utilizando estrategias personalizadas de SEO y marketing digital para alcanzar sus metas de negocio.",
      imagen3:
        "https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/comolohacemos/community-manager-google-trends-1200x720.jpg",

      titulo4:
        "¿Sabías que podrías estar obteniendo MUCHAS más ventas y reservas? En Impulso Restaurantero, transformamos tu visibilidad en internet llenando tus mesas. ",
    },
  ];
  return (
    <>
      <Head>
        <title>{head[0].title}</title>
        <link rel="icon" href="../favicon.ico" />
        <meta name="of:title" content={head[0].content} />
        <meta name="of:description" content={head[0].description} />

        <meta
          property="og:url"
          content="https://www.impulsorestaurantero.com/"
        />

        <meta
          property="og:image"
          content="https://imagenesrutalab.s3.amazonaws.com/impulsoRestaurantero/logo/logoSoloImpulsoRestaurantero.png"
        />
        <link rel="apple-touch-icon" href="../logo192.png" />
        <link rel="manifest" href="../manifest.json" />
      </Head>
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
        <div className="mt-6 mb-4">
          <Link href="/casosexito">
            <button className="button-small">Demo Gratis</button>
          </Link>
        </div>
        <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[#e5e5e5] rounded-[1.2em] max-w-xl">
          <img
            className=" w-full object-contain "
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
            <h2 className="title3-tw">{info[0].titulo3}</h2>
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

export default Destacaeninternet;
