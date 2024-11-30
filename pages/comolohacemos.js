import React from 'react'
import NavBar from '../components/NavBarBlack/NavBarEs'
import Link from 'next/link'
import FAQ from '../components/FAQ/faq'


function Comolohacemos() {

  const faqs = [
    { question: "¿Qué pasará con mi sitio web actual?", answer: "Cuando te registras con Impulso Restaurantero, obtendrás un nuevo sitio web optimizado para atraer tráfico y aumentar tus ventas. Este reemplazará tu sitio web actual. Tu dominio y URL seguirán siendo los mismos. No eliminaremos tu sitio web actual. Si en algún momento decides cancelar tu suscripción con nosotros, restauraremos tu sitio web a como estaba antes de registrarte." },
    { question: "¿Qué tan personalizable es el diseño?", answer: "En Impulso Restaurantero creemos que las ventas son lo más importante. Por eso, te ofrecemos un diseño probado que puedes personalizar con la identidad de tu marca. Así es como nuestros sitios web para restaurantes tienen un estilo único. Hemos estudiado las mejores marcas online, generado más de $100 millones en ventas para restaurantes y ayudado a miles de dueños de restaurantes a hacer crecer su base de clientes con nuestros sitios web. Si buscas total libertad en el diseño, Impulso Restaurantero puede no ser la mejor opción para tu negocio." },
    { question: "¿Cuánto tiempo tomará?", answer: "Si tienes todo listo, solo te tomará unos pocos días. La mayoría de nuestros clientes logran tener su nueva presencia en línea configurada en aproximadamente una semana. Al registrarte, necesitaremos algo de información sobre tu restaurante. Esto incluye los datos de tu dominio web, así como los detalles de tu cuenta de Google Business, Facebook, Tik tok, Instagram. Cuanta más información tengas preparada, más rápido podremos lanzar tu nueva plataforma." },
  ];

  return (
    <>
    <NavBar />
    <div className="bg-gray-50 flex flex-col items-center px-4 py-8 md:px-16 pt-24 md:pt-36">
      {/* Header */}
      <div className="text-center max-w-4xl">
        <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
        Podrías estar obteniendo MUCHAS más ventas en línea.
        </h1>
        <p className="text-gray-600 text-sm md:text-2xl">
        Impulso Restaurantero es la manera más sencilla de COONSEGUIR MÁS reservas en línea y ofrecer la mejor experiencia a tus clientes. Descubre cómo lo hacemos.
        </p>
      </div>

      {/* Call to Action Button */}
      <div className="mt-6 mb-4">
      <Link href="/casosexito">
              <button className="button-small">Demo Gratis</button>
            </Link>
      </div>

      <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[#e5e5e5] rounded-[1.2em] max-w-xl">
            <img
              className=" w-full object-contain "
              src="https://imagenesrutalab.s3.amazonaws.com/impulsoRestaurantero/seccion1/649c99bf1948a130a34f7abb_Wins+copy.png"
              alt=""
            />
            <h2 className="text-2xl md:text-5xl font-bold text-gray-900 mb-2 mt-4 leading-tight">¿Cómo lo hacemos?</h2>
            
           
          </div>
      {/* Image Section */}
     <>
     <div className="content grid grid-cols-1 md:grid-cols-2 gap-8 px-[20px] items-start">
          <div className="w-full flex flex-col items-center gap-4 p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
            <Link href="/casosexito">
              <img
                className=" w-full object-contain"
                src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/comolohacemos/googleSeo.png"
                alt=""
              />
            </Link>
            <h2 className="title3-tw text-center">01. Destaca en Internet</h2>
            <p className="parrafo-tw paragraph-feature text-center">
            Con técnicas avanzadas de SEO y estrategias de marketing digital, optimizamos tu presencia en línea para que tu restaurante aparezca en los primeros lugares de Google, Tik Tok, Facebook e Instagram.
            </p>
            <Link href="/casosexito">
              <button className="button-small">Descubre más</button>
            </Link>
          </div>
          
          <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
            <img
              className=" w-full object-contain rounded-2xl"
              src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/comolohacemos/pagina%2Bvisitas%2Bwebsite.jpg"
              alt=""
            />
            <h2 className="title3-tw text-center">02. Páginas que venden</h2>
            <p className="parrafo-tw paragraph-feature text-center">
              Creamos tu página para que tengas más reservas
            </p>
              <Link href="/casosexito">
              <button className="button-small">Descubre más</button>
            </Link>
          </div>
          
          <div className="w-full flex flex-col items-center gap-4 p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
            <Link href="/casosexito">
              <img
                className=" w-full object-contain rounded-2xl"
                src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/comolohacemos/punto-venta%2Bimpuloso%2Brestaurantero.jpg"
                alt=""
              />
            </Link>
            <h2 className="title3-tw text-center">03. Punto de venta con instalación </h2>
            <p className="parrafo-tw paragraph-feature text-center">
              Te damos un punto de venta para que puedas agilizar tu operación
            </p>
            <Link href="/casosexito">
              <button className="button-small">Descubre más</button>
            </Link>
          </div>

          
          <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
            <img
              className=" w-full object-contain"
              src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/comolohacemos/recursos%2Bhumanps%2Bmanuales%2Bia.png"
              alt=""
            />
            <h2 className="title3-tw text-center">04. Recursos humanos & Manuales con Inteligencia Artificial</h2>
            <p className="parrafo-tw paragraph-feature text-center">
             Te ofrecemos manuales y un departamento de recursos humanos con inteligencia artificial
            </p>
            <Link href="/casosexito">
              <button className="button-small">Descubre más</button>
            </Link>
          </div>
          <div className="w-full flex flex-col items-center gap-4 p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
            <Link href="/casosexito">
              <img
                className=" w-full object-contain"
                src="https://img.freepik.com/free-photo/office-meeting_144627-35624.jpg"
                alt=""
              />
            </Link>
            <h2 className="title3-tw text-center">05. Programa de lealtad</h2>
            <p className="parrafo-tw paragraph-feature text-center">
            Creamos programas de lealtad innovadores utilizando a través de una tarjeta de recompensas
            </p>
            <Link href="/casosexito">
              <button className="button-small">Descubre más</button>
            </Link>
          </div>
          
          <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
            <img
              className=" w-full object-contain rounded-2xl"
              src="https://img.freepik.com/free-photo/explaining-work_1098-18099.jpg"
              alt=""
            />
            <h2 className="title3-tw text-center">06. Permisos y asesoría personalizada</h2>
            <p className="parrafo-tw paragraph-feature text-center">
            Te ayudamos a mantener todos los permisos y requisitos legales de tu restaurante siempre al día, asegurando que cumplas con todas las normativas vigentes de manera eficiente y sin preocupaciones.
            </p>
              <Link href="/casosexito">
              <button className="button-small">Descubre más</button>
            </Link>
          </div>


          <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
            <img
              className=" w-full object-contain rounded-2xl"
              src="https://img.freepik.com/free-photo/close-up-male-checking-clipboard-list_23-2148332936.jpg?t=st=1732908017~exp=1732911617~hmac=d2de0cad83a60fbd7790a6492c64d162798684866073fdbb121ce0a293008f2b&w=1480"
              alt=""
            />
            <h2 className="title3-tw text-center">07. Financiamiento</h2>
            <p className="parrafo-tw paragraph-feature text-center">
            Financiamiento para compra de equipo y crecimiento.
            </p>
              <Link href="/casosexito">
              <button className="button-small">Descubre más</button>
            </Link>
          </div>

        </div>
        
     </>
     <div className="content grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-24 px-[20px] items-start">
     <FAQ items={faqs}/>
     <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[#e5e5e5] rounded-[1.2em] max-w-xl">
            <img
              className=" w-full object-contain "
              src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/comolohacemos/comolohacemos%2Bpagina.png"
              alt=""
            />
          </div>
     </div>
    </div>
    <div className="bg-gray-50 flex flex-col items-center px-4 py-8 md:px-16">
        <div className="text-center max-w-4xl mb-4">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight text-center">
            Podrías estar obteniendo MUCHAS más ventas en línea.
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
        </div>
    </>
    
  )
}

export default Comolohacemos