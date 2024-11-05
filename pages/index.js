import Head from "next/head";

import QuickInfo from "../components/Quickinfo/index";
import QuickInfo2 from "../components/QuickInfo2/index";
import QuickInfo3 from "../components/QuickInfo3/index";
import MenuDetail from "../components/MenuDetail";
import Promociones from "../components/Promociones";
// import videoPort from '../data/assets/portada.mp4'
import { useRouter } from "next/router";
import HeaderEn from "../components/Header-en/HeaderEn";
import HeaderEs from "../components/Header-es/Header-es";
import { useAppContext } from "../components/context/Context";
import Encontramos from "../components/Encontramos";
import * as fbq from "../lib/fpixel";
import Calendario from "../components/Calendario";
import QuickInfo4 from "../components/QuickInfo4";
import Slider from "../components/Sliders/Slider";
import Link from "next/link";
import NavBar from "../components/NavBarEs/NavBarEs";
import QuickInfo5 from "../components/QuickInfo5";
import MySwiper from "../components/SwiperPrueba";
import CasosEstudio from "../components/CasosEstudio";
import About from "../components/About";
import RestauranterosExitosos from "../components/RestauranterosExitosos";
// imagenes
const image1 =
  "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/IMG_9585.jpg";
const image2 =
  "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/nina2pinata.jpeg";
const image3 =
  "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/ninapinata.jpeg";
const image4 =
  "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/inicio/IMG_2048.jpg";

const image5 =
  "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/IMG_9585.jpg";
const image6 =
  "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/mixologia+mexicana+tragos+increibles.jpg";
const image7 =
  "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/ninapinata.jpeg";
const image8 =
  "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/coctelDeliciosoMEzcal.jpg";
export default function Home() {
  const opts = {
    height: "350",
    width: "100%",

    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // autoplay: 1,  // Auto-play the video on load,
    },
  };
  const videoOnReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };
  const handleClick = () => {
    fbq.event("Reserva");
  };

  const router = useRouter();
  const { locale } = router;
  let HeaderComponent;
  const logo2 =
    "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/logo_page_altaNUEVO_blanco.png";

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
          <div
            id="section-info-banner"
            className="justify-center bg-black py-[11px]  w-full"
          >
            <div className="max-w-[90%] mx-auto flex-col md:flex-row flex overflow-hidden items-center">
              <div className="justify-center max-w-[100%] md:justify-start flex self-center items-center mx-auto">
                <a
                  href="http://ww2.gymlaunch.com/gymgrowth"
                  target="_blank"
                  className="inline-block"
                >
                  <h1 className="title3-tw text-principal mt-[4px] text-center md:text-start">
                    <span className="title3-tw">
                      DOS DÍAS PARA CAMBIAR TU RESTAURANTE PARA SIEMPRE
                    </span>{" "}
                    <br />
                    <span className="title3-tw text-[#fff]">
                      TALLER EN LÍNEA
                    </span>
                    <br />
                    <span className="span4-tw">
                      NO TE LO PIERDAS. PRIMEROS 15 DUEÑOS RESTAURANTEROS.
                    </span>
                  </h1>
                </a>
              </div>
              <div className="justify-center max-w-[100%] md:justify-start flex self-center items-center mx-auto">
                <a
                  href="http://ww2.gymlaunch.com/gymgrowth"
                  target="_blank"
                  className="inline-block"
                  data-cmp-ab="2"
                >
                  <img
                    src="https://imagenesrutalab.s3.amazonaws.com/impulsoRestaurantero/banner/logoPalabrasFinalImpulsoTALLER.png"
                    loading="lazy"
                    width="217"
                    sizes="(max-width: 479px) 217px, (max-width: 991px) 26vw, (max-width: 1439px) 21vw, 217px"
                    alt=""
                    srcSet="https://imagenesrutalab.s3.amazonaws.com/impulsoRestaurantero/banner/logoPalabrasFinalImpulsoTALLER.png 500w, https://imagenesrutalab.s3.amazonaws.com/impulsoRestaurantero/banner/logoPalabrasFinalImpulsoTALLER.png 770w"
                    className="image-8"
                    data-cmp-ab="2"
                    data-cmp-info="10"
                  />
                </a>
              </div>
            </div>
          </div>
          <div id="section-clientes" className="overflow-hidden">
            <div className="max-w-[90%] mx-auto bg-black rounded-b-[25px] flex items-center pt-[13px] pb-[18px] px-[30px]" >
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
              </div>
            </div>
          </div>


          <CasosEstudio />
          <About />
          <RestauranterosExitosos />
          <div
            style={{
              backgroundImage:
                "url('https://imagenesrutalab.s3.amazonaws.com/impulsoRestaurantero/seccion1/649c99bf1948a130a34f7abb_Wins+copy.png')",
              backgroundPosition: "50%",
              backgroundSize: "cover",
            }}
            className="relative px-8 flex flex-col items-center justify-center md:pt-[240px] pb-[58px] md:pb-[126px] px-2"
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
              <p className="parrafo-tw text-center mb-4 paragraph cn" style={{ color: "white" }}>
                Impulso Restaurantero ha ayudado a más de 5,000 dueños de restaurantes a
                construir negocios sumamente rentables. La única pregunta es, ¿será el tuyo el próximo?
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
                    sus objetivos. Saben que un plan imperfecto ejecutado hoy es
                    mejor que un plan perfecto ejecutado la próxima semana.
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
                    mirando hacia el siguiente objetivo. Siempre tienen la mira
                    puesta en el próximo nivel.
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
                    endulzarlo. Saben que guardar comentarios valiosos para sí
                    mismos perjudica a todos.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center py-16 px-2 w-full">
            <div className="max-w-[1050px] mx-auto bg-black w-full rounded-3xl py-8 overflow-hidden">
              <div className="heading-block w-full flex flex-col justify-center items-center mb-16">
                <span className="rounded-full bg-secundario text-white font-semibold px-4 py-2 mb-4">
                  DESCÁRGALO GRATIS
                </span>
                <h2 className="title3-tw text-center uppercase text-white px-4 md:px-24 leading-snug">
                  7 MODELOS DE INGRESOS QUE USAMOS PARA ESCALAR RESTAURANTES A MÁS DE $1M/MENSUALES COMO UN RELOJ
                </h2>
                <p className="my-4 text-white px-4 md:px-24 text-center">
                  Obtén los MEJORES modelos para construir un restaurante increíblemente rentable en 2024, <br /> además de 33 casos de estudio de restaurantes que crecieron utilizando estos modelos.
                </p>
                <div className="px-4">

                  <Link href="/casosexito">
                    <button className="button4 font-bold">
                      ¡SÍ! OBTÉN ACCESO INSTANTÁNEO
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
